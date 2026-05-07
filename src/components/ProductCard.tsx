import type { Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-card shadow-sm transition hover:shadow-md">
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-sm font-medium text-foreground">{product.name}</h3>
        <div className="my-3 h-px bg-border" />
        <p className="text-lg font-bold">
          ₹{product.price} <span className="text-sm font-normal text-muted-foreground">/ {product.unit}</span>
        </p>
        <button className="mt-3 w-full rounded-md border border-brand/30 bg-brand-soft py-2 text-sm font-semibold tracking-wider text-brand transition hover:bg-brand hover:text-brand-foreground">
          ADD
        </button>
      </div>
    </div>
  );
}
