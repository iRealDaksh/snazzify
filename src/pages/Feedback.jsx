import React, { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import Title from '../components/Title';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../config/firebase';

const Feedback = () => {
    const { isLoggedIn, user, navigate } = useContext(ShopContext);
    const [feedback, setFeedback] = useState({
        name: '',
        email: '',
        type: 'general',
        message: '',
        rating: 5
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            // Show success toast immediately
            toast.success('Thank you for your feedback!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                style: {
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    fontSize: '16px',
                    textAlign: 'center',
                    borderRadius: '10px',
                    padding: '20px'
                }
            });

            // Reset form
            setFeedback({
                name: '',
                email: '',
                type: 'general',
                message: '',
                rating: 5
            });

            // Navigate after 2 seconds
            setTimeout(() => {
                navigate('/');
            }, 2000);

        } catch (error) {
            toast.error('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="py-8">
            <div className="text-center mb-8">
                <Title text1="YOUR" text2="FEEDBACK" />
            </div>

            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            value={feedback.name}
                            onChange={(e) => setFeedback({...feedback, name: e.target.value})}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={feedback.email}
                            onChange={(e) => setFeedback({...feedback, email: e.target.value})}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Feedback Type</label>
                        <select
                            value={feedback.type}
                            onChange={(e) => setFeedback({...feedback, type: e.target.value})}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                        >
                            <option value="general">General</option>
                            <option value="product">Product</option>
                            <option value="service">Service</option>
                            <option value="website">Website</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Rating</label>
                        <div className="flex items-center gap-4 mt-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setFeedback({...feedback, rating: star})}
                                    className={`text-2xl ${feedback.rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                                >
                                    ★
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Your Feedback</label>
                        <textarea
                            value={feedback.message}
                            onChange={(e) => setFeedback({...feedback, message: e.target.value})}
                            rows="4"
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                            required
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-2 px-4 rounded-md transition-colors ${
                            isSubmitting 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                        }`}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Feedback; 