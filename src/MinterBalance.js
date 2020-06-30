
let MinterBalance = (function () {
let numCoin;
let summ;
let summStr='';
let MinterDefaultCoin='BIP';
    MinterBalance.api=null;
/*    function parseFloat($strFloat) {
        return($strFloat.float());
    }*/
    function MinterBalance(array, endCallback, callback=null) {
        summ=0;
        numCoin=0;
        let oneBipMoney=false;
        let maxVolume = 0;

        jQuery.each(array, function (key, value) {
            let valueF='';
         let FeeValue=minterUtil.convertFromPip(value);

            if (key!==MinterDefaultCoin) {
                numCoin++;
                getSumm(value, key, endCallback, callback);
                valueF= parseFloat(FeeValue);
            } else {
                if (summStr==='') summStr=FeeValue ;
                let price=parseFloat(FeeValue);
                summ+=price;
                valueF= price;
                oneBipMoney=true;
                if ( callback!=null) callback(price,MinterDefaultCoin, price);
            }
        });
        if (oneBipMoney && numCoin===0 ) endCallback(summ);
    }

    function getSumm(amound, coin, callback, endCallback=null) {
        MinterBalance.api( MinterBalance.api.SellCoin, amound, {'coin_to_sell':coin,'coin_to_buy':MinterDefaultCoin}, function (value) {
            numCoin--;
            let price=parseFloat(minterUtil.convertFromPip(value.result.will_get));
            if ( endCallback!=null) endCallback(parseFloat(minterUtil.convertFromPip(amound)),coin,price);
            summ+=price;
            if (summStr==='') summStr=minterUtil.convertFromPip(value.result.will_get) ; else
                summStr=summStr+minterUtil.convertFromPip(value.result.will_get );
            if (numCoin===0) callback(parseFloat(summStr));
        });
    }
    return MinterBalance;
})();
