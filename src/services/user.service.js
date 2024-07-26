import {API_URL} from "../config/backend.config";
import axios from "axios";

class ProductService {
    static async getAllProducts() {
        return await axios.get(API_URL + '?_embed=category');
    }
}

export default ProductService;