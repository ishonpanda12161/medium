import { Appbar } from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handlePublish = async () => {
    if (!title || !description) return alert("Title and content are required!");
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        { title, content: description },
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      navigate(`/blog/${response.data.id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to publish. Try again!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Appbar />

      <div className="flex justify-center w-full pt-12 px-4">
        <div className="max-w-screen-lg w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">

          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="w-full text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-4 placeholder-gray-400"
            placeholder="Your blog title..."
          />

          <TextEditor onChange={(e) => setDescription(e.target.value)} />

          <div className="flex justify-end mt-6">
            <button
              onClick={handlePublish}
              type="button"
              className="px-6 py-3 text-white bg-gray-600 hover:bg-orange-400 rounded-lg font-medium shadow-md focus:ring-4 focus:ring-blue-300 transition-colors"
            >
              Publish Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function TextEditor({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
  return (
    <div className="mt-4">
      <div className="w-full">
        <div className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-blue-400 transition-all">
          <textarea
            onChange={onChange}
            id="editor"
            rows={12}
            className="block w-full p-4 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300 bg-transparent border-0 focus:outline-none text-base md:text-lg resize-none"
            placeholder="Start writing your article here..."
            required
          />
        </div>
      </div>
    </div>
  );
}
