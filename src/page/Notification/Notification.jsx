import React, { useEffect } from "react";
import { Clock, Trash2 } from "lucide-react";
import { message } from "antd";
import {
  useGetNotificationQuery,
  useSeeNotificationMutation,
  useDeleteNotificationMutation,
} from "../redux/api/notificationApi";
import { formatRelativeTime } from "../../utils/timeUtils";

const Notification = () => {
  const { data, isLoading } = useGetNotificationQuery();
  const [seeNotification] = useSeeNotificationMutation();
  const [deleteNotification] = useDeleteNotificationMutation();

  const notifications = data?.data?.result || [];

  // 1. Mark as seen when visiting the page
  useEffect(() => {
    const markAsSeen = async () => {
      try {
        await seeNotification().unwrap();
      } catch (err) {
        console.error("Failed to mark seen:", err);
      }
    };
    markAsSeen();
  }, [seeNotification]);

  // 2. Handle Delete
  const handleDelete = async (id) => {
    try {
      await deleteNotification(id).unwrap();
      message.success("Notification deleted");
    } catch (err) {
      message.error("Failed to delete notification");
    }
  };

  if (isLoading) return <p className="mt-10 text-center">Loading...</p>;

  return (
    <div className="bg-white p-3 h-[87vh] overflow-auto">
      <div className="space-y-4">
        {notifications.map((note) => (
          <div
            key={note?._id}
            className="p-4 transition border border-gray-200 rounded-lg hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {note?.title}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    {formatRelativeTime(note?.createdAt)}
                  </div>
                </div>
                <p className="text-gray-600">{note?.message}</p>
              </div>

              <button
                onClick={() => handleDelete(note?._id)} // Delete Function
                className="ml-4 text-[#0A6169] transition hover:text-[#0A6169]"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Notification;
