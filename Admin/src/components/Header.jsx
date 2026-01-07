import React from 'react';
import { Bell, Search, User, Menu } from 'lucide-react';
import './Header.css';

const Header = ({ title }) => {
    return (
        <header className="header">
            <div className="header-left">
                <button className="mobile-menu-btn">
                    <Menu size={24} />
                </button>
                <h1 className="header-title">{title}</h1>
            </div>

            <div className="header-search">
                <Search size={18} className="search-icon" />
                <input type="text" placeholder="Search orders, parts, customers..." />
            </div>

            <div className="header-right">
                <button className="icon-btn">
                    <Bell size={20} />
                    <span className="notification-badge"></span>
                </button>
                <div className="user-profile">
                    <div className="user-info">
                        <span className="user-name">Sunil Mukati</span>
                        <span className="user-role">Shop Manager</span>
                    </div>
                    <div className="avatar">
                        <User size={20} />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
