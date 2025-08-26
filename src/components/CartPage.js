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
    <div className="container mx-auto mt-10 p-4 sm:p-8 bg-hb-darker/50 rounded-2xl shadow-lg border border-hb-gray/30">
      <h1 className="text-3xl font-bold text-hb-light mb-6 border-b border-hb-gray/50 pb-4">Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center text-hb-light py-12">
          <p className="text-xl mb-4">Your cart is currently empty.</p>
          <Link to="/merch" className="bg-hb-blue hover:bg-hb-blue-dark text-white font-bold py-3 px-6 rounded-lg transition duration-300 inline-block">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div>
          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-hb-gray/30 rounded-lg border border-hb-gray/50">
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
                  <div>
                    <h2 className="text-xl font-bold text-hb-light">{item.name}</h2>
                    <p className="text-gray-400">Price: ${item.price.toFixed(2)}</p>
                    <p className="text-gray-400">Size: {item.size}</p>
                    <div className="flex items-center gap-2 text-gray-400">
                      Color:
                      <span
                        className="w-4 h-4 rounded-full border border-hb-gray"
                        style={{ backgroundColor: item.color }}
                        title={colorNames[item.color] || item.color}
                      />
                      <span>{colorNames[item.color] || item.color}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => removeFromCart(item)} className="bg-red-600/80 hover:bg-red-600 text-white font-bold w-8 h-8 rounded-full transition-colors">-</button>
                  <span className="px-2 text-hb-light font-semibold text-lg">{item.quantity}</span>
                  <button onClick={() => addToCart(item)} className="bg-green-600/80 hover:bg-green-600 text-white font-bold w-8 h-8 rounded-full transition-colors">+</button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 border-t border-hb-gray/50 pt-6">
            <h2 className="text-2xl font-bold text-hb-light text-right mb-4">Total: ${getTotalPrice()}</h2>
            <div className="flex justify-end space-x-4">
              <button onClick={clearCart} className="bg-red-600/80 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg transition duration-300">
                Clear Cart
              </button>
              <button className="bg-hb-blue hover:bg-hb-blue-dark text-white font-bold py-2 px-6 rounded-lg transition duration-300">
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
