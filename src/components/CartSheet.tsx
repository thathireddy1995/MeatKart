import React from "react";
import { X, ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/api";

export function CartSheet({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, addToCart, decreaseQuantity, totalItems } = useCart();
  
  // We need product details to show names/images
  const { data: allProducts = [], isLoading: isLoadingProducts } = useQuery({
    queryKey: ["products", "All"],
    queryFn: () => fetchProducts("All"),
    // Only fetch when the cart is open to save resources
    enabled: isOpen,
  });

  const cartDetails = items.map(item => {
    const product = allProducts.find((p: any) => String(p.id) === String(item.productId));
    return {
      ...item,
      product
    };
  }).filter(item => item.product);

  const totalPrice = cartDetails.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md transform bg-background shadow-2xl transition duration-500 ease-in-out sm:duration-700">
          <div className="flex h-full flex-col">
            {/* Header */}
            <div className="flex items-center justify-between border-b px-6 py-5">
              <h2 className="text-xl font-bold flex items-center gap-2 text-foreground">
                <ShoppingBag className="h-5 w-5 text-brand" />
                Your Cart <span className="text-sm font-normal text-muted-foreground">({totalItems} items)</span>
              </h2>
              <button onClick={onClose} className="rounded-full p-2 hover:bg-muted transition-colors">
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {isLoadingProducts ? (
                <div className="flex h-full items-center justify-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand border-t-transparent" />
                    <p className="text-xs">Updating cart...</p>
                  </div>
                </div>
              ) : cartDetails.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center opacity-60">
                  <div className="mb-4 rounded-full bg-brand-soft p-6">
                    <ShoppingBag className="h-12 w-12 text-brand" />
                  </div>
                  <h3 className="text-lg font-semibold">Your cart is empty</h3>
                  <p className="mt-1 text-sm">Looks like you haven't added any fresh cuts yet.</p>
                  <button 
                    onClick={onClose}
                    className="mt-6 rounded-full bg-brand px-8 py-2 text-sm font-bold text-brand-foreground shadow-sm hover:opacity-90"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <ul className="space-y-6">
                  {cartDetails.map((item) => (
                    <li key={item.productId} className="flex gap-4">
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border bg-muted">
                        <img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <h4 className="text-sm font-bold text-foreground">{item.product.name}</h4>
                          <p className="mt-1 text-sm font-medium text-brand">₹{item.product.price} / {item.product.unit}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center rounded-lg border bg-muted/30 p-1">
                            <button 
                                onClick={() => decreaseQuantity(item.productId)}
                                className="p-1 hover:text-brand transition-colors"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                            <button 
                                onClick={() => addToCart(item.productId)}
                                className="p-1 hover:text-brand transition-colors"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <p className="text-sm font-bold text-foreground">₹{item.product.price * item.quantity}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {cartDetails.length > 0 && (
              <div className="border-t px-6 py-8 bg-muted/5">
                <div className="flex justify-between text-base font-bold text-foreground mb-6">
                  <p>Grand Total</p>
                  <p className="text-xl text-brand">₹{totalPrice}</p>
                </div>
                <button className="w-full rounded-xl bg-brand py-4 text-center text-sm font-bold tracking-widest text-brand-foreground shadow-lg shadow-brand/20 transition hover:opacity-95 active:scale-[0.98]">
                  PROCEED TO CHECKOUT
                </button>
                <p className="mt-4 text-center text-xs text-muted-foreground">
                  Free delivery for orders above ₹500
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
