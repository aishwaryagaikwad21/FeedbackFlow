const Footer = () => {
    return (
        <footer className="bg-slate-950 px-6 py-8 text-center text-slate-400">
            <p className="text-sm">
                © {new Date().getFullYear()} FeedbackFlow. All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;