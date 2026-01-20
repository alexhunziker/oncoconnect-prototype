import {PatientData} from "../specialist/Dashboard";

export const patientDatabase: Record<string, PatientData> = {
    'Schmidt': {
        name: 'Hans Schmidt',
        address: 'Hauptstrasse 45, 8400 Winterthur',
        phone: '+41 79 000 00 00',
        hasHyperthermia: true,
        hyperthermiaTime: '14:00',
        hasChemotherapy: false,
        needsTransport: true,
        timePreferences: [7, 8, 9, 10, 11, 12, 13, 14, 15],
        blockers: ['Wednesday afternoon not possible', 'Prefers male therapists for religious reasons']
    },
    'Müller': {
        name: 'Anna Müller',
        address: 'Berliner Str. 23, 10715 Berlin',
        phone: '+49 30 2345678',
        hasHyperthermia: false,
        hasChemotherapy: true,
        needsTransport: false,
        timePreferences: [15, 16, 17, 18],
        blockers: ['Prefers same-day appointments']
    },
    'Weber': {
        name: 'Klaus Weber',
        address: 'Friedrichstraße 78, 10117 Berlin',
        phone: '+49 30 3456789',
        hasHyperthermia: true,
        hyperthermiaTime: '10:30',
        hasChemotherapy: true,
        needsTransport: true,
        timePreferences: [8, 9, 10],
        blockers: ['Requires fasting before treatment', 'Mobility issues']
    },
    'Fischer': {
        name: 'Maria Fischer',
        address: 'Kastanienallee 12, 10435 Berlin',
        phone: '+49 30 4567890',
        hasHyperthermia: false,
        hasChemotherapy: false,
        needsTransport: false,
        timePreferences: [10, 11, 12, 13, 14],
        blockers: []
    },
    'Wagner': {
        name: 'Peter Wagner',
        address: 'Schönhauser Allee 56, 10437 Berlin',
        phone: '+49 30 5678901',
        hasHyperthermia: true,
        hyperthermiaTime: '11:00',
        hasChemotherapy: false,
        needsTransport: true,
        timePreferences: [7, 8, 9],
        blockers: ['Lives far from clinic', 'Prefers early slots']
    },
};
