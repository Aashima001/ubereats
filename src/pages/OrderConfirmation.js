import React, { useEffect, useState } from "react";
import "./OrderConfirmation.css";

const OrderConfirmation = ({ order }) => {
  const [orderStatus, setOrderStatus] = useState(order?.status || "Order Received");

  useEffect(() => {
    if (!order?.status) return;

    const statuses = [
      "Order Received",
      "Preparing",
      "On the Way",
      "Pick-up Ready",
      "Delivered",
      "Picked Up"
    ];
    let index = statuses.indexOf(order.status);

    const interval = setInterval(() => {
      if (index < statuses.length - 1) {
        setOrderStatus(statuses[++index]);
      } else {
        clearInterval(interval);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [order?.status]);

  if (!order) {
    return <p className="error-message">Error: Order data is missing.</p>;
  }

  return (
    <div className="order-confirmation-container">
      <div className="confirmation-card">
        <h2 className="confirmation-message">🎉 Hey, sit back. Your order is placed! 🎉</h2>
        <p className="order-id">Order ID: <strong>{order.id || "N/A"}</strong></p>
        <p className="status">Status: <span className="status-badge">{orderStatus}</span></p>
        <p className="estimated-time">Estimated Delivery: <strong>{order.estimatedTime || "N/A"}</strong></p>

        {order.instructions && (
          <p className="instructions">📝 Delivery Instructions: {order.instructions}</p>
        )}

        <div className="order-details-card">
          <h4 className="order-title">📦 Order Details</h4>
          <ul className="order-list">
            {order.items && order.items.length > 0 ? (
              order.items.map((item, index) => (
                <li key={index} className="order-item">
                  <span>{item.name} x {item.quantity}</span>
                  <span>${item.price * item.quantity}</span>
                </li>
              ))
            ) : (
              <p className="error-message">No items in order.</p>
            )}
          </ul>
          <h4 className="total-amount">💰 Total: ${order.total || "0.00"}</h4>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
