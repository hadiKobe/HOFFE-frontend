"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

const styles = {
   container:
      "aspect-square w-full flex flex-col items-center justify-center p-3 rounded-lg bg-card border border-border cursor-pointer transition-colors overflow-hidden text-center hover:bg-accent",
   title: "font-semibold leading-tight text-balance break-words text-center",
   price: "text-sm font-bold text-primary mt-1",
}

export default function ItemPOS({ item, onClick }) {
   const { name, price, flavors } = item
   const [isFlavorDialogOpen, setIsFlavorDialogOpen] = useState(false)

   const handleClick = () => {
      if (flavors && flavors.length > 0) {
         setIsFlavorDialogOpen(true)
      } else {
         onClick(item)
      }
   }

   const handleFlavorSelect = (flavor) => {
      onClick({ ...item, selectedFlavor: flavor })
      setIsFlavorDialogOpen(false)
   }

   return (
      <>
         <div className={styles.container} onClick={handleClick}>
            <h3
               className={styles.title}
               style={{
                  fontSize: "clamp(0.7rem, 1.8vw, 1rem)",
                  lineHeight: "1.1",
               }}
            >
               {name}
            </h3>
            <p className={styles.price}>${price.toFixed(2)}</p>
         </div>

         <Dialog open={isFlavorDialogOpen} onOpenChange={setIsFlavorDialogOpen}>
            <DialogContent className="sm:max-w-md">
               <DialogHeader>
                  <DialogTitle>Choose Flavor</DialogTitle>
                  <DialogDescription>Select a flavor for {name}</DialogDescription>
               </DialogHeader>
               <div className="grid grid-cols-2 gap-2 py-4">
                  {flavors?.map((flavor) => (
                     <Button key={flavor} variant="outline" onClick={() => handleFlavorSelect(flavor)} className="h-auto py-3">
                        {flavor}
                     </Button>
                  ))}
               </div>
            </DialogContent>
         </Dialog>
      </>
   )
}
