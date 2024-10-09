const price = document.querySelector('#price');

async function showPrice() {
    const url = 'https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT';
    const data = await fetch(url).then(res => res.json())
    price.innerHTML = '$' + parseFloat(data.price).toFixed(2);
}
showPrice();

setInterval(showPrice, 5000);