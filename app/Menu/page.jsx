"use client"

import { useState } from "react"
import  useMenu  from "@/hooks/useMenu"
import MenuList from "@/components/Menu/List"
import FormDialog from "@/components/Menu/FormDialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

const styles = {
   container: "container mx-auto px-4 py-8",
   header: "flex items-center justify-between mb-8",
   title: "text-3xl font-bold text-foreground",
   loading: "text-center py-12 text-muted-foreground",
   error: "text-center py-12 text-destructive",
}

export default function MenuPage() {
   const { menu, loading, error, addMenuItem, updateMenuItem, deleteMenuItem } = useMenu()
   const [showAddDialog, setShowAddDialog] = useState(false)

   // Handle adding a new menu item
   const handleAddItem = (newItem) => {
      addMenuItem(newItem)
   }

   // Handle updating a menu item
   const handleUpdateItem = (id, updatedData) => {
      updateMenuItem(id, updatedData)
   }

   // Handle deleting a menu item
   const handleDeleteItem = (id) => {
      deleteMenuItem(id)
   }

   if (loading) {
      return <div className={styles.loading}>Loading menu...</div>
   }

   if (error) {
      return <div className={styles.error}>Error: {error}</div>
   }

   return (
      <div className={styles.container}>
         {/* Header with title and add button */}
         <div className={styles.header}>
            <h1 className={styles.title}>Menu Management</h1>
            <Button onClick={() => setShowAddDialog(true)}>
               <Plus className="w-4 h-4 mr-2" />
               Add Item
            </Button>
         </div>

         {/* Menu items list */}
         <MenuList items={menu} onUpdate={handleUpdateItem} onDelete={handleDeleteItem} />

         {/* Add item dialog */}
         <FormDialog open={showAddDialog} onClose={() => setShowAddDialog(false)} onSubmit={handleAddItem} />
      </div>
   )
}
