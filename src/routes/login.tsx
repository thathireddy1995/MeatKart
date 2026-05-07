import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { requestOtp, verifyOtp } from "@/lib/api";
import { toast } from "sonner";
import { Loader2, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/login")({
  component: Login,
  head: () => ({ meta: [{ title: "Login — MeatKart" }] }),
});

function Login() {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }
    if (username.trim().length < 3) {
      toast.error("Username must be at least 3 characters");
      return;
    }

    setLoading(true);
    try {
      const res = await requestOtp(phone, username);
      if (res.status === "success") {
        setStep("otp");
        toast.success("OTP sent to your mobile");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Connection failed. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("Please enter 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      const res = await verifyOtp(phone, otp);
      if (res.status === "success") {
        toast.success("Welcome to MeatKart!");
        // Store token in local storage
        localStorage.setItem("user", JSON.stringify(res.user));
        localStorage.setItem("token", res.token);
        navigate({ to: "/" });
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="w-full max-w-md rounded-2xl border bg-card p-8 shadow-sm">
          {step === "otp" && (
            <button
              onClick={() => setStep("phone")}
              className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" /> Change number
            </button>
          )}

          <h1 className="mb-2 text-2xl font-bold">
            {step === "phone" ? "Welcome back" : "Verify OTP"}
          </h1>
          <p className="mb-6 text-sm text-muted-foreground">
            {step === "phone"
              ? "Login to track orders and reorder favourites."
              : `Enter the 6-digit code sent to +91 ${phone}`}
          </p>

          <form onSubmit={step === "phone" ? handleRequestOtp : handleVerifyOtp} className="space-y-4">
            {step === "phone" ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Username</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full rounded-md border bg-background px-4 py-3 text-sm outline-none focus:border-brand"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Mobile Number</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">+91</span>
                    <input
                      type="tel"
                      placeholder="Mobile number"
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                      className="w-full rounded-md border bg-background py-3 pl-12 pr-4 text-sm outline-none focus:border-brand"
                      required
                    />
                  </div>
                </div>
              </div>
            ) : (
              <input
                type="text"
                placeholder="6-digit OTP"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                className="w-full rounded-md border bg-background px-4 py-3 text-center text-lg tracking-widest outline-none focus:border-brand"
                required
                autoFocus
              />
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-brand py-3 font-semibold text-brand-foreground hover:opacity-90 disabled:opacity-50"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {step === "phone" ? "Send OTP" : "Verify & Login"}
            </button>
          </form>

          {step === "otp" && (
            <p className="mt-6 text-center text-xs text-muted-foreground">
              Didn't receive the code? <button onClick={handleRequestOtp} className="font-semibold text-brand underline">Resend</button>
            </p>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
