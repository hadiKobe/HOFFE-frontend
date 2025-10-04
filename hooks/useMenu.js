"use client";
import { useState, useEffect, useCallback } from "react";
import { menuItems as dummyMenu } from "../dummy-data/menu";

export default function useMenu() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Fetch all menu items
  const getMenu = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Later: await fetch("/api/menu")
      setMenu(dummyMenu);
    } catch (err) {
      setError(err.message || "Failed to fetch menu");
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Add a new menu item
  const addMenuItem = useCallback(async (newItem) => {
    setLoading(true);
    setError(null);
    try {
      // Local update for now
      setMenu((prev) => [...prev, newItem]);

      // Later: POST /api/menu
    } catch (err) {
      setError(err.message || "Failed to add menu item");
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Update a menu item
  const updateMenuItem = useCallback(async (id, updatedData) => {
    setLoading(true);
    setError(null);
    
    try {
      const tempMenu = [...menu]; // ✅ shallow copy

      for (let i = 0; i < tempMenu.length; i++) {
        if (tempMenu[i].id === id) {
          tempMenu[i] = { ...tempMenu[i], ...updatedData };
          break; // ✅ stops immediately
        }
      }
      setMenu(tempMenu);
      // Later: PATCH /api/menu/:id
    } catch (err) {
      setError(err.message || "Failed to update menu item");
    } finally {
      setLoading(false);
    }
  }, [menu]);

  // ✅ Delete a menu item
  const deleteMenuItem = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      setMenu((prev) => prev.filter((item) => item.id !== id));

      // Later: DELETE /api/menu/:id
    } catch (err) {
      setError(err.message || "Failed to delete menu item");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getMenu();
  }, [getMenu]);

  return {
    menu,
    loading,
    error,
    getMenu,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
  };
}
