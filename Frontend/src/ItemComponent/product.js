import { useState } from "react";
import axios from "axios";
import './additem.css';
import { useNavigate } from 'react-router-dom';

function Product() {
    const navigate = useNavigate();
    const [order, setOrder] = useState({
        productId: "",
        productsName: "",
        productType: "",
        price: "",
        quentity: 1,
    });

    const [errors, setErrors] = useState({});

    const handleOnChange = (e) => {
        const { value, name } = e.target;
        setOrder((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleQuantityChange = (action) => {
        setOrder((prevOrder) => {
            let newQuantity = action === 'increment' ? prevOrder.quentity + 1 : prevOrder.quentity - 1;
            if (newQuantity < 1) newQuantity = 1; // Prevent quantity from going below 1
            return {
                ...prevOrder,
                quentity: newQuantity
            };
        });
    };

    const handleQuantityInputChange = (e) => {
        let newQuantity = parseInt(e.target.value);
        if (isNaN(newQuantity) || newQuantity < 1) {
            newQuantity = 1; // Reset to 1 if invalid input or less than 1
        }
        setOrder((prevOrder) => ({
            ...prevOrder,
            quentity: newQuantity
        }));
    };

    const validate = () => {
        const newErrors = {};

        if (!order.productId.trim()) {
            newErrors.productId = "Product ID is required.";
        } else if (order.productId.length !== 5) {
            newErrors.productId = "Product ID must be at least 5 characters long.";
        }

        if (!order.productsName.trim()) {
            newErrors.productsName = "Product Name is required.";
        }

        if (!order.productType.trim()) {
            newErrors.productType = "Product Type is required.";
        }

        if (!order.price) {
            newErrors.price = "Price is required.";
        } else if (isNaN(order.price)) {
            newErrors.price = "Price must be a number.";
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await axios.post("http://localhost:8020/item_create", order);
            console.log(response.data);
            alert("Product added successfully!");
            navigate("/itemdetails");
            setOrder({
                productId: "",
                productsName: "",
                productType: "",
                price: "",
                quentity: 1,
            });
            setErrors({});
        } catch (error) {
            console.error("There was an error adding the item:", error);
        }
    };

    return (
        <div className="add-product">
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit}>
                <label>Product ID:</label>
                <input
                    type="text"
                    id="productId"
                    name="productId"
                    value={order.productId}
                    onChange={handleOnChange}
                />
                {errors.productId && <span className="error">{errors.productId}</span>}
                <br />

                <label>Product Name:</label>
                <input
                    type="text"
                    id="productsName"
                    name="productsName"
                    value={order.productsName}
                    onChange={handleOnChange}
                />
                {errors.productsName && <span className="error">{errors.productsName}</span>}
                <br />

                <label>Product Type:</label>
                <select
                    id="productType"
                    name="productType"
                    value={order.productType}
                    onChange={handleOnChange}
                >
                    <option value="">Select a Product Type</option>
                    <option value="Cake">Cake</option>
                    <option value="Biscuit">Biscuit</option>
                    <option value="Snack">Snack</option>
                    <option value="Beverage">Beverage</option>
                </select>
                {errors.productType && <span className="error">{errors.productType}</span>}
                <br />

                <label>Price:</label>
                <input
                    type="text"
                    id="price"
                    name="price"
                    value={order.price}
                    onChange={handleOnChange}
                />
                {errors.price && <span className="error">{errors.price}</span>}
                <br />

                <label>Quantity:</label>
                <div className="quantity-controls">
                    <button
                        type="button"
                        className="quantity-btn"
                        onClick={() => handleQuantityChange('decrement')}
                        disabled={order.quentity <= 1}
                    >-</button>
                    <input
                        type="text"
                        id="quentity"
                        name="quentity"
                        value={order.quentity}
                        onChange={handleQuantityInputChange}
                    />
                    <button
                        type="button"
                        className="quantity-btn"
                        onClick={() => handleQuantityChange('increment')}
                    >+</button>
                </div>
                {errors.quentity && <span className="error">{errors.quentity}</span>}
                <br />

                <button type="submit">Add Product</button>
            </form>
        </div>
    );
}

export default Product;
