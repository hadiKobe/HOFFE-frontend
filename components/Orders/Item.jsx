const styles = {
  card: "bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow",
  header: "flex items-center justify-between mb-3",
  name: "text-lg font-semibold text-gray-900",
  total: "text-lg font-bold text-blue-500",
  details: "flex gap-4 text-sm text-gray-500 mb-2",
  detail: "font-medium",
  noteContainer: "mt-3 pt-3 border-t border-gray-200 flex gap-2",
  noteLabel: "text-sm font-medium text-gray-500",
  noteText: "text-sm text-gray-900 italic",
}

export default function OrderItem({ id, name = "Unknown Item", price = 0, quantity = 1, note = "" }) {
  const totalPrice = (price * quantity).toFixed(2)

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.name}>{name}</h3>
        <span className={styles.total}>${totalPrice}</span>
      </div>

      <div className={styles.details}>
        <span className={styles.detail}>${price.toFixed(2)} each</span>
        <span>×</span>
        <span className={styles.detail}>Qty: {quantity}</span>
      </div>
      
      {note && (
        <div className={styles.noteContainer}>
          <span className={styles.noteLabel}>Note:</span>
          <span className={styles.noteText}>{note}</span>
        </div>
      )}
    </div>
  )
}
