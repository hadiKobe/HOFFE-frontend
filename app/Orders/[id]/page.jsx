"use client"

// Import necessary React hooks and Next.js utilities
import { redirect } from "next/navigation";
import { useState, use } from "react"
import { useRouter } from "next/navigation"
import useOrders from "@/hooks/useOrders"
import useMenu from "@/hooks/useMenu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Styles object containing all Tailwind CSS classes for the component
// This keeps styling separate from JSX as per project requirements
const styles = {
  container: "min-h-screen bg-background p-6",
  header: "max-w-4xl mx-auto mb-6 flex items-center justify-between",
  title: "text-3xl font-bold text-foreground",
  actions: "flex gap-2",
  content: "max-w-4xl mx-auto space-y-6",
  orderInfo: "bg-card text-card-foreground rounded-lg border border-border p-6 space-y-4",
  infoGrid: "grid grid-cols-1 md:grid-cols-3 gap-4",
  field: "space-y-2",
  label: "text-sm font-medium text-foreground",
  itemsSection: "space-y-4",
  sectionTitle: "text-xl font-semibold text-foreground",
  itemCard: "bg-card text-card-foreground rounded-lg border border-border p-4 space-y-3",
  itemGrid: "grid grid-cols-1 md:grid-cols-2 gap-3",
  itemActions: "flex justify-end",
  addButton: "w-full",
  summary: "bg-muted rounded-lg p-4 space-y-2",
  summaryRow: "flex justify-between text-sm",
  summaryTotal: "flex justify-between text-lg font-bold pt-2 border-t border-border",
}

/**
 * OrderEditPage Component
 *
 * This is a dynamic route page that allows editing of a specific order.
 * Route: /Orders/[id] where [id] is the order ID
 *
 * Features:
 * - Edit order information (time, discount)
 * - Add items from menu
 * - Edit existing items (name, price, quantity, notes)
 * - Remove items from order
 * - Real-time calculation of subtotal, discount, and total
 * - Save or cancel changes
 */
