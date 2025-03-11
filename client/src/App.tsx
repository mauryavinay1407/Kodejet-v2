import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Playground from "./pages/Playground";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/playground" element={<Playground/>} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
