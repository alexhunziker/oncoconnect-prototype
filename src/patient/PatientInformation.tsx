import {MapPin, Phone, User, Zap} from "lucide-react";

const PatientInformation = ({patientData}) => {
    return <div>
        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-3">
            Patient Information
        </h3>
        <div className="bg-slate-50 rounded-lg p-4 space-y-3">
            <div className="flex items-start gap-3">
                <User className="size-5 text-blue-600 mt-0.5 flex-shrink-0"/>
                <div>
                    <div className="text-xs text-slate-500">Patient Name</div>
                    <div
                        className="font-medium text-slate-900">{patientData.name}</div>
                </div>
            </div>
            <div className="flex items-start gap-3">
                <MapPin className="size-5 text-blue-600 mt-0.5 flex-shrink-0"/>
                <div>
                    <div className="text-xs text-slate-500">Address</div>
                    <div
                        className="font-medium text-slate-900">{patientData.address}</div>
                </div>
            </div>
            <div className="flex items-start gap-3">
                <Phone className="size-5 text-blue-600 mt-0.5 flex-shrink-0"/>
                <div>
                    <div className="text-xs text-slate-500">Phone Number</div>
                    <div
                        className="font-medium text-slate-900">{patientData.phone}</div>
                </div>
            </div>
        </div>
    </div>
}

export default PatientInformation