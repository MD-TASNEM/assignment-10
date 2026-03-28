// pages/FAQs.jsx
import React, { useState } from "react";
import {
  FaSearch,
  FaChevronDown,
  FaChevronUp,
  FaLeaf,
  FaRecycle,
  FaWater,
  FaCar,
  FaTrophy,
  FaUser,
  FaGlobe,
} from "react-icons/fa";

// FAQ Data
const faqCategories = [
  {
    id: "getting-started",
    name: "Getting Started",
    icon: <FaUser className="text-green-600" />,
    questions: [
      {
        q: "What is EcoTrack?",
        a: "EcoTrack is a community platform where eco-conscious people discover and join sustainability challenges, share practical eco-tips, browse local green events, and track their personal environmental impact. We focus on measurable, community-driven progress towards a sustainable future.",
      },
      {
        q: "How do I create an account?",
        a: "You can create an account by clicking the 'Sign Up' button in the top right corner. You'll need to provide your name, email, and create a password. You can also sign up using your Google account for quicker access.",
      },
      {
        q: "Is EcoTrack free to use?",
        a: "Yes! EcoTrack is completely free for all users. We believe that everyone should have access to tools that help them live more sustainably. In the future, we may offer premium features, but the core platform will always remain free.",
      },
      {
        q: "How do I reset my password?",
        a: "If you forgot your password, click on 'Forgot Password' on the user page. Enter your email address, and we'll send you a password reset link. Follow the instructions in the email to create a new password.",
      },
    ],
  },
  {
    id: "challenges",
    name: "Challenges",
    icon: <FaTrophy className="text-yellow-600" />,
    questions: [
      {
        q: "How do I join a challenge?",
        a: "Browse the Challenges page to see all available challenges. Click on a challenge card to view details, then click the 'Join Challenge' button. You'll need to be logged in to join challenges. Once joined, you can track your progress in the 'My Activities' section.",
      },
      {
        q: "Can I create my own challenge?",
        a: "Yes! Registered users can create their own sustainability challenges. Click on 'Add New Challenge' on the Challenges page. Fill in the details including title, description, duration, and impact metrics. Your challenge will be reviewed and published to the community.",
      },
      {
        q: "How is challenge progress tracked?",
        a: "Each challenge has specific metrics based on its goal. For example, in a plastic reduction challenge, you'll track how many plastic items you've avoided. You can update your progress daily through the challenge dashboard, and we'll calculate your environmental impact automatically.",
      },
      {
        q: "What happens when I complete a challenge?",
        a: "When you complete a challenge, you'll earn a badge, see your impact statistics updated, and receive a completion certificate. Your contribution will also be added to the community totals, helping us track our collective environmental impact.",
      },
    ],
  },
  {
    id: "impact-tracking",
    name: "Impact Tracking",
    icon: <FaGlobe className="text-blue-600" />,
    questions: [
      {
        q: "How is my environmental impact calculated?",
        a: "Your impact is calculated based on the challenges you complete and activities you log. For example, if you complete a 'Plastic-Free Week' challenge, we calculate the average plastic waste reduction based on typical consumption patterns. All calculations use scientifically-backed metrics.",
      },
      {
        q: "Can I see my total impact over time?",
        a: "Absolutely! Your profile page includes detailed graphs showing your impact over time. You can filter by challenge type, time period, and see both individual and cumulative impacts. The dashboard shows metrics like CO₂ saved, plastic reduced, water conserved, and more.",
      },
      {
        q: "Are the impact calculations accurate?",
        a: "We use standard environmental impact formulas based on data from environmental agencies and scientific research. While individual results may vary, these calculations provide a good estimate of your positive environmental contribution.",
      },
    ],
  },
  {
    id: "community",
    name: "Community & Tips",
    icon: <FaLeaf className="text-green-600" />,
    questions: [
      {
        q: "How can I share eco tips?",
        a: "Visit the EcoTips page and click 'Share Your Tip'. Enter your tip title, content, and category. Once submitted, your tip will be visible to the community, and other users can upvote it if they find it helpful.",
      },
      {
        q: "How do upvotes work?",
        a: "Upvotes help surface the most helpful tips to the community. You can upvote any tip you find useful by clicking the thumbs-up icon. Tips with more upvotes appear higher in search results and help others discover valuable eco advice.",
      },
      {
        q: "Can I report inappropriate content?",
        a: "Yes. If you see any content that violates our community guidelines, please use the 'Report' button. Our moderation team will review the content and take appropriate action to maintain a positive community environment.",
      },
    ],
  },
  {
    id: "technical",
    name: "Technical Support",
    icon: <FaRecycle className="text-purple-600" />,
    questions: [
      {
        q: "Is EcoTrack available as a mobile app?",
        a: "Currently, EcoTrack is available as a web application optimized for mobile devices. We're working on dedicated iOS and Android apps, which will be released soon. Stay tuned for updates!",
      },
      {
        q: "How do I update my profile information?",
        a: "Click on your profile picture in the top right corner, then select 'My Profile'. From there, you can update your name, photo, and other personal information. Your email address can be updated in account settings.",
      },
      {
        q: "What browsers does EcoTrack support?",
        a: "EcoTrack works best on modern browsers including Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated to the latest version for the best experience.",
      },
      {
        q: "How do I delete my account?",
        a: "To delete your account, go to Settings > Account Management. Click 'Delete Account' and confirm your choice. Please note that this action is permanent and will remove all your data from our platform.",
      },
    ],
  },
];

