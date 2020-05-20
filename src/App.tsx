import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import GlobalStyle from "./styles/global";
import Routes from "./routes/index";

import AppProvider from "./hooks";

const App: React.FC = () => {
  return (
    <Router>
      <GlobalStyle />

      <AppProvider>
        <Routes />
      </AppProvider>
    </Router>
  );
};
export default App;
