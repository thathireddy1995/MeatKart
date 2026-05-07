import { Link } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import logo from "@/assets/logo.png";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand">
            <img src={logo} alt="MeatKart logo" width={32} height={32} className="h-8 w-8" />
          </div>
          <span className="text-2xl font-bold tracking-tight">
            Meat<span className="text-brand">Kart</span>
          </span>
        </Link>
        <nav className="flex items-center gap-7 text-sm font-medium">
          <Link to="/" className="text-brand" activeProps={{ className: "text-brand" }}>
            Home
          </Link>
          <Link to="/orders" className="text-foreground/80 hover:text-brand">
            Orders
          </Link>
          <button aria-label="Cart" className="text-foreground/70 hover:text-brand">
            <ShoppingCart className="h-5 w-5" />
          </button>
          <span className="h-6 w-px bg-border" />
          <Link
            to="/login"
            className="rounded-md bg-brand px-6 py-2 text-brand-foreground shadow-sm transition hover:opacity-90"
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}
