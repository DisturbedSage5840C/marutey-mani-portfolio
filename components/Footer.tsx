import { footerData } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8 tb:px-12">
      <div className="mx-auto flex w-full max-w-[1400px] flex-wrap items-center justify-between gap-4">
        <p className="font-mono text-[0.65rem] tracking-[0.08em] text-muted">{footerData.copyright}</p>
        <p className="font-mono text-[0.65rem] tracking-[0.08em] text-muted">{footerData.location}</p>
      </div>
    </footer>
  );
}
