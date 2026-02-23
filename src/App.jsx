import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { CalendarDay } from "./specialist/Dashboard.tsx";
import PatientView from "./patient/PatientView.tsx";

function Home() {
    return (
        <div className="flex flex-col items-center mt-10">
            <h2>Wähle eine Ansicht:</h2>
            <Link to="/specialist" className="mt-4 text-blue-600 underline">Zur Spezialistenansicht</Link>
            <Link to="/patient" className="mt-2 text-blue-600 underline">Zur Patientenansicht</Link>
        </div>
    );
}

export default function App() {
    return (
        <Router basename="/oncoconnect-prototype">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/specialist" element={<CalendarDay />} />
                <Route path="/patient" element={<PatientView />} />
            </Routes>
        </Router>
    );
}
