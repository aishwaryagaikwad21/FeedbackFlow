import { useEffect, useMemo, useState } from "react";
import api from "../services/api";

const categories = [
  "all",
  "product",
  "service",
  "app",
  "food",
  "travel",
  "shopping",
  "education",
  "entertainment",
  "other",
];

const FeedbackManagement = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  // Fetch all feedback
  const fetchFeedbacks = async () => {
    
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/feedbackFlow/allFeedbacks");
      console.log(response.data.feedbacks);

      console.log("API Response:", response.data);
    console.log("First feedback:", response.data.feedbacks?.[0]);

      setFeedbacks(response.data.feedbacks || []);
    } catch (err) {
      console.error("Error fetching feedback:", err);
      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Unable to fetch feedback."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  // Search and category filtering
  const filteredFeedbacks = useMemo(() => {
    return feedbacks.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" ||
        item.category?.toLowerCase() === selectedCategory;

      const searchTerm = search.toLowerCase().trim();

      const matchesSearch =
        !searchTerm ||
        item.name?.toLowerCase().includes(searchTerm) ||
        item.email?.toLowerCase().includes(searchTerm) ||
        item.feedback?.toLowerCase().includes(searchTerm);

      return matchesCategory && matchesSearch;
    });
  }, [feedbacks, search, selectedCategory]);

  // Admin delete feedback
  const handleDelete = async (feedbackId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this feedback?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(feedbackId);

      await api.delete(`/admin/auth/delete/${feedbackId}`);

      setFeedbacks((previousFeedbacks) =>
        previousFeedbacks.filter((item) => item._id !== feedbackId)
      );
    } catch (err) {
      console.error("Error deleting feedback:", err);

      alert(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Unable to delete feedback."
      );
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-sm font-medium text-purple-600">
              ADMIN PANEL
            </p>

            <h1 className="text-3xl font-bold text-gray-900">
              Feedback Management
            </h1>

            <p className="mt-2 text-gray-500">
              View, manage and moderate submitted feedback.
            </p>
          </div>

          <button
            onClick={fetchFeedbacks}
            disabled={loading}
            className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 font-medium text-gray-700 transition hover:bg-gray-100 disabled:opacity-50"
          >
            {loading ? "Refreshing..." : "↻ Refresh"}
          </button>
        </div>

        {/* Summary */}
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Total feedback</p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {feedbacks.length}
          </p>
        </div>

        {/* Search and filters */}
        <div className="mb-6 flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm md:flex-row">
          <input
            type="text"
            placeholder="Search by name, email or feedback..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-3 capitalize outline-none focus:border-purple-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </option>
            ))}
          </select>
        </div>

        {/* Loading */}
        {loading && (
          <div className="rounded-xl bg-white p-12 text-center text-gray-500 shadow-sm">
            Loading feedback...
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
            <p className="font-semibold">Something went wrong</p>
            <p className="mt-1 text-sm">{error}</p>

            <button
              onClick={fetchFeedbacks}
              className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Feedback list */}
        {!loading && !error && (
          <>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-semibold text-gray-800">
                Submitted Feedback
              </h2>

              <span className="text-sm text-gray-500">
                Showing {filteredFeedbacks.length} of {feedbacks.length}
              </span>
            </div>

            {filteredFeedbacks.length === 0 ? (
              <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
                <p className="text-lg font-semibold text-gray-700">
                  No feedback found
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  Try changing your search or category filter.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFeedbacks.map((item) => (
                  <div
                    key={item._id}
                    className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                  >
                    <div className="flex flex-col justify-between gap-4 sm:flex-row">
                      {/* Feedback details */}
                      <div className="min-w-0 flex-1">
                        <div className="mb-3 flex flex-wrap items-center gap-3">
                          <h3 className="font-semibold text-gray-900">
                            {item.name}
                          </h3>

                          <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium capitalize text-purple-700">
                            {item.category}
                          </span>
                        </div>

                        <p className="text-sm text-gray-500">
                          {item.email}
                        </p>

                        <p className="mt-4 whitespace-pre-wrap leading-relaxed text-gray-700">
                          {item.feedback}
                        </p>

                        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                          <span>
                            {"★".repeat(
                              Math.max(0, Math.min(5, Number(item.rating) || 0))
                            )}
                            {"☆".repeat(
                              5 -
                                Math.max(
                                  0,
                                  Math.min(5, Number(item.rating) || 0)
                                )
                            )}
                            <span className="ml-2 text-gray-600">
                              {item.rating}/5
                            </span>
                          </span>

                          <span>
                            {formatDate(item.createdAt)}
                          </span>
                        </div>
                      </div>

                      {/* Delete button */}
                      <div className="flex items-start">
                        <button
                          onClick={() => handleDelete(item._id)}
                          disabled={
                            deletingId === item._id || !item._id
                          }
                          className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {deletingId === item._id
                            ? "Deleting..."
                            : "Delete"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FeedbackManagement;