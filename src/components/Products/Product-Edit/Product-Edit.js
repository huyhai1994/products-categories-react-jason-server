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
    </div>)
}
export default ProductEdit
