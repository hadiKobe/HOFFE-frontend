"use client"

import useOrders from "@/hooks/useOrders"
import OrdersList from "@/components/Orders/List"

const styles = {
  main: "min-h-screen p-8 bg-background",
  container: "max-w-6xl mx-auto space-y-6",
}

export default function Page() {
  const { orders } = useOrders()

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <OrdersList orders={orders} />
      </div>
    </main>
  )
}
