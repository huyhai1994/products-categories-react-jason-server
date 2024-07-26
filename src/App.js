import './App.css';
import {Route, Routes} from "react-router-dom";
import ProductList from "./components/Products/Product-List/ProductList";
import ProductAdd from "./components/Products/Product-Add/ProductAdd";
import ProductEdit from "./components/Products/Product-Edit/ProductEdit";
import {ToastContainer} from "react-toastify";

function App() {
    return (<>
        <Routes>
            <Route path="/" element={<ProductList/>}/>
            <Route path="product-add" element={<ProductAdd/>}/>
            <Route path="product-edit/:id" element={<ProductEdit/>}/>
        </Routes>
        <ToastContainer/>
    </>);
}

export default App;