import type { Product } from "@/data/products";
import { useCart } from "@/hooks/use-cart";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:shadow-md">
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-sm font-bold text-foreground font-heading">{product.name}</h3>
        <div className="my-3 h-px bg-border" />
        <p className="text-lg font-bold">
          ₹{product.price} <span className="text-sm font-normal text-muted-foreground">/ {product.unit}</span>
        </p>
        <button 
          onClick={() => addToCart(product.id)}
          className="mt-3 w-full rounded-md bg-brand py-2 text-sm font-bold tracking-wider text-brand-foreground transition hover:bg-primary"
        >
          ADD
        </button>
      </div>
    </div>
  );
}
