import Link from 'next/link';

const HomePage = () => {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Quickly Home</h1>
      <div className="flex mt-4 flex-col underline text-blue-500">
        <Link href="/quick-book"> Quick Book </Link>
        <Link href="/post-job"> Post & Quote </Link>
        <Link href="/job-board"> View Job Board </Link>
      </div>
    </main>
  );
}

export default HomePage