import Link from 'next/link';
import ServiceTypeCards from '@/components/ServiceTypeCard';
import QuickBookCard from '@/components/QuickBookCard';
import PostQuoteCard from '@/components/PostQuoteCard';

const HomePage = () => {
  return (
    <div className="p-6">

      <h2>Need Services? Choose what works best for you</h2>
      <ServiceTypeCards>
        <Link href="customer/quick-book" className="block">
          <QuickBookCard />
        </Link>
        <Link href="customer/post-quote" className="block">
          <PostQuoteCard />
        </Link>
      </ServiceTypeCards>

    </div>
  );
}

export default HomePage