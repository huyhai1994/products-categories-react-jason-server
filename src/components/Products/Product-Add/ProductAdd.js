import React, {useEffect, useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import {Formik} from 'formik';
import * as Yup from 'yup';
import userService from "../../../services/product.service";
import categoryService from "../../../services/category.service";
import {toast} from "react-toastify";
import {useNavigate} from 'react-router-dom';

const ProductAdd = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        categoryService.getAllCategories().then(response => {
            setCategories(response.data);
        }).catch(error => {
            toast.error('Failed to fetch categories');
        });
    }, []);

    const initialValues = {
        name: '', price: '', category: '', date: '', quantity: ''
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        price: Yup.number().required('Price is required').positive('Price must be positive'),
        category: Yup.string().required('Category is required'),
        date: Yup.date().required('Date is required'),
        quantity: Yup.number().required('Quantity is required').min(1, 'Quantity must be at least 1')
    });

    const handleSubmit = (values, {setSubmitting, resetForm}) => {
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
    };

    return (<div className="container">
        <h4 className="card-title text-center my-5">Add New Product</h4>
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({
                  values, errors, handleChange, handleSubmit, isSubmitting
              }) => (<Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.name}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        name="price"
                        value={values.price}
                        onChange={handleChange}
                        isInvalid={!!errors.price}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.price}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formCategory">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        as="select"
                        name="category"
                        value={values.category}
                        onChange={handleChange}
                        isInvalid={!!errors.category}
                    >
                        <option value="">Select Category</option>
                        {categories.map(category => (<option key={category.id} value={category.name}>
                            {category.name}
                        </option>))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        {errors.category}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formDate">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="date"
                        value={values.date}
                        onChange={handleChange}
                        isInvalid={!!errors.date}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.date}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formQuantity">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                        type="number"
                        name="quantity"
                        value={values.quantity}
                        onChange={handleChange}
                        isInvalid={!!errors.quantity}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.quantity}
                    </Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3" disabled={isSubmitting}>
                    Add Product
                </Button>
            </Form>)}
        </Formik>
    </div>);
};

export default ProductAdd;