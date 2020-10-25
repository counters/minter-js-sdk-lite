import Address from './Model/Address';
global.Address = Address;
import Coin from './Model/Coin';
global.Coin = Coin;
// import CoinInfo from './Model/CoinInfo';
// global.CoinInfo = CoinInfo;
import MinterApi from './MinterApi';
global.MinterApi = MinterApi;

import Decimal from '@agrora/decimal';

let MinterConvert=function(_name) {
    let MinterPIP_STR =      '0.000000000000000001';
    let MinterPIPINBIP_STR = '1000000000000000000';
    this.fromPip = function (pip) {
        return Decimal.from(pip).multiply(MinterPIP_STR).toFloat()
    }
    this.toPip = function (amount) {
        const decimal = Decimal.from(amount);
        const sum = decimal.divide(MinterPIP_STR);
       return sum.toFixed(0);
    }
}
window.minterConvert = new MinterConvert()

minterApi.getCoinInfo('ROBOT', function (result) {
    console.log('MinterApi getCoinInfo Callback', result );
}, null);
minterApi.getCoinInfoById(65, function (result) {
    console.log('MinterApi getCoinInfoById Callback', result );
}, null);

minterApi.getSellCoin('ROBOT', 'BIP', '1000000000000000000', function (result) {
    console.log('MinterApi SellCoin Callback', result);
});