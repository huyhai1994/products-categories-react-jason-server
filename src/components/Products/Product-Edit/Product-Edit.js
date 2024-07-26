import React, {useEffect, useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import {Formik} from 'formik';
import * as Yup from 'yup';
import userService from "../../../services/product.service";
import categoryService from "../../../services/category.service";
import {toast} from "react-toastify";
import {useNavigate, useParams} from 'react-router-dom';

const ProductEdit = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [categories, setCategories] = useState([]);
    const [initialValues, setInitialValues] = useState({
        name: '', price: '', category: '', date: '', quantity: ''
    });

    useEffect(() => {
        categoryService.getAllCategories().then(response => {
            setCategories(response.data);
        }).catch(error => {
            toast.error('Failed to fetch categories');
        });

        userService.getProductById(id).then(response => {
            const product = response.data;
            console.log(product);
            setInitialValues({
                name: product.name,
                price: product.price,
                category: product.category.name,
                date: product.date,
                quantity: product.quantity
            });
        }).catch(error => {
            toast.error('Failed to fetch product details');
        });
    }, [id]);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        price: Yup.number().required('Price is required').positive('Price must be positive'),
        category: Yup.string().required('Category is required'),
        date: Yup.date().required('Date is required'),
        quantity: Yup.number().required('Quantity is required').min(1, 'Quantity must be at least 1')
    });

    const handleSubmit = (values, {setSubmitting}) => {
        const category = categories.find(cat => cat.name === values.category);
        const productData = {...values, category: category.id};

        userService.updateProduct(id, productData).then(() => {
            toast.success('Product updated successfully');
            navigate('/');
        }).catch(error => {
            toast.error('Failed to update product');
        }).finally(() => {
            setSubmitting(false);
        });
    };

    return (<div className="container">
        <h4 className="card-title text-center my-5">Edit Product</h4>
        <Formik
            initialValues={initialValues}
            enableReinitialize
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
                    Update Product
                </Button>
            </Form>)}
        </Formik>
    </div>);
};

export default ProductEdit;