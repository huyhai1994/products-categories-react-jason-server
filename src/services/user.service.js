import {API_URL} from "../config/backend.config";
import axios from "axios";

class ProductService {
    static async getAllProducts() {
        return await axios.get(API_URL);
    }
}

export default ProductService;