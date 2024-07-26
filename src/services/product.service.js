import {PRODUCT_API_URL} from "../config/backend.config";
import axios from "axios";

class ProductService {
    static async getAllProducts() {
        return await axios.get(PRODUCT_API_URL + '?_embed=category');
    }

    static async deleteProduct(id) {
        return await axios.delete(PRODUCT_API_URL + '/' + id);
    }

    static async getProductById(id) {
        return await axios.get(PRODUCT_API_URL + '/' + id + '?_embed=category');
    }

    static async createProduct(product) {
        return await axios.post(PRODUCT_API_URL, product);
    }

    static async updateProduct(id, product) {
        return await axios.put(PRODUCT_API_URL + '/' + id, product);
    }
}

export default ProductService;