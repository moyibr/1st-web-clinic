import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-2 text-ink/70">Page not found.</p>
      <Link to="/" className="mt-6 inline-block text-primary underline">Go home</Link>
    </main>
  );
}
