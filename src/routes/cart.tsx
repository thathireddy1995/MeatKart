import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, MapPin, ChevronRight, ShoppingCart, ShoppingBag, Plus, Minus, Trash2 } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useCart } from "@/hooks/use-cart";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/api";
import { toast } from "sonner";

export const Route = createFileRoute("/cart")({
  component: CartPage,
});

function CartPage() {
  const navigate = useNavigate();
  const { items, addToCart, decreaseQuantity, removeFromCart, totalItems } = useCart();
  
  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ["products", "All"],
    queryFn: () => fetchProducts("All"),
  });

  const cartDetails = items.map(item => {
    const product = allProducts.find((p: any) => String(p.id) === String(item.productId));
    return { ...item, product };
  }).filter(item => item.product);

  const totalPrice = cartDetails.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const handleCheckout = () => {
    const user = localStorage.getItem("user");
    if (!user) {
      toast.info("Please login to proceed with payment");
      navigate({ to: "/login" });
      return;
    }
    // Proceed to payment logic would go here
    toast.success("Proceeding to payment...");
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      {/* Delivery Bar */}
      <section className="bg-[#FFF8F1] border-b">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-brand" />
            <span className="font-medium text-foreground/60">Delivering from:</span>
            <span className="font-bold text-foreground/80">Tirupathi (Mangalam)</span>
          </div>
          <button className="flex items-center gap-1 rounded-full bg-white px-4 py-1 text-sm font-bold text-brand shadow-sm border border-brand/10">
            Change <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-12">
        {/* Page Header */}
        <div className="mb-10 flex items-center gap-4">
          <button 
            onClick={() => window.history.back()}
            className="rounded-full p-2 hover:bg-muted transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Your Cart</h1>
        </div>

        {isLoading ? (
          <div className="flex h-64 flex-col items-center justify-center gap-4">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand border-t-transparent" />
            <p className="text-muted-foreground font-medium">Loading your cart...</p>
          </div>
        ) : cartDetails.length === 0 ? (
          /* Empty State - Matches Screenshot */
          <div className="flex flex-col items-center justify-center py-20 text-center">
             <div className="relative mb-8">
                <div className="absolute -inset-4 rounded-full bg-brand/5 blur-2xl" />
                <ShoppingCart className="h-32 w-32 text-slate-300 stroke-[1.5px]" />
                <div className="absolute top-0 right-0 h-4 w-4 rounded-full bg-slate-200 animate-pulse" />
             </div>
            <h2 className="text-2xl font-bold text-slate-800">Your cart is empty</h2>
            <p className="mt-2 text-slate-500 font-medium max-w-xs">
              Looks like you haven't added anything yet
            </p>
            <Link
              to="/"
              className="mt-10 rounded-xl bg-brand px-12 py-4 text-sm font-black tracking-widest text-brand-foreground shadow-xl shadow-brand/20 transition hover:opacity-90 active:scale-95 uppercase"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          /* Cart List */
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
              {cartDetails.map((item) => (
                <div key={item.productId} className="flex gap-5 rounded-2xl border bg-card p-4 shadow-sm transition hover:shadow-md">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-muted">
                    <img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col justify-between py-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-foreground text-lg">{item.product.name}</h3>
                        <p className="text-sm font-medium text-brand">₹{item.product.price} / {item.product.unit}</p>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.productId)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                       <div className="flex items-center rounded-xl border bg-muted/50 p-1.5">
                        <button 
                          onClick={() => decreaseQuantity(item.productId)}
                          className="rounded-lg p-1.5 hover:bg-background hover:text-brand transition-all shadow-sm"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-12 text-center text-base font-black">{item.quantity}</span>
                        <button 
                          onClick={() => addToCart(item.productId)}
                          className="rounded-lg p-1.5 hover:bg-background hover:text-brand transition-all shadow-sm"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-xl font-black text-foreground">₹{item.product.price * item.quantity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-3xl border bg-card p-8 shadow-sm">
                <h3 className="text-xl font-bold mb-6">Order Summary</h3>
                <div className="space-y-4 border-b pb-6">
                  <div className="flex justify-between text-muted-foreground font-medium">
                    <span>Subtotal</span>
                    <span>₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground font-medium">
                    <span>Delivery Fee</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                </div>
                <div className="flex justify-between py-6 text-2xl font-black text-foreground">
                  <span>Total</span>
                  <span>₹{totalPrice}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full rounded-2xl bg-brand py-5 text-center text-sm font-black tracking-[0.2em] text-brand-foreground shadow-2xl shadow-brand/30 transition hover:opacity-95 active:scale-[0.98] uppercase"
                >
                  Proceed to Payment
                </button>
                <div className="mt-6 flex flex-col gap-3">
                    <p className="text-center text-xs text-muted-foreground font-bold uppercase tracking-tighter">
                        Safe & Secure Payments
                    </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
