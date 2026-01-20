import {
    ChevronLeft,
    ChevronRight,
    Calendar,
    Clock,
    Video,
    Users,
    Phone,
    Coffee,
} from 'lucide-react';
import {useState} from 'react';
import {NewAppointmentModal} from './NewAppointments';
import {patientDatabase} from "../data/mockPatients";
import {appointments} from "../data/mockAppointments";
import Logo from '../assets/logo.svg';
import AppointmentDetails from "./AppointmentDetails";
import RescheduleAppointment from "./RescheduleAppointment";
import CancelAppointment from "../patient/CancelAppointment";

export interface Appointment {
    id: string;
    title: string;
    startTime: string;
    duration: number; // in minutes
    type: 'meeting' | 'call' | 'video' | 'break';
    attendees?: string;
    color?: string;
    machine: string;
    patientData?: PatientData;
}

export interface PatientData {
    name: string;
    address: string;
    phone: string;
    hasHyperthermia: boolean;
    hyperthermiaTime?: string;
    hyperthermiaCenter?: string;
    hasChemotherapy: boolean;
    needsTransport: boolean;
    transportDetails?: string;
    timePreferences: number[]; // Array of preferred hours (7-18 for 7am-6pm)
    blockers: string[];
}


function getPatientData(title: string): PatientData {
    const patientName = title.replace('Patient: ', '').replace('Scan: ', '').replace('Treatment: ', '').replace('CT: ', '');
    return patientDatabase[patientName] || {
        name: patientName,
        address: 'Address not available',
        phone: 'Phone not available',
        hasHyperthermia: false,
        hasChemotherapy: false,
        needsTransport: false,
        timePreferences: [],
        blockers: []
    };
}

const machines = ['Linac Blau', 'Linac Grün', 'ZRR', 'T-200 / Hyperthermie / Brachy', 'CT WIN', 'CT / T-105 ZRR'];

const hyperthermiaCenters = ['Center A - Berlin Mitte', 'Center B - Charlottenburg', 'Center C - Tempelhof', 'Center D - Prenzlauer Berg'];

// Mock patient list for search

const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00'
];

function timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
}

function getAppointmentStyle(appointment: Appointment): { top: string; height: string } {
    const startMinutes = timeToMinutes(appointment.startTime);
    const dayStartMinutes = timeToMinutes('08:00');
    const pixelsPerMinute = 2; // 2px per minute for good spacing

    const top = (startMinutes - dayStartMinutes) * pixelsPerMinute;
    const height = appointment.duration * pixelsPerMinute;

    return {
        top: `${top}px`,
        height: `${height}px`
    };
}

function getAppointmentIcon(type: string) {
    switch (type) {
        case 'video':
            return <Video className="size-3"/>;
        case 'call':
            return <Phone className="size-3"/>;
        case 'break':
            return <Coffee className="size-3"/>;
        default:
            return <Users className="size-3"/>;
    }
}

// bg-blue-600 bg-blue-700 bg-green-600 bg-green-700 bg-purple-600 bg-purple-700 bg-indigo-600 bg-indigo-700 bg-zinc-600 bg-zinc-700 bg-red-600 bg-red-700 bg-teal-600 bg-teal-700
const getAppointmentColor = (machineNbr, appointmentNbr: number, type: string) => {
    if (type === 'break') return 'bg-orange-400';

    const colors = ['blue', 'green', 'teal', 'purple', 'indigo', 'zinc', 'red'];
    const intensity = appointmentNbr%2 === 0 ? '600' : '700';
    return `bg-${colors[machineNbr % colors.length]}-${intensity}`;
}

