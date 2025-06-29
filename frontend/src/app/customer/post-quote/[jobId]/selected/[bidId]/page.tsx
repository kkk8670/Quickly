'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import type { Bid } from '@/types'
import { useSelectedBidStore } from '@/stores/jobStore'

const PostQuoteSelected = () => {
  const [loading, setLoading] = useState(false);
  const { selectedBid } = useSelectedBidStore();
  const router = useRouter();
  const params = useParams();
  const jobId = params.jobId
  const bidId = params.bidId

  const handleBack = () => {
    router.back();
  };

  const handleConfirm = async () => {
    if (!selectedBid) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3001/api/jobs/post-quote/${jobId}
/confirmed`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bidId: bidId }),
      });

      if (!res.ok) {
        throw new Error('Failed to confirm bid');
      }
      router.push(`/customer/post-quote/${jobId}/completed`);
    } catch (error) {
      console.error('Selection failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!selectedBid) {
    return (
      <div className="text-center text-gray-600 mt-10">
        No bid selected. Please go back and choose one.
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Confirm Your Selection</h2>

        <div className="border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">{selectedBid.providerName}</h3>
            <div className="flex items-center gap-1 text-yellow-500">
              <span>⭐</span>
              <span className="font-medium text-gray-700">{selectedBid.providerRating}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <span className="text-sm text-gray-600">Price</span>
              <div className="text-2xl font-bold text-green-600">¥{selectedBid.price}</div>
            </div>
            <div>
              <span className="text-sm text-gray-600">Estimated Time</span>
              <div className="text-lg font-medium">{selectedBid.estimatedTime}</div>
            </div>
          </div>

          <div className="mb-4">
            <span className="text-sm text-gray-600">Message</span>
            <p className="text-gray-800 mt-1">{selectedBid.message}</p>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-yellow-800 text-sm">
            ⚠️ <strong>Note:</strong> Once selected, a service contract will be formed. Please confirm the details carefully.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleBack}
            className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-md hover:bg-gray-300"
          >
            Back to Bidding
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="flex-1 bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 disabled:bg-gray-400 flex items-center justify-center gap-2"
          >
            {loading ? 'Confirming...' : (
              <>
                Confirm
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostQuoteSelected;
