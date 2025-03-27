import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';

const ARTryOn = ({ product }) => {
    const [imagePreview, setImagePreview] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [results, setResults] = useState(null);
    const fileInputRef = useRef(null);

    const analyzeImage = async (file) => {
        setAnalyzing(true);
        try {
            // Simulate AI analysis with sample responses
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            const sizeRecommendation = {
                recommendedSize: ['M', 'L'][Math.floor(Math.random() * 2)],
                confidence: Math.floor(Math.random() * 20 + 80),
                fitType: ['Regular', 'Slim', 'Loose'][Math.floor(Math.random() * 3)],
            };

            const styleAnalysis = {
                styleMatch: Math.floor(Math.random() * 20 + 80),
                comments: [
                    "This style complements your body type well",
                    "The color works great with your skin tone",
                    "Consider trying a size up for a more relaxed fit"
                ],
            };

            setResults({ sizeRecommendation, styleAnalysis });
            toast.success('Analysis complete!');
        } catch (error) {
            toast.error('Failed to analyze image. Please try again.');
        } finally {
            setAnalyzing(false);
        }
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                analyzeImage(file);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 my-4">
            <h2 className="text-xl font-semibold mb-4">Virtual Try-On Assistant</h2>
            
            <div className="flex flex-col md:flex-row gap-6">
                {/* Image Upload Section */}
                <div className="flex-1">
                    <div 
                        className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 transition-colors"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        {imagePreview ? (
                            <img 
                                src={imagePreview} 
                                alt="Preview" 
                                className="max-h-[300px] mx-auto rounded-lg"
                            />
                        ) : (
                            <div className="py-8">
                                <p className="text-gray-500">Upload your full-body photo</p>
                                <p className="text-sm text-gray-400 mt-2">Click to select an image</p>
                            </div>
                        )}
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                    </div>
                </div>

                {/* Results Section */}
                <div className="flex-1">
                    {analyzing ? (
                        <div className="text-center py-8">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                            <p className="mt-4 text-gray-600">Analyzing your fit...</p>
                        </div>
                    ) : results ? (
                        <div className="space-y-6">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-blue-900">Size Recommendation</h3>
                                <div className="mt-2">
                                    <p className="text-2xl font-bold text-blue-600">
                                        {results.sizeRecommendation.recommendedSize}
                                    </p>
                                    <p className="text-sm text-blue-700 mt-1">
                                        {results.sizeRecommendation.fitType} Fit
                                    </p>
                                    <div className="mt-2 text-sm text-blue-600">
                                        Confidence: {results.sizeRecommendation.confidence}%
                                    </div>
                                </div>
                            </div>

                            <div className="bg-green-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-green-900">Style Analysis</h3>
                                <div className="mt-2">
                                    <div className="text-sm text-green-700">
                                        Style Match: {results.styleAnalysis.styleMatch}%
                                    </div>
                                    <ul className="mt-2 space-y-1 text-sm text-green-600">
                                        {results.styleAnalysis.comments.map((comment, index) => (
                                            <li key={index}>• {comment}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            Upload a photo to get personalized size and style recommendations
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ARTryOn; 