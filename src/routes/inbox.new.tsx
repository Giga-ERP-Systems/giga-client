import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CheckCircle2, FileText, Image as ImageIcon, Paperclip, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Card, Field, inputCls, PrimaryButton, SubScreen } from "@/components/app/ui";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { projects } from "@/lib/data";
import { useStore } from "@/lib/store";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/inbox/new")({
  head: () => seo("Submit a Query", "Send a new query to the Giga Group team."),
  component: NewQuery,
});

const types = ["Payment", "Account", "Project Information", "Documentation", "Approval", "Other"];

function NewQuery() {
  const { addQuery } = useStore();
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [f, setF] = useState({ subject: "", type: "", project: projects[0].name, description: "" });
  const [files, setFiles] = useState<string[]>([]);
  const [done, setDone] = useState<string | null>(null);

  if (done)
    return (
      <SubScreen title="Query submitted" back="/inbox">
        <Card className="mt-6 flex flex-col items-center py-10 text-center">
          <div className="grid h-20 w-20 place-items-center rounded-full bg-success/12 text-success"><CheckCircle2 className="h-10 w-10" /></div>
          <h2 className="mt-4 text-[20px] font-semibold text-primary">Thank you</h2>
          <p className="mt-1 max-w-[260px] text-[13px] text-muted-foreground">Your query has been received. A representative will respond shortly.</p>
          <div className="mt-5 rounded-xl bg-muted px-4 py-3">
            <p className="text-[11px] text-muted-foreground">Reference number</p>
            <p className="font-mono text-[16px] font-bold text-primary">{done}</p>
          </div>
        </Card>
        <PrimaryButton className="mt-6" onClick={() => navigate({ to: "/inbox/$id", params: { id: done } })}>View conversation</PrimaryButton>
        <PrimaryButton className="mt-3" variant="outline" onClick={() => navigate({ to: "/inbox" })}>Back to inbox</PrimaryButton>
      </SubScreen>
    );

  return (
    <SubScreen title="Submit a query" subtitle="We usually respond within 1 working day">
      <form
        className="mt-2 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (!f.subject.trim() || !f.type || f.description.trim().length < 10) return toast.error("Add a subject, type and a description (10+ characters)");
          setDone(addQuery({ ...f, attachments: files }));
        }}
      >
        <Field label="Query Subject"><input className={inputCls} value={f.subject} onChange={(e) => setF({ ...f, subject: e.target.value })} placeholder="e.g. Receipt verification" /></Field>
        <Field label="Query Type">
          <Select value={f.type} onValueChange={(v) => setF({ ...f, type: v })}>
            <SelectTrigger className="!h-12 rounded-xl bg-card"><SelectValue placeholder="Select a type" /></SelectTrigger>
            <SelectContent>{types.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
          </Select>
        </Field>
        <Field label="Related Project or Account">
          <Select value={f.project} onValueChange={(v) => setF({ ...f, project: v })}>
            <SelectTrigger className="!h-12 rounded-xl bg-card"><SelectValue /></SelectTrigger>
            <SelectContent>{projects.map((p) => <SelectItem key={p.id} value={p.name}>{p.name} · {p.ref}</SelectItem>)}</SelectContent>
          </Select>
        </Field>
        <Field label="Query Description">
          <textarea rows={5} className={inputCls + " h-auto py-3"} value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })} placeholder="Describe your query in detail…" />
        </Field>
        <div>
          <span className="mb-1.5 block text-[12.5px] font-semibold text-foreground">Attachments</span>
          <input ref={fileRef} type="file" multiple accept="image/*,.pdf,.doc,.docx" className="hidden" onChange={(e) => { setFiles([...files, ...Array.from(e.target.files ?? []).map((x) => x.name)]); e.target.value = ""; }} />
          <div className="flex gap-2">
            <button type="button" onClick={() => fileRef.current?.click()} className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-card py-3.5 text-[13px] font-semibold text-primary">
              <Paperclip className="h-4 w-4" /> Upload files
            </button>
            <button type="button" onClick={() => setFiles([...files, "sample-receipt.jpg"])} className="rounded-xl bg-accent px-3 text-[12px] font-semibold text-accent-foreground">+ Sample</button>
          </div>
          {files.length > 0 && (
            <ul className="mt-3 space-y-2">
              {files.map((n, idx) => (
                <li key={n + idx} className="flex items-center gap-3 rounded-xl bg-card p-3 shadow-card">
                  {/\.(jpe?g|png|webp|gif)$/i.test(n) ? <ImageIcon className="h-5 w-5 text-teal" /> : <FileText className="h-5 w-5 text-teal" />}
                  <span className="flex-1 truncate text-[13px] text-foreground">{n}</span>
                  <button type="button" aria-label="Remove" onClick={() => setFiles(files.filter((_, i) => i !== idx))}><X className="h-4 w-4 text-muted-foreground" /></button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <PrimaryButton type="submit" className="!mt-6">Submit Query</PrimaryButton>
      </form>
    </SubScreen>
  );
}
