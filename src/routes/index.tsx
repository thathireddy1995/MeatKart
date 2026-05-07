import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, MapPin, ChevronRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductCard } from "@/components/ProductCard";
import { categories, products } from "@/data/products";
import heroImg from "@/assets/hero-farm.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "MeatKart — Fresh Farm-to-Fork Chicken Delivered" },
      { name: "description", content: "Order fresh chicken cuts, whole birds, eggs and more from MeatKart. Premium quality, delivered within minutes." },
    ],
  }),
});

function Index() {
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = products.filter(
    (p) =>
      (active === "All" || p.category === active) &&
      p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <section className="relative">
        <img
          src={heroImg}
          alt="Free range chickens on a farm"
          width={1920}
          height={600}
          className="h-[420px] w-full object-cover"
        />
      </section>

      <section className="border-b bg-background py-8">
        <div className="mx-auto max-w-3xl px-6">
          <div className="flex items-center gap-3 rounded-full border bg-background px-5 py-3 shadow-sm">
            <Search className="h-5 w-5 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search fresh cuts..."
              className="flex-1 bg-transparent text-sm outline-none"
            />
          </div>
        </div>
      </section>

      <section className="bg-brand-soft">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-brand" />
            <span className="font-semibold">Delivering from:</span>
            <span className="text-foreground/80">Tirupathi (Mangalam)</span>
          </div>
          <button className="flex items-center gap-1 rounded-full bg-background px-4 py-1.5 text-sm font-medium text-brand shadow-sm">
            Change <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-8">
        <div className="flex flex-wrap gap-3">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
                active === c
                  ? "border-brand bg-brand text-brand-foreground"
                  : "border-border bg-background text-foreground/70 hover:border-brand/40"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <main className="mx-auto w-full max-w-7xl flex-1 px-6 pb-16">
        <h1 className="mb-6 text-2xl font-bold">Featured Products</h1>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
