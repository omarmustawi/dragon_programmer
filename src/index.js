import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { MenuContextProvider } from "./components/Context/MenuContext";
import WindowContext from "./components/Context/WindowContext";
import { AllCommentsProvider } from "./components/Context/CommentsContext";
import { LoadingProvider } from "./components/Context/loadingContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <WindowContext>
    <MenuContextProvider>
      <AllCommentsProvider>
        <LoadingProvider>
          <React.StrictMode>
            <Router>
              <App />
            </Router>
          </React.StrictMode>
        </LoadingProvider>
      </AllCommentsProvider>
    </MenuContextProvider>
  </WindowContext>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
