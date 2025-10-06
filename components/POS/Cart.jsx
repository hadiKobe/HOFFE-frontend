"use client"

const styles = {
   container: "w-full h-full bg-card border-l border-border p-6 flex flex-col",
   header: "text-2xl font-bold mb-6 text-foreground",
   cartItems: "flex-1 overflow-y-auto space-y-4 mt-6",
   cartItem: "bg-background border border-border rounded-lg p-4",
   itemHeader: "flex justify-between items-start mb-2",
   itemName: "font-semibold text-lg",
   removeButton: "text-destructive text-sm cursor-pointer hover:underline",
   itemDetails: "space-y-2",
   row: "flex justify-between items-center",
   label: "text-sm text-muted-foreground",
   value: "text-sm font-medium",
   quantityControls: "flex items-center gap-2",
   quantityButton:
      "w-8 h-8 rounded bg-primary text-primary-foreground flex items-center justify-center cursor-pointer hover:opacity-80",
   quantity: "w-12 text-center font-medium",
   discountInput: "w-24 px-2 py-1 border border-border rounded text-sm",
   summary: "border-b border-border pb-4 space-y-2",
   summaryRow: "flex justify-between items-center",
   summaryLabel: "text-sm font-medium",
   summaryValue: "text-sm font-medium",
   total: "text-xl font-bold",
   emptyCart: "flex-1 flex items-center justify-center text-muted-foreground",
}

export default function Cart({ cartItems, onUpdateQuantity, onRemoveItem, totalDiscount, onUpdateTotalDiscount }) {
   const calculateSubtotal = () => {
      let total = 0
      for (const item of cartItems) {
         total += item.price * item.quantity
      }
      return total
   }

   const calculateTotal = () => {
      const subtotal = calculateSubtotal()

      const discountFactor = totalDiscount ? 1 - totalDiscount / 100 : 1
      const total = subtotal * discountFactor

      return total
   }

   return (
      <div className={styles.container}>
         <h2 className={styles.header}>Cart</h2>

         {cartItems.length === 0 ? (
            <div className={styles.emptyCart}>
               <p>No items in cart</p>
            </div>
         ) : (
            <>
               <div className={styles.summary}>
                  <div className={styles.summaryRow}>
                     <span className={styles.summaryLabel}>Subtotal</span>
                     <span className={styles.summaryValue}>${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className={styles.summaryRow}>
                     <span className={styles.summaryLabel}>Discount</span>
                     <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={totalDiscount || 0}
                        onChange={(e) => onUpdateTotalDiscount(Number.parseFloat(e.target.value) || 0)}
                        className={styles.discountInput}
                        placeholder="0.00"
                     />
                  </div>
                  <div className={styles.summaryRow}>
                     <span className={styles.total}>Total</span>
                     <span className={styles.total}>${calculateTotal().toFixed(2)}</span>
                  </div>
               </div>

               <div className={styles.cartItems}>
                  {cartItems.map((item) => (
                     <div key={item.id} className={styles.cartItem}>
                        <div className={styles.itemHeader}>
                           <h3 className={styles.itemName}>{item.name}</h3>
                           <button onClick={() => onRemoveItem(item.id)} className={styles.removeButton}>
                              Remove
                           </button>
                        </div>

                        <div className={styles.itemDetails}>
                           <div className={styles.row}>
                              <span className={styles.label}>Price</span>
                              <span className={styles.value}>${item.price.toFixed(2)}</span>
                           </div>

                           <div className={styles.row}>
                              <span className={styles.label}>Quantity</span>
                              <div className={styles.quantityControls}>
                                 <button
                                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                    className={styles.quantityButton}
                                 >
                                    -
                                 </button>
                                 <span className={styles.quantity}>{item.quantity}</span>
                              </div>
                           </div>

                           <div className={styles.row}>
                              <span className={styles.label}>Item Total</span>
                              <span className={styles.value}>${(item.price * item.quantity).toFixed(2)}</span>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </>
         )}
      </div>
   )
}
