import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { merchItems } from './merchData';
import { useCart } from './CartContext';
import { colorNames } from './colorNames';

const ProductPage = () => {
    const { productId } = useParams();
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const product = merchItems.find(item => item.id === parseInt(productId));

    const [selectedColor, setSelectedColor] = useState(product?.colors[0]);
    const [selectedSize, setSelectedSize] = useState(product?.sizes[0]);

    if (!product) {
        return (
            <div className="text-center py-10">
                <h2 className="text-2xl font-bold text-hb-light">Product not found!</h2>
                <Link to="/merch" className="text-hb-blue hover:underline mt-4 inline-block">
                    Back to Merch
                </Link>
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart({
            ...product,
            color: selectedColor,
            size: selectedSize,
        });
        navigate('/merch');
    };

    return (
        <motion.div
            className="w-full max-w-[1200px] mx-auto px-4 py-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="grid md:grid-cols-2 gap-12">
                {/* Product Image */}
                <motion.div
                    className="bg-hb-gray/30 rounded-xl p-8 border border-hb-gray/50"
                    whileHover={{ scale: 1.02 }}
                >
                    <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                </motion.div>

                {/* Product Details */}
                <div className="flex flex-col justify-center">
                    <h1 className="text-4xl font-bold text-hb-light mb-4">{product.name}</h1>
                    <p className="text-3xl text-hb-blue font-medium mb-6">${product.price.toFixed(2)}</p>

                    <p className="text-hb-light/80 mb-8">
                        High-quality official HBMTB merchandise. Perfect for showing your support on and off the trails. Made with durable materials to withstand your wildest adventures.
                    </p>

                    {/* Color Selector */}
                    <div className="mb-6">
                        <h4 className="text-lg font-medium text-hb-light/90 mb-3">Color: <span className="font-bold">{colorNames[selectedColor] || selectedColor}</span></h4>
                        <div className="flex space-x-3">
                            {product.colors.map((color) => (
                                <button
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor === color ? 'ring-2 ring-offset-2 ring-offset-hb-gray ring-hb-blue' : 'border-hb-gray/50'}`}
                                    style={{ backgroundColor: color }}
                                    title={colorNames[color] || color}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Size Selector */}
                    {product.sizes.length > 1 && (
                        <div className="mb-8">
                            <h4 className="text-lg font-medium text-hb-light/90 mb-3">Size: <span className="font-bold">{selectedSize}</span></h4>
                            <div className="flex flex-wrap gap-3">
                                {product.sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-4 py-2 text-sm rounded-lg transition-colors ${selectedSize === size ? 'bg-hb-blue text-white' : 'bg-hb-gray/50 text-hb-light hover:bg-hb-gray'}`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <button
                        onClick={handleAddToCart}
                        className="w-full max-w-xs py-3 bg-hb-blue hover:bg-hb-blue-dark text-white rounded-lg transition-colors text-lg font-semibold"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>

            <div className="mt-16">
                <Link to="/merch" className="text-hb-blue hover:underline flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                    Back to all merch
                </Link>
            </div>
        </motion.div>
    );
};

export default ProductPage;
