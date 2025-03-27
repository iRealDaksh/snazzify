import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from '../config/firebase';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '₹';
    const delivery_fee = 10;
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [cardVerifying, setCardVerifying] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setIsLoggedIn(true);
                setUser(user);
                localStorage.setItem('isLoggedIn', 'true');
            } else {
                setIsLoggedIn(false);
                setUser(null);
                localStorage.removeItem('isLoggedIn');
            }
        });

        return () => unsubscribe();
    }, []);

    const login = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setIsLoggedIn(true);
            setUser(userCredential.user);
            localStorage.setItem('isLoggedIn', 'true');
            toast.success('Logged in successfully!');
            navigate('/');
        } catch (error) {
            toast.error(error.message);
        }
    };

    const signup = async (email, password) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setIsLoggedIn(true);
            localStorage.setItem('isLoggedIn', 'true');
            toast.success('Account created successfully!');
            navigate('/');
        } catch (error) {
            toast.error(error.message);
        }
    };

    const googleSignIn = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            setIsLoggedIn(true);
            localStorage.setItem('isLoggedIn', 'true');
            toast.success('Logged in with Google successfully!');
            navigate('/');
        } catch (error) {
            toast.error(error.message);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setIsLoggedIn(false);
            setUser(null);
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('user');
            toast.success('Logged out successfully!');
            navigate('/');
        } catch (error) {
            toast.error(error.message);
        }
    };

    const addToCart = async (itemId, size) => {

        if (!size) {
            toast.error('Select product size');
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            else {
                cartData[itemId][size] = 1;
            }
        }
        else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1
        }
        setCartItems(cartData)

    }

    const updateQuantity = async (itemId, size, quantity) => {

        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);

    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                }
            }
        }
        return totalCount;
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) {
                }
            }
        }
        return totalAmount;
    }

    const clearCart = () => {
        setCartItems({});
    };

    const verifyCard = async (cardDetails) => {
        try {
            setCardVerifying(true);
            const db = getFirestore();
            
            await addDoc(collection(db, 'payment_verifications'), {
                userId: auth.currentUser?.uid,
                timestamp: new Date(),
                last4: cardDetails.number.slice(-4),
                success: true
            });

            return true;
        } catch (error) {
            toast.error('Card verification failed');
            return false;
        } finally {
            setCardVerifying(false);
        }
    };

    const value = {
        currency, delivery_fee,
        products,
        navigate,
        search, setSearch,
        showSearch, setShowSearch,
        addToCart, updateQuantity,
        cartItems,
        getCartCount, getCartAmount,
        clearCart,
        isLoggedIn,
        user,
        login,
        signup,
        googleSignIn,
        logout,
        verifyCard,
        cardVerifying
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )


}

export default ShopContextProvider;