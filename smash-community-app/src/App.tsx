import React from "react";
import "./App.css";
import * as ReactDOMClient from "react-dom/client";

function App() {
  // Callback will be called when the div is first created.
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}

const rootElement: Element | DocumentFragment = document.getElementById("root");

const root = ReactDOMClient.createRoot(rootElement);
root.render(<App />);
export default App;
