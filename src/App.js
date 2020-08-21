import React from "react";
import "./App.css";
import Title from "./components/title";
import ToDoList from "./components/to-do-list";

const App = () => {
  return (
    <div className="App">
      <Title />
      <ToDoList />
    </div>
  );
};

export default App;
