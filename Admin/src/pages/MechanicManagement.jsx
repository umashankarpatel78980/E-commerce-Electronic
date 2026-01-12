import React, { useState } from 'react';
import {
    Plus,
    Search,
    User,
    Phone,
    Settings,
    Award,
    Clock,
    CheckCircle2,
    XCircle,
    ArrowLeft,
} from 'lucide-react';
import './MechanicManagement.css';
import { useNavigate } from 'react-router-dom';


/* ---------------- MAIN PAGE ---------------- */
const MechanicManagement = () => {
    const [mechanics, setMechanics] = useState([

        {
            id: 1,
            name: 'Vikram Singh',
            skill: 'Engine & Transmission',
            contact: '+91 98765 43210',
            status: 'Active',
            rating: 4.8,
            services: [
                {
                    serviceId: 'S101',
                    customerName: 'Rajesh Kumar',
                    title: 'Engine Overhaul',
                    tractorModel: 'Mahindra 575 DI',
                    date: '12 Jan 2026',
                    status: 'Completed',
                    cost: 8500,
                },
                {
                    serviceId: 'S102',
                    customerName: 'Sanjay Yadav',
                    title: 'Clutch Plate Replacement',
                    tractorModel: 'Sonalika DI 745',
                    date: '18 Jan 2026',
                    status: 'Completed',
                    cost: 4200,
                },
                {
                    serviceId: 'S103',
                    customerName: 'Mukesh Sharma',
                    title: 'Transmission Repair',
                    tractorModel: 'John Deere 5310',
                    date: '25 Jan 2026',
                    status: 'In Progress',
                    cost: 3000,
                },
            ],
        },
        {
            id: 2,
            name: 'Rahul Verma',
            skill: 'Hydraulics & Implements',
            contact: '+91 98765 43211',
            status: 'Busy',
            rating: 4.5,
            services: [
                {
                    serviceId: 'S201',
                    customerName: 'Anil Kumar',
                    title: 'Hydraulic Pump Repair',
                    tractorModel: 'New Holland 3630',
                    date: '10 Jan 2026',
                    status: 'Completed',
                    cost: 5200,
                },
                {
                    serviceId: 'S202',
                    customerName: 'Vijay Singh',
                    title: 'Lift System Adjustment',
                    tractorModel: 'Massey Ferguson 245',
                    date: '22 Jan 2026',
                    status: 'Pending',
                    cost: 1800,
                },
            ],
        },
        {
            id: 3,
            name: 'Sameer Khan',
            skill: 'Electrical & Electronics',
            contact: '+91 98765 43212',
            status: 'Active',
            rating: 4.9,
            services: [
                {
                    serviceId: 'S301',
                    customerName: 'Ramesh Patel',
                    title: 'Wiring Harness Replacement',
                    tractorModel: 'Mahindra Arjun 605',
                    date: '08 Jan 2026',
                    status: 'Completed',
                    cost: 2600,
                },
                {
                    serviceId: 'S302',
                    customerName: 'Suresh Patel',
                    title: 'Battery & Alternator Check',
                    tractorModel: 'Powertrac Euro 50',
                    date: '16 Jan 2026',
                    status: 'Completed',
                    cost: 1200,
                },
                {
                    serviceId: 'S303',
                    customerName: 'Dinesh Kumar',
                    title: 'Starter Motor Repair',
                    tractorModel: 'Eicher 380',
                    date: '27 Jan 2026',
                    status: 'Completed',
                    cost: 1900,
                },
            ],
        },
        {
            id: 4,
            name: 'Amit Dogra',
            skill: 'General Servicing',
            contact: '+91 98765 43213',
            status: 'Inactive',
            rating: 4.2,
            services: [],
        },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMechanic, setSelectedMechanic] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const navigate = useNavigate();
    const isMobile = window.innerWidth <= 768;

    const handleAddMechanic = (m) => {
        setMechanics([
            {
                id: Date.now(),
                ...m,
                assignments: 0,
                rating: 0,
                services: [],
            },
            ...mechanics,
        ]);
    };

    /* ---------------- DETAIL VIEW ---------------- */
    if (selectedMechanic) {
        return (
            <div className="mechanic-mgmt center-view">
                <button
                    className="btn outline"
                    style={{ color: "white", alignSelf: "flex-start" }}
                    onClick={() => setSelectedMechanic(null)}
                >
                    <ArrowLeft size={16} /> Back
                </button>


                <div className="mechanic-detail-card">
                    {isMobile ? (
                        /* 📱 Mobile View */
                        <div className="card-header" style={{display:"flex",flexFlow:"column"}}>
                        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                            <User size={40} />

                            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                                <h2 style={{ margin: 0 }}>{selectedMechanic.name}</h2>

                                <p style={{ margin: 0, color: "#6b7280" }}>
                                    {selectedMechanic.skill}
                                </p>

                                <span
                                    style={{
                                        width: "fit-content",
                                        padding: "4px 12px",
                                        borderRadius: "999px",
                                        fontSize: "0.8rem",
                                        fontWeight: "600",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "6px",

                                        backgroundColor:
                                            selectedMechanic.status === "Active"
                                                ? "#dcfce7"
                                                : selectedMechanic.status === "Busy"
                                                    ? "#fef3c7"
                                                    : "#fee2e2",

                                        color:
                                            selectedMechanic.status === "Active"
                                                ? "#166534"
                                                : selectedMechanic.status === "Busy"
                                                    ? "#92400e"
                                                    : "#7f1d1d",

                                        border:
                                            selectedMechanic.status === "Active"
                                                ? "1px solid #86efac"
                                                : selectedMechanic.status === "Busy"
                                                    ? "1px solid #fde68a"
                                                    : "1px solid #fecaca",
                                    }}
                                >
                                    {selectedMechanic.status === "Active" && "🟢"}
                                    {selectedMechanic.status === "Busy" && "🟡"}
                                    {selectedMechanic.status === "Inactive" && "🔴"}

                                    {selectedMechanic.status}
                                </span>

                            </div>
                        </div>

                        <div style={{ flexWrap: "wrap" }}>
                            <div>
                                📞 {selectedMechanic.contact}
                            </div>
                            <div>
                                ⭐ {selectedMechanic.rating}
                            </div>
                            <div>
                                🛠  {selectedMechanic.services.length} Services
                            </div>
                        </div>
                    </div>
                    ) : (
                        /* 💻 Desktop View */
                        <div className="card-header">
                        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                            <User size={40} />

                            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                                <h2 style={{ margin: 0 }}>{selectedMechanic.name}</h2>

                                <p style={{ margin: 0, color: "#6b7280" }}>
                                    {selectedMechanic.skill}
                                </p>

                                <span
                                    style={{
                                        width: "fit-content",
                                        padding: "4px 12px",
                                        borderRadius: "999px",
                                        fontSize: "0.8rem",
                                        fontWeight: "600",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "6px",

                                        backgroundColor:
                                            selectedMechanic.status === "Active"
                                                ? "#dcfce7"
                                                : selectedMechanic.status === "Busy"
                                                    ? "#fef3c7"
                                                    : "#fee2e2",

                                        color:
                                            selectedMechanic.status === "Active"
                                                ? "#166534"
                                                : selectedMechanic.status === "Busy"
                                                    ? "#92400e"
                                                    : "#7f1d1d",

                                        border:
                                            selectedMechanic.status === "Active"
                                                ? "1px solid #86efac"
                                                : selectedMechanic.status === "Busy"
                                                    ? "1px solid #fde68a"
                                                    : "1px solid #fecaca",
                                    }}
                                >
                                    {selectedMechanic.status === "Active" && "🟢"}
                                    {selectedMechanic.status === "Busy" && "🟡"}
                                    {selectedMechanic.status === "Inactive" && "🔴"}

                                    {selectedMechanic.status}
                                </span>

                            </div>
                        </div>

                        <hr style={{ margin: "10px 0", border: "none", height: "1px", background: "#e5e7eb" }} />

                        <div style={{ flexWrap: "wrap" }}>
                            <div>
                                📞 {selectedMechanic.contact}
                            </div>
                            <div>
                                ⭐ {selectedMechanic.rating}
                            </div>
                            <div>
                                🛠  {selectedMechanic.services.length} Services
                            </div>
                        </div>
                    </div>
                    )}

                    <hr />
                    <h2
                        style={{
                            margin: "10px 0",
                            fontSize: "1.4rem",
                            fontWeight: "700",
                            color: "#ecc40f",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                        }}
                    >
                        🛠 Service History
                    </h2>


                    {selectedMechanic.services.length === 0 ? (
                        <p className="empty">No services done yet</p>
                    ) : (
                        <div className="services-list"  >
                            {selectedMechanic.services.map((srv) =>
                                isMobile ? (
                                    /* 📱 Mobile View */
                                    <div key={srv.serviceId} className="service-card">
                                        <p><b>Service ID:</b> {srv.serviceId}</p>
                                        <p><b>Customer:</b> {srv.customerName}</p>
                                        <p><b>Title:</b> {srv.title}</p>
                                        <p><b>Tractor:</b> {srv.tractorModel}</p>
                                        <p><b>Date:</b> {srv.date}</p>
                                        <p><b>Status:</b> {srv.status}</p>
                                        <p><b>Cost:</b> ₹{srv.cost}</p>
                                    </div>
                                ) : (
                                    /* 💻 Desktop View */
                                  <div key={srv.serviceId} className="service-card" style={{ display: "flex", gap: "1rem", flexDirection: "row" }}>
                                    <p><b>Service ID: {srv.serviceId}</b></p>
                                    <p>{srv.customerName}</p>
                                    <p><b>{srv.title}</b></p>
                                    <p>{srv.tractorModel}</p>
                                    <p>{srv.date}</p>
                                    <p>Status: {srv.status}</p>
                                    <p>₹{srv.cost}</p>
                                </div>
                                )
                            )}

                        </div>
                    )}
                </div>
            </div>
        );
    }

    /* ---------------- LIST VIEW ---------------- */
    return (
        <div className="mechanic-mgmt">
            <div className="page-header">
                <div className="search-box">
                    <Search size={18} />
                    <input
                        placeholder="Search mechanic..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <button className="btn primary" onClick={() => navigate('/add-mechanic')}>
                    <Plus size={16} /> Add Mechanic
                </button>
            </div>

            {showAddModal && (
                <AddMechanic
                    onAdd={handleAddMechanic}
                    onClose={() => setShowAddModal(false)}
                />
            )}

            <div className="mechanics-grid">
                {mechanics
                    .filter((m) =>
                        (m.name + m.skill)
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                    )
                    .map((mech) => (
                        <div key={mech.id} className="mechanic-card">
                            <div className="mech-card-header">
                                <div className="mech-avatar-large">
                                    <User />
                                    <span
                                        className={`status-indicator ${mech.status.toLowerCase()}`}
                                    ></span>
                                </div>
                                <div>
                                    <h4>{mech.name}</h4>
                                    <div className="rating">
                                        <Award size={14} /> {mech.rating}
                                    </div>
                                </div>
                            </div>

                            <div className="mech-card-body">
                                <div className="info-row">
                                    <Settings size={16} /> {mech.skill}
                                </div>
                                <div className="info-row">
                                    <Phone size={16} /> {mech.contact}
                                </div>
                                <div className="info-row">
                                    <Clock size={16} /> {mech.services.length} Services
                                </div>
                            </div>

                            <div className="mech-card-footer">
                                <div className="status-badge">
                                    {mech.status === 'Active' && <CheckCircle2 size={14} />}
                                    {mech.status === 'Inactive' && <XCircle size={14} />}
                                    {mech.status === 'Busy' && <Clock size={14} />}
                                    <span>{mech.status}</span>
                                </div>

                                <button
                                    className="btn primary outline sm" style={{ color: "black" }}
                                    onClick={() => setSelectedMechanic(mech)}
                                >
                                    View History
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default MechanicManagement;
