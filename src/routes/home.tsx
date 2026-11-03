import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, CalendarClock, CheckCircle2, FileText, MapPin, MessageSquarePlus, MessagesSquare, Receipt, Wallet, Workflow } from "lucide-react";
import { BellButton, BottomNav, Card, Logo, SectionTitle } from "@/components/app/ui";
import { activity, installments, pkr, projects } from "@/lib/data";
import { useStore } from "@/lib/store";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/home")({
  head: () => seo("Home", "Your Giga Group investment overview at a glance."),
  component: Home,
});

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? "Good Morning" : h < 17 ? "Good Afternoon" : "Good Evening";
}

function Home() {
  const { profile } = useStore();
  const p = projects[0];
  const outstanding = p.total - p.paid;
  const pct = Math.round((p.paid / p.total) * 100);
  const counts = (["Paid", "Pending", "Upcoming", "Overdue"] as const).map((s) => ({ s, n: installments.filter((i) => i.status === s).length }));
  const next = installments.find((i) => i.status === "Upcoming")!;

  return (
    <div className="pb-safe-nav min-h-screen">
      <div className="bg-navy-gradient rounded-b-[32px] px-5 pb-24 pt-[max(env(safe-area-inset-top),18px)] text-primary-foreground">
        <div className="flex items-center justify-between">
          <Logo light />
          <div className="flex items-center gap-2">
            <BellButton light />
            <Link to="/profile" aria-label="Profile" className="grid h-10 w-10 place-items-center rounded-full bg-teal text-[14px] font-bold text-teal-foreground">
              {profile.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
            </Link>
          </div>
        </div>
        <p className="mt-7 text-[13px] text-primary-foreground/65">{greeting()},</p>
        <h1 className="text-[24px] font-semibold">{profile.name.split(" ")[0]}</h1>
      </div>

      <div className="-mt-[72px] px-5">
        <Card className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[12px] font-medium text-muted-foreground">Total Investment</p>
              <p className="mt-1 font-display text-[26px] font-semibold text-primary">{pkr(p.total)}</p>
            </div>
            <span className="rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold text-accent-foreground">{pct}% paid</span>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-teal" style={{ width: `${pct}%` }} />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-muted p-3">
              <p className="text-[11px] text-muted-foreground">Amount Paid</p>
              <p className="mt-0.5 text-[14px] font-bold text-success">{pkr(p.paid)}</p>
            </div>
            <div className="rounded-xl bg-muted p-3">
              <p className="text-[11px] text-muted-foreground">Outstanding</p>
              <p className="mt-0.5 text-[14px] font-bold text-primary">{pkr(outstanding)}</p>
            </div>
          </div>
          <Link to="/installment/$id" params={{ id: next.id }} className="mt-3 flex items-center gap-3 rounded-xl border border-border p-3">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-info/12 text-info"><CalendarClock className="h-[18px] w-[18px]" /></div>
            <div className="flex-1">
              <p className="text-[11px] text-muted-foreground">Next Installment Due</p>
              <p className="text-[13.5px] font-semibold text-primary">{pkr(next.amount)} · {next.due}</p>
            </div>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </Link>
        </Card>

        <SectionTitle>Quick actions</SectionTitle>
        <div className="grid grid-cols-4 gap-2.5">
          {[
            { to: "/account", l: "My Payments", i: Wallet },
            { to: "/statement", l: "Statement", i: FileText },
            { to: "/approvals", l: "Approvals", i: Workflow },
            { to: "/inbox/new", l: "Submit Query", i: MessageSquarePlus },
          ].map(({ to, l, i: I }) => (
            <Link key={to} to={to} className="flex flex-col items-center gap-2 rounded-2xl bg-card px-1 py-3.5 shadow-card transition active:scale-95">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-teal"><I className="h-[19px] w-[19px]" /></span>
              <span className="text-center text-[11px] font-semibold leading-tight text-primary">{l}</span>
            </Link>
          ))}
        </div>

        <SectionTitle action={<Link to="/projects" className="text-[12.5px] font-semibold text-accent-foreground">View all</Link>}>My project</SectionTitle>
        <Link to="/projects/$id" params={{ id: p.id }} className="block overflow-hidden rounded-2xl bg-card shadow-card">
          <div className="relative h-40">
            <img src={p.image} alt={p.name} loading="lazy" width={1024} height={768} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/85 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 text-primary-foreground">
              <p className="text-[16px] font-semibold">{p.name}</p>
              <p className="flex items-center gap-1 text-[12px] text-primary-foreground/80"><MapPin className="h-3.5 w-3.5" />{p.location}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 divide-x divide-border p-4">
            <div><p className="text-[11px] text-muted-foreground">Reference</p><p className="font-mono text-[13px] font-semibold text-primary">{p.ref}</p></div>
            <div className="pl-4"><p className="text-[11px] text-muted-foreground">Investment</p><p className="text-[13px] font-semibold text-primary">{pkr(p.total)}</p></div>
          </div>
        </Link>

        <SectionTitle action={<Link to="/account" className="text-[12.5px] font-semibold text-accent-foreground">Schedule</Link>}>Payment overview</SectionTitle>
        <Card>
          <div className="flex h-2.5 gap-1 overflow-hidden rounded-full">
            {installments.map((i) => (
              <div key={i.id} className={cn("flex-1 rounded-full", { Paid: "bg-success", Pending: "bg-warning", Upcoming: "bg-info", Overdue: "bg-destructive" }[i.status])} />
            ))}
          </div>
          <div className="mt-4 grid grid-cols-4 text-center">
            {counts.map(({ s, n }) => (
              <Link key={s} to="/account" search={{ status: s }} className="flex flex-col items-center">
                <span className={cn("font-display text-[20px] font-semibold", { Paid: "text-success", Pending: "text-warning", Upcoming: "text-info", Overdue: "text-destructive" }[s])}>{n}</span>
                <span className="text-[11px] text-muted-foreground">{s}</span>
              </Link>
            ))}
          </div>
        </Card>

        <SectionTitle action={<Link to="/notifications" className="text-[12.5px] font-semibold text-accent-foreground">See all</Link>}>Recent activity</SectionTitle>
        <Card className="py-1">
          {activity.map((a) => {
            const I = { query: MessagesSquare, approval: Workflow, payment: Receipt, verified: CheckCircle2 }[a.kind];
            return (
              <div key={a.title} className="flex items-center gap-3 border-b border-border/70 py-3 last:border-0">
                <span className={cn("grid h-9 w-9 place-items-center rounded-full", a.kind === "verified" ? "bg-success/12 text-success" : "bg-accent text-accent-foreground")}><I className="h-4 w-4" /></span>
                <div className="min-w-0 flex-1">
                  <p className="text-[13.5px] font-semibold text-primary">{a.title}</p>
                  <p className="truncate text-[12px] text-muted-foreground">{a.body}</p>
                </div>
                <span className="text-[11px] text-muted-foreground">{a.time}</span>
              </div>
            );
          })}
        </Card>
        <p className="mt-6 text-center text-[11px] text-muted-foreground">All figures are illustrative demo data.</p>
      </div>
      <BottomNav />
    </div>
  );
}
