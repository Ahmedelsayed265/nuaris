import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { store } from "./redux/store";
import { Provider } from "react-redux";

const App = () => {
  return (
    <main className="App">
      <Provider store={store}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Provider>
    </main>
  );
};

export default App;
