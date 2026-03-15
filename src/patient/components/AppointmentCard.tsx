import { Calendar, Clock, X, RefreshCw } from 'lucide-react';
import {PatientAppointment} from "../PatientView";

export interface Appointment {
    id: string;
    date: string;
    time: string;
    treatment: string;
    duration: string;
}

interface AppointmentCardProps {
    appointment: PatientAppointment;
    onCancel: (id: string) => void;
    onReschedule: (id: string) => void;
}

export function AppointmentCard({ appointment, onCancel, onReschedule }: AppointmentCardProps) {
    return (
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                    <h3 className="text-gray-900 mb-2">{appointment.treatment}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                        <Calendar className="w-4 h-4 text-sky-400" />
                        <span>{appointment.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4 text-sky-400" />
                        <span>{appointment.time} • {appointment.duration} min</span>
                    </div>
                </div>
            </div>

            <div className="flex gap-3 mt-4 pt-3 border-t border-gray-100">
                <button
                    onClick={() => onReschedule(appointment.id)}
                    className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-sky-500 transition-colors"
                >
                    <RefreshCw className="w-4 h-4" />
                    <span>Reschedule</span>
                </button>
                <button
                    onClick={() => onCancel(appointment.id)}
                    className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-red-500 transition-colors"
                >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                </button>
            </div>
        </div>
    );
}