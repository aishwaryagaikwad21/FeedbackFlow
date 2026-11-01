
import { Link } from "react-router-dom";
import {
    MessageSquareText,
    Star,
    ArrowRight,
    Heart,
    ShieldCheck,
    TrendingUp
} from "lucide-react";

const Landing = () => {
    return (
        <div className="bg-slate-50">

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-slate-950 text-white">
                <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
                <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-indigo-600/10 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">

                    <div className="mx-auto max-w-3xl text-center">

                        <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-sm font-medium text-blue-300">
                            <Heart size={15} />
                            Your voice makes a difference
                        </span>

                        <h1 className="mt-8 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
                            Every opinion matters.
                            <span className="mt-2 block text-blue-400">
                                Every experience counts.
                            </span>
                        </h1>

                        <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
                            Share your experiences, express your thoughts
                            and help us understand what we're doing well
                            and where we can do better.
                        </p>

                        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

                            <Link
                                to="/write-feedback"
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-4 font-semibold text-white transition hover:bg-blue-500"
                            >
                                Share Your Feedback
                                <ArrowRight size={19} />
                            </Link>

                            <Link
                                to="/all-feedbacks"
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-7 py-4 font-semibold text-slate-200 transition hover:bg-slate-800"
                            >
                                View All Feedback
                                <MessageSquareText size={19} />
                            </Link>

                            <a
                                href="#why-feedback"
                                className="inline-flex items-center justify-center rounded-xl border border-slate-700 px-7 py-4 font-semibold text-slate-200 transition hover:bg-slate-800"
                            >
                                Learn More
                            </a>

                    </div>

                    </div>

                </div>
            </section>

            {/* Why Feedback Matters */}
            <section
                id="why-feedback"
                className="mx-auto max-w-7xl px-6 py-24"
            >

                <div className="mx-auto max-w-2xl text-center">

                    <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                        Why Your Feedback Matters
                    </p>

                    <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                        Your experience helps us grow.
                    </h2>

                    <p className="mt-5 leading-relaxed text-slate-500">
                        Honest feedback helps identify opportunities,
                        improve services and create better experiences
                        for everyone.
                    </p>

                </div>

                <div className="mt-16 grid gap-8 md:grid-cols-3">

                    {/* Card 1 */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-8 transition hover:-translate-y-1 hover:shadow-lg">

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                            <MessageSquareText size={25} />
                        </div>

                        <h3 className="mt-6 text-xl font-semibold text-slate-900">
                            Share Your Thoughts
                        </h3>

                        <p className="mt-3 leading-relaxed text-slate-500">
                            Tell us about your experiences, suggestions
                            and areas where improvements are needed.
                        </p>

                    </div>

                    {/* Card 2 */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-8 transition hover:-translate-y-1 hover:shadow-lg">

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
                            <Star size={25} />
                        </div>

                        <h3 className="mt-6 text-xl font-semibold text-slate-900">
                            Rate Your Experience
                        </h3>

                        <p className="mt-3 leading-relaxed text-slate-500">
                            Rate your experience and help us understand
                            customer satisfaction better.
                        </p>

                    </div>

                    {/* Card 3 */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-8 transition hover:-translate-y-1 hover:shadow-lg">

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                            <TrendingUp size={25} />
                        </div>

                        <h3 className="mt-6 text-xl font-semibold text-slate-900">
                            Create Better Experiences
                        </h3>

                        <p className="mt-3 leading-relaxed text-slate-500">
                            Your valuable insights help drive meaningful
                            improvements and better decisions.
                        </p>

                    </div>

                </div>

            </section>

            {/* Privacy Section */}
            <section className="border-y border-slate-200 bg-white">
                <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-16 text-center md:flex-row md:text-left">

                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                        <ShieldCheck size={30} />
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-slate-900">
                            Your feedback matters to us.
                        </h2>

                        <p className="mt-2 text-slate-500">
                            We value honest opinions and appreciate
                            everyone who takes the time to share their
                            experiences.
                        </p>
                    </div>

                </div>
            </section>

            {/* Final CTA */}
            <section className="bg-blue-600 px-6 py-20 text-center text-white">

                <h2 className="text-3xl font-bold md:text-4xl">
                    Have something to share?
                </h2>

                <p className="mx-auto mt-4 max-w-xl text-blue-100">
                    Your feedback could be the starting point
                    for something better.
                </p>

                <Link
                    to="/write-feedback"
                    className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-4 font-semibold text-blue-700 transition hover:bg-blue-50"
                >
                    Write Your Feedback
                    <ArrowRight size={19} />
                </Link>

            </section>

        </div>
    );
};

export default Landing;
