export default function (balance, delegated, total, transaction_count, bip_value) {
    this.transaction_count = parseInt(transaction_count) ;
    this.bip_value =  minterConvert.fromPip(bip_value);
    var balanceJson = balance;
    var delegatedJson = delegated;
    var totalJson = total;
    var arrBalance, arrDelegated, arrTotal = null;

    this.prepare = function (balance=true, delegated=true, total=true) {
        if (balance) arrBalance = this.getBalance();
        if (delegated) arrDelegated = this.getDelegated();
        if (total) arrTotal = this.getTotal();
    }

    this.getBalance = function () {
        // return "test";
        // console.log(balanceJson)
        if (arrBalance == null) arrBalance = getArray(balanceJson);
        return arrBalance
    }
    this.getDelegated = function () {
        if (arrDelegated == null) arrDelegated = getArray(delegatedJson);
        return arrDelegated
    }
    this.getTotal = function () {
        if (arrTotal == null) arrTotal = getArray(totalJson);
        return arrTotal
    }
    function getArray(array) {
        // console.log(array)
        let out=[];
        for (var i = 0; i < array.length; i++) {
            const arr = {
                value: minterConvert.fromPip(array[i].value),
                coin: new Coin(parseInt(array[i].coin.id), array[i].coin.symbol),
                price: minterConvert.fromPip(array[i].bip_value)
            };
            out.push(arr);
        }
        out.sort(function(a, b){return b.price - a.price});
        return out;
    }
}
