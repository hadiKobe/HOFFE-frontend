"use client"

import useVerifyPassword from "@/hooks/useVerifyPassword";
import { useState } from "react"
import { Pencil, Trash2, Check, X } from "lucide-react"
import { ConfirmDialog, PasswordDialog } from "@/components/Layouts/Dialogs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const styles = {
   card: "bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow",
   header: "flex items-start justify-between mb-3",
   content: "space-y-2",
   name: "text-lg font-semibold text-foreground",
   price: "text-xl font-bold text-primary",
   flavors: "flex flex-wrap gap-1 mt-2",
   flavorBadge: "px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full",
   actions: "flex gap-2",
   iconButton: "p-2 hover:bg-muted rounded-md transition-colors",
   editForm: "space-y-3",
   flavorInput: "flex gap-2 items-center",
}

export default function MenuItem({ item, onUpdate, onDelete }) {
   const { verifyPassword } = useVerifyPassword()

   const [isEditing, setIsEditing] = useState(false)
   const [editedItem, setEditedItem] = useState(item)
   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
   const [showPasswordDialog, setShowPasswordDialog] = useState(false)
   const [newFlavor, setNewFlavor] = useState("")

   // Handle saving edited item
   const handleSave = () => {
      onUpdate(item.id, editedItem)
      setIsEditing(false)
   }

   // Handle cancel editing
   const handleCancel = () => {
      setEditedItem(item)
      setIsEditing(false)
   }

   // Handle delete with password confirmation
   const handleDeleteClick = () => {
      setShowDeleteConfirm(true)
   }

   const handleConfirmDelete = () => {
      setShowDeleteConfirm(false)
      setShowPasswordDialog(true)
   }

   const handlePasswordConfirm = async (password) => {
      // Check password (you can customize this)
      const ok = await verifyPassword(password);
      if (ok) {
         onDelete(item.id)
         setShowPasswordDialog(false)
      } else {
         alert("Incorrect password!")
      }
   }

   // Handle adding a new flavor
   const handleAddFlavor = () => {
      if (newFlavor.trim()) {
         setEditedItem({
            ...editedItem,
            flavors: [...(editedItem.flavors || []), newFlavor.trim()],
         })
         setNewFlavor("")
      }
   }

   // Handle removing a flavor
   const handleRemoveFlavor = (index) => {
      setEditedItem({
         ...editedItem,
         flavors: editedItem.flavors.filter((_, i) => i !== index),
      })
   }

   if (isEditing) {
      return (
         <div className={styles.card}>
            <div className={styles.editForm}>
               {/* Name input */}
               <div>
                  <label className="text-sm font-medium text-foreground">Name</label>
                  <Input
                     value={editedItem.name}
                     onChange={(e) => setEditedItem({ ...editedItem, name: e.target.value })}
                     placeholder="Item name"
                  />
               </div>

               {/* Price input */}
               <div>
                  <label className="text-sm font-medium text-foreground">Price</label>
                  <Input
                     type="number"
                     step="0.01"
                     value={editedItem.price}
                     onChange={(e) => setEditedItem({ ...editedItem, price: Number.parseFloat(e.target.value) })}
                     placeholder="Price"
                  />
               </div>

               {/* Flavors */}
               <div>
                  <label className="text-sm font-medium text-foreground">Flavors</label>
                  <div className={styles.flavors}>
                     {editedItem.flavors?.map((flavor, index) => (
                        <div key={index} className={styles.flavorBadge + " flex items-center gap-1"}>
                           {flavor}
                           <X
                              className="w-3 h-3 cursor-pointer hover:text-destructive"
                              onClick={() => handleRemoveFlavor(index)}
                           />
                        </div>
                     ))}
                  </div>
                  <div className={styles.flavorInput + " mt-2"}>
                     <Input
                        value={newFlavor}
                        onChange={(e) => setNewFlavor(e.target.value)}
                        placeholder="Add flavor"
                        onKeyPress={(e) => e.key === "Enter" && handleAddFlavor()}
                     />
                     <Button onClick={handleAddFlavor} size="sm">
                        Add
                     </Button>
                  </div>
               </div>

               {/* Action buttons */}
               <div className={styles.actions}>
                  <Button onClick={handleSave} size="sm">
                     <Check className="w-4 h-4 mr-1" />
                     Save
                  </Button>
                  <Button onClick={handleCancel} variant="outline" size="sm">
                     <X className="w-4 h-4 mr-1" />
                     Cancel
                  </Button>
               </div>
            </div>
         </div>
      )
   }

   return (
      <>
         <div className={styles.card}>
            <div className={styles.header}>
               <div className={styles.content}>
                  <h3 className={styles.name}>{item.id} - {item.name} </h3>
                  <p className={styles.price}>${item.price.toFixed(2)}</p>
                  {item.flavors && item.flavors.length > 0 && (
                     <div className={styles.flavors}>
                        {item.flavors.map((flavor, index) => (
                           <span key={index} className={styles.flavorBadge}>
                              {flavor}
                           </span>
                        ))}
                     </div>
                  )}
               </div>


               <div className={styles.actions}>
                  <button onClick={() => setIsEditing(true)} className={styles.iconButton}>
                     <Pencil className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                  </button>
                  <button onClick={handleDeleteClick} className={styles.iconButton}>
                     <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                  </button>
               </div>
            </div>
         </div>

         {/* Delete confirmation dialogs */}
         <ConfirmDialog
            open={showDeleteConfirm}
            onClose={() => setShowDeleteConfirm(false)}
            onConfirm={handleConfirmDelete}
            message={`Are you sure you want to delete "${item.name}"?`}
         />
         <PasswordDialog
            open={showPasswordDialog}
            onClose={() => setShowPasswordDialog(false)}
            onConfirm={handlePasswordConfirm}
         />
      </>
   )
}
