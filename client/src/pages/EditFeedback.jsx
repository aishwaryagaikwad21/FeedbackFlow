
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

const EditFeedback = () => {
  const { feedbackId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    feedback: "",
    rating: 0,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Retrieve feedback and verify ownership
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const savedTokens = JSON.parse(
          localStorage.getItem("feedbackEditTokens") || "{}"
        );

        const editToken = savedTokens[feedbackId];

        if (!editToken) {
          setError("You are not authorized to edit this feedback.");
          return;
        }

        const response = await api.get("/feedbackFlow/allFeedbacks");

        const feedback = response.data.feedbacks.find(
          (item) => item._id === feedbackId
        );

        if (!feedback) {
          setError("Feedback not found.");
          return;
        }

        setFormData({
          name: feedback.name || "",
          email: feedback.email || "",
          category: feedback.category || "",
          feedback: feedback.feedback || "",
          rating: Number(feedback.rating) || 0,
        });

      } catch (err) {
        console.error("Error fetching feedback:", err);
        setError("Unable to load feedback.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [feedbackId]);

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

    if (formData.rating === 0) {
      setError("Please select a rating.");
      return;
    }

    try {
      setSaving(true);

      const savedTokens = JSON.parse(
        localStorage.getItem("feedbackEditTokens") || "{}"
      );

      const editToken = savedTokens[feedbackId];

      await api.patch(
        `/feedbackFlow/update/${feedbackId}`,
        formData,
        {
          headers: {
            "X-Feedback-Token": editToken,
          },
        }
      );

      alert("Feedback updated successfully!");

      navigate("/all-feedbacks", { replace: true });

    } catch (err) {
      console.error("Error updating feedback:", err);

      setError(
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Unable to update feedback."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-12 text-center text-gray-500">
        Loading feedback...
      </div>
    );
  }

  if (error && !formData.name) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-16 text-center">
        <p className="text-red-600">{error}</p>

        <button
          onClick={() => navigate("/all-feedbacks")}
          className="mt-5 rounded-lg bg-purple-600 px-5 py-2 text-white hover:bg-purple-700"
        >
          Back to Feedback
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-2xl">

        <div className="mb-8 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-purple-600">
            FeedbackFlow
          </p>

          <h1 className="text-3xl font-bold text-gray-900">
            Edit Your Feedback
          </h1>

          <p className="mt-3 text-gray-500">
            Update your experience and save your changes.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
        >

          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
              Full Name
            </label>

            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
              Email Address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label htmlFor="category" className="mb-2 block text-sm font-medium text-gray-700">
              Category
            </label>

            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 capitalize outline-none focus:border-purple-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="feedback" className="mb-2 block text-sm font-medium text-gray-700">
              Your Feedback
            </label>

            <textarea
              id="feedback"
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              rows={5}
              required
              className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Rating
            </label>

            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRating(star)}
                  aria-label={`Rate ${star} out of 5`}
                  className={`text-3xl ${
                    star <= formData.rating
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}

              <span className="ml-2 text-sm text-gray-500">
                {formData.rating}/5
              </span>
            </div>
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white hover:bg-purple-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/all-feedbacks")}
              className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditFeedback;
