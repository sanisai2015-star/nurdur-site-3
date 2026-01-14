import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <h1 className="text-3xl font-bold mb-2">404</h1>
        <p className="text-muted-foreground mb-6">Page not found.</p>
        <Link to="/" className="inline-flex px-4 py-2 rounded-lg bg-primary text-primary-foreground">Go Home</Link>
      </div>
    </div>
  );
}
