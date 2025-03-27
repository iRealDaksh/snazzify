import React, { useContext, useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import './Navbar.css';
import { FaBars, FaTimes, FaWallet, FaUser, FaShoppingBag, FaBitcoin, FaEthereum } from 'react-icons/fa';
import { BiLogOut, BiLogIn } from 'react-icons/bi';
import { toast } from 'react-toastify';

const Navbar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { setShowSearch, navigate, getCartCount } = useContext(ShopContext);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Add this function to handle login
    const handleLogin = () => {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/');
        toast.success('Logged in successfully!');
    };

    // Add this function to handle logout
    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
        navigate('/');
        toast.success('Logged out successfully!');
    };

    // Check login status on component mount
    useEffect(() => {
        const loginStatus = localStorage.getItem('isLoggedIn');
        if (loginStatus === 'true') {
            setIsLoggedIn(true);
        }
    }, []);

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
                            <>
                                <Link to="/account" className='sidebar-link'>
                                    <FaUser /> Account
                                </Link>
                                <Link to="/wallet" className='sidebar-link'>
                                    <FaWallet /> Wallet
                                </Link>
                                <Link to="/orders" className='sidebar-link'>
                                    <FaShoppingBag /> Orders
                                </Link>
                                
                                {/* Crypto Payment Options */}
                                <div className='mt-4 border-t pt-4'>
                                    <h3 className='text-sm font-semibold mb-2'>Payment Methods</h3>
                                    <div className='flex flex-col gap-2 text-sm'>
                                        <div className='flex items-center gap-2'>
                                            <FaBitcoin className='text-orange-500' /> Bitcoin
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <FaEthereum className='text-blue-500' /> Ethereum
                                        </div>
                                    </div>
                                </div>

                                <button 
                                    onClick={handleLogout}
                                    className='mt-auto flex items-center gap-2 text-red-500 hover:text-red-600'
                                >
                                    <BiLogOut /> Logout
                                </button>
                            </>
                        ) : (
                            <div className='flex flex-col gap-2'>
                                <button 
                                    onClick={handleLogin}
                                    className='sidebar-link bg-blue-500 text-white hover:bg-blue-600'
                                >
                                    <BiLogIn /> Login
                                </button>
                                <Link to="/signup" className='sidebar-link border border-blue-500 text-blue-500 hover:bg-blue-50'>
                                    Sign Up
                                </Link>
                            </div>
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

