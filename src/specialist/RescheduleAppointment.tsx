import {AlertCircle, Car, MapPin, Phone, Pill, User, X, Zap} from "lucide-react";
import PatientInformation from "../patient/PatientInformation";

const RescheduleAppointment = (props) => {
    const {selectedAppointment, handleAppointmentClose, getPatientData, getAvailableSlots} = props

    return <div className="fixed inset-0 flex items-center justify-center z-50 p-4"
                style={{backgroundColor: 'rgba(0, 110, 210, 0.5)'}}>
        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div
                className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-slate-900">Reschedule Appointment</h2>
                    <p className="text-sm text-slate-500 mt-1">
                        {selectedAppointment?.machine} • {selectedAppointment?.startTime} ({selectedAppointment?.duration}min)
                    </p>
                </div>
                <button
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                    onClick={handleAppointmentClose}
                >
                    <X className="size-5 text-slate-600"/>
                </button>
            </div>

            <div className="p-6 space-y-6">
                {(() => {
                    const patientData = getPatientData(selectedAppointment?.title || '');
                    const {freeSlots, alternativeSlots} = getAvailableSlots();

                    return (
                        <>
                            {/* Patient Information */}
                            <PatientInformation patientData={patientData}/>

                            {/* Treatment Requirements */}
                            <div>
                                <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-3">
                                    Treatment Requirements
                                </h3>
                                <div className="grid grid-cols-1 gap-2">
                                    <div className={`flex items-center gap-3 p-3 rounded-lg border-2 ${
                                        patientData.hasHyperthermia
                                            ? 'bg-orange-50 border-orange-200'
                                            : 'bg-slate-50 border-slate-200'
                                    }`}>
                                        <Zap className={`size-5 ${
                                            patientData.hasHyperthermia ? 'text-orange-600' : 'text-slate-400'
                                        }`}/>
                                        <div className="flex-1">
                                            <div className="font-medium text-slate-900">Hyperthermia</div>
                                            {patientData.hasHyperthermia && patientData.hyperthermiaTime && (
                                                <div className="text-sm text-slate-600">Scheduled
                                                    at {patientData.hyperthermiaTime}</div>
                                            )}
                                        </div>
                                        <div className={`text-xs font-semibold px-2 py-1 rounded ${
                                            patientData.hasHyperthermia
                                                ? 'bg-orange-600 text-white'
                                                : 'bg-slate-200 text-slate-600'
                                        }`}>
                                            {patientData.hasHyperthermia ? 'Required' : 'Not Required'}
                                        </div>
                                    </div>

                                    <div className={`flex items-center gap-3 p-3 rounded-lg border-2 ${
                                        patientData.hasChemotherapy
                                            ? 'bg-purple-50 border-purple-200'
                                            : 'bg-slate-50 border-slate-200'
                                    }`}>
                                        <Pill className={`size-5 ${
                                            patientData.hasChemotherapy ? 'text-purple-600' : 'text-slate-400'
                                        }`}/>
                                        <div className="flex-1">
                                            <div className="font-medium text-slate-900">Chemotherapy</div>
                                        </div>
                                        <div className={`text-xs font-semibold px-2 py-1 rounded ${
                                            patientData.hasChemotherapy
                                                ? 'bg-purple-600 text-white'
                                                : 'bg-slate-200 text-slate-600'
                                        }`}>
                                            {patientData.hasChemotherapy ? 'Required' : 'Not Required'}
                                        </div>
                                    </div>

                                    <div className={`p-3 rounded-lg border-2 ${
                                        patientData.needsTransport
                                            ? 'bg-green-50 border-green-200'
                                            : 'bg-slate-50 border-slate-200'
                                    }`}>
                                        <div className="flex items-center gap-3 ">
                                            <Car className={`size-5 ${
                                                patientData.needsTransport ? 'text-green-600' : 'text-slate-400'
                                            }`}/>
                                            <div className="flex-1">
                                                <div className="font-medium text-slate-900">Transport Services
                                                </div>
                                                {patientData.needsTransport && <>
                                                    <div className="text-sm text-slate-600">Driver: Frau Fäh<br/> Fahrdienst Rotes
                                                        Kreuz, 8400 Winterthur<br/>052 316 00 00
                                                    </div>
                                                </>}
                                            </div>
                                            <div className={`text-xs font-semibold px-2 py-1 rounded ${
                                                patientData.needsTransport
                                                    ? 'bg-green-600 text-white'
                                                    : 'bg-slate-200 text-slate-600'
                                            }`}>
                                                {patientData.needsTransport ? 'Needed' : 'Not Needed'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Time Preferences */}
                            <div>
                                <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-3">
                                    Time Preferences (7am - 6pm)
                                </h3>
                                <div className="grid grid-cols-12 gap-1">
                                    {[7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map((hour) => {
                                        const isPreferred = patientData.timePreferences.includes(hour);
                                        const displayHour = hour > 12 ? hour - 12 : hour;
                                        const period = hour >= 12 ? 'pm' : 'am';

                                        return (
                                            <div
                                                key={hour}
                                                className={`flex flex-col items-center justify-center p-2 rounded border-2 transition-all ${
                                                    isPreferred
                                                        ? 'bg-blue-600 border-blue-700 text-white shadow-md'
                                                        : 'bg-slate-50 border-slate-200 text-slate-400'
                                                }`}
                                            >
                                                <div
                                                    className={`text-xs font-semibold ${isPreferred ? 'text-white' : 'text-slate-600'}`}>
                                                    {displayHour}
                                                </div>
                                                <div
                                                    className={`text-[10px] ${isPreferred ? 'text-blue-100' : 'text-slate-400'}`}>
                                                    {period}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Blockers */}
                            {patientData.blockers.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                                        <AlertCircle className="size-4 text-red-600"/>
                                        Scheduling Blockers
                                    </h3>
                                    <div className="bg-red-50 rounded-lg border-2 border-red-200 p-4">
                                        <ul className="space-y-2">
                                            {patientData.blockers.map((blocker, index) => (
                                                <li key={index} className="flex items-start gap-2">
                                                    <div
                                                        className="size-1.5 rounded-full bg-red-600 mt-2 flex-shrink-0"/>
                                                    <span
                                                        className="text-sm text-slate-700">{blocker}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {/* Available Slots */}
                            <div>
                                <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-3">
                                    Available Free Slots
                                </h3>
                                <div className="grid grid-cols-2 gap-2">
                                    {freeSlots.map((slot, index) => (
                                        <button
                                            key={`${slot.machine}-${slot.time}-${index}`}
                                            className="bg-green-50 hover:bg-green-100 rounded-lg p-3 border-2 border-green-200 transition-colors text-left"
                                        >
                                            <div className="flex items-center gap-2">
                                                <div className="size-2 rounded-full bg-green-600"/>
                                                <div
                                                    className="font-medium text-slate-900">{slot.machine}</div>
                                            </div>
                                            <div className="text-sm text-slate-600 mt-1">{slot.time}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Alternative Slots */}
                            {alternativeSlots.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-3">
                                        Alternative Slots
                                    </h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        {alternativeSlots.map((slot, index) => (
                                            <button
                                                key={`${slot.machine}-${slot.time}-${index}`}
                                                className="bg-orange-50 hover:bg-orange-100 rounded-lg p-3 border-2 border-orange-200 transition-colors text-left"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <div className="size-2 rounded-full bg-orange-600"/>
                                                    <div
                                                        className="font-medium text-slate-900">{slot.machine}</div>
                                                </div>
                                                <div
                                                    className="text-sm text-slate-600 mt-1">{slot.time}</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    );
                })()}
            </div>
        </div>
    </div>

}

export default RescheduleAppointment