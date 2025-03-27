import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { toast } from 'react-toastify';
import { FaBox, FaTruck, FaCalendarAlt } from 'react-icons/fa';

const OrderConfirmation = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const { products, currency } = useContext(ShopContext);
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        const order = orders.find(o => o.id === orderId);
        if (order) {
            const product = products.find(p => p._id === order.productId);
            setOrderDetails({ ...order, product });
        }
    }, [orderId, products]);

    const handleCancelOrder = () => {
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        const updatedOrders = orders.map(order => {
            if (order.id === orderId) {
                return { ...order, status: 'Cancelled' };
            }
            return order;
        });
        localStorage.setItem('orders', JSON.stringify(updatedOrders));
        toast.success('Order cancelled successfully');
        navigate('/orders');
    };

    if (!orderDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="py-8">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-green-600 mb-2">Thank You for Your Order!</h1>
                    <p className="text-gray-600">Your order has been placed successfully</p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">Order #{orderDetails.id}</h2>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                            orderDetails.status === 'Order Placed' ? 'bg-green-100 text-green-800' : 
                            orderDetails.status === 'Cancelled' ? 'bg-red-100 text-red-800' : 
                            'bg-blue-100 text-blue-800'
                        }`}>
                            {orderDetails.status}
                        </span>
                    </div>

                    <div className="border-t border-b py-4 my-4">
                        <div className="flex items-center gap-4 mb-4">
                            <img 
                                src={orderDetails.product.image[0]} 
                                alt={orderDetails.product.name}
                                className="w-24 h-24 object-cover rounded"
                            />
                            <div>
                                <h3 className="font-semibold">{orderDetails.product.name}</h3>
                                <p className="text-gray-600">Size: {orderDetails.size}</p>
                                <p className="text-gray-600">Quantity: {orderDetails.quantity}</p>
                                <p className="font-medium">{currency}{orderDetails.product.price * orderDetails.quantity}</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-gray-600">
                            <FaBox />
                            <span>Payment Method: {orderDetails.paymentMethod.toUpperCase()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <FaTruck />
                            <span>Expected Delivery: {orderDetails.estimatedDelivery}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <FaCalendarAlt />
                            <span>Order Date: {orderDetails.orderDate}</span>
                        </div>
                    </div>

                    <div className="flex gap-4 mt-6">
                        <button
                            onClick={() => navigate(`/track/${orderDetails.id}`)}
                            className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
                        >
                            Track Order
                        </button>
                        {orderDetails.status !== 'Cancelled' && (
                            <button
                                onClick={handleCancelOrder}
                                className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-colors"
                            >
                                Cancel Order
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation; 