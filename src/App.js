import './App.css';
import {Route, Routes} from "react-router-dom";
import ProductList from "./components/Products/Product-List/ProductList";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<ProductList/>}/>
            </Routes>
        </>
    );
}

export default App;