
import { useEffect, useState } from "react";
import {
    MessageSquare,
    Star,
    TrendingUp,
    Award,
    RefreshCw,
    LoaderCircle,
    AlertCircle,
    BarChart3
} from "lucide-react";

import api from "../services/api";

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchStatistics = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/admin/auth/statistics");

            setStats(response.data);

        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Unable to fetch dashboard statistics."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStatistics();
    }, []);

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
    };

    const formatMonth = (month) => {
        const [year, monthNumber] = month.split("-");
        return new Date(Number(year), Number(monthNumber) - 1)
            .toLocaleDateString("en-IN", {
                month: "short",
                year: "numeric"
            });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex items-center gap-3 text-slate-600">
                    <LoaderCircle className="animate-spin" size={24} />
                    Loading dashboard...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6">
                <div className="max-w-md rounded-xl border border-red-200 bg-red-50 p-6 text-center">
                    <AlertCircle className="mx-auto mb-3 text-red-500" size={32} />

                    <p className="font-semibold text-red-700">
                        Dashboard Error
                    </p>

                    <p className="mt-2 text-sm text-red-600">
                        {error}
                    </p>

                    <button
                        onClick={fetchStatistics}
                        className="mt-5 rounded-lg bg-red-600 px-5 py-2 text-sm font-semibold text-white hover:bg-red-700"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    const statCards = [
        {
            title: "Total Feedbacks",
            value: stats.totalFeedbacks,
            icon: MessageSquare,
            color: "bg-blue-100 text-blue-600"
        },
        {
            title: "Average Rating",
            value: Number(stats.averageRating).toFixed(2),
            icon: Star,
            color: "bg-yellow-100 text-yellow-600"
        },
        {
            title: "Five Star Ratings",
            value: stats.fiveStarRatings,
            icon: Award,
            color: "bg-green-100 text-green-600"
        },
        {
            title: "Categories",
            value: stats.categoryStats.length,
            icon: TrendingUp,
            color: "bg-purple-100 text-purple-600"
        }
    ];

    const maxMonthlyReviews = Math.max(
        ...stats.monthWiseSubmissions.map(item => item.totalReviews),
        1
    );

    const maxRatingCount = Math.max(
        ...stats.ratingsDistribution.map(item => item.ratingCount),
        1
    );

    return (
        <main className="min-h-screen bg-slate-100 p-5 sm:p-8">

            <div className="mx-auto max-w-7xl space-y-8">

                {/* Header */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                    <div>
                        <p className="text-sm font-medium text-blue-600">
                            ADMIN PANEL
                        </p>

                        <h1 className="mt-1 text-3xl font-bold text-slate-900">
                            Dashboard
                        </h1>

                        <p className="mt-2 text-sm text-slate-500">
                            Here's an overview of your feedback activity.
                        </p>
                    </div>

                    <button
                        onClick={fetchStatistics}
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                        <RefreshCw size={16} />
                        Refresh
                    </button>

                </div>

                {/* Statistics Cards */}
                <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                    {statCards.map((card) => {
                        const Icon = card.icon;

                        return (
                            <div
                                key={card.title}
                                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
                            >
                                <div className="flex items-center justify-between">

                                    <p className="text-sm font-medium text-slate-500">
                                        {card.title}
                                    </p>

                                    <div className={`rounded-lg p-3 ${card.color}`}>
                                        <Icon size={21} />
                                    </div>

                                </div>

                                <h2 className="mt-5 text-3xl font-bold text-slate-900">
                                    {card.value}
                                </h2>

                            </div>
                        );
                    })}

                </section>

                {/* Charts */}
                <section className="grid gap-6 lg:grid-cols-2">

                    {/* Monthly Submissions */}
                    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                        <div className="mb-6 flex items-center gap-3">
                            <BarChart3 className="text-blue-600" size={22} />

                            <h2 className="text-lg font-bold text-slate-900">
                                Monthly Submissions
                            </h2>
                        </div>

                        {stats.monthWiseSubmissions.length === 0 ? (
                            <p className="py-10 text-center text-sm text-slate-400">
                                No monthly data available.
                            </p>
                        ) : (
                            <div className="space-y-5">

                                {stats.monthWiseSubmissions.map((item) => (
                                    <div key={item._id}>

                                        <div className="mb-2 flex justify-between text-sm">
                                            <span className="font-medium text-slate-600">
                                                {formatMonth(item._id)}
                                            </span>

                                            <span className="font-semibold text-slate-900">
                                                {item.totalReviews}
                                            </span>
                                        </div>

                                        <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                                            <div
                                                className="h-full rounded-full bg-blue-600 transition-all"
                                                style={{
                                                    width: `${(item.totalReviews / maxMonthlyReviews) * 100}%`
                                                }}
                                            />
                                        </div>

                                    </div>
                                ))}

                            </div>
                        )}

                    </div>

                    {/* Rating Distribution */}
                    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                        <div className="mb-6 flex items-center gap-3">
                            <Star className="text-yellow-500" size={22} />

                            <h2 className="text-lg font-bold text-slate-900">
                                Rating Distribution
                            </h2>
                        </div>

                        {stats.ratingsDistribution.length === 0 ? (
                            <p className="py-10 text-center text-sm text-slate-400">
                                No rating data available.
                            </p>
                        ) : (
                            <div className="space-y-5">

                                {[5, 4, 3, 2, 1].map((rating) => {
                                    const item = stats.ratingsDistribution.find(
                                        (entry) => entry._id === rating
                                    );

                                    const count = item?.ratingCount || 0;

                                    return (
                                        <div key={rating}>

                                            <div className="mb-2 flex justify-between text-sm">

                                                <span className="flex items-center gap-1 font-medium text-slate-600">
                                                    {rating} <Star size={14} className="fill-yellow-400 text-yellow-400" />
                                                </span>

                                                <span className="font-semibold text-slate-900">
                                                    {count}
                                                </span>

                                            </div>

                                            <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                                                <div
                                                    className="h-full rounded-full bg-yellow-400 transition-all"
                                                    style={{
                                                        width: `${(count / maxRatingCount) * 100}%`
                                                    }}
                                                />
                                            </div>

                                        </div>
                                    );
                                })}

                            </div>
                        )}

                    </div>

                </section>

                {/* Category Statistics */}
                <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                    <h2 className="mb-6 text-lg font-bold text-slate-900">
                        Category Performance
                    </h2>

                    <div className="overflow-x-auto">

                        <table className="w-full text-left text-sm">

                            <thead>
                                <tr className="border-b border-slate-200 text-slate-500">
                                    <th className="pb-4 font-semibold">Category</th>
                                    <th className="pb-4 font-semibold">Total Reviews</th>
                                    <th className="pb-4 font-semibold">Average Rating</th>
                                </tr>
                            </thead>

                            <tbody>
                                {stats.categoryStats.map((item) => (
                                    <tr
                                        key={item._id}
                                        className="border-b border-slate-100 last:border-0"
                                    >
                                        <td className="py-4 font-medium capitalize text-slate-800">
                                            {item._id}
                                        </td>

                                        <td className="py-4 text-slate-600">
                                            {item.totalReviews}
                                        </td>

                                        <td className="py-4">
                                            <span className="inline-flex items-center gap-1 font-semibold text-slate-800">
                                                <Star size={14} className="fill-yellow-400 text-yellow-400" />
                                                {Number(item.avgRating).toFixed(2)}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>

                    </div>

                </section>

                {/* Highest and Lowest Rated Categories */}
                <section className="grid gap-5 sm:grid-cols-2">

                    <div className="rounded-xl border border-green-200 bg-green-50 p-6">
                        <p className="text-sm font-medium text-green-700">
                            Highest Rated Category
                        </p>

                        {stats.highestRated.length > 0 ? (
                            <>
                                <h3 className="mt-3 text-2xl font-bold capitalize text-green-900">
                                    {stats.highestRated[0]._id}
                                </h3>

                                <p className="mt-1 text-sm text-green-700">
                                    {stats.highestRated[0].totalReviews} five-star ratings
                                </p>
                            </>
                        ) : (
                            <p className="mt-3 text-sm text-green-700">
                                No data available.
                            </p>
                        )}
                    </div>

                    <div className="rounded-xl border border-red-200 bg-red-50 p-6">
                        <p className="text-sm font-medium text-red-700">
                            Lowest Rated Category
                        </p>

                        {stats.lowestRated.length > 0 ? (
                            <>
                                <h3 className="mt-3 text-2xl font-bold capitalize text-red-900">
                                    {stats.lowestRated[0]._id}
                                </h3>

                                <p className="mt-1 text-sm text-red-700">
                                    {stats.lowestRated[0].totalReviews} one-star ratings
                                </p>
                            </>
                        ) : (
                            <p className="mt-3 text-sm text-red-700">
                                No data available.
                            </p>
                        )}
                    </div>

                </section>

                {/* Latest Feedback */}
                <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                    <h2 className="mb-6 text-lg font-bold text-slate-900">
                        Latest Feedback
                    </h2>

                    {stats.latestFeedbacks.length === 0 ? (
                        <p className="py-8 text-center text-sm text-slate-400">
                            No feedback received yet.
                        </p>
                    ) : (
                        <div className="space-y-5">

                            {stats.latestFeedbacks.map((item) => (
                                <div
                                    key={item._id}
                                    className="border-b border-slate-100 pb-5 last:border-0 last:pb-0"
                                >

                                    <div className="flex flex-col justify-between gap-2 sm:flex-row">

                                        <div>
                                            <h3 className="font-semibold text-slate-900">
                                                {item.name}
                                            </h3>

                                            <p className="mt-1 text-xs capitalize text-blue-600">
                                                {item.category}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-1">
                                            {Array.from(
                                                { length: item.rating },
                                                (_, index) => (
                                                    <Star
                                                        key={index}
                                                        size={15}
                                                        className="fill-yellow-400 text-yellow-400"
                                                    />
                                                )
                                            )}
                                        </div>

                                    </div>

                                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                                        {item.feedback}
                                    </p>

                                    <p className="mt-2 text-xs text-slate-400">
                                        {formatDate(item.createdAt)}
                                    </p>

                                </div>
                            ))}

                        </div>
                    )}

                </section>

            </div>

        </main>
    );
};

export default Dashboard;
