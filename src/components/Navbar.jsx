import React, { useContext, useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import './Navbar.css';
import { FaBars, FaTimes, FaWallet, FaUser, FaShoppingBag, FaBitcoin, FaEthereum, FaComment } from 'react-icons/fa';
import { BiLogOut, BiLogIn } from 'react-icons/bi';
import { toast } from 'react-toastify';

const Navbar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { setShowSearch, navigate, getCartCount, isLoggedIn, logout } = useContext(ShopContext);

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleLogoutClick = async () => {
        await logout();
        setSidebarOpen(false); // Close sidebar after logout
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <>
            {/* Fixed navbar */}
            <div className='fixed top-0 left-0 right-0 z-50 flex items-center justify-between py-1 px-4 bg-white text-black shadow-md'>
                <div className='flex items-center gap-4'>
                    <button onClick={toggleSidebar} className='text-2xl'>
                        <FaBars />
                    </button>
                    <Link to='/' className='flex items-center'>
                        <img 
                            src={assets.logo} 
                            alt="Snazzify" 
                            className="h-[50px] w-[70px] "
                        />
                    </Link>
                </div>

                <ul className='hidden sm:flex gap-5 text-sm'>
                    <NavLink to="/" className='nav-link'>HOME</NavLink>
                    <NavLink to='/collection' className='nav-link'>COLLECTION</NavLink>
                    <NavLink to='/about' className='nav-link'>ABOUT</NavLink>
                    <NavLink to='/contact' className='nav-link'>CONTACT</NavLink>
                </ul>
            </div>

            {/* Add a spacer div to prevent content overlap */}
            <div className="h-[60px]"></div>

            {/* Floating Cart Button - adjust z-index to be below navbar */}
            <div className='fixed bottom-4 left-4 z-40'>
                <Link to='/cart' className='float-cart flex items-center gap-2 bg-black text-white p-4 rounded-full shadow-lg hover:bg-gray-800 transition-all'>
                    Cart ({getCartCount()})
                </Link>
            </div>

            {/* Sidebar */}
            <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 z-50 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className='p-4'>
                    <div className='flex justify-between items-center mb-8'>
                        <h2 className='text-xl font-bold'>Menu</h2>
                        <button onClick={toggleSidebar} className='text-2xl'>
                            <FaTimes />
                        </button>
                    </div>

                    <div className='flex flex-col gap-4'>
                        {isLoggedIn ? (
                            // Show these options when logged in
                            <>
                                <Link to="/account" className='sidebar-link'>
                                    <FaUser /> My Account
                                </Link>
                                <Link to="/orders" className='sidebar-link'>
                                    <FaShoppingBag /> My Orders
                                </Link>
                                <Link to="/wallet" className='sidebar-link'>
                                    <FaWallet /> Wallet
                                </Link>
                                <Link to="/feedback" className='sidebar-link'>
                                    <FaComment /> Feedback
                                </Link>
                                <button 
                                    onClick={handleLogoutClick}
                                    className='sidebar-link text-red-500 hover:bg-red-50 mt-auto'
                                >
                                    <BiLogOut /> Logout
                                </button>
                            </>
                        ) : (
                            // Show these options when logged out
                            <>
                                <button 
                                    onClick={handleLoginClick}
                                    className='sidebar-link bg-blue-500 text-white hover:bg-blue-600'
                                >
                                    <BiLogIn /> Login
                                </button>
                                <Link to="/signup" className='sidebar-link border border-blue-500 text-blue-500 hover:bg-blue-50'>
                                    Sign Up
                                </Link>
                                <Link to="/feedback" className='sidebar-link'>
                                    <FaComment /> Feedback
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Overlay */}
            {sidebarOpen && (
                <div 
                    className='fixed inset-0 bg-black bg-opacity-50 z-40'
                    onClick={toggleSidebar}
                />
            )}
        </>
    );
};

export default Navbar;

