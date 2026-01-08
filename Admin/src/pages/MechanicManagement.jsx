import React, { useState } from 'react';
import {
    Plus,
    Search,
    User,
    Phone,
    Settings,
    Award,
    Clock,
    MoreVertical,
    CheckCircle2,
    XCircle
} from 'lucide-react';
import './MechanicManagement.css';

const MechanicManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const mechanics = [
        { id: 1, name: 'Vikram Singh', skill: 'Engine & Transmission', contact: '+91 98765 43210', status: 'Active', assignments: 12, rating: 4.8 },
        { id: 2, name: 'Rahul Verma', skill: 'Hydraulics & Implements', contact: '+91 98765 43211', status: 'Busy', assignments: 8, rating: 4.5 },
        { id: 3, name: 'Sameer Khan', skill: 'Electrical & Electronics', contact: '+91 98765 43212', status: 'Active', assignments: 15, rating: 4.9 },
        { id: 4, name: 'Amit Dogra', skill: 'General Servicing', contact: '+91 98765 43213', status: 'Inactive', assignments: 0, rating: 4.2 },
    ];

    return (
        <div className="mechanic-mgmt">
            <div className="page-header">
                <div className="search-box">
                    <Search size={18} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search by name or skill..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="btn primary">
                    <Plus size={18} />
                    <span>Add Mechanic</span>
                </button>
            </div>

            <div className="mechanics-grid">
                {mechanics.map((mech) => (
                    <div key={mech.id} className="mechanic-card">
                        <div className="mech-card-header">
                            <div className="mech-avatar-large">
                                <User size={32} />
                                <span className={`status-indicator ${mech.status.toLowerCase()}`}></span>
                            </div>
                            <div className="mech-header-info">
                                <h4>{mech.name}</h4>
                                <div className="rating">
                                    <Award size={14} className="text-primary" />
                                    <span>{mech.rating} Rating</span>
                                </div>
                            </div>
                            <button className="icon-btn sm"><MoreVertical size={18} /></button>
                        </div>

                        <div className="mech-card-body">
                            <div className="info-row">
                                <Settings size={16} />
                                <span>{mech.skill}</span>
                            </div>
                            <div className="info-row">
                                <Phone size={16} />
                                <span>{mech.contact}</span>
                            </div>
                            <div className="info-row">
                                <Clock size={16} />
                                <span>{mech.assignments} Services Done</span>
                            </div>
                        </div>

                        <div className="mech-card-footer">
                            <div className="status-badge">
                                {mech.status === 'Active' && <CheckCircle2 size={14} className="text-accent" />}
                                {mech.status === 'Inactive' && <XCircle size={14} className="text-danger" />}
                                {mech.status === 'Busy' && <Clock size={14} className="text-warning" />}
                                <span className={mech.status.toLowerCase()}>{mech.status}</span>
                            </div>
                            <button className="btn outline sm">View History</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MechanicManagement;
