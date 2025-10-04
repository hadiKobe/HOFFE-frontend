"use client";
import { useState, useEffect, useCallback } from "react";
import { orders as dummyOrders } from "../dummy-data/orders";

export default function useOrders() {
   const [orders, setOrders] = useState([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

   // ✅ Fetch all orders
   const getOrders = useCallback(async () => {
      setLoading(true);
      setError(null);
      try {
         // Later: fetch("/api/orders")
         setOrders(dummyOrders);
      } catch (err) {
         setError(err.message || "Failed to fetch orders");
      } finally {
         setLoading(false);
      }
   }, []);

   // ✅ Add a new order
   const addOrder = useCallback(async (newOrder) => {
      setLoading(true);
      setError(null);
      try {
         // Local update for now
         setOrders((prev) => [...prev, newOrder]);

         // Later: POST to backend
         // await fetch("/api/orders", {
         //   method: "POST",
         //   headers: { "Content-Type": "application/json" },
         //   body: JSON.stringify(newOrder),
         // });
      } catch (err) {
         setError(err.message || "Failed to add order");
      } finally {
         setLoading(false);
      }
   }, []);

   // ✅ Update an order (e.g., mark as completed)
   const updateOrder = useCallback(async (id, updatedData) => {
      setLoading(true);
      setError(null);

      try {
         let tempOrders = [...orders]; // Make a shallow copy of orders

         for (let i = 0; i < tempOrders.length; i++) {
            if (tempOrders[i].id === id) {
               tempOrders[i] = { ...tempOrders[i], ...updatedData };
               break; // Stop immediately after updating
            }
         }

         setOrders(tempOrders);
         // Later: PATCH /api/orders/:id
      } catch (err) {
         setError(err.message || "Failed to update order");
      } finally {
         setLoading(false);
      }
   }, [orders]); // Add orders as dependency for readability

   // ✅ Delete an order
   const deleteOrder = useCallback(async (id) => {
      setLoading(true);
      setError(null);
      try {
         setOrders((prev) => prev.filter((order) => order.id !== id));
         // Later: DELETE /api/orders/:id
      } catch (err) {
         setError(err.message || "Failed to delete order");
      } finally {
         setLoading(false);
      }
   }, []);

   useEffect(() => {
      getOrders();
   }, [getOrders]);

   return {
      orders,
      loading,
      error,
      getOrders,
      addOrder,
      updateOrder,
      deleteOrder,
   };
}
