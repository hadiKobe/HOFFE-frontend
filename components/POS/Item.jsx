"use client"

const styles = {
   container:
      "aspect-square w-full flex flex-col items-center justify-center gap-1 p-3 rounded-lg bg-card border border-border cursor-pointer transition-colors",
   title: "text-xl font-semibold text-center text-balance leading-tight",
   price: "text-sm font-bold text-primary",
}

export default function ItemPOS({ item, onClick }) {
   const { name, price } = item

   return (
      <div className={styles.container} onClick={() => onClick(item)}>
         <h3 className={styles.title}>{name}</h3>
         <p className={styles.price}>${price.toFixed(2)}</p>
      </div>
   )
}
