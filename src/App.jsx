import "./App.css";
import React, { useState } from "react";
import Papa from "papaparse";
import { csvdata } from "./startliste";

const KEY_CODE_ENTER = 13;

const rawData = Papa.parse(csvdata, {
  delimiter: ";", // auto-detect
  quoteChar: '"',
  escapeChar: '"',
  header: true,
  preview: 0,
  encoding: '"',
});

function App() {
  const [inputNumber, setInputNumber] = useState("");
  const [data] = useState(rawData.data);
  console.log(data);

  const [listData, setListData] = useState([]);

  const handleKeyDown = (event) => {
    if (event.keyCode === KEY_CODE_ENTER) {
      let item = data.find((i) => i["Startnr."] === inputNumber);
      if (item && inputNumber) {
        setListData([item, ...listData]);
      } else if (inputNumber) {
        setListData([
          { "Startnr.": inputNumber, Name: "Teilnehmer nicht gefunden!" },
          ...listData,
        ]);
      }
      setInputNumber("");
    }
  };

  return (
    <div className="app">
      <input
        placeholder="Startnummer"
        className="input"
        type="text"
        autoFocus
        value={inputNumber}
        onChange={(event) => setInputNumber(event.target.value)}
        onKeyDown={(event) => handleKeyDown(event)}
      />
      <div>
        {listData.map((item) => {
          console.log(item);
          return (
            <div className="item">
              <div className="item-text">
                <span className="item-text--key">Startnummer: </span>
                <span className="item-text--bold">{item["Startnr."]}</span>
              </div>
              <div className="item-text">
                <span className="item-text--key">Name:</span>
                <span className="item-text--bold">{item["Name"]}</span>
              </div>
              <div className="item-text">
                <span className="item-text--key">Jahrgang:</span>
                {item["Jahrg."]}
              </div>
              <div className="item-text">
                <span className="item-text--key">Verein:</span>
                {item["Verein"]}
              </div>
              <div className="item-text">
                <span className="item-text--key">Team:</span>
                {item["Team"]}
              </div>
              <div className="item-text">
                <span className="item-text--key">Geschlecht:</span>
                {item["m/w"]}
              </div>
              <div className="item-text">
                <span className="item-text--key">Alterskategorie:</span>
                {item["AK"]}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
