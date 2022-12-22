import axios from "axios";
import {SIZE_API_URL} from "./common.js"

class sizeService {
    static getSizes() {
        return axios.get(SIZE_API_URL)
    }
}
export default sizeService;