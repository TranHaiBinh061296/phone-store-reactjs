import axios from "axios";
import {CATEGORY_API_URL} from "./common.js"

class CategoryService {
    static getCategories() {
        return axios.get(CATEGORY_API_URL)
    }
}
export default CategoryService;