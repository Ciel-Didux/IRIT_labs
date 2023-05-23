const express = require('express');
const axios = require('axios');

const app = express();
const port = 3005;

const binanceBaseEndpoint = 'https://fapi.binance.com';
const binanceCandlestickUrl = '/fapi/v1/klines';
const huobiBaseEndpoint = 'https://api.huobi.pro';
const huobiCandlestickUrl = '/market/history/kline';

app.get('/price/:symbol', async (req, res) => {
  const { symbol } = req.params;
  const { service } = req.query;

  let price = null;
  if (service === 'binance') {
    const binanceCandlestick = (await axios.get(
      `${binanceBaseEndpoint}${binanceCandlestickUrl}?symbol=${symbol.toUpperCase()}&interval=1d&limit=1`
    )).data;
    console.log(binanceCandlestick)
    price = {
      open: Number(binanceCandlestick[0][1]),
      high: Number(binanceCandlestick[0][2]),
      low: Number(binanceCandlestick[0][3]),
      close: Number(binanceCandlestick[0][4]),
    };
  } else if (service === 'huobi') {
    const huobiCandlestick = (await axios.get(
      `${huobiBaseEndpoint}${huobiCandlestickUrl}?period=1day&size=1&symbol=${symbol.toLowerCase()}`
    )).data.data;
    price = {
      open: huobiCandlestick[0].open,
      high: huobiCandlestick[0].high,
      low: huobiCandlestick[0].low,
      close: huobiCandlestick[0].close,
    };
  } else {
    res.status(404).send({
      message: 'Requested service not found',
    });
  }
  console.log(price);
  res.json(price);
});

app.listen(port, () => console.log(`Server running on port ${port}`));