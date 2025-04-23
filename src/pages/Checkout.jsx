import React, { useState } from 'react';

const CheckoutPage = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [note, setNote] = useState('');

    const cartItems = [
        { id: 53, name: 'Men Slim Cargo Pant - Faded Blue', quantity: 1, price: 2190 },
    ];
    const deliveryCharge = 60;
    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const payableAmount = totalAmount + deliveryCharge;

    const handlePlaceOrder = () => {
        // Order place Api is : https://admin.refabry.com/api/public/order/create
        // For place an order data structure is like:
        // {
        //   "product_ids": "1,2", // Example: Comma-separated string of product IDs from cartItems
        //   "s_product_qty": "2,1", // Example: Comma-separated string of corresponding quantities
        //   "c_phone": "01734252112", // From the phone state
        //   "c_name": "test", // From the fullName state
        //   "courier": "steadfast", // You might need to get this from user input or a default
        //   "address": "mirpur 12 ramzanessamarket", // From the address state
        //   "advance": null, // You might add functionality for advance payment
        //   "cod_amount": "1250", // This would be the payableAmount if COD is the payment method
        //   "discount_amount": null, // If any discount is applied
        //   "delivery_charge": "80" // From the deliveryCharge variable
        // }

        const productIds = cartItems.map(item => item.id).join(',');
        const productQtys = cartItems.map(item => item.quantity).join(',');

        const orderData = {
            product_ids: productIds,
            s_product_qty: productQtys,
            c_phone: phone,
            c_name: fullName,
            courier: 'steadfast', // You might need to implement a way for the user to select the courier
            address: `${address}, ${city} - ${postalCode}`,
            advance: null,
            cod_amount: payableAmount.toString(), // Assuming Cash on Delivery
            discount_amount: null,
            delivery_charge: deliveryCharge.toString(),
        };

        console.log('Order Data:', orderData);
        // In a real application, you would make an API call here using a library like axios or fetch
        // axios.post('https://admin.refabry.com/api/public/order/create', orderData)
        //   .then(response => {
        //     console.log('Order placed successfully:', response.data);
        //     // Redirect to a success page or show a success message
        //   })
        //   .catch(error => {
        //     console.error('Error placing order:', error);
        //     // Show an error message to the user
        //   });
    };

    return (
        <div className="container mx-auto py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Checkout Information */}
                <div className="bg-white rounded-md shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4">Checkout Info</h2>

                    {/* Contact Info */}
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">Contact Info</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="full-name" className="block text-gray-700 text-sm font-bold mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="full-name"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                            {/* You might add an "Alternative Phone Number" field here */}
                        </div>
                    </div>

                    {/* Shipping Info */}
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">Shipping Info</h3>
                        <div>
                            <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
                                Detailed Address
                            </label>
                            <textarea
                                id="address"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                rows="3"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                            <div>
                                <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">
                                    Select City
                                </label>
                                <input
                                    type="text"
                                    id="city"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                                {/* In a real application, this would likely be a dropdown */}
                            </div>
                            <div>
                                <label htmlFor="postal-code" className="block text-gray-700 text-sm font-bold mb-2">
                                    Postal Code
                                </label>
                                <input
                                    type="text"
                                    id="postal-code"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={postalCode}
                                    onChange={(e) => setPostalCode(e.target.value)}
                                />
                                {/* This might be "Area / Postal Code" as seen in the image */}
                            </div>
                        </div>
                    </div>

                    {/* Note for Seller */}
                    <div>
                        <label htmlFor="note" className="block text-gray-700 text-sm font-bold mb-2">
                            Note for Seller (optional)
                        </label>
                        <textarea
                            id="note"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            rows="2"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        />
                    </div>

                    {/* Place Order Button */}
                    <button
                        className="bg-gray-800 text-white w-full py-2 rounded-none flex justify-center items-center gap-2 hover:bg-gray-900 transition border-t border-cyan-400"
                        onClick={handlePlaceOrder}
                    >
                        Place Order
                    </button>
                </div>

                {/* Cart Overview */}
                <div className="bg-white rounded-md shadow-md p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Cart Overview</h2>
                        <button className="text-blue-500 text-sm">Modify Order</button>
                    </div>

                    {/* Cart Items */}
                    <ul>
                        {cartItems.map(item => (
                            <li key={item.id} className="flex items-center py-2 border-b">
                                <div className="w-16 h-16 rounded-md overflow-hidden mr-4">
                                    <img
                                        src={`https://via.placeholder.com/100x100/4F46E5/FFFFFF?Text=${item.name.substring(0, 2)}`}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="text-gray-800 text-sm">{item.name}</p>
                                    <p className="text-gray-600 text-xs">({item.quantity} x ৳{item.price})</p>
                                </div>
                                <div className="ml-auto text-gray-900">৳{item.price * item.quantity}</div>
                            </li>
                        ))}
                    </ul>

                    {/* Totals */}
                    <div className="mt-4">
                        <div className="flex justify-between py-2">
                            <span className="text-gray-700 font-semibold">Total:</span>
                            <span className="text-gray-900">৳{totalAmount}</span>
                        </div>
                        <div className="flex justify-between py-2">
                            <span className="text-gray-700 font-semibold">Shipping (+):</span>
                            <span className="text-gray-900">৳{deliveryCharge}</span>
                        </div>
                        <div className="flex justify-between py-2 font-bold text-lg">
                            <span>Payable:</span>
                            <span>৳{payableAmount}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;