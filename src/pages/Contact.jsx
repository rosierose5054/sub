import React, { useState } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

// Google Fonts
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Audiowide&family=Economica&display=swap');
`;
if (typeof document !== 'undefined') {
  document.head.appendChild(styleSheet);
}

const basraLocation = { lat: 30.5085, lng: 47.78 };
const mapContainerStyle = {
  width: "100%",
  height: "450px",
  borderRadius: "0.75rem",
};

export default function Contact() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent (demo)");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-6 py-16 font-[Economica]">
      {/* Title Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 font-[Audiowide] tracking-tight">
          Contact Us
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Get in touch with us today. We would love to hear from you and discuss how we can help you achieve your goals.
        </p>
      </div>

      {/* Main Contact Card */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Left: Contact Info */}
        <div className="bg-gray-50 p-10 md:w-1/2 border-r border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 font-[Audiowide]">
            Get In Touch
          </h2>
          <p className="text-gray-500 mb-10 text-sm leading-relaxed">
            Have any questions or need assistance? Please don't hesitate to reach out to us. Our team is here to help and will respond as soon as possible.
          </p>

          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="bg-orange-500 text-white p-3 rounded-full flex-shrink-0">
                <FaMapMarkerAlt size={18} />
              </div>
              <div>
                <p className="font-semibold text-gray-800 font-[Audiowide]">Address</p>
                <p className="text-sm text-gray-500">
                  Basra, Iraq
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-orange-500 text-white p-3 rounded-full flex-shrink-0">
                <FaPhoneAlt size={18} />
              </div>
              <div>
                <p className="font-semibold text-gray-800 font-[Audiowide]">Phone Number</p>
                <p className="text-sm text-gray-500">+9647700000000</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-orange-500 text-white p-3 rounded-full flex-shrink-0">
                <FaEnvelope size={18} />
              </div>
              <div>
                <p className="font-semibold text-gray-800 font-[Audiowide]">Email</p>
                <p className="text-sm text-gray-500">info@wasl.com</p>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="mt-10">
            <p className="text-gray-800 font-semibold mb-4 font-[Economica]">Follow Us:</p>
            <div className="flex gap-3">
              {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map(
                (Icon, i) => (
                  <div
                    key={i}
                    className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full cursor-pointer transition"
                  >
                    <Icon size={16} />
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="p-10 md:w-1/2 bg-white">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 font-[Economica]">
            Send a Message
          </h2>

          <div className="space-y-5">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email address"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Message"
              className="w-full p-3 rounded-lg border border-gray-300 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
            ></textarea>

            <button
              onClick={handleSubmit}
              className="w-full bg-orange-500 text-black py-3 font-semibold shadow-md hover:bg-orange-600 transition"
              style={{
                clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)',
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="w-full max-w-6xl mt-16 bg-white rounded-2xl shadow-lg p-6">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={basraLocation}
            zoom={13}
            options={{
              disableDefaultUI: true,
              styles: [
                {
                  featureType: "all",
                  elementType: "labels.text.fill",
                  stylers: [{ visibility: "off" }],
                },
              ],
            }}
          >
            <Marker position={basraLocation} />
          </GoogleMap>
        ) : (
          <div className="p-4 text-center text-gray-500">Loading map...</div>
        )}
      </div>
    </div>
  );
}