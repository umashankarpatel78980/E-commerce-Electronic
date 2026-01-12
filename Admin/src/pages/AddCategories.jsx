import { useState } from "react";
import { useLocation,useNavigate } from 'react-router-dom';
import './Forms.css';

const AddCategory = (props) => {
  const location = useLocation();
  const [categoryName, setCategoryName] = useState("");
  const [categoryIcon, setCategoryIcon] = useState("");
  const [modelId, setModelId] = useState(props?.initialModelId || location.state?.modelId || "");
const navigate = useNavigate();
    const handleSubmit = (e) => {
    e.preventDefault();
    const newCategory = {
        name: categoryName,
        icon: categoryIcon,
        modelId,
    };
    console.log("Category Added:", newCategory);
    // 🔗 API call here
    // e.preventDefault();
    setCategoryName("");
    setCategoryIcon("");
    setModelId("");
  };
  return (
    <div className="form-card">
      <div className="card">
        <div className="card-header">
          <h3>Add New Category</h3>
        </div>
        <div className="form-body">
          <form onSubmit={handleSubmit} className="form-body">

            <div className="form-row">
              <label>Category Name</label>
              <input type="text" placeholder="Enter category name" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} required />
            </div>

            <div className="form-row">
              <label>Category Icon (emoji / icon name)</label>
              <input type="text" placeholder="⚙️ or EngineIcon" value={categoryIcon} onChange={(e) => setCategoryIcon(e.target.value)} required />
            </div>

            {categoryIcon && (
              <div className="form-row">
                <label>Icon Preview</label>
                <div className="preview-img" style={{height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem'}}>{categoryIcon}</div>
              </div>
            )}

            <div className="form-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => {
                  if (props?.onClose) return props.onClose();
                  navigate(-1);
                }}
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary">Add Category</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );                        
        
};

export default AddCategory;
