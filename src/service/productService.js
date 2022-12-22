import axios from "axios";
import {PRODUCT_API_URL} from "./common"

class ProductService{
    static getProducts() {
        return axios.get(PRODUCT_API_URL)
    }
    static removeProduct(productId) {
        return axios.delete(`${PRODUCT_API_URL}/${productId}`)
    }
    static createProduct(product) {
        return axios.post(PRODUCT_API_URL, product)
    }
}
export default ProductService;