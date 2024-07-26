import React from 'react'
import {useParams} from "react-router-dom";
import * as Yup from "yup";

const ProductEdit = () => {
    const {id} = useParams();
    const editSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        price: Yup.number().required("Price is required"),
        date: Yup.date().required("Date is required"),
        category: Yup.string().required("Category is required"),
        quantity: Yup.number().required("Quantity is required")
    })
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