// Toast Component
const Toast = ({ message, type, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === "success" ? "bg-green-500" : "bg-blue-500";
  return (
    <div
      className={`fixed bottom-4 right-4 z-50 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg animate-slide-in`}
    >
      {message}
    </div>
  );
};

const FAQs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openQuestions, setOpenQuestions] = useState({});
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast({ message, type: "success" });
  };

  const toggleQuestion = (categoryId, questionIndex) => {
    const key = `${categoryId}-${questionIndex}`;
    setOpenQuestions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    showToast("Thanks for your feedback! We'll review it shortly.");
    e.target.reset();
  };

  // Filter questions based on search and category
  const getFilteredFAQs = () => {
    let filtered = faqCategories;

    if (selectedCategory !== "all") {
      filtered = filtered.filter((cat) => cat.id === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered
        .map((category) => ({
          ...category,
          questions: category.questions.filter(
            (q) =>
              q.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
              q.a.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
        }))
        .filter((category) => category.questions.length > 0);
    }

    return filtered;
  };

  const filteredFAQs = getFilteredFAQs();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-6 shadow-lg">
            <FaLeaf className="text-white text-4xl" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about EcoTrack. Can't find what
            you're looking for? Contact our support team.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 ${
              selectedCategory === "all"
                ? "bg-green-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            All Questions
          </button>
          {faqCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-5 py-2 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-green-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* FAQ Sections */}
        {filteredFAQs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              No results found
            </h3>
            <p className="text-gray-500">
              Try different keywords or browse through the categories above.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredFAQs.map((category) => (
              <div
                key={category.id}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-white text-2xl">{category.icon}</div>
                    <h2 className="text-xl font-bold text-white">
                      {category.name}
                    </h2>
                  </div>
                </div>
                <div className="divide-y divide-gray-100">
                  {category.questions.map((faq, index) => {
                    const isOpen = openQuestions[`${category.id}-${index}`];
                    return (
                      <div
                        key={index}
                        className="p-6 hover:bg-gray-50 transition-colors"
                      >
                        <button
                          onClick={() => toggleQuestion(category.id, index)}
                          className="w-full text-left flex justify-between items-center group"
                        >
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors pr-4">
                            {faq.q}
                          </h3>
                          <div className="text-gray-400 group-hover:text-green-600 transition-colors">
                            {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                          </div>
                        </button>
                        {isOpen && (
                          <div className="mt-4 text-gray-600 leading-relaxed animate-fadeIn">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Still Need Help */}
        <div className="mt-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-green-100 mb-6">
            Can't find the answer you're looking for? Our support team is here
            to help!
          </p>
          <form onSubmit={handleFeedbackSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Ask your question..."
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
              <button
                type="submit"
                className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-all duration-300"
              >
                Send
              </button>
            </div>
            <p className="text-xs text-green-100 mt-3">
              We'll respond within 24-48 hours
            </p>
          </form>
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
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default FAQs;
