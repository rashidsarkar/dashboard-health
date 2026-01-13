import React from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { Spin } from "antd";
import { imageUrl } from "../redux/api/baseApi";
import { useGetSingleUserQuery } from "../redux/api/normalUserApi";

const SingleUserDetails = () => {
  const { id } = useParams(); // ID from URL
  const navigate = useNavigate();

  // Fetching real data using the ID
  const { data: response, isLoading, isError } = useGetSingleUserQuery(id);

  // Based on your sample JSON, the profile is often the first item in an array: response.data[0]
  const profileData = response?.data?.[0];
  console.log("profileData:", profileData);

  const getImgUrl = (path) => {
    if (!path) return "https://cdn-icons-png.flaticon.com/512/149/149071.png";
    return `${imageUrl}/${path.replace(/\\/g, "/")}`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spin size="large" tip="Loading Profile..." />
      </div>
    );
  }

  if (isError || !profileData) {
    return (
      <div className="p-10 font-medium text-center text-red-500">
        Error loading profile or user not found.
      </div>
    );
  }

  const userAccount = profileData.user?.[0] || {};
  const medicalDocs = profileData.medicalDocument?.[0] || {};

  return (
    <div className="min-h-screen p-6 bg-[#F9FAFB]">
      {/* Header Navigation */}
      <div className="flex items-center gap-3 mb-6">
        <IoArrowBackOutline
          className="text-[#10A4B2] text-2xl cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-xl font-bold text-gray-800">User Profile</h1>
      </div>

      {/* Main Profile Card */}
      <div className="p-12 mb-8 bg-white border border-gray-100 shadow-sm rounded-2xl">
        <div className="flex flex-col gap-6">
          <div className="flex items-start gap-6">
            <img
              src={getImgUrl(profileData.profile_image)}
              alt={profileData.fullName}
              className="object-cover w-32 h-32 border-2 shadow-sm rounded-2xl border-teal-50"
            />
            <div className="mt-2">
              <h2 className="mb-3 text-3xl font-bold text-gray-800">
                {profileData.fullName}
              </h2>
              <div className="grid grid-cols-[80px_1fr] gap-y-1 text-sm">
                <span className="font-bold text-gray-900">Email</span>
                <span className="text-gray-600">{userAccount.email}</span>
                <span className="font-bold text-gray-900">Phone</span>
                <span className="text-gray-600">{userAccount.phone}</span>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-6 pt-8 mt-6 border-t md:grid-cols-7">
            <div>
              <h4 className="mb-2 text-sm font-bold text-gray-900">Address</h4>
              <p className="text-xs leading-relaxed text-gray-600">
                {profileData.address}
              </p>
            </div>
            <div>
              <h4 className="mb-2 text-sm font-bold text-gray-900">Gender</h4>
              <p className="text-xs text-gray-600 capitalize">
                {profileData.gender?.toLowerCase()}
              </p>
            </div>
            <div>
              <h4 className="mb-2 text-sm font-bold text-gray-900">
                Date Of Birth
              </h4>
              <p className="text-xs text-gray-600">
                {profileData.dateOfBirth
                  ? new Date(profileData.dateOfBirth).toLocaleDateString(
                      "en-GB"
                    )
                  : "N/A"}
              </p>
            </div>
            <div>
              <h4 className="mb-2 text-sm font-bold text-gray-900">
                Blood Group
              </h4>
              <p className="text-xs text-gray-600">{profileData.bloodGroup}</p>
            </div>
            <div>
              <h4 className="mb-2 text-sm font-bold text-gray-900">
                Emergency Contact
              </h4>
              <p className="text-xs text-gray-600">
                {profileData.emergencyContact}
              </p>
            </div>
            <div>
              <h4 className="mb-2 text-sm font-bold text-gray-900">
                Plan Type
              </h4>
              <p className="text-xs text-gray-600">Premium</p>
            </div>
            <div>
              <h4 className="mb-2 text-sm font-bold text-gray-900">
                Health Card
              </h4>
              <span className="bg-gray-100 text-gray-700 text-[10px] font-bold px-3 py-1 rounded-full">
                #{profileData.membershipId}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Documents Section */}
      <div className="mb-10">
        <h3 className="mb-5 text-lg font-bold text-gray-800">Document</h3>
        <div className="flex flex-wrap gap-4">
          {medicalDocs.medical_mySelf_image?.map((img, idx) => (
            <img
              key={idx}
              src={getImgUrl(img)}
              className="object-cover w-40 h-40 border border-gray-200 shadow-sm rounded-xl"
              alt="Doc"
            />
          ))}
          {!medicalDocs.medical_mySelf_image?.length && (
            <p className="text-xs italic text-gray-400">
              No documents uploaded.
            </p>
          )}
        </div>
      </div>

      {/* Family Section */}
      <div className="mb-10">
        <h3 className="mb-5 text-lg font-bold text-gray-800">Family Member</h3>
        <div className="flex flex-wrap gap-4">
          {medicalDocs.medical_family_image?.map((img, idx) => (
            <img
              key={idx}
              src={getImgUrl(img)}
              className="object-cover w-40 h-40 border border-gray-200 shadow-sm rounded-xl"
              alt="Family Doc"
            />
          ))}
          {!medicalDocs.medical_family_image?.length && (
            <p className="text-xs italic text-gray-400">
              No family documents uploaded.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleUserDetails;
