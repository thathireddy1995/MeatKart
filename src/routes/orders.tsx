import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Package } from "lucide-react";

export const Route = createFileRoute("/orders")({
  component: Orders,
  head: () => ({ meta: [{ title: "My Orders — MeatKart" }] }),
});

const dummyOrders = [
  { id: "MK-1042", date: "May 02, 2026", items: "Biriyani cut, Eggs", total: 587, status: "Delivered" },
  { id: "MK-1031", date: "Apr 28, 2026", items: "Whole bird with skin", total: 230, status: "Delivered" },
  { id: "MK-1019", date: "Apr 21, 2026", items: "Drumstick, Mince", total: 760, status: "Cancelled" },
];

function Orders() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-12">
        <h1 className="mb-8 text-3xl font-bold">My Orders</h1>
        <div className="space-y-4">
          {dummyOrders.map((o) => (
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
      </main>
      <SiteFooter />
    </div>
  );
}
