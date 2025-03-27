import React, { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { FaUser, FaMapMarkerAlt, FaKey, FaHistory } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Account = () => {
    const { isLoggedIn } = useContext(ShopContext);
    const [activeTab, setActiveTab] = useState('profile');
    const [personalInfo, setPersonalInfo] = useState({
        name: '',
        email: '',
        phone: '',
        dateOfBirth: ''
    });
    const [addresses, setAddresses] = useState([]);
    const [newAddress, setNewAddress] = useState({
        type: 'home',
        street: '',
        city: '',
        state: '',
        pincode: '',
        isDefault: false
    });

    useEffect(() => {
        // Load saved personal info and addresses from localStorage
        const savedInfo = JSON.parse(localStorage.getItem('personalInfo') || '{}');
        const savedAddresses = JSON.parse(localStorage.getItem('addresses') || '[]');
        setPersonalInfo(savedInfo);
        setAddresses(savedAddresses);
    }, []);

    const handlePersonalInfoUpdate = (e) => {
        e.preventDefault();
        localStorage.setItem('personalInfo', JSON.stringify(personalInfo));
        toast.success('Personal information updated successfully!');
    };

    const handleAddAddress = (e) => {
        e.preventDefault();
        const updatedAddresses = [...addresses, { ...newAddress, id: Date.now() }];
        setAddresses(updatedAddresses);
        localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
        setNewAddress({
            type: 'home',
            street: '',
            city: '',
            state: '',
            pincode: '',
            isDefault: false
        });
        toast.success('Address added successfully!');
    };

    const handleDeleteAddress = (id) => {
        const updatedAddresses = addresses.filter(addr => addr.id !== id);
        setAddresses(updatedAddresses);
        localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
        toast.success('Address removed successfully!');
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Please Login</h2>
                    <p className="text-gray-600">You need to be logged in to view your account details.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-6xl mx-auto px-4">
                <h1 className="text-3xl font-bold mb-8">My Account</h1>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="md:w-1/4">
                        <div className="bg-white rounded-lg shadow-md p-4">
                            <div className="space-y-2">
                                <button
                                    onClick={() => setActiveTab('profile')}
                                    className={`w-full text-left px-4 py-2 rounded-md flex items-center gap-2 ${activeTab === 'profile' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
                                >
                                    <FaUser /> Profile
                                </button>
                                <button
                                    onClick={() => setActiveTab('addresses')}
                                    className={`w-full text-left px-4 py-2 rounded-md flex items-center gap-2 ${activeTab === 'addresses' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
                                >
                                    <FaMapMarkerAlt /> Addresses
                                </button>
                                <button
                                    onClick={() => setActiveTab('security')}
                                    className={`w-full text-left px-4 py-2 rounded-md flex items-center gap-2 ${activeTab === 'security' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
                                >
                                    <FaKey /> Security
                                </button>
                                <button
                                    onClick={() => setActiveTab('orderHistory')}
                                    className={`w-full text-left px-4 py-2 rounded-md flex items-center gap-2 ${activeTab === 'orderHistory' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
                                >
                                    <FaHistory /> Order History
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="md:w-3/4">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            {/* Profile Section */}
                            {activeTab === 'profile' && (
                                <div>
                                    <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                                    <form onSubmit={handlePersonalInfoUpdate} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                            <input
                                                type="text"
                                                value={personalInfo.name}
                                                onChange={(e) => setPersonalInfo({...personalInfo, name: e.target.value})}
                                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Email</label>
                                            <input
                                                type="email"
                                                value={personalInfo.email}
                                                onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                                            <input
                                                type="tel"
                                                value={personalInfo.phone}
                                                onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                                            <input
                                                type="date"
                                                value={personalInfo.dateOfBirth}
                                                onChange={(e) => setPersonalInfo({...personalInfo, dateOfBirth: e.target.value})}
                                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                        >
                                            Save Changes
                                        </button>
                                    </form>
                                </div>
                            )}

                            {/* Addresses Section */}
                            {activeTab === 'addresses' && (
                                <div>
                                    <h2 className="text-xl font-semibold mb-4">Manage Addresses</h2>
                                    
                                    {/* Existing Addresses */}
                                    <div className="mb-8 space-y-4">
                                        {addresses.map((address) => (
                                            <div key={address.id} className="border rounded-lg p-4">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <span className="inline-block px-2 py-1 bg-gray-100 rounded text-sm mb-2">
                                                            {address.type}
                                                        </span>
                                                        <p>{address.street}</p>
                                                        <p>{address.city}, {address.state}</p>
                                                        <p>PIN: {address.pincode}</p>
                                                    </div>
                                                    <button
                                                        onClick={() => handleDeleteAddress(address.id)}
                                                        className="text-red-600 hover:text-red-800"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Add New Address Form */}
                                    <form onSubmit={handleAddAddress} className="space-y-4">
                                        <h3 className="font-semibold">Add New Address</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Type</label>
                                                <select
                                                    value={newAddress.type}
                                                    onChange={(e) => setNewAddress({...newAddress, type: e.target.value})}
                                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                                                >
                                                    <option value="home">Home</option>
                                                    <option value="work">Work</option>
                                                    <option value="other">Other</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Street Address</label>
                                                <input
                                                    type="text"
                                                    value={newAddress.street}
                                                    onChange={(e) => setNewAddress({...newAddress, street: e.target.value})}
                                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">City</label>
                                                <input
                                                    type="text"
                                                    value={newAddress.city}
                                                    onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">State</label>
                                                <input
                                                    type="text"
                                                    value={newAddress.state}
                                                    onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">PIN Code</label>
                                                <input
                                                    type="text"
                                                    value={newAddress.pincode}
                                                    onChange={(e) => setNewAddress({...newAddress, pincode: e.target.value})}
                                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                                                />
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                        >
                                            Add Address
                                        </button>
                                    </form>
                                </div>
                            )}

                            {/* Security Section */}
                            {activeTab === 'security' && (
                                <div>
                                    <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="font-medium">Change Password</h3>
                                            <form className="mt-4 space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Current Password</label>
                                                    <input
                                                        type="password"
                                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">New Password</label>
                                                    <input
                                                        type="password"
                                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                                                    <input
                                                        type="password"
                                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                                                    />
                                                </div>
                                                <button
                                                    type="submit"
                                                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                                >
                                                    Update Password
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Order History Section */}
                            {activeTab === 'orderHistory' && (
                                <div>
                                    <h2 className="text-xl font-semibold mb-4">Order History</h2>
                                    <div className="space-y-4">
                                        {JSON.parse(localStorage.getItem('orders') || '[]').map((order) => (
                                            <div key={order.id} className="border rounded-lg p-4">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="font-medium">Order #{order.id}</p>
                                                        <p className="text-sm text-gray-600">Date: {order.orderDate}</p>
                                                        <p className="text-sm text-gray-600">Status: {order.status}</p>
                                                    </div>
                                                    <button
                                                        onClick={() => navigate(`/track/${order.id}`)}
                                                        className="text-blue-600 hover:text-blue-800"
                                                    >
                                                        Track Order
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account; 