import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import { FaWallet, FaBitcoin, FaEthereum, FaCreditCard } from 'react-icons/fa'

const PlaceOrder = () => {
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const { navigate, cartItems, products, clearCart, verifyCard, cardVerifying } = useContext(ShopContext);
    const [cardDetails, setCardDetails] = useState({
        number: '',
        expiry: '',
        cvv: '',
        name: ''
    });

    const handlePlaceOrder = async () => {
        // If card payment selected, verify first
        if (paymentMethod === 'card') {
            if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv || !cardDetails.name) {
                toast.error('Please fill in all card details');
                return;
            }

            const verified = await verifyCard(cardDetails);
            if (!verified) {
                return;
            }
        }

        // Get existing orders
        const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        
        // Create new orders from cart items
        const newOrders = Object.entries(cartItems).map(([productId, sizes]) => {
            return Object.entries(sizes).map(([size, quantity]) => ({
                id: Math.random().toString(36).substr(2, 9),
                productId: productId,
                status: 'Order Placed',
                estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                delivered: false,
                size: size,
                quantity: quantity,
                orderDate: new Date().toISOString().split('T')[0],
                paymentMethod: paymentMethod,
                last4: paymentMethod === 'card' ? cardDetails.number.slice(-4) : null
            }));
        }).flat();

        // Combine existing and new orders
        const updatedOrders = [...existingOrders, ...newOrders];
        
        // Save to localStorage
        localStorage.setItem('orders', JSON.stringify(updatedOrders));

        // Clear cart
        clearCart();

        // Navigate to order confirmation page with the first order ID
        navigate(`/order-confirmation/${newOrders[0].id}`);
    };

    return (
        <div className='py-5'>
            <Title text1={'PLACE'} text2={'ORDER'} />
            
            <div className='flex flex-col md:flex-row gap-8 mt-8'>
                <div className='flex-1'>
                    <h2 className='text-xl font-semibold mb-4'>Payment Method</h2>
                    
                    <div className='space-y-4'>
                        {/* Cash on Delivery Option */}
                        <div 
                            className={`p-4 border rounded-lg cursor-pointer ${paymentMethod === 'cod' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                            onClick={() => setPaymentMethod('cod')}
                        >
                            <div className='flex items-center gap-2'>
                                <input 
                                    type="radio" 
                                    checked={paymentMethod === 'cod'} 
                                    onChange={() => setPaymentMethod('cod')}
                                />
                                <span>Cash on Delivery</span>
                            </div>
                        </div>

                        {/* Wallet Option */}
                        <div 
                            className={`p-4 border rounded-lg cursor-pointer ${paymentMethod === 'wallet' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                            onClick={() => setPaymentMethod('wallet')}
                        >
                            <div className='flex items-center gap-2'>
                                <input 
                                    type="radio" 
                                    checked={paymentMethod === 'wallet'} 
                                    onChange={() => setPaymentMethod('wallet')}
                                />
                                <FaWallet className="text-blue-500" />
                                <span>Pay with Wallet</span>
                            </div>
                        </div>

                        {/* Crypto Options */}
                        <div 
                            className={`p-4 border rounded-lg cursor-pointer ${paymentMethod === 'bitcoin' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                            onClick={() => setPaymentMethod('bitcoin')}
                        >
                            <div className='flex items-center gap-2'>
                                <input 
                                    type="radio" 
                                    checked={paymentMethod === 'bitcoin'} 
                                    onChange={() => setPaymentMethod('bitcoin')}
                                />
                                <FaBitcoin className="text-orange-500" />
                                <span>Pay with Bitcoin</span>
                            </div>
                        </div>

                        <div 
                            className={`p-4 border rounded-lg cursor-pointer ${paymentMethod === 'ethereum' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                            onClick={() => setPaymentMethod('ethereum')}
                        >
                            <div className='flex items-center gap-2'>
                                <input 
                                    type="radio" 
                                    checked={paymentMethod === 'ethereum'} 
                                    onChange={() => setPaymentMethod('ethereum')}
                                />
                                <FaEthereum className="text-blue-500" />
                                <span>Pay with Ethereum</span>
                            </div>
                        </div>

                        {/* New Card Payment Option */}
                        <div 
                            className={`p-4 border rounded-lg cursor-pointer ${paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                            onClick={() => setPaymentMethod('card')}
                        >
                            <div className='flex items-center gap-2'>
                                <input 
                                    type="radio" 
                                    checked={paymentMethod === 'card'} 
                                    onChange={() => setPaymentMethod('card')}
                                />
                                <FaCreditCard className="text-blue-500" />
                                <span>Pay with Card</span>
                            </div>

                            {/* Card Details Form */}
                            {paymentMethod === 'card' && (
                                <div className='mt-4 space-y-3'>
                                    <div>
                                        <label className="block text-sm text-gray-600">Card Number</label>
                                        <input
                                            type="text"
                                            maxLength="16"
                                            className="mt-1 w-full px-3 py-2 border rounded-md"
                                            placeholder="1234 5678 9012 3456"
                                            value={cardDetails.number}
                                            onChange={(e) => setCardDetails({...cardDetails, number: e.target.value.replace(/\D/g, '')})}
                                        />
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <label className="block text-sm text-gray-600">Expiry Date</label>
                                            <input
                                                type="text"
                                                maxLength="5"
                                                className="mt-1 w-full px-3 py-2 border rounded-md"
                                                placeholder="MM/YY"
                                                value={cardDetails.expiry}
                                                onChange={(e) => {
                                                    let value = e.target.value.replace(/\D/g, '');
                                                    if (value.length >= 2) {
                                                        value = value.slice(0, 2) + '/' + value.slice(2);
                                                    }
                                                    setCardDetails({...cardDetails, expiry: value});
                                                }}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label className="block text-sm text-gray-600">CVV</label>
                                            <input
                                                type="text"
                                                maxLength="3"
                                                className="mt-1 w-full px-3 py-2 border rounded-md"
                                                placeholder="123"
                                                value={cardDetails.cvv}
                                                onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value.replace(/\D/g, '')})}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-600">Card Holder Name</label>
                                        <input
                                            type="text"
                                            className="mt-1 w-full px-3 py-2 border rounded-md"
                                            placeholder="John Doe"
                                            value={cardDetails.name}
                                            onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className='flex-1'>
                    <CartTotal />
                    <button 
                        onClick={handlePlaceOrder}
                        disabled={cardVerifying}
                        className='w-full bg-black text-white py-3 rounded-lg mt-4 hover:bg-gray-800 transition-colors disabled:bg-gray-400'
                    >
                        {cardVerifying ? 'Verifying...' : 'Place Order'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PlaceOrder
