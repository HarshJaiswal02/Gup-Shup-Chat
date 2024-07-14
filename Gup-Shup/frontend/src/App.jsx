import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chat from "./Component/Chat";
import Home from "./Component/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
