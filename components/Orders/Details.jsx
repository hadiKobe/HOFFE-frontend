import OrderItem from "./Item.jsx"

const styles = {
  list: "flex flex-col gap-3",
  empty: "p-8 text-center text-muted-foreground bg-muted rounded-lg border border-border",
}

export default function OrderDetails({ items = [] }) {
  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No items in this order</p>
      </div>
    )
  }

  return (
    <div className={styles.list}>
      {items.map((item) => (
        <OrderItem
          key={item.id}
          id={item.id}
          name={item.name}
          price={item.price || 0}
          quantity={item.quantity || 1}
          note={item.note || ""}
        />
      ))}
    </div>
  )
}
