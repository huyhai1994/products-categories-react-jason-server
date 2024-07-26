import React, {useEffect} from 'react'
import {useParams} from "react-router-dom";
import * as Yup from "yup";
import {useFormik} from "formik";
import ProductService from "../../../services/product.service";
import CategoryService from "../../../services/category.service";

const ProductEdit = () => {
    const {id} = useParams();
    const [product, setProduct] = React.useState(null);
    const [categories, setCategories] = React.useState([]);

    const editSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        price: Yup.number().required("Price is required"),
        date: Yup.date().required("Date is required"),
        category: Yup.string().required("Category is required"),
        quantity: Yup.number().required("Quantity is required")
    })
    const editForm = useFormik({
        initialValues: {
            name: '', price: '', date: '', category: '', quantity: ''
        }, validationSchema: editSchema, onSubmit: (values) => {
            // Submit form data
            console.log(values)
        }
    })
    useEffect(() => {
        CategoryService.getAllCategories().then(response => {
            setCategories(response.data);
            console.log("this is at useEffect  category" + response.data[0].name);
        })

        ProductService.getProductById(id)
            .then(response => {
                setProduct(response.data.name);
                console.log("this is at useEffect  product-edit" + response.data.category);
                editForm.setValues({
                    name: response.data.name,
                    price: response.data.price,
                    date: response.data.date,
                    category: response.data.category,
                    quantity: response.data.quantity
                });
            })
            .catch(error => {
                console.error('Error fetching product: ', error);
            });
    }, [id])
    return (<div className='container'>
        id: {id}
        <h1 className='text-center'>Edit user</h1>
        <form className='border p-3 rounded-3'>
            <div className="mb-3">
                <label htmlFor="exampleInputName" className="form-label">Name</label>
                <input type="text" name="name" className="form-control"
                       id="exampleInputName"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="price" className="form-label">Price</label>
                <input type="number" name="price" className="form-control"
                       id="price"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="quantity" className="form-label">Date</label>
                <input type="date" name="date" className="form-control" id="quantity"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="quantity" className="form-label">Quantity</label>
                <input type="number" name="quantity" className="form-control" id="quantity"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="category" className="form-label">Category</label>
                <select name="category" className="form-control" id="category">
                    <option value="">Select Category</option>
                    {/* Add options here */}
                </select>
            </div>
            <button type="submit" className="btn btn-primary w-100">Submit</button>
        </form>
    </div>)
}
export default ProductEdit
