"use client"
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "../../../../context/AppProvider";

export default function PropertyDetails() {
  const { isLoading, authToken } = useAuth();
  const { id } = useParams(); // Get property ID from URL
  const router = useRouter();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Modal State


  useEffect(() => {
    if (!id) return;

    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user-myProducts/${id}`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      }
    })
      .then((response) => {
        setProperty(response.data.product);
        setLoading(false);
        alert(response.data.product);
      })
      .catch((err) => {
        console.error("Error fetching property:", err);
        setLoading(false);
      });
  }, [id]);

  console.log(property);

  const handleUpdate = (updatedProperty) => {
    setProperty(updatedProperty); // Update the state with new data
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        }
      });
      alert("Property deleted successfully!");
      router.push("/properties"); // Redirect to property list after deletion
    } catch (error) {
      console.error("Error deleting property:", error);
      alert("Failed to delete property.");
    }
  };

  if (loading) return <p>Loading property details...</p>;
  if (!property) return <p>Loading property details...</p>;
  return (
    <div className="container mx-auto p-6 pt-20">
      {/* RERA Status */}
      <div className="mt-4 flex items-center gap-2">
        <span className="bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded">RERA STATUS</span>
        <span className="bg-gray-200 text-gray-800 text-xs font-semibold px-2 py-1 rounded">
          {property.rera_status ?? "Not Available"}
        </span>
        {property.rera_link && (
          <a href={property.rera_link} className="text-blue-500 text-sm hover:underline" target="_blank" rel="noopener noreferrer">
            View on RERA Website
          </a>
        )}

        {/* Edit Button */}
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="ml-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Edit
        </button>

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>

      {/* Property Details */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-[400px_auto] gap-6 bg-gray-100 p-6 rounded-lg">
        {/* Image Container */}
        <div className="bg-white shadow-md p-4 rounded-lg">
          <img
            alt={property.title ?? ""}
            className="w-full h-60 object-cover rounded-md"
            src={property.image_path ?? "/default-property.jpg"}
          />
          <p className="text-gray-600 mt-2 text-center">📷 Photos (1/7)</p>
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DetailCard icon="🏠" label="Title" value={property.name ?? "N/A"} />
          <DetailCard icon="📖" label="Description" value={property.description ?? "N/A"} />
          <DetailCard icon="📏" label="Area" value={`${property.area_sqft ?? "N/A"} sq.ft.`} />
          <DetailCard icon="💰" label="Price" value={`₹ ${property.price ?? "N/A"}`} />
          <DetailCard icon="💵" label="Price per Sq.ft" value={`₹ ${property.price_per_sqft ?? "N/A"}`} />
          <DetailCard icon="🏡" label="Type" value={property.property_type ?? "N/A"} />
          <DetailCard icon="🗺️" label="Category" value={property.category ?? "N/A"} />
          <DetailCard icon="📍" label="Location" value={property.location ?? "N/A"} />
          <DetailCard icon="📆" label="Posted Date" value={property.posted_date ?? "N/A"} />
          <DetailCard icon="🏢" label="Floor" value={property.floor_number ?? "N/A"} />
          <DetailCard icon="🧭" label="Facing" value={property.facing ?? "N/A"} />
          <DetailCard icon="🎂" label="Property Age" value={property.property_age ?? "N/A"} />
          <DetailCard icon="🚪" label="Ready to Move" value={property.ready_to_move ? "Yes" : "No"} />
          <DetailCard icon="🏙️" label="Overlooking" value={property.overlooking ?? "N/A"} />
          <DetailCard icon="⚖️" label="EMI Estimate" value={`₹ ${property.emi_estimate ?? "N/A"}`} />
          <DetailCard icon="🔖" label="Status" value={property.status ?? "N/A"} />
        </div>
      </div>

      {/* Edit Property Modal */}
      {isEditModalOpen && <EditPropertyModal property={property} onClose={() => setIsEditModalOpen(false)} onUpdate={handleUpdate} />}
    </div>


  );
}

function DetailCard({ icon, label, value }) {
  return (
    <div className="bg-white p-4 shadow-md rounded-md flex items-center">
      <span className="text-gray-600 text-xl">{icon}</span>
      <p className="ml-3"><strong>{label}:</strong> {value}</p>
    </div>
  );
}


// 🔥 Edit Property Modal Component
function EditPropertyModal({ property, onClose, onUpdate }) {
  const [formData, setFormData] = useState({ ...property });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleImageUpload = (e) => {
  //   setFormData({ ...formData, image: e.target.files[0] });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    onClose(); // Close modal after submission

    const updatedFormData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        updatedFormData.append(key, String(value));
      }
    });

    const handleImageUpload = (e) => {
      setFormData({ ...formData, image: e.target.files[0] });
    };

    try {
      await axios.get("http://localhost:8000/sanctum/csrf-cookie", { withCredentials: true });

      const response = await axios.put(
        `http://localhost:8000/api/properties/${property.id}`,
        updatedFormData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
          },
        }
      );

      onUpdate(response.data);
      onClose();
    } catch (error) {
      console.error("Error updating property:", error);
      setError(error.response?.data?.message || "Error updating property");
      alert(error.response?.data?.message || "Failed to update property!");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center pt-20">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Edit Property</h2>
        <form onSubmit={handleSubmit} className="grid gap-4 text-xs">
          <input type="text" name="title" value={formData.title ?? ""} onChange={handleChange} placeholder="Property Title" className="border p-2 rounded w-full" />

          <textarea name="description" value={formData.description ?? ""} onChange={handleChange} placeholder="Description" className="border p-2 rounded w-full"></textarea>

          <input type="number" name="price" value={formData.price ?? ""} onChange={handleChange} placeholder="Price" className="border p-2 rounded w-full" />

          <input type="text" name="location" value={formData.location ?? ""} onChange={handleChange} placeholder="Location" className="border p-2 rounded w-full" />

          {/* Category Field */}
          <select name="category" value={formData.category ?? ""} onChange={handleChange} className="border p-2 rounded w-full">
            <option value="">Select Category</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
          </select>

          {/* Property Type Field */}
          <select name="property_type" value={formData.property_type ?? ""} onChange={handleChange} className="border p-2 rounded w-full">
            <option value="">Select Property Type</option>
            <option value="Apartment">Apartment</option>
            <option value="Independent House">Independent House</option>
            <option value="Builder Floor">Builder Floor</option>
            <option value="Farmhouse">Farmhouse</option>
            <option value="Studio Apartment">Studio Apartment</option>
            <option value="Penthouse">Penthouse</option>
            <option value="Residential Land">Residential Land</option>
            <option value="PG">PG</option>
          </select>

          <select name="listing_type" value={formData.listing_type ?? ""} onChange={handleChange} className="border p-2 rounded w-full">
            <option value="">Select Listing Type</option>
            <option value="Sale">Sale</option>
            <option value="Rent">Rent</option>
            <option value="Lease">Lease</option>
            <option value="Buy">Buy</option>
            <option value="PG">PG</option>
          </select>

          <select name="status" value={formData.status ?? ""} onChange={handleChange} className="border p-2 rounded w-full">
            <option value="">Select Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="sold">Sold</option>
          </select>

          <input type="number" name="area_sqft" value={formData.area_sqft ?? ""} onChange={handleChange} placeholder="Area (sq.ft.)" className="border p-2 rounded w-full" />

          <input type="text" name="configuration" value={formData.configuration ?? ""} onChange={handleChange} placeholder="Configuration" className="border p-2 rounded w-full" />

          <input type="number" name="floor_number" value={formData.floor_number ?? ""} onChange={handleChange} placeholder="Area (sq.ft.)" className="border p-2 rounded w-full" />


          <select name="facing" value={formData.facing ?? ""} onChange={handleChange} className="border p-2 rounded w-full">
            <option value="">Select Facing</option>
            <option value="north">North</option>
            <option value="south">South</option>
            <option value="east">East</option>
            <option value="west">West</option>
          </select>

          <input type="text" name="overlooking" value={formData.overlooking ?? ""} onChange={handleChange} placeholder="Overlooking" className="border p-2 rounded w-full" />

          <input type="text" name="property_age" value={formData.property_age ?? ""} onChange={handleChange} placeholder="Property Age" className="border p-2 rounded w-full" />






          {/* <input type="file" name="image" onChange={handleImageUpload} className="border p-2 rounded w-full" /> */}



          <div className="flex justify-end gap-4 mt-4">
            <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}