import { useState } from "react";
import './Forms.css';
import { useNavigate } from "react-router-dom";

const AddBrand = (props) => {
  const [brandName, setBrandName] = useState("");
  const [brandImage, setBrandImage] = useState("");
    const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBrand = {
      name: brandName,
      image: brandImage,
    };

    console.log("Brand Added:", newBrand);
    // 🔗 API call here

    setBrandName("");
    setBrandImage("");
  };

  return (
    <div className="form-card">
      <div className="card">
        <div className="card-header">
          <h3>Add New Brand</h3>
        </div>
        <div className="form-body">
          <form onSubmit={handleSubmit} className="form-body">
            <div className="form-row">
              <label>Brand Name</label>
              <input
                type="text"
                placeholder="Enter brand name"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                required
              />
            </div>

            <div className="form-row">
              <label>Brand Image URL</label>
              <input
                type="text"
                placeholder="Enter image URL"
                value={brandImage}
                onChange={(e) => setBrandImage(e.target.value)}
                required
              />
            </div>

            {brandImage && (
              <div className="form-row">
                <label>Preview</label>
                <img src={brandImage} alt="Preview" className="preview-img" />
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
              <button type="submit" className="btn-primary">Add Brand</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBrand;
