// pages/About.jsx
import React, { useState, useEffect } from "react";
import {
  FaLeaf, FaRecycle, FaWater, FaCar, FaTree, FaBolt,
  FaUsers, FaGlobe, FaHeart, FaHandsHelping, FaChartLine,
  FaCalendarAlt, FaTrophy, FaLightbulb, FaQuoteLeft,
  FaTwitter, FaFacebook, FaInstagram, FaYoutube,
  FaEnvelope, FaMapMarkerAlt, FaPhone, FaCheckCircle
} from "react-icons/fa";

// Team Members Data
const teamMembers = [
  {
    id: 1,
    name: "Sarah Green",
    role: "Founder & CEO",
    bio: "Environmental scientist with 10+ years of experience in sustainability initiatives.",
    image: null,
    social: { twitter: "#", linkedin: "#" }
  },
  {
    id: 2,
    name: "Mike Thompson",
    role: "Head of Community",
    bio: "Community organizer passionate about bringing people together for environmental action.",
    image: null,
    social: { twitter: "#", linkedin: "#" }
  },
  {
    id: 3,
    name: "Emma Waters",
    role: "Sustainability Expert",
    bio: "Expert in waste reduction and circular economy solutions.",
    image: null,
    social: { twitter: "#", linkedin: "#" }
  },
  {
    id: 4,
    name: "David Chen",
    role: "Tech Lead",
    bio: "Full-stack developer building tools for environmental impact tracking.",
    image: null,
    social: { twitter: "#", linkedin: "#" }
  }
];

// Milestones Data
const milestones = [
  { year: "2024", title: "EcoTrack Launched", description: "Platform launched with 100 initial users", icon: "🚀" },
  { year: "2024", title: "First Challenge Completed", description: "Plastic-Free July reached 500 participants", icon: "🏆" },
  { year: "2025", title: "10K Users Milestone", description: "Community grew to 10,000 active members", icon: "👥" },
  { year: "2025", title: "1M kg CO₂ Saved", description: "Community achieved 1 million kg CO₂ reduction", icon: "🌍" },
  { year: "2026", title: "Global Expansion", description: "Reached users in 45 countries worldwide", icon: "🌎" },
  { year: "2026", title: "50+ Challenges", description: "Launched over 50 sustainability challenges", icon: "🎯" }
];

// Values Data
const values = [
  {
    icon: <FaLeaf className="text-3xl text-green-600" />,
    title: "Sustainability First",
    description: "Every decision we make prioritizes the health of our planet."
  },
  {
    icon: <FaUsers className="text-3xl text-blue-600" />,
    title: "Community Driven",
    description: "We believe in the power of collective action and community support."
  },
  {
    icon: <FaChartLine className="text-3xl text-purple-600" />,
    title: "Measurable Impact",
    description: "We focus on real, trackable environmental results."
  },
  {
    icon: <FaLightbulb className="text-3xl text-yellow-600" />,
    title: "Innovation",
    description: "Constantly seeking new ways to make sustainability accessible."
  }
];

// Stats Data
const stats = [
  { number: "15K+", label: "Active Users", icon: <FaUsers className="text-2xl" /> },
  { number: "50+", label: "Challenges", icon: <FaTrophy className="text-2xl" /> },
  { number: "1.2M", label: "kg CO₂ Saved", icon: <FaLeaf className="text-2xl" /> },
  { number: "45", label: "Countries", icon: <FaGlobe className="text-2xl" /> },
  { number: "8.5K", label: "Trees Planted", icon: <FaTree className="text-2xl" /> },
  { number: "25K", label: "kg Waste Reduced", icon: <FaRecycle className="text-2xl" /> }
];

// Toast Component (for any notifications)
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-blue-500';
  return (
    <div className={`fixed top-4 right-4 z-50 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg animate-slide-in`}>
      {message}
    </div>
  );
};

