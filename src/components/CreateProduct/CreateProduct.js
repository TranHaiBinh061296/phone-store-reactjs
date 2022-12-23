import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategoryService from "../../service/categoryService";
import SizeService from "../../service/sizeService";
import ProductService from "../../service/productService";
import { toast } from "react-toastify";
import Spinner from "../Spinner/Spinner";
import nophoto from '../../assets/images/nophoto.png';
import FileHelper from "../../helper/FileHelper";


var imageFile = null;
function CreateProduct() {

    const [state, setState] = useState({
        loading: false,
        uploading: false,
        product: {},
        categories: [],
        sizes: [],
        errorMessage: ""
    })
    const [selectSizes, setSelectSizes] = useState([])

    useEffect(() => {
        try {
            setState({
                ...state,
                loading: true
            });
            async function getData() {
                let resCategories = await CategoryService.getCategories();
                let resSizes = await SizeService.getSizes();
                setState({
                    ...state,
                    loading: false,
                    categories: resCategories.data,
                    sizes: resSizes.data
                })
            }
            getData();
        } catch (error) {

        }
    }, [])

    const handleInput = (e) => {
        setState({
            ...state,
            product: {
                ...product,
                [e.target.name]: e.target.value
            }
        })
    }
    const handleCreateProduct = async (e) => {
        e.preventDefault();
        try {
            if (selectSizes.length === 0) {
                toast.info("Bạn phải chọn kích thước !!!")
                return;
            }
            if (imageFile) {
                toast.info("Bạn chưa tải ảnh lên!")
                return;
            }
            setState({
                ...state,
                loading: true
            })
            async function createProduct() {
                product.sizes = selectSizes;
                let resCreate = await ProductService.createProduct(product);
                if (resCreate.data) {
                    toast.success(`${resCreate.data.title} đã được tạo ! `)
                    setSelectSizes([]);
                    setState({
                        ...state,
                        loading: false,
                        product: {}
                    })
                }
            }
            createProduct();
        } catch (error) {

        }
    }

    const handleSelectSize = (size) => {
        setSelectSizes((pre) => {
            let result = pre.includes(size) ? pre.filter((item) => item !== size) : [...pre, size];
            return result;
        })
    }

    const handleSelecPhoto = (e) => {
        imageFile = e.target.files[0];
        let fakePhotoUrl = URL.createObjectURL(e.target.files[0]);
        setState({
            ...state,
            product: {
                ...product,
                image: fakePhotoUrl
            }
        })
    }
    const handleUploadImage = async (e) => {
        try {
            setState({
                ...state,
                uploading: true
            })
            let uploadResult = await FileHelper.uploadImage(imageFile);
            if (uploadResult && uploadResult.data) {
                imageFile = null;
                toast.success('Ảnh đã được tải lên!');
                setState({
                    ...state,
                    uploading: false,
                    product: {
                        ...product,
                        image: uploadResult.data.url
                    }
                })
            } else {
                toast.error('Tải ảnh lên không thành công !');
                setState({
                    ...state,
                    uploading: false
                })
            }
        } catch (error) {
            toast.error(error.message);
            setState({
                ...state,
                uploading: false
            })
        }
    }

    const { loading, categories, product, sizes, uploading } = state;
    const { title, description, price, image, categoryId } = product
    return (
        <>
            <section className="create-product-info my-2">
                <div className="container">
                    <h3 className="text-success">Create Product</h3>
                    <p className="fst-italic">Sunt et occaecat adipisicing duis. Proident tempor reprehenderit mollit et culpa aute. Laboris officia velit enim quis do occaecat. Ex Lorem velit id fugiat commodo non do qui esse nisi. Ullamco ea ullamco ea enim dolor. Sunt ex amet dolore incididunt do laboris cillum esse culpa anim dolor.</p>
                </div>
            </section>
            <section className="create-product">
                {
                    loading ? <Spinner /> : (
                        <div className="container">
                            <div className="row">
                                <div className="col-md-4">
                                    <form onSubmit={handleCreateProduct}>
                                        <div className="mb-2">
                                            <input type="text" name="title" className="form-control form-control-sm" placeholder="Title"
                                                onInput={handleInput}
                                                value={title}
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <input type="number" min={100000} name="price" className="form-control form-control-sm" placeholder="Price"
                                                onInput={handleInput}
                                                value={price}
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <input type="url" name="image" className="form-control form-control-sm" placeholder="Image URL"
                                                onInput={handleInput}
                                                value={image}
                                            />
                                        </div>
                                        <div className="mb-2 d-flex">
                                            {
                                                sizes.map((size) => (
                                                    <div className="form-check mb-2 me-2">
                                                        <input key={size.id} className="form-check-input" type="checkbox" value={size.name}
                                                            onChange={() => handleSelectSize(size.name)}
                                                        />
                                                        <label className="form-check-label">{size.name}</label>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        <div className="form-floating mb-2">
                                            <textarea className="form-control" name="description" placeholder="Leave a comment here"
                                                id="description" style={{ height: '100px' }} defaultValue={""} required
                                                onInput={handleInput}
                                                value={description}
                                            />
                                            <label htmlFor="description">Description</label>
                                        </div>
                                        <div className="mb-2">
                                            <select value={categoryId} name="categoryId" className="form-control form-control-sm" onChange={handleInput} >
                                                {
                                                    categories.map((cat) => (
                                                        <option key={cat.id} value={cat.id}>{cat.categoryName}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className="mb-2">
                                            <button type="submit" className="btn btn-success btn-sm me-2">Create</button>
                                            <Link className="btn btn-dark btn-sm" to={"/phone-store-reactjs"}>Back</Link>
                                        </div>
                                    </form>
                                </div>
                                <div className="col-md-3">
                                    <div className="d-flex flex-column align-items-center">
                                        <img role="button" className="photo-lg mb-2" src={image || nophoto} alt=""
                                            onClick={() => document.querySelector('#fileUploadImage').click()}
                                        />
                                        <input type="file" accept="image/*" id="fileUploadImage" className="d-none"
                                            onChange={handleSelecPhoto}
                                        />

                                        {
                                            uploading ? (
                                                <button className="btn btn-secondary btn-sm" type="button" disabled>
                                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                                                    Uploading ...
                                                </button>
                                            ) : (
                                                <button className="btn btn-secondary btn-sm"
                                                    onClick={handleUploadImage}
                                                >Upload</button>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </section>
        </>
    )
}
export default CreateProduct;