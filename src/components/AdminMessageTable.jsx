import React from "react";

export const AdminMessageTable = ({ messages, onDelete }) => {
  const safeMessages = Array.isArray(messages) ? messages : [];

  return (
    <div className="w-full">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto bg-white dark:bg-gray-900 p-4 rounded-xl shadow-md">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3">Sender</th>
              <th className="px-4 py-3">Receiver</th>
              <th className="px-4 py-3">Message</th>
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 dark:text-gray-200">
            {safeMessages.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No messages found 🫤
                </td>
              </tr>
            ) : (
              safeMessages.map((msg) => (
                <tr
                  key={msg._id}
                  className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <td className="px-4 py-3">{msg.sender?.name || "Unknown"}</td>
                  <td className="px-4 py-3">{msg.receiver?.name || "Unknown"}</td>
                  <td className="px-4 py-3 break-words max-w-xs">{msg.message}</td>
                  <td className="px-4 py-3">
                    {new Date(msg.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => onDelete(msg._id)}
                      className="text-red-600 dark:text-red-400 hover:underline font-medium transition duration-150"
                    >
                      Delete 🗑️
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {safeMessages.length === 0 ? (
          <div className="text-center py-6 text-gray-500 dark:text-gray-400">
            No messages found 🫤
          </div>
        ) : (
          safeMessages.map((msg) => (
            <div
              key={msg._id}
              className="bg-white dark:bg-gray-900 rounded-xl shadow p-4 space-y-2 border border-gray-200 dark:border-gray-700"
            >
              <div>
                <span className="font-semibold text-gray-600 dark:text-gray-300">Sender: </span>
                {msg.sender?.name || "Unknown"}
              </div>
              <div>
                <span className="font-semibold text-gray-600 dark:text-gray-300">Receiver: </span>
                {msg.receiver?.name || "Unknown"}
              </div>
              <div>
                <span className="font-semibold text-gray-600 dark:text-gray-300">Message: </span>
                {msg.message}
              </div>
              <div>
                <span className="font-semibold text-gray-600 dark:text-gray-300">Time: </span>
                {new Date(msg.createdAt).toLocaleString()}
              </div>
              <div className="text-right">
                <button
                  onClick={() => onDelete(msg._id)}
                  className="text-red-600 dark:text-red-400 hover:underline font-medium transition duration-150"
                >
                  Delete 🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
