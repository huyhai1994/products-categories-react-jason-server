import React, {useEffect, useState} from 'react';
import {Table} from 'react-bootstrap';
import userService from "../../../services/user.service";

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        userService.getAllProducts().then(response => {
            setProducts(response.data);
        });
    }, []); // Added dependency array to useEffect to avoid infinite loop

    return (<div className="container">
        <h4 className="card-title text-center my-5">Product List</h4>
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
            {products.map((product, index) => (
                <tr className={`table-row ${product.active ? "" : "inactive-row"}`} key={product.id}>
                    <td className="text-center" style={{fontWeight: 'bold'}}>{index + 1}</td>
                    <td className="text-center">{product.name}</td>
                    <td className="text-center">{product.price}</td>
                    <td className="text-center">{product.category.name}</td>
                    <td className="text-center">{product.date}</td>
                    <td className="text-center">{product.quantity}</td>
                    <td className="text-center">Delete | Edit</td>
                </tr>))}
            </tbody>
        </Table>
    </div>);
};

export default ProductList;