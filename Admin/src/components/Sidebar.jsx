import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Settings,
    Wrench,
    Package,
    Users,
    ClipboardList,
    Tag,
    BarChart3,
    LogOut,
    ChevronRight
} from 'lucide-react';
import './Sidebar.css';
import logo from '../assets/final_logo_1-removebg-preview.png';

const Sidebar = () => {
    const menuItems = [
        { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
        { name: 'Parts Management', path: '/parts', icon: <Package size={20} /> },
        { name: 'Service Requests', path: '/services', icon: <Wrench size={20} /> },
        { name: 'Mechanics', path: '/mechanics', icon: <Users size={20} /> },
        { name: 'Orders & Billing', path: '/orders', icon: <ClipboardList size={20} /> },
        { name: 'Offers & Promos', path: '/offers', icon: <Tag size={20} /> },
        { name: 'Reports', path: '/reports', icon: <BarChart3 size={20} /> },
        { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="logo" >
                    <div className="logo-wrapper" >
                        <img src={logo} alt="Pranavee Enterprises Logo" className="logo-image" />
                    </div>
                    <span className="brand-name">PRANAVI ENTERPRISES</span>
                </div>
            </div>
            <nav className="sidebar-nav">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
                    >
                        <span className="nav-icon">{item.icon}</span>
                        <span className="nav-text">{item.name}</span>
                        <ChevronRight className="nav-arrow" size={14} />
                    </NavLink>
                ))}
            </nav>
            <div className="sidebar-footer">
                <button className="logout-btn">
                    <LogOut size={20} />
                    <span>Logout Admin</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
