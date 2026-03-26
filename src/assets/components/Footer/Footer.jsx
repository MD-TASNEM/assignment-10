import { Link } from "react-router";
import { Leaf, Mail, MapPin, Phone } from "lucide-react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-green-900 to-emerald-950 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-300 to-emerald-200 bg-clip-text text-transparent">
                EcoTrack
              </span>
            </Link>

            <p className="text-green-100 mb-6 text-sm leading-relaxed">
              Join eco-conscious people making sustainable choices and tracking
              their environmental impact for a greener planet.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3">
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map(
                (Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 bg-green-800 hover:bg-green-600 rounded-lg flex items-center justify-center transition duration-300 hover:scale-110"
                  >
                    <Icon size={16} />
                  </a>
                )
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-green-200">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { name: "About Us", path: "/about" },
                { name: "Challenges", path: "/challenges" },
                { name: "Events", path: "/events" },
                { name: "Eco Tips", path: "/tips" },
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.path}
                    className="text-green-100 hover:text-white flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-green-400 rounded-full"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-green-200">
              Support
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { name: "Contact Us", path: "/contact" },
                { name: "FAQ", path: "/faq" },
                { name: "Privacy Policy", path: "/privacy" },
                { name: "Terms of Service", path: "/terms" },
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.path}
                    className="text-green-100 hover:text-white flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-green-400 rounded-full"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-green-200">
              Contact Info
            </h3>
            <div className="space-y-3 text-sm text-green-100">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-green-400" />
                <span>123 Green Street, Eco City</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-green-400" />
                <span>hello@ecotrack.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-green-400" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-green-800 py-6 text-center text-sm text-green-300">
        © 2025 EcoTrack — Sustainable Living Community. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;