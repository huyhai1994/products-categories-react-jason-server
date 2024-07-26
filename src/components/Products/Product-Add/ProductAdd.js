import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import userService from "../../../services/product.service";
import categoryService from "../../../services/category.service";
import {toast} from "react-toastify";

const ProductAdd = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        price: Yup.number().required('Price is required').positive('Price must be positive'),
        category: Yup.string().required('Category is required'),
        date: Yup.date().required('Date is required'),
        quantity: Yup.number().required('Quantity is required').min(1, 'Quantity must be at least 1')
    });

    useEffect(() => {
        categoryService.getAllCategories().then(response => {
            setCategories(response.data);
        }).catch(error => {
            toast.error('Failed to fetch categories');
        });
    }, []);

    const formik = useFormik({
        initialValues: {
            name: '', price: '', category: '', date: '', quantity: ''
        }, validationSchema: validationSchema, onSubmit: (values, {setSubmitting, resetForm}) => {
            const category = categories.find(cat => cat.name === values.category);
            const productData = {...values, categoryId: category.id};

            userService.createProduct(productData).then(() => {
                toast.success('Product added successfully');
                resetForm();
                navigate('/');
            }).catch(error => {
                toast.error('Failed to add product');
            }).finally(() => {
                setSubmitting(false);
            });
        }
    });

    return (<div className="container">
        <h4 className="card-title text-center my-5">Add New Product</h4>
        <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                    type="text"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    className="form-control"
                    id="name"
                    isInvalid={!!formik.errors.name}
                />
                {formik.errors.name && <div className="invalid-feedback">{formik.errors.name}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="price" className="form-label">Price</label>
                <input
                    type="number"
                    name="price"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    className="form-control"
                    id="price"
                    isInvalid={!!formik.errors.price}
                />
                {formik.errors.price && <div className="invalid-feedback">{formik.errors.price}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="category" className="form-label">Category</label>
                <select
                    name="category"
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    className="form-control"
                    id="category"
                    isInvalid={!!formik.errors.category}
                >
                    <option value="">Select Category</option>
                    {categories.map(category => (<option key={category.id} value={category.name}>
                        {category.name}
                    </option>))}
                </select>
                {formik.errors.category && <div className="invalid-feedback">{formik.errors.category}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="date" className="form-label">Date</label>
                <input
                    type="date"
                    name="date"
                    value={formik.values.date}
                    onChange={formik.handleChange}
                    className="form-control"
                    id="date"
                    isInvalid={!!formik.errors.date}
                />
                {formik.errors.date && <div className="invalid-feedback">{formik.errors.date}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="quantity" className="form-label">Quantity</label>
                <input
                    type="number"
                    name="quantity"
                    value={formik.values.quantity}
                    onChange={formik.handleChange}
                    className="form-control"
                    id="quantity"
                    isInvalid={!!formik.errors.quantity}
                />
                {formik.errors.quantity && <div className="invalid-feedback">{formik.errors.quantity}</div>}
            </div>
            <button type="submit" className="btn btn-primary w-100" disabled={formik.isSubmitting}>
                Add Product
            </button>
        </form>
    </div>);
};

export default ProductAdd;