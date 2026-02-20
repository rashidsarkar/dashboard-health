import React, { useEffect, useMemo } from "react"; // Added useMemo
import { Clock, Trash2 } from "lucide-react";
import { message, Spin } from "antd"; // Added Spin for better UX
import {
  useGetNotificationQuery,
  useSeeNotificationMutation,
  useDeleteNotificationMutation,
} from "../redux/api/notificationApi";
import { formatRelativeTime } from "../../utils/timeUtils";
import { Navigate } from "../../Navigate"; // Assuming you want the title back

const Notification = () => {
  const { data, isLoading } = useGetNotificationQuery();
  const [seeNotification] = useSeeNotificationMutation();
  const [deleteNotification] = useDeleteNotificationMutation();

  // 1. Sort notifications to show latest data first
  const sortedNotifications = useMemo(() => {
    const rawNotifications = data?.data?.result || [];
    // Create a copy before sorting to avoid mutating the read-only RTK Query cache
    return [...rawNotifications].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );
  }, [data]);

  // 2. Mark as seen when visiting the page
  useEffect(() => {
    const markAsSeen = async () => {
      try {
        // Only call if there is data to mark as seen
        if (data?.data?.result?.length > 0) {
          await seeNotification().unwrap();
        }
      } catch (err) {
        console.error("Failed to mark seen:", err);
      }
    };
    markAsSeen();
  }, [seeNotification, data]);

  // 3. Handle Delete
  const handleDelete = async (id) => {
    try {
      await deleteNotification(id).unwrap();
      message.success("Notification deleted");
    } catch (err) {
      message.error("Failed to delete notification");
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Spin size="large" />
      </div>
    );

  return (
    <div className="bg-white p-3 h-[87vh] overflow-auto">
      <Navigate title={"Notification"} />

      <div className="mt-4 space-y-4">
        {sortedNotifications.map((note) => (
          <div
            key={note?._id}
            className="p-4 transition bg-white border border-gray-100 rounded-xl hover:shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-bold text-gray-800">
                    {note?.title}
                  </h3>
                  <div className="flex items-center gap-1 text-xs font-medium text-gray-400">
                    <Clock className="w-3.5 h-3.5" />
                    {formatRelativeTime(note?.createdAt)}
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-gray-500">
                  {note?.message}
                </p>
              </div>

              <button
                onClick={() => handleDelete(note?._id)}
                className="p-2 text-gray-300 transition-colors rounded-lg hover:text-red-500 hover:bg-red-50"
                title="Delete Notification"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}

        {sortedNotifications.length === 0 && (
          <div className="flex flex-col items-center justify-center h-[50vh] text-gray-400">
            <p>No notifications found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;
