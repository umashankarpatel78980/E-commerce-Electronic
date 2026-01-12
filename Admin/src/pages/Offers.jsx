import React, { useState } from 'react';
import {
    Plus,
    Tag,
    Calendar,
    Trash2,
    Edit2,
    Gift,
    Zap,
    Percent
} from 'lucide-react';
import './Offers.css';

const Offers = () => {
    const offers = [
        { id: 1, title: 'Diwali Special 20%', type: 'Seasonal', discount: '20% Off', validUntil: 'Nov 15, 2025', status: 'Active', category: 'All Parts' },
        { id: 2, title: 'First Service Free', type: 'Welcome', discount: '100% Off', validUntil: 'Dec 31, 2025', status: 'Active', category: 'Service Only' },
        { id: 3, title: 'Monsoon Engine Check', type: 'Seasonal', discount: '₹500 Flat', validUntil: 'Aug 30, 2025', status: 'Expired', category: 'Engine Service' },
    ];

    return (
        <div className="offers-page">
            <div className="page-header">
                <h2 className="title-with-icon"><Gift className="text-primary" /> Active Offers & Promotions</h2>
                <button className="btn primary">
                    <Plus size={18} />
                    <span>Create New Offer</span>
                </button>
            </div>

            <div className="offers-grid">
                {offers.map((offer) => (
                    <div key={offer.id} className={`offer-card ${offer.status.toLowerCase()}`}>
                        <div className="offer-badge">{offer.type}</div>
                        <div className="offer-main">
                            <div className="offer-icon">
                                {offer.discount.includes('%') ? <Percent size={24} /> : <Zap size={24} />}
                            </div>
                            <div className="offer-details">
                                <h3>{offer.title}</h3>
                                <p className="discount-value">{offer.discount}</p>
                                <span className="offer-cat">{offer.category}</span>
                            </div>
                        </div>

                        <div className="offer-footer">
                            <div className="validity">
                                <Calendar size={14} />
                                <span>Valid till: {offer.validUntil}</span>
                            </div>
                            <div className="offer-actions">
                                <button className="icon-btn sm"><Edit2 size={16} /></button>
                                <button className="icon-btn sm danger"><Trash2 size={16} /></button>
                            </div>
                        </div>

                        {offer.status === 'Expired' && <div className="expired-overlay">EXPIRED</div>}
                    </div>
                ))}
            </div>

            <div className="card promo-tools">
                <h3>Promotion Tools</h3>
                <div className="tools-grid">
                    <div className="tool-item">
                        <div className="tool-icon"><Gift /></div>
                        <h4>Birthday Offers</h4>
                        <p>Automated discounts for customer birthdays.</p>
                        <button className="btn outline sm">Configure</button>
                    </div>
                    <div className="tool-item">
                        <div className="tool-icon"><Zap /></div>
                        <h4>Bulk SMS</h4>
                        <p>Notify customers about new arrivals.</p>
                        <button className="btn outline sm">Send Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Offers;
