"use client"
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

interface Currency {
  currencyCodeA: number;
  currencyCodeB: number;
  rateBuy: number;
  rateSell: number;
  rateCross: number;
}

function App() {
  const [currency, setCurrency] = useState('840');
  const [data, setData] = useState<Currency[]>([])

  useEffect(() => {
    axios.get('https://api.monobank.ua/bank/currency').then((data) => {
      setData(data.data)
    })
  }, [])

  const rate = useMemo(() => {
    const result = { buy: 0, sell: 0, cross: 0 };
    if (!data) {
      return result;
    }
    const value = data.find((item) => item.currencyCodeA === parseInt(currency) && item.currencyCodeB === 980);
    if (value) {
      result.buy = value.rateBuy
      result.sell = value.rateSell
      result.cross = value.rateCross
    }

    return result
  }, [currency, data])

  return (
    <>
      <select value={currency} onChange={(event) => setCurrency(event.target.value)}>
        <option value="840">USD</option>
        <option value="978">EUR</option>
        <option value="826">GBP</option>
      </select>
      <br />
      <p>Current rate:</p>
      <p>Buy: {rate.buy}</p>
      <p>Sell: {rate.sell}</p>
      <p>Cross: {rate.cross}</p>
    </>
  );
}

export default App;
