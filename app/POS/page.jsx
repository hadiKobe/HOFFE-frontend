"use client"

import { useState } from "react"
import ItemsList from "@/components/POS/List"
import Cart from "@/components/POS/Cart"

const sampleItems = [
   { id: 1, name: "Iced Coffee", price: 4.5, category: "Cold Drinks", flavors: ["caramel", "vanilla"] },
   { id: 2, name: "Lemonade", price: 3.5, category: "Cold Drinks" },
   { id: 3, name: "Smoothie", price: 5.99, category: "Cold Drinks" },
   { id: 4, name: "Espresso", price: 3.0, category: "Hot Drinks" },
   { id: 5, name: "Cappuccino", price: 4.25, category: "Hot Drinks", flavors: ["caramel", "vanilla"] },
   { id: 6, name: "Hot Tea", price: 2.75, category: "Hot Drinks" },
   { id: 7, name: "Croissant", price: 3.5, category: "Pastries" },
   { id: 8, name: "Muffin", price: 3.25, category: "Pastries" },
]

export default function Page() {
   const [cartItems, setCartItems] = useState([])
   const [totalDiscount, setTotalDiscount] = useState(0)

   const handleAddToCart = (item) => {
      setCartItems((previousCartItems) => {
         // Check if the item is already in the cart
         const itemAlreadyInCart = previousCartItems.find(
            (cartItem) => cartItem.id === item.id && cartItem?.selectedFlavor === item?.selectedFlavor
         )

         if (itemAlreadyInCart) {
            // If it exists, increase its quantity by 1
            return previousCartItems.map((cartItem) => {
               if (cartItem.id === item.id) {
                  return {
                     ...cartItem,
                     quantity: cartItem.quantity + 1,
                  }
               }
               return cartItem
            })
         }

         // If it's a new item, add it with quantity = 1
         const newItem = { ...item, quantity: 1 }
         return [...previousCartItems, newItem]
      })
   }


   const handleUpdateQuantity = (itemId, itemFlavor, newQuantity) => {
      if (newQuantity <= 0) {
         // If quantity is zero or less, remove the item
         handleRemoveItem(itemId, itemFlavor)
         return
      }

      setCartItems((previousItems) =>
         previousItems.map((item) => {
            const isSameItem =
               item.id === itemId && item?.selectedFlavor === itemFlavor

            if (isSameItem) {
               return { ...item, quantity: newQuantity }
            }

            return item
         })
      )
   }

   const handleRemoveItem = (itemId, itemFlavor) => {
      setCartItems((previousItems) =>
         previousItems.filter(
            (item) => !(item.id === itemId && item?.selectedFlavor === itemFlavor)
         )
      )
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
