export default function HomePage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Quickly Home</h1>
      <ul className="mt-4 space-y-2 underline text-blue-500">
        <li><a href="/quick-book">Quick Book</a></li>
        <li><a href="/post-job">Post & Quote</a></li>
      </ul>
    </main>
  );
}