"use client"

import MenuItem from "./Item"

const styles = {
   container: "space-y-4",
   grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
   empty: "text-center py-12 text-muted-foreground",
}

export default function MenuList({ items, onUpdate, onDelete }) {
   if (!items || items.length === 0) {
      return <div className={styles.empty}>No menu items found. Add your first item!</div>
   }

   return (
      <div className={styles.container}>
         <div className={styles.grid}>
            {items.map((item) => (
               <MenuItem key={item.id} item={item} onUpdate={onUpdate} onDelete={onDelete} />
            ))}
         </div>
      </div>
   )
}
