import React from 'react';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom';
import { colorNames } from './colorNames';

const CartPage = () => {
  const { cartItems, addToCart, removeFromCart, clearCart } = useCart();

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="container mx-auto mt-10 p-5 bg-hb-dark-blue rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-hb-white mb-5 border-b border-hb-blue pb-2">Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center text-hb-white">
          <p className="text-xl mb-4">Your cart is currently empty.</p>
          <Link to="/merch" className="bg-hb-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 mb-4 bg-hb-darker rounded-lg">
              <div className="flex items-center">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded mr-4" />
                <div>
                  <h2 className="text-xl font-bold text-hb-white">{item.name}</h2>
                  <p className="text-gray-400">Price: ${item.price.toFixed(2)}</p>
                  <p className="text-gray-400">Size: {item.size}</p>
                  <p className="text-gray-400">Color: <span style={{
                    display: 'inline-block',
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: item.color,
                    marginRight: '8px',
                    border: '1px solid #555'
                  }}></span>{colorNames[item.color] || item.color}</p>
                </div>
              </div>
              <div className="flex items-center">
                <button onClick={() => removeFromCart(item)} className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">-</button>
                <span className="px-4 text-hb-white font-semibold">{item.quantity}</span>
                <button onClick={() => addToCart(item)} className="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-3 rounded">+</button>
              </div>
            </div>
          ))}
          <div className="mt-6 border-t border-hb-blue pt-4">
            <h2 className="text-2xl font-bold text-hb-white text-right mb-4">Total: ${getTotalPrice()}</h2>
            <div className="flex justify-end space-x-4">
              <button onClick={clearCart} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded transition duration-300">
                Clear Cart
              </button>
              <button className="bg-hb-blue hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition duration-300">
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
