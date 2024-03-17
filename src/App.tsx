import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Hamburgers from "./pages/Hamburgers/Hamburgers";
import Appetizers from "./pages/Appetizers/Appetizers";
import Login from "./pages/Login/Login";
import Combos from "./pages/Combos/Combos";
import Beverages from "./pages/Beverages/Beverages";
import Desserts from "./pages/Desserts/Desserts";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/entradas" element={<Appetizers />} />
        <Route path="/hamburgers" element={<Hamburgers />} />
        <Route path="/login" element={<Login />} />
        <Route path="/combos" element={<Combos />} />
        <Route path="/sobremesas" element={<Desserts />} />
        <Route path="/bebidas" element={<Beverages />} />
      </Routes>
    </BrowserRouter>
  );
}