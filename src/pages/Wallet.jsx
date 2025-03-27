import React, { useState } from 'react';
import { FaBitcoin, FaEthereum, FaDollarSign } from 'react-icons/fa';
import { SiDogecoin, SiTether } from 'react-icons/si';
import Title from '../components/Title';

const Wallet = () => {
    const [balance, setBalance] = useState(0);
    const [selectedCrypto, setSelectedCrypto] = useState(null);

    const cryptoOptions = [
        { name: 'Bitcoin', icon: <FaBitcoin className="text-orange-500 text-2xl" />, symbol: 'BTC' },
        { name: 'Ethereum', icon: <FaEthereum className="text-blue-500 text-2xl" />, symbol: 'ETH' },
        { name: 'Dogecoin', icon: <SiDogecoin className="text-yellow-500 text-2xl" />, symbol: 'DOGE' },
        { name: 'Tether', icon: <SiTether className="text-green-500 text-2xl" />, symbol: 'USDT' },
    ];

    return (
        <div className='pt-20'>
            <div className='max-w-4xl mx-auto p-4'>
                <Title text1={'MY'} text2={'WALLET'} />
                
                <div className='mt-8 bg-white rounded-lg shadow-lg p-6'>
                    <div className='flex justify-between items-center mb-8'>
                        <div>
                            <h3 className='text-2xl font-bold'>Balance</h3>
                            <p className='text-3xl font-bold text-blue-600'>${balance.toFixed(2)}</p>
                        </div>
                        <button className='bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600'>
                            Add Funds
                        </button>
                    </div>

                    <div className='mt-8'>
                        <h3 className='text-xl font-semibold mb-4'>Payment Methods</h3>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            {cryptoOptions.map((crypto, index) => (
                                <div 
                                    key={index}
                                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                                        selectedCrypto === crypto.symbol 
                                        ? 'border-blue-500 bg-blue-50' 
                                        : 'hover:border-gray-400'
                                    }`}
                                    onClick={() => setSelectedCrypto(crypto.symbol)}
                                >
                                    <div className='flex items-center gap-3'>
                                        {crypto.icon}
                                        <div>
                                            <p className='font-medium'>{crypto.name}</p>
                                            <p className='text-sm text-gray-500'>{crypto.symbol}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='mt-8'>
                        <h3 className='text-xl font-semibold mb-4'>Transaction History</h3>
                        <div className='border rounded-lg divide-y'>
                            <p className='p-4 text-gray-500 text-center'>No transactions yet</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wallet; 