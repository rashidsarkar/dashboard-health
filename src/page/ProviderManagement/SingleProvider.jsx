import React from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { RxCrossCircled } from "react-icons/rx";
import { useNavigate, useParams } from "react-router-dom";
import { Spin } from "antd";
// import { useGetSingleProviderQuery } from "../redux/api/providerApi";
import { imageUrl } from "../../page/redux/api/baseApi";
import { useGetSingleProviderQuery } from "../redux/api/providerApi";

const SingleProvider = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 1. Fetch Real Detail Data using the ID from URL
  const { data: response, isLoading } = useGetSingleProviderQuery(id);
  const provider = response?.data;
  console.log(provider);

  const getImgUrl = (path) => {
    if (!path) return "https://cdn-icons-png.flaticon.com/512/149/149071.png";
    return `${imageUrl}/${path.replace(/\\/g, "/")}`;
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" />
      </div>
    );
  if (!provider)
    return <div className="p-10 text-center">Provider not found.</div>;

  return (
    <div className="min-h-screen p-6 bg-[#F9FAFB]">
      <div className="flex items-center gap-3 mb-6">
        <IoArrowBackOutline
          className="text-[#10A4B2] text-2xl cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-xl font-bold text-gray-800">Provider Profile</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-10 min-h-[85vh]">
        {/* Profile Header */}
        <div className="flex items-start gap-6 mb-10">
          <img
            src={getImgUrl(provider.profile_image)}
            alt={provider.fullName}
            className="object-cover w-32 h-32 border shadow-sm rounded-2xl"
          />
          <div className="mt-2">
            <h2 className="text-3xl font-bold text-gray-800">
              {provider.fullName}
            </h2>
            <div className="mt-2 space-y-1">
              <p className="flex gap-4 text-gray-600">
                <span className="w-12 font-bold text-gray-900">Email</span>
                {provider.user?.email}
              </p>
              <p className="flex gap-4 text-gray-600">
                <span className="w-12 font-bold text-gray-900">Phone</span>
                {provider.user?.phone}
              </p>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 gap-8 pb-10 mb-10 border-b md:grid-cols-5">
          <div>
            <h4 className="mb-1 font-bold text-gray-900">Specialization</h4>
            <p className="text-gray-600">{provider.specialization || "N/A"}</p>
          </div>
          <div>
            <h4 className="mb-1 font-bold text-gray-900">Experience</h4>
            <p className="text-gray-600">{provider.yearsOfExperience} Years</p>
          </div>
          <div>
            <h4 className="mb-1 font-bold text-gray-900">License No.</h4>
            <p className="text-gray-600">
              {provider.medicalLicenseNumber ||
                provider.drugLicenseNumber ||
                "N/A"}
            </p>
          </div>
          <div className="col-span-1 md:col-span-2">
            <h4 className="mb-1 font-bold text-gray-900">Address</h4>
            <p className="text-sm text-gray-600">{provider.address}</p>
          </div>
        </div>

        {/* About */}
        <div className="mb-10">
          <h3 className="mb-3 text-xl font-bold text-gray-800">About</h3>
          <p className="max-w-4xl leading-relaxed text-gray-500">
            {provider.about}
          </p>
        </div>

        {/* Services */}
        <div className="mb-12">
          <h3 className="mb-4 text-xl font-bold text-gray-800">Services</h3>
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {provider.services?.map((s) => (
              <li
                key={s._id}
                className="flex items-center gap-3 font-medium text-gray-700"
              >
                <span className="w-2 h-2 bg-[#10A4B2] rounded-full"></span>
                {s.title}
              </li>
            ))}
          </ul>
        </div>

        {/* Availability */}
        <div className="mb-12">
          <h3 className="mb-5 text-xl font-bold text-gray-800">
            Availability Information
          </h3>
          <div className="flex flex-wrap gap-4">
            {provider.availabilityDays?.map((day) => (
              <div
                key={day._id}
                className="bg-[#10A4B2] text-white rounded-lg p-4 min-w-[200px] relative shadow-sm"
              >
                <div className="flex items-center justify-between pb-1 mb-2 text-xs font-bold tracking-wider uppercase border-b border-white/20">
                  <span>{day.dayOfWeek}</span>
                  {/* <RxCrossCircled className="text-lg cursor-pointer opacity-70 hover:opacity-100" /> */}
                </div>
                {day.availabilitySlots?.map((slot) => (
                  <p key={slot._id} className="text-xs font-medium opacity-90">
                    From {slot.startTime} to {slot.endTime}
                  </p>
                ))}
              </div>
            ))}
            {provider.availabilityDays?.length === 0 && (
              <p className="italic text-gray-400">No availability set.</p>
            )}
          </div>
        </div>

        {/* Documents */}
        <div>
          <h3 className="mb-5 text-xl font-bold text-gray-800">
            Identification Documents
          </h3>
          <div className="flex flex-wrap gap-4">
            {provider.identification_images ? (
              <img
                src={getImgUrl(provider.identification_images)}
                className="object-cover w-64 h-40 border shadow-sm rounded-xl"
                alt="ID"
              />
            ) : (
              <p className="italic text-gray-400">No documents uploaded.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProvider;
