"use client"

import ItemPOS from "./Item"

const styles = {
   container: "w-full h-full overflow-y-auto p-6",
   categorySection: "mb-8",
   categoryTitle: "text-2xl font-bold mb-4 text-foreground",
   itemsGrid: "grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2",
   separator: "border-t border-border my-8",
}

export default function ItemsList({ items, onItemClick }) {
   // Group items by category
   const groupedItems = items.reduce((acc, item) => {
      const category = item.category || "Uncategorized"
      if (!acc[category]) {
         acc[category] = []
      }
      acc[category].push(item)
      return acc
   }, {})

   const categories = Object.keys(groupedItems)

   return (
      <div className={styles.container}>
         {categories.map((category, index) => (
            <div key={category}>
               <div className={styles.categorySection}>
                  <h2 className={styles.categoryTitle}>{category}</h2>
                  <div className={styles.itemsGrid}>
                     {groupedItems[category].map((item) => (
                        <ItemPOS key={item.id || item.name} item={item} onClick={onItemClick} />
                     ))}
                  </div>
               </div>
               {index < categories.length - 1 && <div className={styles.separator}></div>}
            </div>
         ))}
      </div>
   )
}
