import React, { useState, useMemo } from "react";
import {
    ArrowLeft,
    Package,
    ShoppingCart,
    Trash2,
    Plus,
    Minus,
    Info,
    CheckCircle,
    AlertCircle,
    Wrench,
    User,
    Calendar,
    MapPin,
    Save,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { brands, models, allParts, categories } from "./PartsData.jsx";

const CustomerServiceDashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const serviceData = location.state?.service || null;

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [cart, setCart] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const { detectedBrand, detectedModel } = useMemo(() => {
        if (!serviceData?.tractor) return {};
        const str = serviceData.tractor.toLowerCase();

        const detectedBrand = brands.find(
            b => b.id === serviceData?.brandId
        );

        const detectedModel = models.find(
            m => m.id === serviceData?.modelId
        );


        return { detectedBrand: detectedBrand, detectedModel: detectedModel };
    }, [serviceData]);

    const filteredParts = useMemo(() => {
        if (!detectedModel) return [];

        return allParts.filter(
            p =>
                p.modelId === detectedModel.id &&
                (!selectedCategory || p.categoryId === selectedCategory.id) &&
                p.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [detectedModel, selectedCategory, searchTerm]);

    const availableCategories = useMemo(() => {
        if (!detectedModel) return [];

        const categoryIds = [
            ...new Set(
                allParts
                    .filter(p => p.modelId === detectedModel.id)
                    .map(p => p.categoryId)
            )
        ];

        return categories.filter(c => categoryIds.includes(c.id));
    }, [detectedModel]);


    const totals = useMemo(() => {
        const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
        const tax = subtotal * 0.18;
        return { subtotal, tax, total: subtotal + tax };
    }, [cart]);

    const addToCart = part => {
        const ex = cart.find(i => i.id === part.id);
        if (ex)
            setCart(cart.map(i => (i.id === part.id ? { ...i, quantity: i.quantity + 1 } : i)));
        else setCart([...cart, { ...part, quantity: 1 }]);
    };

    const updateQuantity = (id, d) =>
        setCart(cart.map(i =>
            i.id === id ? { ...i, quantity: Math.max(1, i.quantity + d) } : i
        ));

    const removeFromCart = id => setCart(cart.filter(i => i.id !== id));

    const handleSaveService = () => {
        console.log({
            serviceId: serviceData.id,
            parts: cart,
            totals,
        });
        alert("Service saved successfully");
    };

    if (!serviceData) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
                <AlertCircle size={48} className="text-red-500" />
                <h2 className="text-xl font-bold mt-2">No Service Data</h2>
                <button
                    onClick={() => navigate("/service-management")}
                    className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg"
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* HEADER */}
            <div className="bg-white text-black rounded-xl shadow p-6 mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-600 mb-4"
                >
                    <ArrowLeft size={18} /> Back
                </button>

                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Service Dashboard</h1>
                    <span className="px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                        {serviceData.status}
                    </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    {[
                        { icon: User, label: "Customer", value: serviceData.customer },
                        { icon: Wrench, label: "Tractor", value: serviceData.tractor },
                        { icon: MapPin, label: "Location", value: serviceData.location },
                        {
                            icon: Calendar,
                            label: "Date",
                            value: new Date(serviceData.dateISO).toLocaleDateString(),
                        },
                    ].map((m, i) => (
                        <div key={i} className="bg-gray-50 p-4 rounded-lg flex gap-3">
                            <m.icon className="text-blue-600" />
                            <div>
                                <p className="text-xs text-gray-500">{m.label}</p>
                                <p className="font-semibold">{m.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* DETECTION */}
            <div className="bg-white rounded-xl shadow p-4 mb-6 flex justify-between">
                <div className="flex gap-2 items-center">
                    <Info className="text-blue-600" />
                    {detectedBrand && detectedModel ? (
                        <span className="font-semibold">
                            {detectedBrand.name} / {detectedModel.name}
                        </span>
                    ) : (
                        <span className="text-red-500">Detection failed</span>
                    )}
                </div>
                <CheckCircle className="text-green-500" />
            </div>

            {/* MAIN GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* PARTS */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
                    <div className="flex justify-between mb-4">
                        <h2 className="text-xl font-bold">Parts</h2>
                        <input
                            className="border px-3 py-2 rounded-lg"
                            placeholder="Search parts"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredParts.map(p => (
                            <div
                                key={p.id}
                                className="border rounded-lg p-4 flex justify-between items-center"
                            >
                                <div>
                                    <h4 className="font-semibold">{p.name}</h4>
                                    <p className="text-sm text-gray-500">
                                        ₹{p.price} | Stock {p.stock}
                                    </p>
                                </div>
                                <button
                                    onClick={() => addToCart(p)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CART */}
                <div className="bg-white rounded-xl shadow p-6">
                    <h2 className="text-xl font-bold mb-4">Cart</h2>

                    {cart.length === 0 ? (
                        <p className="text-gray-500 text-center">No items</p>
                    ) : (
                        <>
                            {cart.map(i => (
                                <div key={i.id} className="flex justify-between mb-3">
                                    <div>
                                        <p className="font-semibold">{i.name}</p>
                                        <p className="text-sm">₹{i.price} × {i.quantity}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => updateQuantity(i.id, -1)}><Minus size={16} /></button>
                                        <button onClick={() => updateQuantity(i.id, 1)}><Plus size={16} /></button>
                                        <button onClick={() => removeFromCart(i.id)} className="text-red-500">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}

                            <div className="border-t pt-3 text-sm space-y-1">
                                <div className="flex justify-between">
                                    <span>Subtotal</span><span>₹{totals.subtotal}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>GST</span><span>₹{totals.tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between font-bold">
                                    <span>Total</span><span>₹{totals.total.toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleSaveService}
                                className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg flex justify-center gap-2"
                            >
                                <Save size={18} /> Save Service
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CustomerServiceDashboard;
