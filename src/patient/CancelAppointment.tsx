import {AlertCircle, Calendar as CalendarIcon, Car, MapPin, Phone, Pill, User, X, Zap, BitcoinIcon} from "lucide-react";
import PatientInformation from "./PatientInformation";

const AppointmentDetails = (props) => {

    const {selectedAppointment, handleAppointmentClose, getPatientData, handleRescheduleClick} = props
    return (
        <div className="fixed inset-0 bg-indigo-600 bg-opacity-50 flex items-center justify-center z-50 p-4"
             style={{backgroundColor: 'rgba(0, 110, 210, 0.5)'}}>
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div
                    className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-semibold text-slate-900">Cancel Appointment</h2>
                        <p className="text-sm text-slate-500 mt-1">
                            {selectedAppointment.machine} • {selectedAppointment.startTime} ({selectedAppointment.duration}min)
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
                        const patientData = getPatientData(selectedAppointment.title);

                        return (
                            <>
                                {/* Patient Information */}
                                <PatientInformation patientData={patientData} />

                                {/* Cancellation information */}
                                <div>
                                    <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-3">
                                        Cancellation
                                    </h3>
                                    <div className="space-y-3">
                                        <label className="font-medium text-slate-900 flex items-center gap-2">Reason</label>
                                        <textarea className="bg-slate-50 rounded-lg p-4 space-y-3" style={{width: '100%'}}></textarea>
                                        <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                                            <BitcoinIcon className="size-5 text-orange-600 flex-shrink-0"/>
                                            <div className="flex-1">
                                                <label className="font-medium text-slate-900 flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={true}
                                                        onChange={() => {}}
                                                        className="rounded"
                                                    />
                                                    Charge late cancellation fee
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="pt-4 border-t border-slate-200">
                                    <button
                                        style={{marginTop: '10px'}}
                                        className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center justify-center gap-2"
                                        onClick={handleRescheduleClick}>
                                        <CalendarIcon className="size-5"/>
                                        Cancel Appointment
                                    </button>
                                </div>
                            </>
                        );
                    })()}
                </div>
            </div>
        </div>
    )
}

export default AppointmentDetails