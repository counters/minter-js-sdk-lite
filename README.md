# minter-js-sdk-lite


Запрос баланса по адресу (Mx....) в минтере
```javascript
let minterApi = MinterApi('https://node-api.domain');
minterApi(minterApi.Address, 'Mxeee37fedf95e5ee65ce6e3ad1cbcfa9055932311', null, function (result) {
    let array = result.result.balance;
    console.log('MinterApi Address Callback', result, array);
});
```

Информация о монете
```javascript
let minterApi = MinterApi('https://node-api.domain');
minterApi(minterApi.CoinInfo, 'ROBOT', null, function (result) {
    console.log('MinterApi CoinInfo Callback', result);
});
```

Получение цены монеты
```javascript
let params = {coin_to_sell:'BIP', coin_to_buy:'ROBOT'}
minterApi(minterApi.SellCoin, '1000000000000000000', params, function (result) {
    console.log('MinterApi SellCoin Callback', result, minterUtil.convertFromPip(result.result.will_get));
});
```

Запрос баланса по адресу (Mx....) в минтере с рекурсивных обходом всех монет и выводом итогового баланса в BIP
```javascript
let minterApi = MinterApi('https://node-api.domain'); 

MinterBalance.api = minterApi;
minterApi(minterApi.Address, 'Mxeee37fedf95e5ee65ce6e3ad1cbcfa9055932311', null, function (result) {
    let array = result.result.balance;
    console.log('MinterApi Address Callback', /*result, */array);
    MinterBalance(array,  function (value) {
        console.log("End all balance", value);
    }, function (amound, coin, price) {
        console.log(amound + ' ' + coin + ' ' + price);
    });

}, 0);
```

