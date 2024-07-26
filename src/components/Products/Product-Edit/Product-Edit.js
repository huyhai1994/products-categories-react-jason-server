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
    const getCategoryNameById = (categoryId, categories) => {
        const category = categories.find(cat => cat.id === categoryId);
        return category ? category.name : '';
    };
    const editForm = useFormik({
        initialValues: {
            name: '', price: '', date: '', category: '', quantity: ''
        }, validationSchema: editSchema, onSubmit: (values) => {
            ProductService.updateProduct(id, values).then(response => {

            })

        }
    })
    useEffect(() => {
        CategoryService.getAllCategories().then(response => {
            setCategories(response.data);
        })

        ProductService.getProductById(id)
            .then(response => {
                setProduct(response.data);
                editForm.setValues({
                    name: response.data.name,
                    price: response.data.price,
                    date: response.data.date,
                    category: getCategoryNameById(response.data.categoryId, categories),
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
        <form className='border p-3 rounded-3' onSubmit={editForm.handleSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputName" className="form-label">Name</label>
                <input type="text" name="name" value={editForm.values.name} onChange={editForm.handleChange}
                       className="form-control"
                       id="exampleInputName"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="price" className="form-label">Price</label>
                <input type="number" name="price" value={editForm.values.price} className="form-control"
                       onChange={editForm.handleChange}
                       id="price"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="quantity" className="form-label">Date</label>
                <input type="date" name="date" className="form-control" onChange={editForm.handleChange}
                       value={editForm.values.date} id="quantity"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="quantity" className="form-label">Quantity</label>
                <input type="number" name="quantity" className="form-control" onChange={editForm.handleChange}
                       value={editForm.values.quantity}
                       id="quantity"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="category" className="form-label">Category</label>
                <select name="category" className="form-control" id="category" value={editForm.values.category}
                        onChange={editForm.handleChange}>
                    <option value="">Select Category</option>
                    {categories.map(category => (<option key={category.id} value={category.name}>
                        {category.name}
                    </option>))}
                </select>
            </div>
            <button type="submit" className="btn btn-primary w-100">Submit</button>
        </form>
    </div>)
}
export default ProductEdit
