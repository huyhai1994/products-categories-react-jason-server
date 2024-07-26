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
    return (<div>
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
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" name="email" className="form-control"
                       id="exampleInputEmail1"
                       placeholder="name@example.com"/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" name="password" className="form-control" id="exampleInputPassword1"
                />
            </div>
            <button type="submit" className="btn btn-primary w-100">Submit</button>
        </form>
    </div>)
}
export default ProductEdit
