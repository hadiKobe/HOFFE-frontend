"use client"

import  useOrders  from "@/hooks/useOrders"
import OrdersList from "@/components/Orders/List"

const styles = {
  main: "min-h-screen p-8 bg-background",
  container: "max-w-6xl mx-auto space-y-6",
  header: "space-y-2",
  title: "text-3xl font-bold text-foreground",
  subtitle: "text-muted-foreground",
}

export default function Page() {
  const { orders } = useOrders()

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Coffee Shop Orders</h1>
          <p className={styles.subtitle}>View and manage all orders</p>
        </div>

        <OrdersList orders={orders} />
      </div>
    </main>
  )
}
