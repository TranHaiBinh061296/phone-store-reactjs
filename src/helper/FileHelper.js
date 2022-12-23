import axios from "axios";
import sha1 from 'sha1';
import {CLOUDINARY_DESTROY_API_URL, CLOUDINARY_UPLOAD_API_URL} from '../service/common.js'

const Unsigned_Uploading = "uurprx9l";
class FileHelper {
    static uploadImage(imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", Unsigned_Uploading);
        return axios.post(CLOUDINARY_UPLOAD_API_URL, formData);
    }
    static destroyImage(filename) {
        const timestamp = new Date().getTime();
        const public_id = filename;
        const api_key = "174883395557514";
        const api_secret_key = "F1UwbpeowonaTr1YK4cjcPjtT6M";
        const shaString = `public_id=${public_id}&timestamp=${timestamp}${api_secret_key}`;
        const signature = sha1(shaString)
        const formData = new FormData();
        formData.append("public_id", public_id);
        formData.append("signature", signature);
        formData.append("api_key", api_key);
        formData.append("timestamp", timestamp);
        return axios.post(CLOUDINARY_DESTROY_API_URL, formData, {
            'Access-Control-Allow-Origin': '*'
        });
    }
}
export default FileHelper;