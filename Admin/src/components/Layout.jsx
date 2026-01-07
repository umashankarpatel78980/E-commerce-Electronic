import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import './Layout.css';

const Layout = ({ children, title }) => {
    return (
        <div className="admin-container">
            <Sidebar />
            <div className="main-content">
                <Header title={title} />
                <main className="page-content animate-fade">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
