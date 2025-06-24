import Link from 'next/link';

const HomePage = () => {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Quickly Home</h1>
      <div className="flex mt-4 flex-col underline text-blue-500">
        <div className="flex gap-10">
          <Link href="/quick-book"> Quick Book </Link>
          <Link href="/job-board"> View Job Board </Link>
        </div>
        <div className="flex gap-7">
          <Link href="/post-quote"> Post & Quote </Link>
          <Link href="/quote-board"> View Quote Board </Link>
        </div>
      </div>
    </main>
  );
}

export default HomePage