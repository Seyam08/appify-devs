import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 p-6">
      <section className="max-w-lg rounded-2xl border bg-card p-8 text-center shadow-sm">
        <h1 className="text-3xl font-bold tracking-tight">Appify Admin</h1>
        <p className="mt-3 text-muted-foreground">Production-ready analytics dashboard with reusable components, filterable business KPIs, and interactive charts.</p>
        <Link href="/dashboard" className="mt-6 inline-flex rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90">
          Open Dashboard
        </Link>
      </section>
    </main>
  );
}
