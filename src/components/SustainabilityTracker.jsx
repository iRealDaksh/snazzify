import React from 'react';

const SustainabilityTracker = ({ product }) => {
    return (
        <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-green-800 font-semibold">Sustainability Score</h3>
            <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 bg-gray-200 h-2 rounded-full">
                    <div 
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${product.sustainabilityScore}%` }}
                    />
                </div>
                <span className="text-sm font-medium">
                    {product.sustainabilityScore}%
                </span>
            </div>
        </div>
    );
}; 