import React, {useEffect, useState} from 'react';
import {Table} from 'react-bootstrap';
import userService from "../../../services/user.service";


const ProductList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        userService.getAllProducts().then(response => {
            setUsers(response.data);
        })
    })

    return (<div className="container">
        <h4 className="card-title text-center my-5 ">Product List</h4>
        <Table striped bordered hover>
            <thead>
            <tr>
                <th className="text-center" style={{fontWeight: 'bold'}}>#</th>
                <th className="text-center" style={{fontWeight: 'bold'}}>Name</th>
                <th className="text-center" style={{fontWeight: 'bold'}}>Price</th>
                <th className="text-center" style={{fontWeight: 'bold'}}>Category</th>
                <th className="text-center" style={{fontWeight: 'bold'}}>Date</th>
                <th className="text-center" style={{fontWeight: 'bold'}}>Quantity</th>
                <th className="text-center" style={{fontWeight: 'bold'}}>Action</th>
            </tr>
            </thead>
            <tbody>
            <tr className="table-row">
                <td className="text-center"> 1</td>
                <td className="text-center">Product 1</td>
                <td className="text-center">99$</td>
                <td className="text-center">Category1</td>
                <td className="text-center"> 22/07/2024</td>
                <td className="text-center"> 13</td>
                <td className="text-center"> Delete | Edit</td>
            </tr>
            </tbody>
        </Table>
    </div>)
};

export default ProductList;