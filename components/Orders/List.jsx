"use client"

import useOrders from "@/hooks/useOrders";
import useVerifyPassword from "@/hooks/useVerifyPassword";
import { useRouter } from "next/navigation";
import { Trash, Edit } from "lucide-react";
import { PasswordDialog, ConfirmDialog } from "../Layouts/Dialogs";
import { useEffect, useState } from "react"
import OrderDetails from "./Details"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

const styles = {
  list: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",
  empty: "p-8 text-center text-muted-foreground bg-muted rounded-lg border border-border",
  card: "bg-card text-card-foreground rounded-lg border border-border p-4 space-y-3 cursor-pointer hover:shadow-md transition-all hover:scale-[1.02]",
  cardHeader: "flex justify-between items-center pb-2 border-b border-border",
  orderId: "font-semibold text-foreground",
  orderTime: "text-sm text-muted-foreground",
  cardBody: "space-y-2",
  infoRow: "flex justify-between text-sm",
  infoLabel: "text-muted-foreground",
  infoValue: "font-medium text-foreground",
  cardFooter: "flex justify-between items-center pt-2 border-t border-border",
  totalLabel: "text-sm text-muted-foreground",
  totalValue: "text-lg font-bold text-foreground",
  dialogContent: "max-w-2xl max-h-[80vh] overflow-y-auto",
  dialogTitle: "flex items-center w-full gap-3 pr-8",
  deleteButton: "bg-red-600 text-white hover:bg-red-700"
}

export default function OrdersList({ orders = [] }) {
  const router = useRouter();
  const { deleteOrder } = useOrders()
  const { verifyPassword } = useVerifyPassword()

  const [selectedOrder, setSelectedOrder] = useState(null)
  const [orderDialog, setOrderDialog] = useState(false)

  const [passwordDialog, setPasswordDialog] = useState(false);
  const [actionType, setActionType] = useState(""); // "edit" or "delete"

  const [confirmDialog, setConfirmDialog] = useState(false);

  const handleClick = (name, params = {}) => {
    switch (name) {
      case "order":
        setSelectedOrder(params.order)
        setOrderDialog(true)
        break;

      case "password":
        setActionType(params.type);
        setPasswordDialog(true);
        break;
    }
  }

  useEffect(() => {
    console.log(orders);
  }, [orders])

  const handleConfirm = async (password) => {
    // Validate password here
    if (!password) alert("Password Empty");

    else {
      const ok = await verifyPassword(password);
      if (ok) {
        if (actionType === "edit") router.push(`/Orders/${selectedOrder.id}`);
        else if (actionType === "delete") setConfirmDialog(true);

        setPasswordDialog(false);
        setActionType("");

      } else {
        alert("Wrong password!");
      }
    };
  }
  if (orders.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No orders yet</p>
      </div>
    )
  }

  return (
    <>
      <div className={styles.list}>
        {orders.map((order) => (
          <div key={order.id} className={styles.card} onClick={() => handleClick("order", { order })}>
            <div className={styles.cardHeader}>
              <span className={styles.orderId}>#{order.id}</span>
              <span className={styles.orderTime}>{order.time}</span>
            </div>

            <div className={styles.cardBody}>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Items:</span>
                <span className={styles.infoValue}>{order.totalItems}</span>
              </div>

              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Discount:</span>
                <span className={styles.infoValue}>{order.discount}%</span>
              </div>
            </div>

            <div className={styles.cardFooter}>
              <span className={styles.totalLabel}>Total:</span>
              <span className={styles.totalValue}>${order.total.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={orderDialog} onOpenChange={setOrderDialog}>
        <DialogContent className={styles.dialogContent}>
          <DialogHeader>
            <div className={styles.dialogTitle}>
              <DialogTitle>
                #{selectedOrder?.id}
              </DialogTitle>

              <Button size="sm" onClick={() => handleClick("password", { type: "edit" })}>
                <Edit className="w-4 h-4" />
              </Button>

              <Button size="sm" className={styles.deleteButton} onClick={() => handleClick("password", { type: "delete" })}>
                <Trash className="w-4 h-4" />
              </Button>
            </div>
            <DialogDescription>
              {selectedOrder?.time} • {selectedOrder?.totalItems} items • Total: ${selectedOrder?.total.toFixed(2)}
              {selectedOrder?.discount > 0 && ` • ${selectedOrder.discount}% discount`}
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && <OrderDetails items={selectedOrder.items} />}
        </DialogContent>
      </Dialog>

      <PasswordDialog
        open={passwordDialog}
        onClose={() => setPasswordDialog(false)}
        onConfirm={handleConfirm}
      />

      <ConfirmDialog
        open={confirmDialog}
        onClose={() => setConfirmDialog(false)}
        onConfirm={() => { deleteOrder(selectedOrder.id); }}
        message="Are you sure you want to delete this order?"
      />
    </>
  )
}
