import { useState } from "react";
import { useLocation,useNavigate } from 'react-router-dom';
import './Forms.css';

const AddModel = (props) => {
  const location = useLocation();
  const [modelName, setModelName] = useState("");
  const [modelImage, setModelImage] = useState("");
  const [brandId, setBrandId] = useState(props?.initialBrandId || location.state?.brandId || "");
const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    const newModel = {
      name: modelName,
      image: modelImage,
      brandId,
    };

    console.log("Model Added:", newModel);
    // 🔗 API call here

    setModelName("");
    setModelImage("");
    setBrandId("");
  };

  return (
    <div className="form-card">
      <div className="card">
        <div className="card-header">
          <h3>Add New Model</h3>
        </div>
        <div className="form-body">
          <form onSubmit={handleSubmit} className="form-body">

            <div className="form-row">
              <label>Model Name</label>
              <input type="text" placeholder="Enter model name" value={modelName} onChange={(e) => setModelName(e.target.value)} required />
            </div>

            <div className="form-row">
              <label>Model Image URL</label>
              <input type="text" placeholder="Enter image URL" value={modelImage} onChange={(e) => setModelImage(e.target.value)} required />
            </div>

            {modelImage && (
              <div className="form-row">
                <label>Preview</label>
                <img src={modelImage} alt="Preview" className="preview-img" />
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
              <button type="submit" className="btn-primary">Add Model</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddModel;
