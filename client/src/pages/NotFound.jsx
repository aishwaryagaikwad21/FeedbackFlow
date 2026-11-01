import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-lg">

        <h1 className="text-8xl font-bold text-indigo-600">
          404
        </h1>

        <h2 className="mt-4 text-3xl font-semibold text-gray-800">
          Page Not Found
        </h2>

        <p className="mt-3 text-gray-500 leading-relaxed">
          The page you're looking for doesn't exist or may have been moved.
          Let's get you back on track.
        </p>

        <Link
          to="/"
          className="inline-block mt-8 rounded-lg bg-indigo-600 px-6 py-3
          text-white font-medium hover:bg-indigo-700 transition-colors"
        >
          Back to Home
        </Link>

      </div>
    </div>
  );
};

export default NotFound;