import { X, Check } from 'lucide-react';
import { useState } from 'react';

interface RescheduleModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (slot: string) => void;
    appointmentDate: string;
}

interface TimeSlot {
    date: string;
    time: string;
}

export function RescheduleModal({ isOpen, onClose, onConfirm, appointmentDate }: RescheduleModalProps) {
    const [view, setView] = useState<'suggested' | 'custom'>('suggested');
    const [selectedSlot, setSelectedSlot] = useState<string>('');
    const [customDate, setCustomDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    if (!isOpen) return null;

    // Mock suggested slots
    const suggestedSlots: TimeSlot[] = [
        { date: 'Wed, Jan 22', time: '10:00 AM' },
        { date: 'Thu, Jan 23', time: '2:30 PM' }
    ];

    const handleConfirm = () => {
        if (view === 'suggested' && selectedSlot) {
            onConfirm(selectedSlot);
        } else if (view === 'custom' && customDate && startTime && endTime) {
            onConfirm(`${customDate} between ${startTime} - ${endTime}`);
        }
        // Reset state
        setView('suggested');
        setSelectedSlot('');
        setCustomDate('');
        setStartTime('');
        setEndTime('');
    };

    const isValid = view === 'suggested'
        ? selectedSlot !== ''
        : customDate && startTime && endTime;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
            <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                    <h2 className="text-lg text-gray-900">Reschedule Appointment</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <div className="p-6">
                    <p className="text-sm text-gray-600 mb-4">
                        Current appointment: {appointmentDate}
                    </p>

                    {/* View Toggle */}
                    <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-xl">
                        <button
                            onClick={() => setView('suggested')}
                            className={`flex-1 py-2 px-4 rounded-lg text-sm transition-all ${
                                view === 'suggested'
                                    ? 'bg-white text-sky-400 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            Suggested Slots
                        </button>
                        <button
                            onClick={() => setView('custom')}
                            className={`flex-1 py-2 px-4 rounded-lg text-sm transition-all ${
                                view === 'custom'
                                    ? 'bg-white text-sky-400 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            Custom Timespan
                        </button>
                    </div>

                    {/* Suggested Slots View */}
                    {view === 'suggested' && (
                        <div className="space-y-3 mb-6">
                            <p className="text-sm text-gray-600 mb-3">
                                Select one of the available time slots:
                            </p>
                            {suggestedSlots.map((slot, index) => {
                                const slotValue = `${slot.date} at ${slot.time}`;
                                return (
                                    <label
                                        key={index}
                                        className={`flex items-center justify-between gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                            selectedSlot === slotValue
                                                ? 'border-sky-400 bg-sky-50'
                                                : 'border-gray-200 hover:border-sky-200'
                                        }`}
                                    >
                                        <div>
                                            <div className="text-gray-900">{slot.date}</div>
                                            <div className="text-sm text-gray-600">{slot.time}</div>
                                        </div>
                                        <div
                                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                                selectedSlot === slotValue
                                                    ? 'border-sky-400 bg-sky-400'
                                                    : 'border-gray-300'
                                            }`}
                                        >
                                            {selectedSlot === slotValue && <Check className="w-3 h-3 text-white" />}
                                        </div>
                                        <input
                                            type="radio"
                                            name="slot"
                                            value={slotValue}
                                            checked={selectedSlot === slotValue}
                                            onChange={(e) => setSelectedSlot(e.target.value)}
                                            className="sr-only"
                                        />
                                    </label>
                                );
                            })}
                        </div>
                    )}

                    {/* Custom Timespan View */}
                    {view === 'custom' && (
                        <div className="space-y-4 mb-6">
                            <p className="text-sm text-gray-600 mb-3">
                                Let us know when you're available:
                            </p>

                            <div>
                                <label className="block text-sm text-gray-700 mb-2">Date</label>
                                <input
                                    type="date"
                                    value={customDate}
                                    onChange={(e) => setCustomDate(e.target.value)}
                                    className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                                    min={new Date().toISOString().split('T')[0]}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm text-gray-700 mb-2">Start Time</label>
                                    <input
                                        type="time"
                                        value={startTime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                        className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-700 mb-2">End Time</label>
                                    <input
                                        type="time"
                                        value={endTime}
                                        onChange={(e) => setEndTime(e.target.value)}
                                        className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 py-3 px-4 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirm}
                            disabled={!isValid}
                            className="flex-1 py-3 px-4 rounded-xl bg-sky-400 text-white hover:bg-sky-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
