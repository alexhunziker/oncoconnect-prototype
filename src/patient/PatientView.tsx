import { useState } from 'react';
import { CancelModal } from './CancelModal';
import { RescheduleModal } from './RescheduleModal';
import { NotificationsModal } from './NotificationsModal';
import { toast, Toaster } from 'sonner';
import { Bell } from 'lucide-react';
import {Appointment} from "../specialist/Dashboard";
import {AppointmentCard} from "../specialist/components/AppointmentCard";

export default function App() {
    const [appointments, setAppointments] = useState<Appointment[]>([
        {
            id: '1',
            date: 'Mon, Jan 20',
            time: '9:00 AM',
            treatment: 'Physical Therapy Session',
            duration: '15 min'
        },
        {
            id: '2',
            date: 'Tue, Jan 21',
            time: '2:30 PM',
            treatment: 'Physical Therapy Session',
            duration: '15 min'
        },
        {
            id: '3',
            date: 'Wed, Jan 22',
            time: '11:15 AM',
            treatment: 'Physical Therapy Session',
            duration: '15 min'
        },
        {
            id: '4',
            date: 'Thu, Jan 23',
            time: '4:00 PM',
            treatment: 'Physical Therapy Session',
            duration: '15 min'
        },
        {
            id: '5',
            date: 'Fri, Jan 24',
            time: '10:30 AM',
            treatment: 'Physical Therapy Session',
            duration: '15 min'
        }
    ]);

    const [cancelModalOpen, setCancelModalOpen] = useState(false);
    const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | null>(null);

    const handleCancelClick = (id: string) => {
        setSelectedAppointmentId(id);
        setCancelModalOpen(true);
    };

    const handleRescheduleClick = (id: string) => {
        setSelectedAppointmentId(id);
        setRescheduleModalOpen(true);
    };

    const handleCancelConfirm = (reason: string) => {
        if (selectedAppointmentId) {
            setAppointments(appointments.filter(apt => apt.id !== selectedAppointmentId));
            toast.success('Appointment cancelled', {
                description: `Reason: ${reason}`
            });
        }
        setCancelModalOpen(false);
        setSelectedAppointmentId(null);
    };

    const handleRescheduleConfirm = (slot: string) => {
        if (selectedAppointmentId) {
            toast.success('Reschedule request sent', {
                description: `We'll confirm your new appointment for ${slot}`
            });
        }
        setRescheduleModalOpen(false);
        setSelectedAppointmentId(null);
    };

    const selectedAppointment = appointments.find(apt => apt.id === selectedAppointmentId);

    return (
        <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
            <Toaster position="top-center" richColors />

            {/* Mobile container */}
            <div className="max-w-md mx-auto bg-white min-h-screen shadow-xl">
                {/* Header */}
                <div className="bg-gradient-to-r from-sky-400 to-sky-500 px-6 py-8 text-white">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                            <h1 className="text-2xl mb-1">My Appointments</h1>
                            <p className="text-sky-100 text-sm">
                                {appointments.length} upcoming {appointments.length === 1 ? 'session' : 'sessions'}
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setNotificationsOpen(true)}
                                className="relative p-2 hover:bg-sky-500 rounded-full transition-colors"
                            >
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
                                <span className="text-sm">JD</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Appointments List */}
                <div className="p-4 space-y-4">
                    {appointments.length > 0 ? (
                        appointments.map(appointment => (
                            <AppointmentCard
                                key={appointment.id}
                                appointment={appointment}
                                onCancel={handleCancelClick}
                                onReschedule={handleRescheduleClick}
                            />
                        ))
                    ) : (
                        <div className="text-center py-12 text-gray-500">
                            <p>No appointments scheduled</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Modals */}
            <CancelModal
                isOpen={cancelModalOpen}
                onClose={() => setCancelModalOpen(false)}
                onConfirm={handleCancelConfirm}
            />

            <RescheduleModal
                isOpen={rescheduleModalOpen}
                onClose={() => setRescheduleModalOpen(false)}
                onConfirm={handleRescheduleConfirm}
                appointmentDate={selectedAppointment?.date || ''}
            />

            <NotificationsModal
                isOpen={notificationsOpen}
                onClose={() => setNotificationsOpen(false)}
            />
        </div>
    );
}