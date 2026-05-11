import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Linkedin, MapPin, Phone, Mail } from "lucide-react";
import logo from "@/assets/logo.png";

export function SiteFooter() {
  return (
    <footer className="bg-footer text-footer-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand">
              <img src={logo} alt="" width={28} height={28} className="h-7 w-7" />
            </div>
            <span className="text-xl font-bold">
              <span className="text-brand">Kilo</span>Kart
            </span>
          </div>
          <p className="mt-4 text-sm text-footer-foreground/70">
            Premium farm-to-fork poultry supply chain. Serving homes with the freshest quality chicken, delivered within minutes.
          </p>
          <div className="mt-5 flex gap-3">
            {[Instagram, Facebook, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-semibold">Quick Links</h4>
          <ul className="space-y-3 text-sm text-footer-foreground/70">
            <li><Link to="/" className="hover:text-brand">Home</Link></li>
            <li><Link to="/orders" className="hover:text-brand">My Orders</Link></li>
            <li><a href="#" className="hover:text-brand">Profile</a></li>
            <li><a href="#" className="hover:text-brand">Cart</a></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold">Legal</h4>
          <ul className="space-y-3 text-sm text-footer-foreground/70">
            <li><a href="#" className="hover:text-brand">Terms of Service</a></li>
            <li><a href="#" className="hover:text-brand">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-brand">Refund Policy</a></li>
            <li><a href="#" className="hover:text-brand">FSSAI License</a></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold">Contact Us</h4>
          <ul className="space-y-3 text-sm text-footer-foreground/70">
            <li className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 text-brand" /> KiloKart HQ, DBR Bylu, Mangunta, Chittoor, Andhra Pradesh 517167</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 shrink-0 text-brand" /> +91 7995060427</li>
            <li className="flex gap-2"><Mail className="h-4 w-4 shrink-0 text-brand" /> orders@kilokart.in</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-5 text-xs text-footer-foreground/60 md:flex-row">
          <p>© 2026 KiloKart. All rights reserved.</p>
          <p>Made with <span className="text-brand">♥</span> by KiloKart Solutions</p>
        </div>
      </div>
    </footer>
  );
}
