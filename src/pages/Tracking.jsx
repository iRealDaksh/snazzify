import React from "react";
import "./TrackOrder.css"; // Import CSS for styling
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const TrackOrder = () => {
    const orderDetails = {
        id: "12345",
        status: "In Transit",
        shippedDate: "3/26/2025",
        estimatedDelivery: "4/2/2025",
        from: "Chennai",
        to: "New Delhi",
    };

    const statuses = ["Order Placed", "Shipped", "In Transit", "Delivered"];
    const currentIndex = statuses.indexOf(orderDetails.status);

    // Google Maps API Key
    const API_KEY = "YOUR_GOOGLE_MAPS_API_KEY"; // Replace with your actual API key

    // Chennai (Starting Point) & New Delhi (Destination)
    const locations = {
        chennai: { lat: 13.0827, lng: 80.2707 },
        newDelhi: { lat: 28.6139, lng: 77.2090 },
    };

    return (
        <div className="track-order-container">
            <h2>Track Your Order</h2>
            <div className="order-info">
                <p><strong>Order ID:</strong> {orderDetails.id}</p>
                <p><strong>Status:</strong> {orderDetails.status}</p>
                <p><strong>Shipped Date:</strong> {orderDetails.shippedDate}</p>
                <p><strong>Estimated Delivery:</strong> {orderDetails.estimatedDelivery}</p>
                <p><strong>From:</strong> {orderDetails.from}</p>
                <p><strong>To:</strong> {orderDetails.to}</p>
            </div>

            {/* Progress Bar */}
            <div className="progress-container">
                {statuses.map((status, index) => (
                    <div key={index} className="progress-step">
                        <div className={`circle ${index <= currentIndex ? "active" : ""}`}>
                            {index + 1}
                        </div>
                        <p className={`status-text ${index <= currentIndex ? "active-text" : ""}`}>
                            {status}
                        </p>
                        {index < statuses.length - 1 && <div className={`line ${index < currentIndex ? "active-line" : ""}`}></div>}
                    </div>
                ))}
            </div>

            {/* Google Maps Integration */}
            <div className="map-container">
                <LoadScript googleMapsApiKey={API_KEY}>
                    <GoogleMap
                        mapContainerStyle={{ width: "100%", height: "300px" }}
                        center={locations.chennai}
                        zoom={5}
                    >
                        {/* Markers for Start & Destination */}
                        <Marker position={locations.chennai} label="Chennai" />
                        <Marker position={locations.newDelhi} label="New Delhi" />
                    </GoogleMap>
                </LoadScript>
            </div>
        </div>
    );
};

export default TrackOrder;
