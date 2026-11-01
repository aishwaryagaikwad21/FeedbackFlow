
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

const FeedbackListing = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/feedbackFlow/allFeedbacks");

      setFeedbacks(response.data.feedbacks || []);
    } catch (err) {
      console.error("Error fetching feedback:", err);

      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Unable to load feedback."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  // Identify feedback submitted from this browser
  const savedTokens = JSON.parse(
    localStorage.getItem("feedbackEditTokens") || "{}"
  );

  const filteredFeedbacks = useMemo(() => {
    let result = [...feedbacks];

    // Search
    const searchTerm = search.toLowerCase().trim();

    if (searchTerm) {
      result = result.filter(
        (item) =>
          item.name?.toLowerCase().includes(searchTerm) ||
          item.feedback?.toLowerCase().includes(searchTerm)
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      result = result.filter(
        (item) =>
          item.category?.toLowerCase() === selectedCategory
      );
    }

    // Sorting
    result.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();

      return sortOrder === "newest"
        ? dateB - dateA
        : dateA - dateB;
    });

    return result;
  }, [feedbacks, search, selectedCategory, sortOrder]);

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleDelete = async (feedbackId) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete your feedback?"
  );

  if (!confirmed) return;

  try {
    const savedTokens = JSON.parse(
      localStorage.getItem("feedbackEditTokens") || "{}"
    );

    const editToken = savedTokens[feedbackId];

    if (!editToken) {
      alert("You are not authorized to delete this feedback.");
      return;
    }

    await api.delete(`/feedbackFlow/delete/${feedbackId}`, {
      headers: {
        "X-Feedback-Token": editToken,
      },
    });

    // Remove feedback from UI
    setFeedbacks((previous) =>
      previous.filter((item) => item._id !== feedbackId)
    );

    // Remove the corresponding token
    delete savedTokens[feedbackId];

    localStorage.setItem(
      "feedbackEditTokens",
      JSON.stringify(savedTokens)
    );

  } catch (err) {
    console.error("Delete feedback error:", err);

    alert(
      err.response?.data?.error ||
      err.response?.data?.message ||
      "Unable to delete feedback."
    );
  }
};

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-purple-600">
            Community Voices
          </p>

          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Customer Feedback
          </h1>

          <p className="mt-3 text-gray-500">
            Explore experiences and opinions shared by our community.
          </p>
        </div>

        {/* Summary */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500">
              Total submissions
            </p>

            <p className="text-2xl font-bold text-gray-900">
              {feedbacks.length}
            </p>
          </div>

          <button
            onClick={fetchFeedbacks}
            disabled={loading}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:opacity-50"
          >
            {loading ? "Refreshing..." : "↻ Refresh"}
          </button>
        </div>

        {/* Search and filters */}
        <div className="mb-8 grid gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm md:grid-cols-3">

          <input
            type="text"
            placeholder="Search by name or feedback..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
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

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-purple-500"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        {/* Loading */}
        {loading && (
          <div className="rounded-xl bg-white p-12 text-center text-gray-500">
            Loading feedback...
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-700">
            <p>{error}</p>

            <button
              onClick={fetchFeedbacks}
              className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Feedback cards */}
        {!loading && !error && (
          <>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-semibold text-gray-800">
                Submitted Reviews
              </h2>

              <span className="text-sm text-gray-500">
                {filteredFeedbacks.length} results
              </span>
            </div>

            {filteredFeedbacks.length === 0 ? (
              <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
                <h3 className="text-lg font-semibold text-gray-700">
                  No feedback found
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Try another search term or category.
                </p>
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2">

                {filteredFeedbacks.map((item) => {
                  const isOwnFeedback = Boolean(
                    item._id && savedTokens[item._id]
                  );

                  return (
                    <article
                      key={item._id}
                      className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
                    >
                      {/* Card header */}
                      <div className="mb-4 flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {item.name}
                          </h3>

                          <p className="mt-1 text-xs text-gray-500">
                            {formatDate(item.createdAt)}
                          </p>
                        </div>

                        <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium capitalize text-purple-700">
                          {item.category}
                        </span>
                      </div>

                      {/* Rating */}
                      <div className="mb-4 flex items-center gap-2">
                        <span className="text-lg tracking-wide text-yellow-400">
                          {"★".repeat(
                            Math.max(0, Math.min(5, Number(item.rating) || 0))
                          )}
                          {"☆".repeat(
                            5 - Math.max(0, Math.min(5, Number(item.rating) || 0))
                          )}
                        </span>

                        <span className="text-sm text-gray-500">
                          {item.rating}/5
                        </span>
                      </div>

                      {/* Feedback */}
                      <p className="whitespace-pre-wrap leading-relaxed text-gray-700">
                        {item.feedback}
                      </p>

                      {/* Ownership indicator */}
                      {isOwnFeedback && (
                        <div className="mt-5 flex justify-end border-t border-gray-100 pt-4">
                            <button
                            onClick={() => handleDelete(item._id)}
                            className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                            >
                            Delete
                            </button>
                        </div>
                    )}
                    </article>
                  );
                })}

              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FeedbackListing;
