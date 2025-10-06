"use client"

import { useState } from "react"
import ItemsList from "@/components/POS/List"
import Cart from "@/components/POS/Cart"

const sampleItems = [
   { id: 1, name: "Iced Coffee", price: 4.5, category: "Cold Drinks" },
   { id: 2, name: "Lemonade", price: 3.5, category: "Cold Drinks" },
   { id: 3, name: "Smoothie", price: 5.99, category: "Cold Drinks" },
   { id: 4, name: "Espresso", price: 3.0, category: "Hot Drinks" },
   { id: 5, name: "Cappuccino", price: 4.25, category: "Hot Drinks" },
   { id: 6, name: "Hot Tea", price: 2.75, category: "Hot Drinks" },
   { id: 7, name: "Croissant", price: 3.5, category: "Pastries" },
   { id: 8, name: "Muffin", price: 3.25, category: "Pastries" },
]

export default function Page() {
   const [cartItems, setCartItems] = useState([])
   const [totalDiscount, setTotalDiscount] = useState(0)

   const handleAddToCart = (item) => {
      setCartItems((prevItems) => {
         const existingItem = prevItems.find((cartItem) => cartItem.id === item.id)
         if (existingItem) {
            return prevItems.map((cartItem) =>
               cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
            )
         }
         return [...prevItems, { ...item, quantity: 1 }]
      })
   }

   const handleUpdateQuantity = (itemId, newQuantity) => {
      if (newQuantity <= 0) {
         handleRemoveItem(itemId)
         return
      }
      setCartItems((prevItems) =>
         prevItems.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item)),
      )
   }

   const handleRemoveItem = (itemId) => {
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId))
   }

   return (
      <div className="min-h-screen bg-background flex">
         <div className="w-[70%]">
            <ItemsList items={sampleItems} onItemClick={handleAddToCart} />
         </div>

         <div className="w-[30%]">
            <Cart
               cartItems={cartItems}
               onUpdateQuantity={handleUpdateQuantity}
               onRemoveItem={handleRemoveItem}
               totalDiscount={totalDiscount}
               onUpdateTotalDiscount={setTotalDiscount}
            />
         </div>
      </div>
   )
}
