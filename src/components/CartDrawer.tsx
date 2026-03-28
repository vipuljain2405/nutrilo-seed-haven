import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState } from "react";

const CartDrawer = () => {
  const { items, isOpen, setIsOpen, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [checkingOut, setCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (!user) return;
    setCheckingOut(true);
    
    const { data: order, error } = await supabase
      .from("orders")
      .insert({ user_id: user.id, total: totalPrice, status: "pending" })
      .select()
      .single();

    if (error || !order) {
      toast.error("Failed to place order");
      setCheckingOut(false);
      return;
    }

    const orderItems = items.map(item => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.product.price,
    }));

    await supabase.from("order_items").insert(orderItems);
    await clearCart();
    setIsOpen(false);
    toast.success("Order placed successfully! We'll contact you for payment.");
    setCheckingOut(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-display">Your Cart</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            <ShoppingBag size={48} className="text-muted-foreground" />
            <p className="text-muted-foreground">Your cart is empty</p>
            <button onClick={() => { setIsOpen(false); navigate("/"); }} className="px-6 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium">
              Shop Now
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-4 py-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 p-3 rounded-xl bg-muted/50">
                  <img src={item.product.image_url || ""} alt={item.product.name} className="w-16 h-16 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-foreground truncate">{item.product.name}</h4>
                    <p className="text-sm text-primary font-bold">₹{item.product.price}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 rounded bg-background border border-border">
                        <Minus size={12} />
                      </button>
                      <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 rounded bg-background border border-border">
                        <Plus size={12} />
                      </button>
                      <button onClick={() => removeFromCart(item.id)} className="ml-auto p-1 text-destructive">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-3">
              <div className="flex justify-between text-foreground font-bold">
                <span>Total</span>
                <span>₹{totalPrice}</span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={checkingOut}
                className="w-full py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-button hover:-translate-y-0.5 transition-all disabled:opacity-50"
              >
                {checkingOut ? "Placing Order..." : "Place Order (COD)"}
              </button>
              <p className="text-xs text-muted-foreground text-center">
                Payment on delivery. Stripe coming soon!
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
