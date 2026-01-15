import React from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import { imageUrl } from "../redux/api/baseApi";

function SingleBooking() {
  const navigate = useNavigate();
  const location = useLocation();

  const booking = location.state?.booking;

  const getImg = (path) => {
    if (!path) return "https://cdn-icons-png.flaticon.com/512/149/149071.png";
    return `${imageUrl}/${path.replace(/\\/g, "/")}`;
  };
  console.log(booking);
  if (!booking) {
    return (
      <div className="p-10 text-center">
        <p>No booking data found. Please go back and select again.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-teal-500 underline"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <IoArrowBackOutline
          className="text-[#10A4B2] text-2xl cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-xl font-bold text-gray-800">Booking Details</h1>
      </div>

      {/* Main Card */}
      <div className="rounded-sm p-12 min-h-[80vh] bg-white shadow-sm border border-gray-100">
        {/* User Info Section - Clickable */}
        <div
          onClick={() =>
            navigate(`/dashboard/user-details/${booking.normalUser?._id}`)
          }
          className="flex flex-col gap-4 cursor-pointer group w-fit"
          title="View User Profile"
        >
          <img
            src={getImg(booking.normalUser?.profile_image)}
            alt={booking.normalUser?.fullName}
            className="object-cover w-32 h-32 shadow-sm rounded-3xl group-hover:ring-2 ring-[#10A4B2] transition-all"
          />
          <div>
            <h2 className="mb-2 text-2xl font-bold text-gray-800 group-hover:text-[#10A4B2] transition-colors">
              {booking.normalUser?.fullName}
            </h2>
            <div className="grid grid-cols-[100px_1fr] gap-y-1 text-sm font-medium">
              <span className="font-bold text-gray-900">Email</span>
              <span className="font-normal text-gray-700">
                {booking.normalUser?.email?.[0] || "N/A"}
              </span>
              <span className="font-bold text-gray-900">Phone</span>
              <span className="font-normal text-gray-700">
                {booking.normalUser?.phone?.[0] || "N/A"}
              </span>
            </div>
          </div>
        </div>

        {/* Appointment Grid Details */}
        <div className="grid grid-cols-5 gap-8 pt-10 mt-24 border-t border-gray-50">
          <div>
            <h3 className="mb-3 font-bold text-gray-900">Booking Date</h3>
            <p className="text-sm text-gray-700">
              {new Date(booking.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div>
            <h3 className="mb-3 font-bold text-gray-900">Visit Location</h3>
            <p className="text-sm text-gray-700">
              {booking.provider?.address || "Location N/A"}
            </p>
          </div>
          <div>
            <h3 className="mb-3 font-bold text-gray-900">Booking Type</h3>
            <p className="text-sm text-gray-700 capitalize">
              {booking.provider?.providerTypeKey?.toLowerCase()}
            </p>
          </div>
          <div>
            <h3 className="mb-3 font-bold text-gray-900">Reason For Visit</h3>
            <p className="text-sm text-gray-700">{booking.reasonForVisit}</p>
          </div>
          <div>
            <h3 className="mb-3 font-bold text-gray-900">Schedule</h3>
            <p className="text-sm text-gray-700">
              {new Date(booking.appointmentDateTime).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-700">
              {new Date(booking.appointmentDateTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>

        {/* Service Provider Section - Clickable */}
        <div className="mt-24">
          <h3 className="mb-6 text-xl font-bold text-gray-800">
            Service Provider
          </h3>
          <div
            className="flex items-center gap-5 cursor-pointer group w-fit"
            onClick={() =>
              navigate(`/dashboard/provider-details/${booking.provider?._id}`)
            }
            title="View Provider Profile"
          >
            <div className="flex items-center justify-center w-24 h-24 bg-gray-100 border rounded-2xl group-hover:ring-2 ring-[#10A4B2] transition-all">
              <span className="text-2xl font-bold text-teal-600">
                {booking.provider?.fullName?.[0]}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="text-xl font-bold text-gray-900 group-hover:text-[#10A4B2] transition-colors">
                {booking.provider?.fullName}
              </h4>
              <p className="text-sm text-gray-500">{booking.service?.title}</p>
              <p className="text-sm font-medium text-gray-500">
                {booking.provider?.phone?.[0]}
              </p>
              <p className="text-sm text-gray-500">
                {booking.provider?.email?.[0]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleBooking;
