"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"

const styles = {
   form: "space-y-4 mt-4",
   label: "text-sm font-medium text-foreground",
   flavors: "flex flex-wrap gap-2 mt-2",
   flavorBadge: "px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full flex items-center gap-1",
   flavorInput: "flex gap-2 items-center mt-2",
}

export default function FormDialog({ open, onClose, onSubmit }) {
   const [formData, setFormData] = useState({
      name: "",
      price: "",
      flavors: [],
   })
   const [newFlavor, setNewFlavor] = useState("")

   // Handle form submission
   const handleSubmit = () => {
      if (!formData.name || !formData.price) {
         alert("Please fill in all required fields")
         return
      }

      const newItem = {
         id: Date.now(), // Generate a temporary ID
         name: formData.name,
         price: Number.parseFloat(formData.price),
         flavors: formData.flavors,
      }

      onSubmit(newItem)
      handleClose()
   }

   // Handle closing and resetting form
   const handleClose = () => {
      setFormData({ name: "", price: "", flavors: [] })
      setNewFlavor("")
      onClose()
   }

   // Handle adding a flavor
   const handleAddFlavor = () => {
      if (newFlavor.trim()) {
         setFormData({
            ...formData,
            flavors: [...formData.flavors, newFlavor.trim()],
         })
         setNewFlavor("")
      }
   }

   // Handle removing a flavor
   const handleRemoveFlavor = (index) => {
      setFormData({
         ...formData,
         flavors: formData.flavors.filter((_, i) => i !== index),
      })
   }

   return (
      <Dialog open={open} onOpenChange={handleClose}>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Add New Menu Item</DialogTitle>
            </DialogHeader>

            <div className={styles.form}>
               {/* Name input */}
               <div>
                  <label className={styles.label}>Name *</label>
                  <Input
                     value={formData.name}
                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                     placeholder="Item name"
                  />
               </div>

               {/* Price input */}
               <div>
                  <label className={styles.label}>Price *</label>
                  <Input
                     type="number"
                     step="0.01"
                     value={formData.price}
                     onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                     placeholder="0.00"
                  />
               </div>

               {/* Flavors */}
               <div>
                  <label className={styles.label}>Flavors</label>
                  <div className={styles.flavors}>
                     {formData.flavors.map((flavor, index) => (
                        <div key={index} className={styles.flavorBadge}>
                           {flavor}
                           <X
                              className="w-3 h-3 cursor-pointer hover:text-destructive"
                              onClick={() => handleRemoveFlavor(index)}
                           />
                        </div>
                     ))}
                  </div>
                  <div className={styles.flavorInput}>
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
            </div>

            <DialogFooter className="flex justify-end gap-2 mt-4">
               <Button variant="outline" onClick={handleClose}>
                  Cancel
               </Button>
               <Button onClick={handleSubmit}>Add Item</Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}
