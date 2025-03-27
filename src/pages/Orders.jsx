import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Orders = () => {
    const { products, currency, addToCart, navigate } = useContext(ShopContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Load orders from localStorage on component mount
        const savedOrders = localStorage.getItem('orders');
        if (savedOrders) {
            setOrders(JSON.parse(savedOrders));
        } else {
            // Initial sample orders using actual product IDs
            const simulatedOrders = [
                { 
                    id: '12345',
                    productId: products[0]?._id, // Use actual product ID
                    status: 'In Transit', 
                    estimatedDelivery: '2024-04-15',
                    delivered: false,
                    size: 'L',
                    quantity: 1
                },
                { 
                    id: '67890',
                    productId: products[1]?._id, // Use actual product ID
                    status: 'Delivered', 
                    deliveryDate: '2024-03-10',
                    delivered: true,
                    size: 'M',
                    quantity: 2
                }
            ];
            setOrders(simulatedOrders);
            localStorage.setItem('orders', JSON.stringify(simulatedOrders));
        }
    }, [products]); // Add products as dependency

    const handleReorder = (index) => {
        const order = orders[index];
        if (!order) {
            toast.error('Order not found!');
            return;
        }

        const product = products.find(p => p._id === order.productId);
        if (!product) {
            toast.error('Product not found!');
            return;
        }

        try {
            // Add to cart with the same size
            addToCart(order.productId, order.size);
            // Add additional quantities if more than 1
            for(let i = 1; i < order.quantity; i++) {
                addToCart(order.productId, order.size);
            }
            toast.success('Item added to cart!');
            navigate('/cart');
        } catch (error) {
            console.error('Reorder error:', error);
            toast.error('Failed to add item to cart');
        }
    };

    return (
        <div className='border-t pt-16'>
            <div className='text-2xl'>
                <Title text1={'MY'} text2={'ORDERS'} />
            </div>

            <div>
                {orders.map((order, index) => {
                    const product = products.find(p => p._id === order.productId);
                    
                    return (
                        <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                            <div className='flex items-start gap-6 text-sm'>
                                <img 
                                    className='w-16 sm:w-20' 
                                    src={product?.image[0]} 
                                    alt={product?.name || 'Product image'} 
                                />
                                <div>
                                    <p className='sm:text-base font-medium'>
                                        {product?.name}
                                    </p>
                                    <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                                        <p className='text-lg'>
                                            {currency}{product?.price}
                                        </p>
                                        <p>Quantity: {order.quantity}</p>
                                        <p>Size: {order.size}</p>
                                    </div>
                                    <p className='mt-2'>
                                        {order.delivered ? 
                                            `Delivered on: ${order.deliveryDate}` : 
                                            `Expected: ${order.estimatedDelivery}`
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className='md:w-1/2 flex justify-between'>
                                <div className='flex items-center gap-2'>
                                    <span className={`px-2 py-1 rounded-full text-sm ${
                                        order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                        'bg-blue-100 text-blue-800'
                                    }`}>
                                        {order.status}
                                    </span>
                                </div>
                                <div className='flex gap-2'>
                                    {!order.delivered && (
                                        <Link to={`/track/${order.id}`}>
                                            <button className='border px-4 py-2 text-sm font-medium rounded-sm hover:bg-gray-100'>
                                                Track Order
                                            </button>
                                        </Link>
                                    )}
                                    {order.delivered && (
                                        <button 
                                            onClick={() => handleReorder(index)}
                                            className='border px-4 py-2 text-sm font-medium rounded-sm bg-blue-500 text-white hover:bg-blue-600'
                                        >
                                            Reorder
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Orders;
