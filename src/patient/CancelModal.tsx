import { X } from 'lucide-react';
import { useState } from 'react';

interface CancelModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (reason: string) => void;
}

export function CancelModal({ isOpen, onClose, onConfirm }: CancelModalProps) {
    const [reason, setReason] = useState('');

    if (!isOpen) return null;

    const handleConfirm = () => {
        if (reason.trim()) {
            onConfirm(reason);
            setReason('');
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
            <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                    <h2 className="text-lg text-gray-900">Cancel Appointment</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <div className="p-6">
                    <p className="text-sm text-gray-600 mb-4">
                        Please let us know why you're canceling this appointment:
                    </p>

                    <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Enter your reason for cancellation..."
                        className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 mb-4"
                        rows={4}
                    />

                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
                        <p className="text-sm text-amber-800">
                            ⚠️ Please note: Late cancellations without a valid reason may result in a cancellation fee.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 py-3 px-4 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Go Back
                        </button>
                        <button
                            onClick={handleConfirm}
                            disabled={!reason.trim()}
                            className="flex-1 py-3 px-4 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Confirm Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}