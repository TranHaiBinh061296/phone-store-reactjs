import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import nophoto from "../../assets/images/nophoto.png";
import ProductService from "../../service/productService";
import CategoryService from "../../service/categoryService";
import Spinner from "../Spinner/Spinner";
import Helper, {} from "../../helper/Helper"

function ProductList() {
    const [state, setState] = useState({
        loading: false,
        products: [],
        categories: [],
        errorMessage: ""
    })

    const [keyword, setKeyword] = useState("")

    useEffect(() => {
        try {
            setState({
                ...state,
                loading: true
            })
            async function getData() {
                let resProducts = await ProductService.getProducts();
                let resCategories = await CategoryService.getCategories();
                setState({
                    ...state,
                    loading: false,
                    products: resProducts.data,
                    categories: resCategories.data
                })
            }
            getData();
        } catch (error) {
            setState({
                ...state,
                errorMessage: error.message
            })
        }
    }, [])

    const getCategoryName = (categoryId) => {
        let category = categories.find((cat) => cat.id === categoryId);
        return category.categoryName
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        setState({
            ...state,
            loading: true
        });
        // if (keyword) {
        //     let resProducts = await ProductService.getProducts();
        //     let result = resProducts.data.filter((pdt) =>  pdt.title.toUpperCase().includes(keyword.toUpperCase()) ||
        //                                                 pdt.sizes.includes(keyword.toUpperCase()));
        //     setState({
        //         ...state,
        //         loading: false,
        //         products: result
        //     })
        // }
        // else{
        //     let resProducts = await ProductService.getProducts();
        //     setState({
        //         ...state,
        //         loading: false,
        //         products: resProducts.data
        //     })
        // }
        let resProducts = await ProductService.getProducts();
        setState({
            ...state,
            loading: false,
            products : keyword ? resProducts.data.filter((pdt) => pdt.title.toUpperCase().includes(keyword.toUpperCase()) || 
            pdt.sizes.includes(keyword.toUpperCase())) : resProducts.data
        })
    }

    const handleRemoveProduct = async (product) => {
        let confirm = window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm ${product.title} ?`);
        if(confirm) {
            setState({
                ...state,
                loading: true
            });
            let resRemove = await ProductService.removeProduct(product.id);
            if(resRemove.data) {
                let resProducts = await ProductService.getProducts();
                setState({
                    ...state,
                    loading: false,
                    products : resProducts.data
                })
            }
        }
    }

    const { loading, products, categories } = state;
    return (
        <>
            <section className="product-info my-2">
                <div className="container">
                    <div className="d-flex align-items-center ">
                        <h3 className="me-2">Phone Store</h3>
                        <Link className="btn btn-primary btn-sm" to={"/fake-store/product/create"}>
                            <i className="fa fa-plus-circle me-2"></i>
                            Create Product
                        </Link>
                    </div>
                    <p className="fst-italic">Hương vị tự nhiên, thơm ngon của Trà Việt với phong cách hiện đại tại Highlands Coffee sẽ giúp bạn gợi mở vị giác của bản thân và tận hưởng một cảm giác thật khoan khoái, tươi mới.</p>
                    <div>
                        <form onClick={handleSearch} className="d-flex w-25 align-items-center">
                            <input type="search" className="form-control me-2"
                            value={keyword}
                            onInput={(e) => setKeyword(e.target.value)}
                            />
                            <button type="submit" className="btn btn-outline-secondary btn-sm">Search</button>
                        </form>
                    </div>
                </div>
            </section>
            <section className="show-products mb-2">
                <div className="container">
                    <div className="row">

                        {
                            loading ? <Spinner/>: (
                                products.map((product) => (
                                    <div key={product.id} className="col-md-3 mb-2">
                                        <div className="card">
                                            <img className="photo-md mx-auto d-block" src={product.image || nophoto} alt="no photo" />
                                            <div className="card-body">
                                                <div className="d-flex align-items-center">
                                                    <h5 className="card-title me-2">{getCategoryName(product.categoryId)}</h5>
                                                    <div className="d-flex align-items-center">
                                                        <Link className="">
                                                            <i className="btn btn-outline-info fa-solid fa-circle-info"></i>
                                                        </Link>
                                                        <Link className="ms-2">
                                                            <i className="btn btn-outline-primary fa-solid fa-pen "></i>
                                                        </Link>
                                                        <span className="ms-2">
                                                            <i role="button" title="remove product" className="btn btn-outline-danger  fa-solid fa-xmark text-danger"
                                                            onClick={() => handleRemoveProduct}
                                                            ></i>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="card-text">
                                                    <div className="d-flex justify-content-between">
                                                        <span>M | XL</span>
                                                        <span className="text-success">{Helper.formatCurrency(product.price)}</span>
                                                    </div>
                                                    <p> {product.title}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))

                            )

                        }


                    </div>
                </div>
            </section>
        </>
    )
}
export default ProductList;