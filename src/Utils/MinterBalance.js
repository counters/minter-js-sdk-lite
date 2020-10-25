let MinterBalance = (function () {
    let numCoin;
    let summ;
    let summStr = '';
    let MinterDefaultCoin = 'BIP';
    MinterBalance.api = null;
    let arrayCoin = {};
    /*    function parseFloat($strFloat) {
            return($strFloat.float());
        }*/
    function MinterBalance(array, endCallback, callback = null) {
        summ = 0;
        summStr = '';
        numCoin = 0;
        let oneBipMoney = false;
        arrayCoin = [];

        jQuery.each(array, function (key, value) {
            let valueF = '';
            let FeeValue = minterUtil.convertFromPip(value);

            if (key !== MinterDefaultCoin) {
                numCoin++;
                getSumm(value, key, endCallback, callback);
                valueF = parseFloat(FeeValue);
            } else {
                if (summStr === '') summStr = FeeValue;
                let price = parseFloat(FeeValue);
                summ += price;
                valueF = price;
                oneBipMoney = true;
                const arr =  {amount: price, coin: MinterDefaultCoin, price: price};
                arrayCoin.push(arr);
                if (callback != null) callback(price, MinterDefaultCoin, price);
            }
        });
        if (oneBipMoney && numCoin === 0) {
            arrayCoin.sort(function(a, b){return b.price - a.price});
            endCallback(summ, arrayCoin);
        }
    }

    function getSumm(amount, coin, endCallback, callback = null) {
        MinterBalance.api(MinterBalance.api.SellCoin, amount, {'coin_to_sell': coin, 'coin_to_buy': MinterDefaultCoin}, function (value) {
            numCoin--;
            let price = parseFloat(minterUtil.convertFromPip(value.result.will_get));
            let amountNum =parseFloat(minterUtil.convertFromPip(amount));
            if (callback != null) callback(amountNum, coin, price);
            summ += price;
            if (summStr === '') {
                summStr = minterUtil.convertFromPip(value.result.will_get);
            } else {
                summStr = summStr + minterUtil.convertFromPip(value.result.will_get);
            }
            const _valueF = parseFloat(summStr);
            arrayCoin.push({amount: amountNum, coin: coin, price: price});
            if (numCoin === 0) {
                arrayCoin.sort(function(a, b){return b.price - a.price});
                endCallback(_valueF, arrayCoin);
            }
        });
    }

    return MinterBalance;
})();
