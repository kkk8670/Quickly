// 'use client';

// import { useParams } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import type { Bid, Job } from '@/types'
// import Link from 'next/link';
// import { socket } from '@/lib/socket';

// const QuoteDetailsPage = () => {
//     const { id: jobId } = useParams();
//     console.log('board/id的jobid', jobId)
//     const [bids, setBids] = useState<Bid[]>([]);
//     const [job, setJob] = useState<Job | null>(null);

//     useEffect(() => {
//         if (!jobId) return;

//         fetch(`http://localhost:3001/api/bids/${jobId}`)
//             .then(res => res.json())
//             .then((data) => {
//                 console.log("Fetched bids data:", data);
//                 if (Array.isArray(data)) {
//                     setBids(data);
//                 } else {
//                     console.error('Expected an array but got:', data);
//                     setBids([]);
//                 }
//             })
//             .catch((err) => {
//                 console.error('Error fetching bids:', err);
//                 setBids([]);
//             });

//         fetch(`http://localhost:3001/api/jobs/${jobId}`)
//             .then(res => res.json())
//             .then(setJob)
//             .catch((err) => {
//                 console.error('Error fetching job:', err);
//                 setJob(null);
//             });
//         const handleNewBid = (bid: Bid) => {
//             if (bid.jobId === jobId) {
//                 setBids(prev => [bid, ...prev]);
//             }
//         };

//         socket.on('new-bid', handleNewBid);

//         return () => {
//             socket.off('new-bid', handleNewBid);
//         };
//     }, [jobId]);

//     return (
//         <div className="p-6">
//             <h1 className="text-xl font-bold mb-4">Bids for Job {job?.title || 'no title'}</h1>
//             {bids.length === 0 && <p>No bids yet.</p>}
//             <Link
//                 href={`/submit-bid?jobId=${jobId}`}
//                 className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded"
//             >
//                 Submit a Bid
//             </Link>
//             <ul className="space-y-4">
//                 {bids.map(bid => (
//                     <li key={bid.id} className="p-4 border rounded shadow">
//                         <div><strong>Provider:</strong> {bid.providerId}</div>
//                         <div><strong>Price:</strong> ${bid.amount}</div>
//                         {bid.message && (
//                             <div><strong>Message:</strong> {bid.message}</div>
//                         )}
//                         <div className="text-sm text-gray-500">
//                             {new Date(bid.createdAt).toLocaleString()}
//                         </div>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }


// export default QuoteDetailsPage