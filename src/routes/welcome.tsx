import { createFileRoute, Link } from "@tanstack/react-router";
import { FileCheck2, ShieldCheck, Wallet } from "lucide-react";
import hero from "@/assets/project-residential.jpg";
import { Logo } from "@/components/app/ui";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/welcome")({
  head: () => seo("Get Started", "Sign in or create your Giga Group client account."),
  component: Welcome,
});

function Welcome() {
  return (
    <div className="flex min-h-screen flex-col bg-navy-deep">
      <div className="relative h-[52vh] min-h-[380px]">
        <img src={hero} alt="Giga Group residential towers" className="h-full w-full object-cover" width={1024} height={768} />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/40 via-transparent to-navy-deep" />
        <Logo light className="absolute left-5 top-[max(env(safe-area-inset-top),20px)]" />
      </div>
      <div className="-mt-10 flex flex-1 flex-col rounded-t-[28px] bg-background px-6 pb-8 pt-8">
        <h1 className="text-[26px] font-semibold leading-tight text-primary">Welcome to Giga Group</h1>
        <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
          Access your investment information, follow every payment and approval, and reach our team — securely, in one place.
        </p>
        <div className="mt-5 grid grid-cols-3 gap-2">
          {[
            { i: Wallet, t: "Payments" },
            { i: FileCheck2, t: "Approvals" },
            { i: ShieldCheck, t: "Secure" },
          ].map(({ i: I, t }) => (
            <div key={t} className="flex flex-col items-center gap-1.5 rounded-xl bg-card py-3 shadow-card">
              <I className="h-5 w-5 text-teal" />
              <span className="text-[11.5px] font-semibold text-primary">{t}</span>
            </div>
          ))}
        </div>
        <div className="mt-auto space-y-3 pt-8">
          <Link to="/login" className="flex h-12 items-center justify-center rounded-xl bg-teal text-[15px] font-semibold text-teal-foreground shadow-float">
            Sign In
          </Link>
          <Link to="/register" className="flex h-12 items-center justify-center rounded-xl border border-border bg-card text-[15px] font-semibold text-primary">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
