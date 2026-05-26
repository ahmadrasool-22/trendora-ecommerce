import { Link } from "react-router-dom";
import {
  Linkedin,
  Globe,
  Github,
  ArrowRight,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-slate-950 to-black text-white mt-20">

      {/* Glow Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400/10 blur-3xl rounded-full"></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">

          {/* BRAND */}
          <div>

            <div className="inline-block">
              <h1 className="text-4xl font-black tracking-tight">
                Trendora
              </h1>

              <div className="h-1 w-full bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full mt-2"></div>
            </div>

            <p className="text-blue-100/80 mt-6 leading-relaxed text-[15px]">
              Discover premium sleep experiences crafted with
              comfort, elegance, and luxury in mind. Designed
              to help you sleep deeper and wake up refreshed.
            </p>

            {/* Newsletter */}
            <div className="mt-8">

              <p className="font-semibold text-white mb-4">
                Join Our Newsletter
              </p>

              <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md">

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-transparent px-5 py-4 w-full outline-none text-white placeholder:text-blue-100/50"
                />

                <button className="bg-white text-blue-950 px-5 py-4 hover:bg-blue-100 transition">
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* SHOP LINKS */}
          <div>

            <h2 className="text-xl font-bold mb-6">
              Shop
            </h2>

            <ul className="space-y-4 text-blue-100/80">

              <li>
                <Link
                  to="/"
                  className="hover:text-white transition"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/products"
                  className="hover:text-white transition"
                >
                  Products
                </Link>
              </li>

              <li>
                <Link
                  to="/cart"
                  className="hover:text-white transition"
                >
                  Cart
                </Link>
              </li>

              <li>
                <Link
                  to="/orders"
                  className="hover:text-white transition"
                >
                  Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* ACCOUNT */}
          <div>

            <h2 className="text-xl font-bold mb-6">
              Account
            </h2>

            <ul className="space-y-4 text-blue-100/80">

              <li>
                <Link
                  to="/login"
                  className="hover:text-white transition"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  to="/signup"
                  className="hover:text-white transition"
                >
                  Create Account
                </Link>
              </li>

           

            
            </ul>
          </div>

          {/* CONTACT */}
          <div>

            <h2 className="text-xl font-bold mb-6">
              Contact
            </h2>

            <div className="space-y-5 text-blue-100/80 text-[15px]">

              <div>
                <p className="text-white font-semibold">
                  Email
                </p>

                <p className="mt-1">
                  support@trendora.com
                </p>
              </div>

              <div>
                <p className="text-white font-semibold">
                  Phone
                </p>

                <p className="mt-1">
                  +92 300 1234567
                </p>
              </div>

              <div>
                <p className="text-white font-semibold">
                  Location
                </p>

                <p className="mt-1">
                  Punjab, Pakistan
                </p>
              </div>
            </div>

            {/* SOCIALS */}
            <div className="flex gap-4 mt-8">

              <a
                href="https://portfolio-ahmad-three.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-blue-950 transition duration-300"
              >
                <Globe size={20} />
              </a>

              <a
                href="https://www.linkedin.com/in/ahmad-rasool-862377380"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-blue-950 transition duration-300"
              >
                <Linkedin size={20} />
              </a>

              <a
                href="https://github.com/ahmadrasool-22"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-blue-950 transition duration-300"
              >
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-blue-100/60 text-sm">
            © 2026 Trendora. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm text-blue-100/60">

            <button className="hover:text-white transition">
              Privacy Policy
            </button>

            <button className="hover:text-white transition">
              Terms & Conditions
            </button>

            <button className="hover:text-white transition">
              Support
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}