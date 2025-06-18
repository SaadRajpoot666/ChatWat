import React from "react";

export const AdminMessageTable = ({ messages, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
        <thead className="bg-gray-100 text-gray-700 text-sm">
          <tr>
            <th className="p-2 text-left">Sender</th>
            <th className="p-2 text-left">Receiver</th>
            <th className="p-2 text-left">Message</th>
            <th className="p-2 text-left">Time</th>
            <th className="p-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {messages.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center p-4">
                No messages found 🫤
              </td>
            </tr>
          ) : (
            messages.map((msg) => (
              <tr key={msg._id} className="border-t text-sm">
                <td className="p-2">{msg.sender?.username || "Unknown"}</td>
                <td className="p-2">{msg.receiver?.username || "Unknown"}</td>
                <td className="p-2">{msg.content}</td>
                <td className="p-2">{new Date(msg.timestamp).toLocaleString()}</td>
                <td className="p-2">
                  <button
                    onClick={() => onDelete(msg._id)}
                    className="text-red-600 hover:underline"
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
  );
};

