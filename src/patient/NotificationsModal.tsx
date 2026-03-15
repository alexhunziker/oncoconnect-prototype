import { X, Calendar, Clock } from 'lucide-react';

interface NotificationsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface Notification {
    id: string;
    type: 'scheduled' | 'moved';
    message: string;
    date: string;
    time: string;
    timestamp: string;
}

export function NotificationsModal({ isOpen, onClose }: NotificationsModalProps) {
    if (!isOpen) return null;

    const notifications: Notification[] = [
        {
            id: '1',
            type: 'scheduled',
            message: 'A new appointment has has been scheduled',
            date: 'Fri, Jan 24',
            time: '10:30 AM',
            timestamp: '2 hours ago'
        },
        {
            id: '2',
            type: 'moved',
            message: 'Your appointment has been rescheduled by the hospital',
            date: 'Thu, Jan 23',
            time: '4:00 PM (previously 3:00 PM)',
            timestamp: '1 day ago'
        },
        {
            id: '3',
            type: 'scheduled',
            message: 'New appointment confirmed',
            date: 'Wed, Jan 22',
            time: '11:15 AM',
            timestamp: '3 days ago'
        }
    ];

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
            <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                    <h2 className="text-lg text-gray-900">Notifications</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <div className="divide-y divide-gray-100">
                    {notifications.map((notification) => (
                        <div key={notification.id} className="p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-start gap-3">
                                <div className={`p-2 rounded-full ${
                                    notification.type === 'scheduled'
                                        ? 'bg-green-100'
                                        : 'bg-blue-100'
                                }`}>
                                    {notification.type === 'scheduled' ? (
                                        <Calendar className="w-4 h-4 text-green-600" />
                                    ) : (
                                        <Clock className="w-4 h-4 text-blue-600" />
                                    )}
                                </div>

                                <div className="flex-1">
                                    <p className="text-sm text-gray-900 mb-1">
                                        {notification.message}
                                    </p>
                                    <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
                                        <Calendar className="w-3 h-3" />
                                        <span>{notification.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                                        <Clock className="w-3 h-3" />
                                        <span>{notification.time}</span>
                                    </div>
                                    <p className="text-xs text-gray-400">{notification.timestamp}</p>
                                </div>
                            </div>
                        </div>
                    ))}

                    {notifications.length === 0 && (
                        <div className="p-12 text-center text-gray-500">
                            <p>No notifications</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