export default function OrderEditPage({ params }) {
  // Unwrap the params promise (required in Next.js 15)
  const unwrappedParams = use(params)

  // Router for navigation (back to orders list)
  const router = useRouter()

  // Fetch all orders from the orders hook
  const { orders } = useOrders()

  // Fetch menu items and loading state from the menu hook
  const { menu, loading: menuLoading } = useMenu()

  // Extract and parse the order ID from URL params
  const orderId = Number.parseInt(unwrappedParams.id)

  // Find the specific order being edited
  const order = orders.find((o) => o.id === orderId)

  // State: Controls whether the "Add Item from Menu" dialog is open
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  // State: Stores the currently selected menu item ID in the add dialog
  const [selectedMenuItem, setSelectedMenuItem] = useState("")

  // State: Stores the edited version of the order
  // This is a local copy that gets modified as the user makes changes
  // Initial value is the original order, or a new order structure if not found
  const [editedOrder, setEditedOrder] = useState(
    order || {
      id: orderId,
      time: "",
      discount: 0,
      items: [],
    },
  )

  // If order doesn't exist, show error message
  if (!order) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <p className="text-center text-muted-foreground">Order not found</p>
        </div>
      </div>
    )
  }

  /**
   * handleSave
   * Saves the edited order and navigates back to the orders list
   * Currently logs to console (would integrate with backend/database in production)
   */
  const handleSave = () => {
    console.log("[v0] Saving order:", editedOrder)
    router.push("/")
  }

  /**
   * handleCancel
   * Discards changes and navigates back to the orders list
   */
  const handleCancel = () => {
    router.push("/")
  }

  /**
   * updateOrderField
   * Updates a top-level field in the order (time, discount, etc.)
   * @param {string} field - The field name to update
   * @param {any} value - The new value for the field
   */
  const updateOrderField = (field, value) => {
    setEditedOrder({ ...editedOrder, [field]: value })
  }

  /**
   * updateItem
   * Updates a specific field of an item in the order
   * @param {number} index - The index of the item in the items array
   * @param {string} field - The field name to update (name, price, quantity, note)
   * @param {any} value - The new value for the field
   */
  const updateItem = (index, field, value) => {
    const newItems = [...editedOrder.items]
    newItems[index] = { ...newItems[index], [field]: value }
    setEditedOrder({ ...editedOrder, items: newItems })
  }

  /**
   * removeItem
   * Removes an item from the order by index
   * @param {number} index - The index of the item to remove
   */
  const removeItem = (index) => {
    const newItems = editedOrder.items.filter((_, i) => i !== index)
    setEditedOrder({ ...editedOrder, items: newItems })
  }

  /**
   * addItem
   * Adds a selected menu item to the order
   * Creates a new item with quantity 1 and empty note
   * Closes the dialog after adding
   */
  const addItem = () => {
    // Validate that a menu item is selected
    if (!selectedMenuItem) return

    // Find the selected menu item from the menu
    const menuItem = menu.find((item) => item.id === Number.parseInt(selectedMenuItem))
    if (!menuItem) return

    // Create a new order item based on the menu item
    const newItem = {
      id: Date.now(), // Temporary ID (would be generated by backend in production)
      name: menuItem.name,
      price: menuItem.price,
      quantity: 1, // Default quantity
      note: "", // Empty note by default
    }

    // Add the new item to the order
    setEditedOrder({ ...editedOrder, items: [...editedOrder.items, newItem] })

    // Reset the dialog state
    setSelectedMenuItem("")
    setIsAddDialogOpen(false)
  }

  /**
   * calculateTotal
   * Calculates the final total after applying discount
   * @returns {string} The total amount formatted to 2 decimal places
   */
  const calculateTotal = () => {
    const subtotal = editedOrder.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const discountAmount = (subtotal * editedOrder.discount) / 100
    return (subtotal - discountAmount).toFixed(2)
  }

  /**
   * calculateSubtotal
   * Calculates the subtotal (sum of all items before discount)
   * @returns {string} The subtotal amount formatted to 2 decimal places
   */
  const calculateSubtotal = () => {
    return editedOrder.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
  }

  return (
    <div className={styles.container}>
      {/* Header Section: Title and action buttons */}
      <div className={styles.header}>
        <h1 className={styles.title}>Edit Order #{orderId}</h1>
        <div className={styles.actions}>
          {/* Cancel button: Discards changes and goes back */}
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          {/* Save button: Saves changes and goes back */}
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </div>

      <div className={styles.content}>
        {/* Order Information Section: Editable order-level fields */}
        <div className={styles.orderInfo}>
          <h2 className={styles.sectionTitle}>Order Information</h2>
          <div className={styles.infoGrid}>
            {/* Time field: When the order was placed */}
            <div className={styles.field}>
              <label className={styles.label}>Time</label>
              <Input
                value={editedOrder.time}
                onChange={(e) => updateOrderField("time", e.target.value)}
                placeholder="e.g., 10:30 AM"
              />
            </div>
            {/* Discount field: Percentage discount applied to the order */}
            <div className={styles.field}>
              <label className={styles.label}>Discount (%)</label>
              <Input
                type="number"
                value={editedOrder.discount}
                onChange={(e) => updateOrderField("discount", Number.parseFloat(e.target.value) || 0)}
                min="0"
                max="100"
              />
            </div>
            {/* Total Items field: Read-only count of items in the order */}
            <div className={styles.field}>
              <label className={styles.label}>Total Items</label>
              <Input value={editedOrder.items.length} disabled className="bg-muted" />
            </div>
          </div>
        </div>

        {/* Order Items Section: List of all items in the order */}
        <div className={styles.itemsSection}>
          <h2 className={styles.sectionTitle}>Order Items</h2>

          {/* Map through each item and render an editable card */}
          {editedOrder.items.map((item, index) => (
            <div key={item.id} className={styles.itemCard}>
              {/* Item fields grid: Name, Price, Quantity, Total */}
              <div className={styles.itemGrid}>
                {/* Item Name: Editable text field */}
                <div className={styles.field}>
                  <label className={styles.label}>Item Name</label>
                  <Input
                    value={item.name}
                    onChange={(e) => updateItem(index, "name", e.target.value)}
                    placeholder="e.g., Cappuccino"
                  />
                </div>
                {/* Item Price: Editable number field */}
                <div className={styles.field}>
                  <label className={styles.label}>Price ($)</label>
                  <Input
                    type="number"
                    value={item.price}
                    onChange={(e) => updateItem(index, "price", Number.parseFloat(e.target.value) || 0)}
                    min="0"
                    step="0.01"
                  />
                </div>
                {/* Item Quantity: Editable number field */}
                <div className={styles.field}>
                  <label className={styles.label}>Quantity</label>
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateItem(index, "quantity", Number.parseInt(e.target.value) || 1)}
                    min="1"
                  />
                </div>
                {/* Item Total: Calculated field (price × quantity) - Read-only */}
                <div className={styles.field}>
                  <label className={styles.label}>Total</label>
                  <Input value={`$${(item.price * item.quantity).toFixed(2)}`} disabled className="bg-muted" />
                </div>
              </div>
              {/* Item Note: Special instructions or customizations */}
              <div className={styles.field}>
                <label className={styles.label}>Note</label>
                <Textarea
                  value={item.note}
                  onChange={(e) => updateItem(index, "note", e.target.value)}
                  placeholder="Special instructions..."
                  rows={2}
                />
              </div>
              {/* Remove Item button: Deletes this item from the order */}
              <div className={styles.itemActions}>
                <Button variant="destructive" size="sm" onClick={() => removeItem(index)}>
                  Remove Item
                </Button>
              </div>
            </div>
          ))}

          {/* Add Item Dialog: Modal for selecting items from the menu */}
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            {/* Dialog trigger button */}
            <DialogTrigger asChild>
              <Button variant="outline" className={styles.addButton}>
                + Add Item from Menu
              </Button>
            </DialogTrigger>
            {/* Dialog content */}
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Item from Menu</DialogTitle>
                <DialogDescription>Select an item from the menu to add to this order.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                {/* Menu item selector dropdown */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Menu Item</label>
                  <Select value={selectedMenuItem} onValueChange={setSelectedMenuItem}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an item" />
                    </SelectTrigger>
                    <SelectContent>
                      {/* Map through menu items and create options */}
                      {menu.map((item) => (
                        <SelectItem key={item.id} value={item.id.toString()}>
                          {item.name} - ${item.price.toFixed(2)} ({item.category})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {/* Dialog action buttons */}
                <div className="flex justify-end gap-2">
                  {/* Cancel button: Closes dialog without adding */}
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  {/* Add button: Adds selected item to order (disabled if nothing selected) */}
                  <Button onClick={addItem} disabled={!selectedMenuItem}>
                    Add Item
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Order Summary Section: Shows subtotal, discount, and final total */}
        <div className={styles.summary}>
          {/* Subtotal: Sum of all items before discount */}
          <div className={styles.summaryRow}>
            <span>Subtotal:</span>
            <span>${calculateSubtotal()}</span>
          </div>
          {/* Discount: Amount deducted based on discount percentage */}
          <div className={styles.summaryRow}>
            <span>Discount ({editedOrder.discount}%):</span>
            <span>-${((calculateSubtotal() * editedOrder.discount) / 100).toFixed(2)}</span>
          </div>
          {/* Total: Final amount after discount */}
          <div className={styles.summaryTotal}>
            <span>Total:</span>
            <span>${calculateTotal()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
