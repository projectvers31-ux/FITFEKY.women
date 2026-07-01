import Link from "next/link";
import { FileText, Sparkles } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 shrink-0 border-r bg-card md:block">
        <div className="flex h-full flex-col">
          <div className="flex h-14 items-center gap-2 border-b px-4">
            <Sparkles className="size-5 text-primary" />
            <span className="font-display text-base font-semibold">AI Automation</span>
          </div>
          <nav className="flex-1 space-y-1 p-3">
            <SidebarLink href="/admin/keywords" icon={FileText} label="Keywords" />
          </nav>
          <div className="border-t p-3">
            <Link
              href="/"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              ← Back to site
            </Link>
          </div>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}

function SidebarLink({ href, icon: Icon, label }: { href: string; icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
    >
      <Icon className="size-4" />
      {label}
    </Link>
  );
}
