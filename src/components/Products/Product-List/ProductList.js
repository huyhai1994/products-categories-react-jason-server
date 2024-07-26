import React, {useEffect, useState} from 'react';
import {Button, Table} from 'react-bootstrap';
import userService from "../../../services/product.service";
import {toast} from "react-toastify";
import {useNavigate} from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        userService.getAllProducts().then(response => {
            setProducts(response.data);
        });
    }, []);

    const handleDelete = (productId) => {
        userService.deleteProduct(productId).then(() => {
            toast.success('Product deleted successfully');
            setProducts(products.filter(product => product.id !== productId));
        }).catch(error => {
            toast.error('Failed to delete product');
        });
    }

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
            {products.map((product, index) => (<tr className="table-row" key={product.id}>
                <td className="text-center" style={{fontWeight: 'bold'}}>{index + 1}</td>
                <td className="text-center">{product.name}</td>
                <td className="text-center">{product.price}</td>
                <td className="text-center">{product.category.name}</td>
                <td className="text-center">{product.date}</td>
                <td className="text-center">{product.quantity}</td>
                <td className="text-center">
                    <Button className='btn btn-danger' onClick={() => handleDelete(product.id)}>Delete</Button>
                    <Button className='btn btn-primary'
                            onClick={() => navigate('/product-edit/' + product.id)}>Edit</Button>
                </td>
            </tr>))}
            </tbody>
        </Table>
    </div>);
};

export default ProductList;