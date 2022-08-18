async function request() {
    const res = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT');
    const data = await res.json();
    document.querySelector('#price').innerHTML = '$' + parseFloat(data.price).toFixed(1);
    setTimeout(() => request(), 5000);
}

request();