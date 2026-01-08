import React, { useState } from 'react';
import {
    Plus,
    MapPin,
    Calendar,
    User,
    Wrench,
    ChevronRight,
    Filter,
    Search,
    AlertTriangle
} from 'lucide-react';
import './ServiceManagement.css';

const ServiceManagement = () => {
    const [activeTab, setActiveTab] = useState('All');

    const services = [
        { id: 'SR-1025', customer: 'Harish Verma', tractor: 'New Holland 3630', type: 'Home Service', location: 'Village Rampur', status: 'Pending', priority: 'Emergency', date: 'Oct 25, 09:00 AM' },
        { id: 'SR-1024', customer: 'Rajesh Kumar', tractor: 'Mahindra Arjun 555', type: 'Shop Service', location: 'Shop', status: 'In Progress', priority: 'Normal', mechanic: 'Vikram Singh', date: 'Oct 24, 02:30 PM' },
        { id: 'SR-1023', customer: 'Suresh Singh', tractor: 'Sonalika Worldtrac 60', type: 'Home Service', location: 'District Cantt', status: 'Pending', priority: 'Normal', date: 'Oct 24, 11:15 AM' },
        { id: 'SR-1022', customer: 'Amit Patel', tractor: 'John Deere 5310', type: 'Shop Service', location: 'Shop', status: 'Completed', priority: 'Normal', mechanic: 'Rahul Verma', date: 'Oct 23, 04:45 PM' },
    ];

    const mechanics = [
        { name: 'Vikram Singh', skill: 'Engine Expert', status: 'Busy' },
        { name: 'Rahul Verma', skill: 'Hydraulics', status: 'Available' },
        { name: 'Sameer Khan', skill: 'Electrical', status: 'Available' },
    ];

    const filteredServices = services.filter(s => activeTab === 'All' || s.status === activeTab);

    return (
        <div className="service-mgmt">
            <div className="page-header">
                <div className="tabs">
                    {['All', 'Pending', 'In Progress', 'Completed'].map(tab => (
                        <button
                            key={tab}
                            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <button className="btn primary">
                    <Plus size={18} />
                    <span>New Service Request</span>
                </button>
            </div>

            <div className="services-grid">
                <div className="services-list">
                    {filteredServices.map(service => (
                        <div key={service.id} className={`service-card-flat ${service.priority === 'Emergency' ? 'priority' : ''}`}>
                            <div className="service-main">
                                <div className="service-info-group">
                                    <div className="service-id-cont">
                                        <span className="id-badge">{service.id}</span>
                                        {service.priority === 'Emergency' && <span className="urgent-badge"><AlertTriangle size={12} /> Emergency</span>}
                                    </div>
                                    <h4 className="customer-name">{service.customer}</h4>
                                    <p className="tractor-model">{service.tractor}</p>
                                </div>

                                <div className="service-meta">
                                    <div className="meta-item">
                                        <MapPin size={14} />
                                        <span>{service.location}</span>
                                    </div>
                                    <div className="meta-item">
                                        <Calendar size={14} />
                                        <span>{service.date}</span>
                                    </div>
                                    <div className="meta-item">
                                        <Wrench size={14} />
                                        <span>{service.type}</span>
                                    </div>
                                </div>

                                <div className="service-status-section">
                                    <span className={`status-pill ${service.status.toLowerCase().replace(' ', '-')}`}>
                                        {service.status}
                                    </span>
                                    {service.mechanic ? (
                                        <div className="mechanic-assigned">
                                            <User size={14} />
                                            <span>{service.mechanic}</span>
                                        </div>
                                    ) : (
                                        <button className="btn-sm primary-outline">Assign Mechanic</button>
                                    )}
                                </div>

                                <button className="view-details">
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mechanic-sidebar">
                    <div className="card">
                        <div className="card-header">
                            <h3>Mechanics Availability</h3>
                        </div>
                        <div className="mechanic-list">
                            {mechanics.map((mech, idx) => (
                                <div key={idx} className="mechanic-item">
                                    <div className="mech-avatar">
                                        <User size={18} />
                                    </div>
                                    <div className="mech-info">
                                        <span className="mech-name">{mech.name}</span>
                                        <span className="mech-skill">{mech.skill}</span>
                                    </div>
                                    <span className={`status-dot ${mech.status.toLowerCase()}`}></span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="card promo-card">
                        <h4>Home Service Efficiency</h4>
                        <div className="promo-stat">
                            <span className="value">92%</span>
                            <span className="label">On-time Completion</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceManagement;