const About = () => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("mission");
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [toast, setToast] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail) {
      showToast("Please enter your email address", 'error');
      return;
    }
    if (!newsletterEmail.includes('@')) {
      showToast("Please enter a valid email address", 'error');
      return;
    }
    setEmailSubscribed(true);
    showToast("Thanks for subscribing to our newsletter! 🌱", 'success');
    setNewsletterEmail("");
  };

  const getInitials = (name) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-700 to-emerald-700 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6 backdrop-blur-sm">
              <FaLeaf className="text-white text-4xl" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our Mission: A Greener Future
            </h1>
            <p className="text-xl text-green-100">
              Empowering individuals and communities to take meaningful action against climate change through measurable, community-driven progress.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg transition-shadow">
              <div className="text-green-600 mb-2 flex justify-center">{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Mission & Vision Tabs */}
        <div className="mb-16">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveTab("mission")}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                activeTab === "mission"
                  ? "bg-green-600 text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Our Mission
            </button>
            <button
              onClick={() => setActiveTab("vision")}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                activeTab === "vision"
                  ? "bg-green-600 text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Our Vision
            </button>
            <button
              onClick={() => setActiveTab("story")}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                activeTab === "story"
                  ? "bg-green-600 text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Our Story
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            {activeTab === "mission" && (
              <div className="text-center">
                <FaQuoteLeft className="text-green-600 text-4xl mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
                <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                  To create a global community of eco-conscious individuals who take measurable action
                  to reduce their environmental impact. We provide the tools, challenges, and community
                  support needed to make sustainable living accessible, trackable, and rewarding for everyone.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <div className="flex items-center space-x-2">
                    <FaCheckCircle className="text-green-600" />
                    <span>Track your impact</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaCheckCircle className="text-green-600" />
                    <span>Join community challenges</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaCheckCircle className="text-green-600" />
                    <span>Share eco tips</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "vision" && (
              <div className="text-center">
                <FaGlobe className="text-green-600 text-4xl mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
                <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                  A world where sustainable living is the default choice, not the exception. We envision
                  a future where every individual has the knowledge, tools, and community support to make
                  environmentally conscious decisions that collectively create a thriving, healthy planet
                  for generations to come.
                </p>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="text-2xl mb-2">🌍</div>
                    <p className="text-sm font-semibold">Carbon Neutral by 2030</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="text-2xl mb-2">👥</div>
                    <p className="text-sm font-semibold">1 Million Active Members</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="text-2xl mb-2">🎯</div>
                    <p className="text-sm font-semibold">100M kg CO₂ Saved</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "story" && (
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Story</h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    EcoTrack began in 2024 with a simple idea: what if we could make sustainability not just
                    measurable, but also fun and community-driven? Our founder, Sarah Green, realized that while
                    many people wanted to live more sustainably, they often didn't know where to start or how
                    to track their progress.
                  </p>
                  <p>
                    Starting with just 100 members in a local community, we launched our first challenge -
                    "Plastic-Free July" - and were amazed to see how collective action could create such
                    significant impact. The community grew organically as members shared their successes,
                    tips, and encouraged one another.
                  </p>
                  <p>
                    Today, EcoTrack has grown into a global community of over 15,000 eco-conscious individuals
                    across 45 countries. We've helped our community save over 1.2 million kg of CO₂, reduce
                    25,000 kg of waste, and plant thousands of trees. But we're just getting started.
                  </p>
                  <p className="font-semibold text-green-700 text-center mt-6">
                    Join us on this journey to create a more sustainable future, one challenge at a time.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Our Core Values
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            These principles guide everything we do at EcoTrack
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition-shadow">
                <div className="flex justify-center mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Milestones Timeline */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Our Journey
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Celebrating the milestones that shaped EcoTrack
          </p>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-green-200 h-full hidden md:block"></div>
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="md:w-1/2 p-4">
                    <div className={`bg-white rounded-xl shadow-md p-6 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                      <div className="text-3xl mb-2">{milestone.icon}</div>
                      <div className="text-sm text-green-600 font-semibold mb-1">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="md:w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Meet Our Team
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Passionate individuals dedicated to making a difference
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-32 flex items-center justify-center">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-4xl font-bold text-green-600">
                    {getInitials(member.name)}
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-green-600 text-sm font-semibold mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                  <div className="flex justify-center space-x-3">
                    <a href={member.social.twitter} className="text-gray-400 hover:text-blue-400 transition-colors">
                      <FaTwitter />
                    </a>
                    <a href={member.social.linkedin} className="text-gray-400 hover:text-blue-600 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact & Newsletter Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Contact Info */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <FaEnvelope />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-900">hello@ecotrack.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <FaPhone />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-gray-900">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="text-gray-900">123 Green Street, Eco City, EC 12345</p>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-500 hover:text-white transition-all">
                  <FaFacebook />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-400 hover:text-white transition-all">
                  <FaTwitter />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-pink-500 hover:text-white transition-all">
                  <FaInstagram />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-red-600 hover:text-white transition-all">
                  <FaYoutube />
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
            <p className="text-green-100 mb-6">
              Subscribe to our newsletter for eco tips, new challenges, and community stories.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="w-full bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-all duration-300 transform hover:scale-105"
              >
                Subscribe Now
              </button>
            </form>
            {emailSubscribed && (
              <p className="mt-4 text-sm text-green-100 text-center">
                ✓ Thanks for subscribing! Check your inbox for updates.
              </p>
            )}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Join thousands of eco-conscious individuals who are already making an impact.
            Together, we can create a more sustainable future.
          </p>
          <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
            Join EcoTrack Today →
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default About;