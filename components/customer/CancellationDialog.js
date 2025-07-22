import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export function CancellationDialog({ booking, cancellationPolicy, onCancelled, onClose }) {
  const [cancelling, setCancelling] = useState(false);
  const [reason, setReason] = useState('');

  // ...handleCancellation would go here

  return (
    <div className="space-y-4">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-yellow-800">Cancellation Policy</h4>
            <p className="text-sm text-yellow-700 mt-1">{cancellationPolicy?.message}</p>
            {cancellationPolicy?.refundAmount > 0 && (
              <p className="text-sm font-medium text-yellow-800 mt-2">
                Refund Amount: ${cancellationPolicy.refundAmount?.toFixed(2)}
              </p>
            )}
          </div>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Reason for cancellation (optional)
        </label>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Let us know why you're cancelling..."
        />
      </div>
      <div className="flex gap-3">
        <Button variant="outline" onClick={onClose} disabled={cancelling}>
          Keep Booking
        </Button>
        <Button 
          variant="destructive" 
          onClick={() => {}} // handleCancellation
          disabled={cancelling}
        >
          {cancelling ? 'Cancelling...' : 'Confirm Cancellation'}
        </Button>
      </div>
    </div>
  );
} 