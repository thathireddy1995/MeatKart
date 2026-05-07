import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Package, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "@/lib/api";

export const Route = createFileRoute("/orders")({
  component: Orders,
  head: () => ({ meta: [{ title: "My Orders — MeatKart" }] }),
});

function Orders() {
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-12">
        <h1 className="mb-8 text-3xl font-bold">My Orders</h1>
        {isLoading ? (
          <div className="flex h-64 flex-col items-center justify-center gap-4 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin text-brand" />
            <p>Loading your orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center gap-4 text-muted-foreground">
            <Package className="h-12 w-12 opacity-20" />
            <p>No orders found yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((o: any) => (
              <div key={o.id} className="flex items-center justify-between rounded-2xl border bg-card p-5 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft text-brand">
                    <Package className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">Order #{o.id}</p>
                    <p className="text-sm text-muted-foreground">{o.items} • {o.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">₹{o.total}</p>
                  <span className={`text-xs font-medium ${o.status === "Delivered" ? "text-brand" : "text-destructive"}`}>{o.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
