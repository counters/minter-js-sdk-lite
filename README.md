# minter-js-sdk-lite

Компиляция
```bash
yarn install
yarn js
```

Запрос баланса по адресу (Mx....) в минтере
```javascript
let minterApi = MinterApi('https://node-api.domain');
minterApi.getAddress('Mx0903ab168597a7c86ad0d4b72424b3632be0af1b', function (result) {
    console.log('MinterApi Address Callback', result);
    console.log(result.getBalance() );
    console.log(result.getTotal() );
    console.log(result.getDelegated() );
}, true, null);
```

Информация о монете
```javascript
minterApi.getCoinInfo('ROBOT', function (result) {
    console.log('MinterApi getCoinInfo Callback', result );
}, null);
minterApi.getCoinInfoById(65, function (result) {
    console.log('MinterApi getCoinInfoById Callback', result );
}, null);
```

Получение цены монеты
```javascript
minterApi.getSellCoin('ROBOT', 'BIP', '1000000000000000000', function (result) {
    console.log('MinterApi SellCoin Callback', result);
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

