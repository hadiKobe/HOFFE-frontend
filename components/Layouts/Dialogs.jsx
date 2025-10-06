"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

function ConfirmDialog({ open, onClose, onConfirm, message }) {
   return (
      <Dialog open={open} onOpenChange={onClose}>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Confirmation</DialogTitle>
            </DialogHeader>

            <div className="mt-2">{message || "Are you sure?"}</div>

            <DialogFooter className="mt-4 flex justify-end gap-2">
               <Button variant="outline" onClick={onClose}>Cancel</Button>
               <Button variant="destructive" onClick={() => { onConfirm(); onClose() }}>Delete</Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
}

function PasswordDialog({ open, onClose, onConfirm }) {
   const [password, setPassword] = useState("");

   const handleConfirm = () => {
      onConfirm(password);
      setPassword(""); // clear after submit
   };

   return (
      <Dialog open={open} onOpenChange={onClose}>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Enter Password</DialogTitle>
            </DialogHeader>
            <Input
               type="password"
               placeholder="Enter password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
            />
            <DialogFooter className="flex justify-end gap-2">
               <Button variant="outline" onClick={onClose}>Cancel</Button>
               <Button onClick={handleConfirm}>Confirm</Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
}

export { PasswordDialog, ConfirmDialog };