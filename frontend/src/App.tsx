import React from "react";
import logo from "./logo.svg";
import "./App.css";
import NamesList from "./components/NamesList";
import AddName from "./components/NamesForm";

function App() {
  return (
    <div className="App">
      <p>Hello World</p>
      <NamesList />
    </div>
  );
}

export default App;