export function CalendarDay() {
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
    const [showRescheduleModal, setShowRescheduleModal] = useState(false);
    const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);

    function handleAppointmentClick(appointment: Appointment) {
        setSelectedAppointment(appointment);
    }

    function handleAppointmentClose() {
        setSelectedAppointment(null);
        setShowRescheduleModal(false);
        setShowCancelModal(false)
    }

    function handleRescheduleClick() {
        setShowRescheduleModal(true);
    }

    function handleNewAppointmentClick() {
        setShowNewAppointmentModal(true);
    }

    function handleNewAppointmentClose() {
        setShowNewAppointmentModal(false);
    }

    function handleCancelClick() {
        setShowCancelModal(true);
    }

    // Function to check if a time slot is occupied
    function isSlotOccupied(machine: string, time: string, duration: number): boolean {
        const slotStart = timeToMinutes(time);
        const slotEnd = slotStart + duration;

        return appointments.some(apt => {
            if (apt.machine !== machine || apt.id === selectedAppointment?.id) return false;
            const aptStart = timeToMinutes(apt.startTime);
            const aptEnd = aptStart + apt.duration;
            return (slotStart < aptEnd && slotEnd > aptStart);
        });
    }

    // Generate available slots
    function getAvailableSlots() {
        const slots: Array<{ machine: string; time: string; isFree: boolean }> = [];
        const duration = selectedAppointment?.duration || 15;

        // For each machine
        machines.forEach(machine => {
            // Check slots from 8:00 to 16:30 (for 15min appointments to end by 17:00)
            for (let hour = 8; hour < 17; hour++) {
                for (let minute = 0; minute < 60; minute += 15) {
                    const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                    const occupied = isSlotOccupied(machine, time, duration);

                    if (!occupied) {
                        slots.push({machine, time, isFree: true});
                    }
                }
            }
        });

        // Get some free slots
        const freeSlots = slots.slice(0, 6);

        // Get some alternative slots (slightly occupied or different machines)
        const alternativeSlots: Array<{ machine: string; time: string; isFree: boolean }> = [];
        machines.forEach(machine => {
            ['08:30', '10:45', '14:15'].forEach(time => {
                if (!isSlotOccupied(machine, time, duration)) {
                    alternativeSlots.push({machine, time, isFree: false});
                }
            });
        });

        return {freeSlots, alternativeSlots: alternativeSlots.slice(0, 4)};
    }

    return (
        <div className="flex flex-col h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 px-6 py-4">
                <div className="flex items-center justify-between max-w-full mx-auto">
                    <div className="flex items-center gap-4">
                        <img src={Logo} style={{height: '35px'}}/>
                        <h1 className="text-2xl font-semibold text-slate-900">OncoConnect</h1>
                        <div className="flex items-center gap-2">
                            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                                <ChevronLeft className="size-5 text-slate-600"/>
                            </button>
                            <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg">
                                <Calendar className="size-4 text-slate-600"/>
                                <span className="font-medium text-slate-900">Monday, January 12, 2026</span>
                            </div>
                            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                                <ChevronRight className="size-5 text-slate-600"/>
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="text-sm text-slate-600 flex items-center gap-2">
                            <Clock className="size-4"/>
                            <span>{appointments.length} appointments</span>
                        </div>
                        <button
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            onClick={handleNewAppointmentClick}>
                            + New Appointment
                        </button>
                        <div>Katia Alves</div>
                        <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="flex-1 overflow-auto">
                <div className="mx-auto p-6">
                    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-x-auto">
                        <div className="flex min-w-max">
                            {/* Time Column */}
                            <div className="w-20 flex-shrink-0 border-r border-slate-200 sticky left-0 bg-white z-10">
                                <div className="h-12 border-b border-slate-200"></div>
                                {timeSlots.map((time) => (
                                    <div
                                        key={time}
                                        className="h-[60px] border-b border-slate-100 px-2 py-1 text-xs text-slate-500"
                                    >
                                        {time}
                                    </div>
                                ))}
                            </div>

                            {/* Machine Columns */}
                            {machines.map((machine, machineIndex) => (
                                <div key={machine}
                                     className="flex-1 min-w-[180px] relative border-r border-slate-200 last:border-r-0">
                                    {/* Hour grid lines */}
                                    <div className="absolute inset-0">
                                        <div className="h-12 border-b border-slate-200 bg-slate-50 px-3 py-3">
                                            <span className="text-sm font-semibold text-slate-700">{machine}</span>
                                        </div>
                                        {timeSlots.map((time) => (
                                            <div
                                                key={time}
                                                className="h-[60px] border-b border-slate-100"
                                            />
                                        ))}
                                    </div>

                                    {/* Appointments for this machine */}
                                    <div className="absolute inset-0 pt-12">
                                        <div className="relative" style={{height: `${(17 - 8) * 60 * 2}px`}}>
                                            {appointments
                                                .filter(apt => apt.machine === machine)
                                                .map((appointment, id) => {
                                                    const style = getAppointmentStyle(appointment);
                                                    return (
                                                        <div
                                                            key={appointment.id}
                                                            className={`absolute left-1 right-1 rounded ${getAppointmentColor(machineIndex, id, appointment.type)} text-white p-1.5 shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden`}
                                                            style={style}
                                                            onClick={() => handleAppointmentClick(appointment)}
                                                        >
                                                            <div className="flex items-start gap-1">
                                                                <div className="flex-shrink-0 mt-0.5">
                                                                    {getAppointmentIcon(appointment.type)}
                                                                </div>
                                                                <div className="flex-1 min-w-0"
                                                                     style={{marginTop: '-5px'}}>
                                                                    <span
                                                                        className="font-medium text-xs truncate">{appointment.title} </span>

                                                                    <span className="text-[10px] opacity-75 mt-0.5">
                                                                            {appointment.startTime} • {appointment.duration}m
                                                                        </span>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Stats Footer */}
                    <div className="mt-4 grid grid-cols-6 gap-4">
                        {machines.map((machine) => {
                            const machineAppts = appointments.filter(apt => apt.machine === machine);
                            const totalMinutes = machineAppts.reduce((sum, apt) => sum + apt.duration, 0);
                            const hours = Math.floor(totalMinutes / 60);
                            const minutes = totalMinutes % 60;

                            return (
                                <div key={machine} className="bg-white rounded-lg border border-slate-200 p-3">
                                    <div className="text-xs text-slate-600 truncate">{machine}</div>
                                    <div className="text-lg font-semibold text-slate-900 mt-1">
                                        {machineAppts.length} appts
                                    </div>
                                    <div className="text-xs text-slate-500 mt-0.5">
                                        {hours}h {minutes}m
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Appointment Details Modal */}
            {selectedAppointment && selectedAppointment.type !== 'break' && !showRescheduleModal && !showCancelModal &&

                <AppointmentDetails
                    selectedAppointment={selectedAppointment}
                    handleAppointmentClose={handleAppointmentClose}
                    getPatientData={getPatientData}
                    handleRescheduleClick={handleRescheduleClick}
                    handleCancelClick={handleCancelClick}
                />
            }

            {/* Reschedule Modal */}
            {showRescheduleModal && (
                <RescheduleAppointment
                    selectedAppointment={selectedAppointment}
                    handleAppointmentClose={handleAppointmentClose}
                    getPatientData={getPatientData}
                    getAvailableSlots={getAvailableSlots}
                />
            )}

            {/* Reschedule Modal */}
            {showCancelModal && (
                <CancelAppointment
                    selectedAppointment={selectedAppointment}
                    handleAppointmentClose={handleAppointmentClose}
                    getPatientData={getPatientData}
                    getAvailableSlots={getAvailableSlots}
                />
            )}

            {/* New Appointment Modal */}
            <NewAppointmentModal
                isOpen={showNewAppointmentModal}
                onClose={handleNewAppointmentClose}
            />
        </div>
    );
}