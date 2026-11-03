import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Logo } from "@/components/app/ui";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => seo("Welcome", "Giga Group client app — your investment, your information, complete transparency."),
  component: Splash,
});

function Splash() {
  const navigate = useNavigate();
  useEffect(() => {
    const t = setTimeout(() => navigate({ to: "/welcome" }), 2400);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <button onClick={() => navigate({ to: "/welcome" })} className="bg-navy-gradient relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden text-primary-foreground">
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-primary-foreground/10" />
      <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full border border-teal/30" />
      <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full border border-primary-foreground/10" />
      <div className="animate-in fade-in zoom-in-95 flex flex-col items-center duration-700">
        <div className="grid h-20 w-20 place-items-center rounded-3xl bg-primary-foreground/10 ring-1 ring-primary-foreground/20">
          <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none">
            <path d="M4 20V9l8-5 8 5v11" className="stroke-teal" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M9 20v-6h6v6" className="stroke-primary-foreground" strokeWidth="1.8" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 className="mt-6 text-[30px] font-semibold">Giga Group</h1>
        <p className="mt-3 max-w-[260px] text-center text-[13.5px] leading-relaxed text-primary-foreground/70">
          Your Investment. Your Information. Complete Transparency.
        </p>
      </div>
      <div className="absolute bottom-20 h-1 w-28 overflow-hidden rounded-full bg-primary-foreground/15">
        <div className="h-full w-1/2 animate-[scan_1.4s_ease-in-out_infinite] rounded-full bg-teal" style={{ animationName: "slide" }} />
      </div>
      <style>{`@keyframes slide{0%{transform:translateX(-100%)}100%{transform:translateX(200%)}}`}</style>
      <Logo light className="sr-only" />
    </button>
  );
}
