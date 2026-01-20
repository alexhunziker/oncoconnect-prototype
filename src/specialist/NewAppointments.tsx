import {X, Search, Plus, Minus, MapPin, Phone, User, Zap, Pill, Car, AlertCircle} from 'lucide-react';
import {useState} from 'react';

interface NewAppointmentModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const hyperthermiaCenters = ['Center A - Winterthur Zentrum', 'Center B - Center B'];

const allPatients = [
    {id: '1', name: 'Hans Schmidt', address: 'Hauptstraße 45, 10115 Berlin', phone: '+49 30 1234567'},
    {id: '2', name: 'Anna Müller', address: 'Berliner Str. 23, 10715 Berlin', phone: '+49 30 2345678'},
    {id: '3', name: 'Klaus Weber', address: 'Friedrichstraße 78, 10117 Berlin', phone: '+49 30 3456789'},
    {id: '4', name: 'Maria Fischer', address: 'Kastanienallee 12, 10435 Berlin', phone: '+49 30 4567890'},
    {id: '5', name: 'Peter Wagner', address: 'Schönhauser Allee 56, 10437 Berlin', phone: '+49 30 5678901'},
    {id: '6', name: 'Sophie Schulz', address: 'Lindenstraße 89, 10969 Berlin', phone: '+49 30 6789012'},
    {id: '7', name: 'Thomas Hoffmann', address: 'Karl-Marx-Allee 120, 10243 Berlin', phone: '+49 30 7890123'},
];

const machines = ['Linac', 'T-200 / Hyperthermie / Brachy', 'CT'];

