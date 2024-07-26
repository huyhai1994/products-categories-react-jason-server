import './App.css';
import {Route, Routes} from "react-router-dom";
import ProductList from "./components/Products/Product-List/ProductList";
import ProductAdd from "./components/Products/Product-Add/ProductAdd";
import ProductEdit from "./components/Products/Product-Edit/Product-Edit";

function App() {
    return (<>
        <Routes>
            <Route path="/" element={<ProductList/>}/>
            <Route path="product-add" element={<ProductAdd/>}/>
            <Route path="product-edit" element={<ProductEdit/>}/>
        </Routes>
    </>);
}

export default App;