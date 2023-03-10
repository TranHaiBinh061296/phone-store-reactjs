import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import nophoto from "../../assets/images/nophoto.png";
import ProductService from "../../service/productService";
import CategoryService from "../../service/categoryService";
import Spinner from "../Spinner/Spinner";
import Helper, { } from "../../helper/Helper"
import { toast } from "react-toastify";
import FileHelper from "../../helper/FileHelper";

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
        return category ? category.categoryName : ""
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
            products: keyword ? resProducts.data.filter((pdt) => pdt.title.toUpperCase().includes(keyword.toUpperCase()) ||
                pdt.sizes.includes(keyword.toUpperCase())) : resProducts.data
        })
    }

    const handleRemoveProduct = (product) => {
        // let confirm = window.confirm(`B???n c?? ch???c ch???n mu???n x??a s???n ph???m ${product.title} ?`);
        // if(confirm) {
        //     setState({
        //         ...state,
        //         loading: true
        //     });
        //     let resRemove = await ProductService.removeProduct(product.id);
        //     if(resRemove.data) {
        //         let resProducts = await ProductService.getProducts();
        //         setState({
        //             ...state,
        //             loading: false,
        //             products : resProducts.data
        //         })
        //         toast.success(`${product.title} ???? ???????c x??a kh???i danh s??ch`, {position : 'top-right'} )
        //     }
        //     else {
        //         toast.info('???? x???y ra s??? c???, vui l??ng li??n h??? v???i qu???n tr??? vi??n !')
        //     }
        // }
        Swal.fire({
            title: `B???n c?? ch???c ch???n mu???n x??a s???n ph???m ${product.title}?`,
            text: "B???n s??? kh??ng th??? ho??n nguy??n ??i???u n??y!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'C??, t??i mu???n x??a !'
        }).then(async (result) => {
            if (result.isConfirmed) {
                setState({ ...state, loading: true });

                 // destroy photo
                 let fileName = Helper.getFileName(product.image);
                 console.log(fileName);
                 let resDestroy = await FileHelper.destroyImage(fileName);

                let resRemove = await ProductService.removeProduct(product.id);
                if (resRemove.data) {
                    let resProducts = await ProductService.getProducts();
                    setState({
                        ...state,
                        loading: false,
                        products: resProducts.data
                    })
                }
                toast.success(`${product.title} ???? ???????c x??a kh???i danh s??ch`, {position : 'top-right'} )
            }
        })
    }

    const { loading, products, categories } = state;
    return (
        <>
            <section className="product-info my-2">
                <div className="container">
                    <div className="d-flex align-items-center ">
                        <h3 className="me-2">Phone Store</h3>
                        <Link className="btn btn-primary btn-sm" to={"/phone-store-reactjs/product/create"}>
                            <i className="fa fa-plus-circle me-2"></i>
                            Create Product
                        </Link>
                    </div>
                    <p className="fst-italic">H????ng v??? t??? nhi??n, th??m ngon c???a Tr?? Vi???t v???i phong c??ch hi???n ?????i t???i Highlands Coffee s??? gi??p b???n g???i m??? v??? gi??c c???a b???n th??n v?? t???n h?????ng m???t c???m gi??c th???t khoan kho??i, t????i m???i.</p>
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
                    <div className="card-deck row">

                        {
                            loading ? <Spinner /> : (
                                products.map((product) => (
                                    <div key={product.id} className="col-md-3 mb-2">
                                        <div className="card">
                                            <img className="photo-md mx-auto d-block" src={product.image || nophoto} alt="no photo" />
                                            <div className="card-body">
                                                <div className="d-flex align-items-center">
                                                    <h5 className="card-title me-2">{getCategoryName(product.categoryId)}</h5>
                                                    <div className="d-flex align-items-center">
                                                        <Link className="me-2">
                                                            <i className=" btn-outline fa-solid fa-circle-info"></i>
                                                        </Link>
                                                        <Link className="">
                                                            <i className=" btn-outline fa-solid fa-pen "></i>
                                                        </Link>
                                                        <span className="ms-2">
                                                            <i role="button" title="remove product" className="btn-outline fa-solid fa-trash"
                                                                onClick={() => handleRemoveProduct(product)}
                                                            ></i>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="card-text">
                                                    <div className="d-flex justify-content-between">
                                                        <span>{product.sizes ? product.sizes.join(" | ") : "" }</span>
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