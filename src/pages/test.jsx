import React, { useEffect, useState } from "react";

function OrderNotification({ vendorId }) {
  const [newOrder, setNewOrder] = useState(null);

  useEffect(() => {
    const eventSource = new EventSource(`/events/${vendorId}`);

    eventSource.onmessage = (event) => {
      const order = JSON.parse(event.data);
      console.log(event.data);
      setNewOrder(order);
    };

    return () => {
      eventSource.close();
    };
  }, [vendorId]);

  return (
    <div>
      {newOrder && (
        <div className="text-bold text-red-400">
          New Order Received: {newOrder.order_id}
        </div>
      )}
    </div>
  );
}

export default OrderNotification;
