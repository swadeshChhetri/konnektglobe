"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from '../../../../utils/api';
import Image from "next/image";

interface Property {
  id: string;
  name?: string;
  title?: string;
  price?: number;
  location?: string;
  description?: string;
  area_sqft?: number;
  price_per_sqft?: number;
  property_type?: string;
  category?: string;
  posted_date?: string;
  floor_number?: number;
  facing?: string;
  property_age?: string;
  ready_to_move?: boolean;
  overlooking?: string;
  emi_estimate?: number;
  status?: string;
  rera_status?: string;
  rera_link?: string;
  image_path?: string;
  configuration?: string;
  listing_type?: string;
  [key: string]: string | number | boolean | undefined;
}

export default function PropertyDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    api.get(`/user-myProducts/${id}`) // baseURL is already handled by api instance
      .then((response) => {
        setProperty(response.data.product);
        setLoading(false);
        console.log("Fetched property:", response.data.product);
      })
      .catch((err) => {
        console.error("Error fetching property:", err);
        setLoading(false);
      });
  }, [id]);

  const handleUpdate = (updatedProperty: Property) => {
    setProperty(updatedProperty);
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;

    try {
      await api.delete(`/products/${id}`);
      alert("Property deleted successfully!");
      router.push("/properties");
    } catch (error) {
      console.error("Error deleting property:", error);
      alert("Failed to delete property.");
    }
  };

  if (loading) return <p>Loading property details...</p>;
  if (!property) return <p>No property found.</p>;

  return (
    <div className="container mx-auto p-6 pt-20">
      <div className="mt-4 flex items-center gap-2">
        <span className="bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded">RERA STATUS</span>
        <span className="bg-gray-200 text-gray-800 text-xs font-semibold px-2 py-1 rounded">
          {property.rera_status ?? "Not Available"}
        </span>
        {property.rera_link && (
          <a
            href={property.rera_link}
            className="text-blue-500 text-sm hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
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

      <div className="mt-6 grid grid-cols-1 md:grid-cols-[400px_auto] gap-6 bg-gray-100 p-6 rounded-lg">
        <div className="bg-white shadow-md p-4 rounded-lg">
          <Image
            src={property.image_path ?? "/default-property.jpg"}
            alt={property.name ?? property.title ?? "Property Image"}
            width={500}
            height={300}
            className="w-full h-60 object-cover rounded-md"
          />
          <p className="text-gray-600 mt-2 text-center">📷 Photos (1/7)</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DetailCard icon="🏠" label="Title" value={property.title ?? property.name ?? "N/A"} />
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

      {isEditModalOpen && (
        <EditPropertyModal property={property} onClose={() => setIsEditModalOpen(false)} onUpdate={handleUpdate} />
      )}
    </div>
  );
}

function DetailCard({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string | number | boolean | null;
}) {
  return (
    <div className="bg-white p-4 shadow-md rounded-md flex items-center">
      <span className="text-gray-600 text-xl">{icon}</span>
      <p className="ml-3">
        <strong>{label}:</strong> {value}
      </p>
    </div>
  );
}

function EditPropertyModal({
  property,
  onClose,
  onUpdate,
}: {
  property: Property;
  onClose: () => void;
  onUpdate: (updatedProperty: Property) => void;
}) {
  const [formData, setFormData] = useState<Property>({ ...property });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target;
  
    const value =
      target instanceof HTMLInputElement && target.type === "checkbox"
        ? target.checked
        : target.value;
  
    const name = target.name;
  
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await api.put(`/products/${ property.id }`, formData);

      onUpdate(response.data);
      onClose();
    } catch (error: unknown) {
      console.error("Error updating property:", error);
    
      if (error instanceof Error && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        const message = axiosError.response?.data?.message || "Error updating property";
        setError(message);
        alert(message);
      } else {
        setError("Failed to update property!");
        alert("Failed to update property!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center pt-20 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Edit Property</h2>
        <form onSubmit={handleSubmit} className="grid gap-4 text-xs">
          <input
            type="text"
            name="title"
            value={formData.title ?? ""}
            onChange={handleChange}
            placeholder="Property Title"
            className="border p-2 rounded w-full"
          />

          <textarea
            name="description"
            value={formData.description ?? ""}
            onChange={handleChange}
            placeholder="Description"
            className="border p-2 rounded w-full"
          />

          <input
            type="number"
            name="price"
            value={formData.price ?? ""}
            onChange={handleChange}
            placeholder="Price"
            className="border p-2 rounded w-full"
          />

          <input
            type="text"
            name="location"
            value={formData.location ?? ""}
            onChange={handleChange}
            placeholder="Location"
            className="border p-2 rounded w-full"
          />

          {/* Example of select */}
          <select
            name="category"
            value={formData.category ?? ""}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="">Select Category</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
          </select>

          {/* Add other inputs/selects similarly */}

          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
          {error && <p className="text-red-600 text-xs mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
}