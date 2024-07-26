import axios from "axios";
import {CATEGORY_API_URL} from "../config/backend.config";


class CategoryService {
    static async getAllCategories() {
        return await axios.get(CATEGORY_API_URL);
    }
}

export default CategoryService;