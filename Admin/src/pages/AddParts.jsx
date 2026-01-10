import { useState } from "react";
import { useLocation,useNavigate } from 'react-router-dom';
import './Forms.css';

const AddPart = (props) => {
  const location = useLocation();
  const [partName, setPartName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [categoryId, setCategoryId] = useState(props?.initialCategoryId || location.state?.categoryId || "");
 const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    const newPart = {
      name: partName,
      price,
      stock,
      categoryId,
    };

    console.log("Part Added:", newPart);
    // 🔗 API call here

    setPartName("");
    setPrice("");
    setStock("");
    setCategoryId("");
  };

  return (
    <div className="form-card">
      <div className="card">
        <div className="card-header">
          <h3>Add New Part</h3>
        </div>
        <div className="form-body">
          <form onSubmit={handleSubmit} className="form-body">

            <div className="form-row">
              <label>Part Name</label>
              <input type="text" placeholder="Enter part name" value={partName} onChange={(e) => setPartName(e.target.value)} required />
            </div>

              <div className="form-row">
                <label>Price (₹)</label>
                <input type="number" placeholder="0" value={price} onChange={(e) => setPrice(e.target.value)} required />
              </div>

              <div className="form-row">
                <label>Stock</label>
                <input type="number" placeholder="0" value={stock} onChange={(e) => setStock(e.target.value)} required />
              </div>

            {stock && (
              <p className={`text-sm ${stock < 10 ? 'low-stock' : 'ok-stock'}`} style={{color: stock < 10 ? 'var(--danger)' : 'var(--accent)'}}>
                {stock < 10 ? 'Low stock warning' : 'Stock level OK'}
              </p>
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
              <button type="submit" className="btn-primary">Add Part</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPart;