export function NewAppointmentModal({isOpen, onClose}: NewAppointmentModalProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPatient, setSelectedPatient] = useState<typeof allPatients[0] | null>(null);
    const [hasHyperthermia, setHasHyperthermia] = useState(false);
    const [selectedCenter, setSelectedCenter] = useState('');
    const [hasChemotherapy, setHasChemotherapy] = useState(false);
    const [needsTransport, setNeedsTransport] = useState(false);
    const [transportProvider, setTransportProvider] = useState('');
    const [timePreferences, setTimePreferences] = useState<number[]>([7 , 8, 9 ,10, 11, 12, 13, 14, 15, 16, 17, 18]);
    const [blockers, setBlockers] = useState<string[]>([]);
    const [newBlocker, setNewBlocker] = useState('');
    const [appointmentCounts, setAppointmentCounts] = useState<Record<string, number>>({
        'Linac': 0,
        'T-200 / Hyperthermie / Brachy': 0,
        'CT': 0,
    });
    const [startDate, setStartDate] = useState('2026-01-13');
    const [duration, setDuration] = useState(15);

    if (!isOpen) return null;

    const filteredPatients = allPatients.filter(patient =>
        patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.address.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleTimePreference = (hour: number) => {
        if (timePreferences.includes(hour)) {
            setTimePreferences(timePreferences.filter(h => h !== hour));
        } else {
            setTimePreferences([...timePreferences, hour]);
        }
    };

    const addBlocker = () => {
        if (newBlocker.trim()) {
            setBlockers([...blockers, newBlocker.trim()]);
            setNewBlocker('');
        }
    };

    const removeBlocker = (index: number) => {
        setBlockers(blockers.filter((_, i) => i !== index));
    };

    const updateAppointmentCount = (machine: string, delta: number) => {
        setAppointmentCounts(prev => ({
            ...prev,
            [machine]: Math.max(0, prev[machine] + delta)
        }));
    };

    const handleSubmit = () => {
        // Here you would handle the form submission
        console.log({
            selectedPatient,
            hasHyperthermia,
            selectedCenter,
            hasChemotherapy,
            needsTransport,
            transportProvider,
            timePreferences,
            blockers,
            appointmentCounts,
            startDate,
            duration
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4"
             style={{backgroundColor: 'rgba(0, 110, 210, 0.5)'}}>
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div
                    className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
                    <div>
                        <h2 className="text-xl font-semibold text-slate-900">New Appointment</h2>
                        <p className="text-sm text-slate-500 mt-1">Create a new patient appointment</p>
                    </div>
                    <button
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        onClick={onClose}
                    >
                        <X className="size-5 text-slate-600"/>
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Patient Search */}
                    <div>
                        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-3">
                            Select Patient
                        </h3>
                        <div className="relative">
                            <Search
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-slate-400"/>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by name or address..."
                                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {searchQuery && (
                            <div className="mt-2 max-h-48 overflow-y-auto border border-slate-200 rounded-lg">
                                {filteredPatients.map((patient) => (
                                    <button
                                        key={patient.id}
                                        onClick={() => {
                                            setSelectedPatient(patient);
                                            setSearchQuery('');
                                        }}
                                        className="w-full text-left px-4 py-3 hover:bg-slate-50 border-b border-slate-100 last:border-b-0"
                                    >
                                        <div className="font-medium text-slate-900">{patient.name}</div>
                                        <div className="text-sm text-slate-500">{patient.address}</div>
                                    </button>
                                ))}
                                {filteredPatients.length === 0 && (
                                    <div className="px-4 py-3 text-sm text-slate-500 text-center">
                                        No patients found
                                    </div>
                                )}
                            </div>
                        )}

                        {selectedPatient && (
                            <div className="mt-3 bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
                                <div className="flex items-start justify-between">
                                    <div className="space-y-2 flex-1">
                                        <div className="flex items-center gap-2">
                                            <User className="size-4 text-blue-600"/>
                                            <span className="font-semibold text-slate-900">{selectedPatient.name}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <MapPin className="size-4 text-blue-600"/>
                                            <span className="text-slate-700">{selectedPatient.address}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <Phone className="size-4 text-blue-600"/>
                                            <span className="text-slate-700">{selectedPatient.phone}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setSelectedPatient(null)}
                                        className="p-1 hover:bg-blue-100 rounded"
                                    >
                                        <X className="size-4 text-blue-600"/>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Treatment Requirements */}
                    <div>
                        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-3">
                            Treatment Requirements
                        </h3>

                        {/* Hyperthermia */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                                <Zap className="size-5 text-orange-600 flex-shrink-0"/>
                                <div className="flex-1">
                                    <label className="font-medium text-slate-900 flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={hasHyperthermia}
                                            onChange={(e) => setHasHyperthermia(e.target.checked)}
                                            className="rounded"
                                        />
                                        Hyperthermia Required
                                    </label>
                                </div>
                            </div>

                            {hasHyperthermia && (
                                <div className="ml-8 space-y-2">
                                    <label className="text-sm text-slate-600">Select Center</label>
                                    <select
                                        value={selectedCenter}
                                        onChange={(e) => setSelectedCenter(e.target.value)}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Choose a center...</option>
                                        {hyperthermiaCenters.map((center) => (
                                            <option key={center} value={center}>{center}</option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {/* Chemotherapy */}
                            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                                <Pill className="size-5 text-purple-600 flex-shrink-0"/>
                                <div className="flex-1">
                                    <label className="font-medium text-slate-900 flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={hasChemotherapy}
                                            onChange={(e) => setHasChemotherapy(e.target.checked)}
                                            className="rounded"
                                        />
                                        Chemotherapy Required
                                    </label>
                                </div>
                            </div>

                            {/* Transport */}
                            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                                <Car className="size-5 text-green-600 flex-shrink-0"/>
                                <div className="flex-1">
                                    <label className="font-medium text-slate-900 flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={needsTransport}
                                            onChange={(e) => setNeedsTransport(e.target.checked)}
                                            className="rounded"
                                        />
                                        Transport Services Needed
                                    </label>
                                </div>
                            </div>

                            {needsTransport && (
                                <div className="ml-8 space-y-2">
                                    <label className="text-sm text-slate-600">Transport Provider</label>
                                    <input
                                        type="text"
                                        value={transportProvider}
                                        onChange={(e) => setTransportProvider(e.target.value)}
                                        placeholder="Enter transport provider name..."
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Time Preferences */}
                    <div>
                        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-3">
                            Time Preferences (7am - 6pm)
                        </h3>
                        <div className="grid grid-cols-12 gap-1">
                            {[7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map((hour) => {
                                const isPreferred = timePreferences.includes(hour);
                                const displayHour = hour > 12 ? hour - 12 : hour;
                                const period = hour >= 12 ? 'pm' : 'am';

                                return (
                                    <button
                                        key={hour}
                                        onClick={() => toggleTimePreference(hour)}
                                        className={`flex flex-col items-center justify-center p-2 rounded border-2 transition-all ${
                                            isPreferred
                                                ? 'bg-blue-600 border-blue-700 text-white shadow-md'
                                                : 'bg-slate-50 border-slate-200 text-slate-400 hover:border-blue-300'
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
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Blockers */}
                    <div>
                        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <AlertCircle className="size-4 text-red-600"/>
                            Scheduling Instructions
                        </h3>
                        <div className="space-y-3">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newBlocker}
                                    onChange={(e) => setNewBlocker(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && addBlocker()}
                                    placeholder="Add a scheduling constraint..."
                                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    onClick={addBlocker}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                                >
                                    <Plus className="size-4"/>
                                    Add
                                </button>
                            </div>

                            {blockers.length > 0 && (
                                <div className="bg-red-50 rounded-lg border-2 border-red-200 p-4">
                                    <ul className="space-y-2">
                                        {blockers.map((blocker, index) => (
                                            <li key={index} className="flex items-start justify-between gap-2">
                                                <div className="flex items-start gap-2 flex-1">
                                                    <div
                                                        className="size-1.5 rounded-full bg-red-600 mt-2 flex-shrink-0"/>
                                                    <span className="text-sm text-slate-700">{blocker}</span>
                                                </div>
                                                <button
                                                    onClick={() => removeBlocker(index)}
                                                    className="p-1 hover:bg-red-100 rounded text-red-600"
                                                >
                                                    <Minus className="size-4"/>
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Number of Appointments per Machine */}
                    <div>
                        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-3">
                            Number of Appointments per Machine
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            {machines.map((machine) => (
                                <div key={machine} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                                    <div className="font-medium text-slate-900 mb-2">{machine}</div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => updateAppointmentCount(machine, -1)}
                                            className="p-2 bg-white border border-slate-300 rounded hover:bg-slate-100 transition-colors"
                                            disabled={appointmentCounts[machine] === 0}
                                        >
                                            <Minus className="size-4"/>
                                        </button>
                                        <div className="flex-1 text-center">
                      <span className="text-2xl font-semibold text-slate-900">
                        {appointmentCounts[machine]}
                      </span>
                                        </div>
                                        <button
                                            onClick={() => updateAppointmentCount(machine, 1)}
                                            className="p-2 bg-white border border-slate-300 rounded hover:bg-slate-100 transition-colors"
                                        >
                                            <Plus className="size-4"/>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Start Date and Duration */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-2 block">
                                Start Date
                            </label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-2 block">
                                Duration (minutes)
                            </label>
                            <input
                                type="number"
                                value={duration}
                                onChange={(e) => setDuration(parseInt(e.target.value) || 15)}
                                min="5"
                                step="5"
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 border-t border-slate-200 flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={!selectedPatient}
                            className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Create Appointments
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}