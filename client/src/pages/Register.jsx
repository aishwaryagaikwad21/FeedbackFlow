
import RegisterForm from "../components/auth/RegisterForm";

const Register = () => {
    return (
        <main className="min-h-screen bg-slate-100 flex items-center justify-center p-5">

            <div className="w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl grid md:grid-cols-2">

                {/* Left section */}
                <section className="hidden md:flex flex-col justify-between bg-slate-900 p-10 text-white">

                    <div>
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold">
                                F
                            </div>

                            <h1 className="text-2xl font-bold">
                                FeedbackFlow
                            </h1>
                        </div>

                        <div className="mt-24">
                            <h2 className="text-4xl font-bold leading-tight">
                                Take control of your
                                <span className="text-blue-400">
                                    {" "}feedback ecosystem.
                                </span>
                            </h2>

                            <p className="mt-5 leading-relaxed text-slate-400">
                                Create your administrator account to manage
                                customer feedback and discover meaningful insights.
                            </p>
                        </div>
                    </div>

                    <p className="text-sm text-slate-500">
                        Feedback Management System
                    </p>

                </section>

                {/* Right section */}
                <section className="flex flex-col justify-center p-7 sm:p-12">

                    <div className="mb-8">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
                            Admin Portal
                        </p>

                        <h2 className="text-3xl font-bold text-slate-900">
                            Create account
                        </h2>

                        <p className="mt-2 text-sm text-slate-500">
                            Register your administrator account.
                        </p>
                    </div>

                    <RegisterForm />

                </section>

            </div>

        </main>
    );
};

export default Register;
