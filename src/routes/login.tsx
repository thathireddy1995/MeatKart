import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/login")({
  component: Login,
  head: () => ({ meta: [{ title: "Login — MeatKart" }] }),
});

function Login() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="w-full max-w-md rounded-2xl border bg-card p-8 shadow-sm">
          <h1 className="mb-2 text-2xl font-bold">Welcome back</h1>
          <p className="mb-6 text-sm text-muted-foreground">Login to track orders and reorder favourites.</p>
          <form className="space-y-4">
            <input type="tel" placeholder="Mobile number" className="w-full rounded-md border bg-background px-4 py-3 text-sm outline-none focus:border-brand" />
            <button type="button" className="w-full rounded-md bg-brand py-3 font-semibold text-brand-foreground hover:opacity-90">
              Send OTP
            </button>
          </form>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
