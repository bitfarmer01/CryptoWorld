import { formatData } from "./Chart";
import React, { useEffect, useRef, useState } from "react";
import "./Graphs.css";
import Dashboard from "./Dashboard";
import Navbar from "../components/Navbar";

const Call = () => {
  //Keeps array of CryptoCurrencies
  const [currencies, setCurrencies] = useState([]);
  const [pair, setPair] = useState("");
  const [price, setPrice] = useState(0.0);
  //Data object of past data
  const [pastData, setPastData] = useState({});

  const ws = useRef(null);
  //First render reference ~ onMount
  let first = useRef(false);
  //coinbase api==base url
  const url = "https://api.pro.coinbase.com";
  // Effect hook for initial render
  useEffect(() => {
    ws.current = new WebSocket("wss://ws-feed.pro.coinbase.com");
    let pairs = [];
    const apiCall = async () => {
      await fetch(url + "/products")
        .then((res) => res.json())
        .then((data) => (pairs = data));
      let filtered = pairs.filter((pair) => {
        if (pair.quote_currency === "USD") {
          return pair;
        }
      });

      //alphabetical sorting
      filtered = filtered.sort((a, b) => {
        if (a.base_currency < b.base_currency) {
          return -1;
        }
        if (a.base_currency > b.base_currency) {
          return 1;
        }
        return 0;
      });
      console.log(filtered);
      //Updating currency hook with filtered values
      setCurrencies(filtered);
      //Setting the ref value true so next hook can render
      first.current = true;
    };
    apiCall();
  }, []);
  useEffect(() => {
    if (!first.current) {
      return;
    }

    let msg = {
      type: "subscribe",
      product_ids: [pair],
      channels: ["ticker"]
    };
    let jsonMsg = JSON.stringify(msg);
    ws.current.send(jsonMsg);

    let historicalDataURL = `${url}/products/${pair}/candles?granularity=86400`;
    const fetchHistoricalData = async () => {
      let dataArr = [];
      await fetch(historicalDataURL)
        .then((res) => res.json())
        .then((data) => (dataArr = data));

      let formattedData = formatData(dataArr);
      setPastData(formattedData);
    };

    fetchHistoricalData();

    ws.current.onmessage = (e) => {
      let data = JSON.parse(e.data);
      if (data.type !== "ticker") {
        return;
      }

      if (data.product_id === pair) {
        setPrice(data.price);
      }
    };
  }, [pair]);
  //To switch currencies and to ensure previous values are not used unsubscribing is important
  const handleSelect = (e) => {
    let unsubMsg = {
      type: "unsubscribe",
      product_ids: [pair],
      channels: ["ticker"]
    };
    let unsub = JSON.stringify(unsubMsg);

    ws.current.send(unsub);

    setPair(e.target.value);
  };
  return (
    <div>
      <Navbar />
      <div className="graph_container">
        {
          <select name="currency" value={pair} onChange={handleSelect}>
            {currencies.map((cur, idx) => {
              return (
                <option key={idx} value={cur.id}>
                  {cur.display_name}
                </option>
              );
            })}
          </select>
        }
        <Dashboard price={price} data={pastData} />
      </div>
    </div>
  );
};

export default Call;
