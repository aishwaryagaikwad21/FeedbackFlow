
import { Link, NavLink } from "react-router-dom";
import { MessageSquareText, ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive
        ? "text-indigo-600"
        : "text-slate-600 hover:text-indigo-600"
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
            <MessageSquareText size={22} />
          </div>

          <span className="text-xl font-bold tracking-tight text-slate-900">
            Feedback<span className="text-indigo-600">Flow</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          <a
            href="/#why-feedback"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-indigo-600"
          >
            About
          </a>

          <NavLink to="/write-feedback" className={navLinkClass}>
            Write Feedback
          </NavLink>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link
            to="/write-feedback"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Share Feedback
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 md:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-6 py-5 md:hidden">
          <div className="flex flex-col gap-5">
            <NavLink
              to="/"
              className={navLinkClass}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>

            <a
              href="/#why-feedback"
              className="text-sm font-medium text-slate-600"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>

            <NavLink
              to="/write-feedback"
              className={navLinkClass}
              onClick={() => setIsMenuOpen(false)}
            >
              Write Feedback
            </NavLink>

            <Link
              to="/write-feedback"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Share Feedback
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
