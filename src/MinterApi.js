import CoinInfo from "./Model/CoinInfo";

export default function (url) {
const urlApi= url + '/' ;

    function getParamsUrl(params){
        let params_str="";
        if (params.length>0) params_str = '?'+params.join('&')
        return params_str;
    }

    /**
     * @param {string} address
     * @param {function(*=): void} callback
     * @param {boolean} delegated
     * @param {int} height
     */
    MinterApi.getAddress = function (address, callback, delegated = false, height = null) {
        // console.log('getAddress('+address+', callback(), '+delegated+', '+height+')' );
        let params = []
        if (delegated) params.push('delegated=true')
        if (height) params.push('height=' + height)
        let url = urlApi + 'address/' + address + getParamsUrl(params);
        get(url, function (result) {
            let address = new Address(result.balance, result.delegated, result.total, result.transaction_count, result.bip_value)
            callback(address);
        })
    };

    function Status() {
        let url=urlApi+'/status';
        return get(url, callback);
    }

/*    function SellCoin(coin_to_sell, coin_to_buy, value_to_sell, height, callback) {
        // const getparams = $.param(params, true);
        let url=urlApi+'estimate_coin_sell?coin_to_sell='+coin_to_sell+'&coin_to_buy='+coin_to_buy+'&value_to_sell='+value_to_sell+'&height='+height;
        return get(url,function (result) {
            _getCoinInfo(result, callback);
        });
// return get(url, callback);
    }*/

    MinterApi.getSellCoin = function (coin_to_sell, coin_to_buy, value_to_sell, callback, height=null) {
        let addParamUrl = '';
        if (height) addParamUrl='&height='+height;
        let url=urlApi+'estimate_coin_sell?coin_to_sell='+coin_to_sell+'&coin_to_buy='+coin_to_buy+'&value_to_sell='+value_to_sell+addParamUrl;
        return get(url,function (result) {
            // console.log(result);
            callback(minterConvert.fromPip(result.will_get))
        });
    }
    MinterApi.getCoinInfo = function (symbol, callback, height=null) {
        let params = [];
        if (height) params.push('height=' + height)
        let url = urlApi + 'coin_info/' + symbol + getParamsUrl(params);
        return get(url,function (result) {
         _getCoinInfo(result, callback);
        });
    }
    MinterApi.getCoinInfoById = function (id, callback, height=null) {
        let params = [];
        if (height) params.push('height=' + height)
        let url = urlApi + 'coin_info_by_id/' + id + getParamsUrl(params);
        return get(url,function (result) {
         _getCoinInfo(result, callback);
        });
    }
    function _getCoinInfo(result, callback) {
        const volume = minterConvert.fromPip(result.volume);
        const reserve_balance = minterConvert.fromPip(result.reserve_balance);
        let address = new CoinInfo(result.id, result.name, result.symbol, volume, parseInt(result.crr), reserve_balance, parseInt(result.max_supply), result.owner_address)
        callback(address);
    }

    function get(url, callback) {
        // console.log('get '+url);
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'json'; // <<<
        xhr.onload = function() {
            if ( this.readyState==4 && this.status==200) {
                callback(this.response);
            }
        };
        xhr.send();
    }
    return MinterApi;
};
