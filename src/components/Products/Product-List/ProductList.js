import React, {useEffect, useState} from 'react';
import {Button, Pagination, Table} from 'react-bootstrap';
import userService from "../../../services/product.service";
import {toast} from "react-toastify";
import {useNavigate} from 'react-router-dom';
import './ProductList.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPen, faTrash} from '@fortawesome/free-solid-svg-icons';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(10);
    const navigate = useNavigate();

    useEffect(() => {
        userService.getAllProducts().then(response => {
            setProducts(response.data);
        });
    }, []);

    const handleDelete = (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            userService.deleteProduct(productId).then(() => {
                toast.success('Product deleted successfully');
                setProducts(products.filter(product => product.id !== productId));
            }).catch(error => {
                toast.error('Failed to delete product');
            });
        }
    }

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (<div className="container">
        <h4 className="card-title text-center my-5">Product List</h4>
        <div className='table-responsive'>
            <Button className='btn btn-primary float-end' onClick={() => navigate('/product-add')}>Add Product</Button>
            <Table dark striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Quantity</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {currentProducts.map((product, index) => (<tr key={product.id}>
                    <td className="number">{indexOfFirstProduct + index + 1}</td>
                    <td>{product.name}</td>
                    <td className="number">{product.price}</td>
                    <td>{product.category.name}</td>
                    <td>{product.date}</td>
                    <td className="number">{product.quantity}</td>
                    <td className="__action-button-center">
                        <Button className='btn btn-danger' onClick={() => handleDelete(product.id)}>
                            <FontAwesomeIcon icon={faTrash}/>
                        </Button>
                        <Button className='btn btn-primary' onClick={() => navigate('/product-edit/' + product.id)}>
                            <FontAwesomeIcon icon={faPen}/>
                        </Button>
                    </td>
                </tr>))}
                </tbody>
            </Table>
            <Pagination className="d-flex justify-content-center ">
                {Array.from({length: Math.ceil(products.length / productsPerPage)}, (_, index) => (
                    <Pagination.Item key={index + 1} active={index + 1 === currentPage}
                                     onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </Pagination.Item>))}
            </Pagination>
        </div>
    </div>);
};

export default ProductList;