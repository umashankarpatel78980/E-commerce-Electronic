import React, { useState } from 'react';
import {
    Search,
    Filter,
    ArrowLeft,
    Package,
    ChevronRight,
} from 'lucide-react';
import './PartsManagement.css';
import { brands, models, allParts, categories } from './PartsData';
import {  useNavigate } from 'react-router-dom';
import AddBrand from './AddBrand';
import AddModel from './AddModel';
import AddCategories from './AddCategories';
import AddParts from './AddParts';

const PartsManagement = () => {
    const navigate = useNavigate();

    // State
    const [view, setView] = useState('brands'); // 'brands', 'models', 'categories', 'parts'
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [selectedModel, setSelectedModel] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [tractorType, setTractorType] = useState('big'); // 'small', 'big'
    const [formOpen, setFormOpen] = useState(false);
    const [formType, setFormType] = useState(''); // 'brand' | 'model' | 'category' | 'part'
    const [formProps, setFormProps] = useState({});

    // Navigation Handlers
    const handleBrandSelect = (brand) => {
        setSelectedBrand(brand);
        setView('models');
    };

    const handleModelSelect = (model) => {
        setSelectedModel(model);
        setView('categories');
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setView('parts');
    };

    const goBack = () => {
  if (view === 'parts') {
            setView('categories');
            setSelectedCategory(null);
        } else if (view === 'categories') {
            setView('models');
            setSelectedCategory(null);
            setSelectedModel(null);
        } else if (view === 'models') {
            setView('brands');
            setSelectedBrand(null);
            setSelectedModel(null);
        }
    };

    const openForm = (type, props = {}) => {
        setFormType(type);
        setFormProps(props);
        setFormOpen(true);
    };

    const closeForm = () => {
        setFormOpen(false);
        setFormType('');
        setFormProps({});
    };

    // Filter Logic
    const getFilteredItems = () => {
        const lowerSearch = searchTerm.toLowerCase();

        if (view === 'brands') {
            return brands.filter(b => b.name.toLowerCase().includes(lowerSearch));
        }
        if (view === 'models') {
            return models.filter(m =>
                m.brandId === selectedBrand?.id &&
                m.type === tractorType &&
                m.name.toLowerCase().includes(lowerSearch)
            );
        }
        if (view === 'categories') {
            return categories.filter(c =>
                c.name.toLowerCase().includes(lowerSearch)
            );
        }
        if (view === 'parts') {
            return allParts.filter(p =>
                p.modelId === selectedModel?.id &&
                p.name.toLowerCase().includes(lowerSearch)
            );
        }
        return [];
    };

    // Renders
    const renderBrands = () => (
        <div className="selection-grid">
            {getFilteredItems().map(brand => (
                <div key={brand.id} className="selection-card" onClick={() => handleBrandSelect(brand)}>
                    <div className="card-media">
                        <img src={brand.image} alt={brand.name} />
                        <div className="overlap-overlay">Select Brand</div>
                    </div>
                    <div className="card-info">
                        <h3>{brand.name}</h3>
                        <div className="arrow-icon"><ChevronRight size={20} /></div>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderModels = () => (
        <div className="selection-grid">
            {getFilteredItems().map(model => (
                <div key={model.id} className="selection-card" onClick={() => handleModelSelect(model)}>
                    <div className="card-media">
                        <img src={model.image} alt={model.name} style={{ objectFit: 'contain', padding: '10px' }} />
                        <div className="overlap-overlay">Select Model</div>
                    </div>
                    <div className="card-info">
                        <h3>{model.name}</h3>
                        <div className="arrow-icon"><ChevronRight size={20} /></div>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderCategories = () => (
        <div className="selection-grid categories">
            {getFilteredItems().map(category => (
                <div key={category.id} className="selection-card category" onClick={() => handleCategorySelect(category)}>
                    <div className="icon-wrapper">
                        {category.icon}
                    </div>
                    <h3>{category.name}</h3>
                    <div className="count-badge">Available</div>
                </div>
            ))}
        </div>
    );

    const renderPartsList = () => (
        <div className="parts-list-container">
            <div className="parts-grid">
                {getFilteredItems().map(part => (
                    <div key={part.id} className="item-card">
                        <div className="item-media">
                            <Package size={32} className="placeholder-icon" />
                        </div>
                        <div className="item-details">
                            <h4>{part.name}</h4>
                            <p className="part-id">#{part.id.toString().padStart(4, '0')}</p>
                            <div className="item-meta">
                                <span className="price">₹{part.price}</span>
                                <span className={part.stock < 10 ? "stock low" : "stock"}>
                                    {part.stock} in stock
                                </span>
                            </div>
                        </div>
                        <button className="add-btn">Add to Cart</button>
                    </div>
                ))}
            </div>
            {getFilteredItems().length === 0 && (
                <div className="empty-state">
                    <Package size={48} />
                    <p>No parts found for this category/model.</p>
                </div>
            )}
        </div>
    );

    return (
        <div className="parts-mgmt">
            {/* Header with Breadcrumbs */}
            <div className="page-header">
                <div className="header-content">
                    {view !== 'brands' && (
                        <button className="back-btn" onClick={goBack}>
                            <ArrowLeft size={20} />
                        </button>
                    )}
                    <div className="breadcrumbs">
                        <span onClick={() => { setView('brands'); setSelectedBrand(null); setSelectedModel(null); }} className={view === 'brands' ? 'active' : 'clickable'}>
                            All Brands
                        </span>
                        {selectedBrand && (
                            <>
                                <ChevronRight size={16} />
                                <span onClick={() => { setView('models'); setSelectedModel(null); setSelectedCategory(null); }} className={view === 'models' ? 'active' : 'clickable'}>{selectedBrand.name}</span>
                            </>
                        )}
                        {selectedModel && (
                             <>
                                <ChevronRight size={16} />
                                <span onClick={() => { setView('categories'); setSelectedCategory(null); }} className={view === 'categories' ? 'active' : 'clickable'}>{selectedModel.name}</span>
                            </>
                        )}
                        {selectedCategory && (
                            <>
                                <ChevronRight size={16} />
                                <span className={view === 'parts' ? 'active' : ''}>{selectedCategory.name}</span>
                            </>
                        )}

                    </div>
                </div>

                <div className="header-actions">
                    <div className="search-box">
                        <Search size={18} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="btn outline">
                        <Filter size={18} />
                        <span>Filter</span>
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="content-area animate-fade">
                {view === 'brands' && (
                    <>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 className="section-title">Select Tractor Brand</h2>
                            <div className="filter-tabs" style={{ display: 'flex', gap: '0.5rem' }}>
                                <button className='btn outline' onMouseEnter={e => e.target.style.backgroundColor = '#d97706'}
                                    onMouseLeave={e => e.target.style.backgroundColor = 'transparent'} onClick={() => openForm('brand')}>Add Brand</button>  </div>
                        </div>
                        {renderBrands()}
                    </>
                )}

                {view === 'models' && (
                    <>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 className="section-title" style={{ margin: 0 }}>Select {selectedBrand.name} Model</h2>
                            <div className="filter-tabs" style={{ display: 'flex', gap: '0.5rem' }}>
                                <button className={`btn ${tractorType === 'small' ? 'primary' : 'outline'}`} onClick={() => setTractorType('small')}>Small Tractors</button>
                                <button className={`btn ${tractorType === 'big' ? 'primary' : 'outline'}`} onClick={() => setTractorType('big')}>Big Tractors</button>
                                <button className='btn outline' onMouseEnter={e => e.target.style.backgroundColor = '#d97706'}
                                    onMouseLeave={e => e.target.style.backgroundColor = 'transparent'} onClick={() => openForm('model', { initialBrandId: selectedBrand?.id })}>Add Model</button>
                            </div>
                        </div>
                        {renderModels()}
                    </>
                )}

                {view === 'categories' && (
                    <>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 className="section-title" style={{ margin: 0 }}>Select {selectedModel.name} categories</h2>
                            <div className="filter-tabs" style={{ display: 'flex', gap: '0.5rem' }}>
                                <button className='btn outline' onMouseEnter={e => e.target.style.backgroundColor = '#d97706'}
                                    onMouseLeave={e => e.target.style.backgroundColor = 'transparent'} onClick={() => openForm('category', { initialModelId: selectedModel?.id })}>Add Category</button>
                            </div>
                        </div>
                        {renderCategories()}
                    </>
                )}



                {view === 'parts' && (
                    <>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 className="section-title" style={{ margin: 0 }}>Parts for {selectedModel.name}</h2>
                            <div className="filter-tabs" style={{ display: 'flex', gap: '0.5rem' }}>
                                <button className='btn outline' onMouseEnter={e => e.target.style.backgroundColor = '#d97706'}
                                    onMouseLeave={e => e.target.style.backgroundColor = 'transparent'} onClick={() => openForm('part', { initialCategoryId: selectedCategory?.id, initialModelId: selectedModel?.id })}>Add Parts</button>  </div>
                        </div>
                        {renderPartsList()}
                    </>
                )}

                {formOpen && (
                    <div className="slide-over-backdrop" onClick={closeForm}>
                        <div className="slide-over" onClick={e => e.stopPropagation()}>
                            <div className="slide-over-header">
                                <h3>{formType === 'brand' ? 'Add Brand' : formType === 'model' ? 'Add Model' : formType === 'category' ? 'Add Category' : 'Add Part'}</h3>
                                <button className="btn outline" onClick={closeForm}>Close</button>
                            </div>
                            <div className="slide-over-body">
                                {formType === 'brand' && <AddBrand {...formProps} onClose={closeForm} />}
                                {formType === 'model' && <AddModel {...formProps} onClose={closeForm} />}
                                {formType === 'category' && <AddCategories {...formProps} onClose={closeForm} />}
                                {formType === 'part' && <AddParts {...formProps} onClose={closeForm} />}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PartsManagement;
