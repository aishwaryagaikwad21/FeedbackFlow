
import { useState } from "react";
import api from "../services/api";

const categories = [
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

const WriteFeedback = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    feedback: "",
    rating: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleRating = (rating) => {
    setFormData((previous) => ({
      ...previous,
      rating,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess(false);

    if (formData.rating === 0) {
      setError("Please select a rating.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post(
        "/feedbackFlow/write",
        formData
      );

      const { feedbackId, editToken } = response.data;

      // Store the edit token locally for future editing/deletion.
      if (feedbackId && editToken) {
        const savedTokens = JSON.parse(
          localStorage.getItem("feedbackEditTokens") || "{}"
        );

        savedTokens[feedbackId] = editToken;

        localStorage.setItem(
          "feedbackEditTokens",
          JSON.stringify(savedTokens)
        );
      }

      setSuccess(true);

      setFormData({
        name: "",
        email: "",
        category: "",
        feedback: "",
        rating: 0,
      });
    } catch (err) {
      console.error("Feedback submission error:", err);

      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Unable to submit feedback. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-2xl">

        {/* Heading */}
        <div className="mb-8 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-purple-600">
            Your Voice Matters
          </p>

          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Share Your Feedback
          </h1>

          <p className="mt-3 text-gray-500">
            Tell us about your experience. Your feedback helps us improve.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
        >

          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>

            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>

            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
            />
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Feedback Category
            </label>

            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 capitalize outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
            >
              <option value="" disabled>
                Select a category
              </option>

              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Feedback */}
          <div>
            <label
              htmlFor="feedback"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Your Feedback
            </label>

            <textarea
              id="feedback"
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              placeholder="Share your experience with us..."
              rows={5}
              required
              className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
            />
          </div>

          {/* Rating */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Rate Your Experience
            </label>

            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRating(star)}
                  aria-label={`Rate ${star} out of 5`}
                  aria-pressed={formData.rating === star}
                  className={`text-3xl transition hover:scale-110 ${
                    star <= formData.rating
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}

              <span className="ml-2 text-sm text-gray-500">
                {formData.rating > 0
                  ? `${formData.rating}/5`
                  : "Select a rating"}
              </span>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="rounded-lg bg-green-50 p-4 text-sm text-green-700">
              Your feedback has been submitted successfully!
              Thank you for sharing your experience.
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default WriteFeedback;
