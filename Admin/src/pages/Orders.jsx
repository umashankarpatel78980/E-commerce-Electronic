import React, { useState } from 'react';
import {
    Search,
    FileText,
    Download,
    Printer,
    CreditCard,
    IndianRupee,
    MoreVertical,
    CheckCircle2,
    Clock
} from 'lucide-react';
import './Orders.css';

const Orders = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const orders = [
        { id: 'ORD-5501', customer: 'Rajesh Kumar', items: 'Heavy Duty Clutch Plate, Oil Filter', total: 5350, type: 'Parts + Service', status: 'Completed', date: 'Oct 24, 2025', payment: 'UPI' },
        { id: 'ORD-5502', customer: 'Suresh Singh', items: 'Hydraulic Pump', total: 12500, type: 'Parts Only', status: 'In Progress', date: 'Oct 24, 2025', payment: 'Pending' },
        { id: 'ORD-5503', customer: 'Amit Patel', items: 'Brake Liner Kit', total: 2200, type: 'Parts Only', status: 'Completed', date: 'Oct 23, 2025', payment: 'Cash' },
        { id: 'ORD-5504', customer: 'Harish Verma', items: 'Emergency Engine Repair', total: 3200, type: 'Service Only', status: 'Pending', date: 'Oct 25, 2025', payment: 'Pending' },
    ];

    return (
        <div className="orders-page">
            <div className="page-header">
                <div className="search-box">
                    <Search size={18} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search by Order ID or Customer..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="header-actions">
                    <button className="btn primary">
                        <Printer size={18} />
                        <span>Daily Report</span>
                    </button>
                </div>
            </div>

            <div className="orders-container">
                <div className="card">
                    <div className="table-responsive">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Customer</th>
                                    <th>Order Type</th>
                                    <th>Total Amount</th>
                                    <th>Payment</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id}>
                                        <td>
                                            <div className="order-id-group">
                                                <span className="order-id">{order.id}</span>
                                                <span className="order-date">{order.date}</span>
                                            </div>
                                        </td>
                                        <td>{order.customer}</td>
                                        <td><span className="type-tag">{order.type}</span></td>
                                        <td><span className="total-cell">₹{order.total}</span></td>
                                        <td>
                                            <div className="payment-status">
                                                {order.payment === 'Pending' ? (
                                                    <span className="pay-tag pending"><Clock size={12} /> Pending</span>
                                                ) : (
                                                    <span className="pay-tag success"><CheckCircle2 size={12} /> {order.payment}</span>
                                                )}
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`status-pill ${order.status.toLowerCase().replace(' ', '-')}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="action-row">
                                                <button className="btn-icon" title="View Invoice"><FileText size={18} /></button>
                                                <button className="btn-icon" title="Download PDF"><Download size={18} /></button>
                                                <button className="btn-icon"><MoreVertical size={18} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="invoice-preview-panel">
                    <div className="card">
                        <div className="invoice-header">
                            <div className="invoice-title">
                                <FileText className="text-primary" />
                                <h3>Invoice Preview</h3>
                            </div>
                            <span className="badge">DRAFT</span>
                        </div>

                        <div className="invoice-content">
                            <div className="brand-header">
                                <h4>TractorHub Garage</h4>
                                <p>Main Road, Agri Zone, MH</p>
                            </div>

                            <div className="bill-to">
                                <span className="label">Bill To:</span>
                                <h5>Rajesh Kumar</h5>
                                <p>Village Rampur, Sector 4</p>
                            </div>

                            <div className="invoice-items">
                                <div className="item-row header">
                                    <span>Description</span>
                                    <span>Amount</span>
                                </div>
                                <div className="item-row">
                                    <span>Clutch Plate (Mahindra)</span>
                                    <span>₹4500.00</span>
                                </div>
                                <div className="item-row">
                                    <span>Oil Filter XL</span>
                                    <span>₹850.00</span>
                                </div>
                                <div className="item-row">
                                    <span>Home Service Charges</span>
                                    <span>₹500.00</span>
                                </div>
                                <div className="divider"></div>
                                <div className="item-row total">
                                    <span>Total Payable</span>
                                    <span>₹5850.00</span>
                                </div>
                            </div>
                        </div>

                        <div className="invoice-actions">
                            <button className="btn outline full">Save Draft</button>
                            <button className="btn primary full">
                                <CreditCard size={18} />
                                Generate Bill
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Orders;
