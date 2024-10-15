import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './itemupdate.css';

function UpdateItem() {
    const { id } = useParams();
    const [updateOrder, setUpdateOrder] = useState({
        productId: "",
        productsName: "",
        productType: "",
        price: "",
        quentity: 1, // Initial quantity set to 1
    });

    // Fetch product data on component mount
    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await fetch(`http://localhost:8020/item_order/${id}`);
                const data = await response.json();
                console.log(data);

                if (data.success) {
                    setUpdateOrder(data.data);
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };

        fetchProductData();
    }, [id]);

    // Handle input changes
    const handleInputChange = (e) => {
        setUpdateOrder({
            ...updateOrder,
            [e.target.name]: e.target.value,
        });
    };

    // Handle quantity increment and decrement
    const handleQuantityChange = (action) => {
        setUpdateOrder((prevOrder) => {
            const newQuantity = action === 'increment' ? prevOrder.quentity + 1 : prevOrder.quentity - 1;
            if (newQuantity < 1) return prevOrder; // Prevent quantity from going below 1
            return {
                ...prevOrder,
                quentity: newQuantity,
            };
        });
    };

    // Handle form submission for updating the product
    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:8020/item_update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: updateOrder._id,
                    ...updateOrder,
                }),
            });

            const data = await response.json();

            if (data.success) {
                alert("Item updated successfully!");
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <div className='item-update'>
            <h2>Product Update Form</h2>

            <label>Product Id:</label>
            <input
                type="text"
                id="productId"
                name="productId"
                onChange={handleInputChange}
                value={updateOrder?.productId}
            />
            <br />

            <label>Product Name:</label>
            <input
                type="text"
                id="productsName"
                name="productsName"
                onChange={handleInputChange}
                value={updateOrder?.productsName}
            />
            <br />

            <label>Product Type:</label>
            <input
                type="text"
                id="productType"
                name="productType"
                onChange={handleInputChange}
                value={updateOrder?.productType}
            />
            <br />

            <label>Price:</label>
            <input
                type="text"
                id="price"
                name="price"
                onChange={handleInputChange}
                value={updateOrder?.price}
            />
            <br />

            <label>Quantity:</label>
            <div className="quantity-controls">
                <button
                    type="button"
                    className="quantity-btn"
                    onClick={() => handleQuantityChange('decrement')}
                    disabled={updateOrder.quentity <= 1}
                >
                    -
                </button>
                <input
                    type="text"
                    id="quentity"
                    name="quentity"
                    value={updateOrder?.quentity}
                    onChange={handleInputChange}
                    readOnly
                />
                <button
                    type="button"
                    className="quantity-btn"
                    onClick={() => handleQuantityChange('increment')}
                >
                    +
                </button>
            </div>
            <br />

            <button onClick={handleUpdate}>Update Product</button>
        </div>
    );
}

export default UpdateItem;
