// pages/TermsOfService.jsx
import React from "react";
import { FaFileContract, FaGavel, FaHandshake, FaUsers, FaCopyright, FaExclamationTriangle } from "react-icons/fa";

const TermsOfService = () => {
  const [lastUpdated] = React.useState("March 27, 2026");

  const terms = [
    {
      icon: <FaHandshake className="text-2xl text-green-600" />,
      title: "Acceptance of Terms",
      content: "By accessing or using EcoTrack, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform."
    },
    {
      icon: <FaUsers className="text-2xl text-blue-600" />,
      title: "User Accounts",
      content: "You must be at least 13 years old to create an account. You are responsible for maintaining the security of your account and for all activities that occur under your account. Provide accurate and complete information when creating your account."
    },
    {
      icon: <FaGavel className="text-2xl text-purple-600" />,
      title: "User Conduct",
      content: "You agree to use EcoTrack responsibly and not to: (a) Post false, misleading, or harmful content; (b) Harass, abuse, or threaten other users; (c) Violate any laws or regulations; (d) Impersonate any person or entity; (e) Interfere with the platform's operation."
    },
    {
      icon: <FaCopyright className="text-2xl text-yellow-600" />,
      title: "Intellectual Property",
      content: "EcoTrack and its content are protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, or create derivative works without our permission. You retain ownership of content you submit, but grant us a license to use it."
    },
    {
      icon: <FaExclamationTriangle className="text-2xl text-red-600" />,
      title: "Limitation of Liability",
      content: "EcoTrack is provided 'as is' without warranties of any kind. We are not liable for any damages arising from your use of the platform, including but not limited to direct, indirect, incidental, or consequential damages."
    },
    {
      icon: <FaFileContract className="text-2xl text-indigo-600" />,
      title: "Termination",
      content: "We reserve the right to suspend or terminate your account at any time for violations of these terms or for any other reason. You may delete your account at any time through account settings."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-6 shadow-lg">
            <FaFileContract className="text-white text-4xl" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-600">Last Updated: {lastUpdated}</p>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4">
            Please read these terms carefully before using EcoTrack.
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <p className="text-gray-700 leading-relaxed">
            Welcome to EcoTrack! These Terms of Service govern your use of our platform, including all features,
            content, and community interactions. By using EcoTrack, you agree to comply with these terms.
            If you have any questions, please contact us at support@ecotrack.com.
          </p>
        </div>

        {/* Terms Sections */}
        {terms.map((term, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-6 mb-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">{term.icon}</div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">{term.title}</h2>
                <p className="text-gray-700 leading-relaxed">{term.content}</p>
              </div>
            </div>
          </div>
        ))}

        {/* User Content */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">User-Generated Content</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            You are responsible for any content you post on EcoTrack, including tips, challenge updates, and comments.
            By posting content, you grant EcoTrack a worldwide, non-exclusive, royalty-free license to use, reproduce,
            and distribute your content for platform operation.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We reserve the right to remove any content that violates these terms or is otherwise objectionable,
            without prior notice.
          </p>
        </div>

        {/* Third-Party Services */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Third-Party Services</h2>
          <p className="text-gray-700 leading-relaxed">
            EcoTrack may contain links to third-party websites or services. We are not responsible for the content,
            privacy policies, or practices of any third-party services. Your interactions with third parties are
            solely between you and them.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-r-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-yellow-800 mb-2">Disclaimer</h2>
          <p className="text-yellow-700 leading-relaxed">
            EcoTrack provides environmental impact estimates for informational purposes only. These estimates are
            based on general calculations and may not reflect your actual impact. We do not guarantee the accuracy
            or completeness of any impact calculations.
          </p>
        </div>

        {/* Governing Law */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Governing Law</h2>
          <p className="text-gray-700 leading-relaxed">
            These terms shall be governed by the laws of the United States, without regard to conflict of law provisions.
            Any disputes arising under these terms shall be resolved in the appropriate courts of your local jurisdiction.
          </p>
        </div>

        {/* Contact */}
        <div className="bg-gray-50 rounded-xl p-6 text-center border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Contact Information</h2>
          <p className="text-gray-600 mb-2">
            For questions about these Terms of Service, please contact us:
          </p>
          <div className="space-y-1">
            <p className="text-gray-600">Email: legal@ecotrack.com</p>
            <p className="text-gray-600">Address: 123 Green Street, Eco City, EC 12345</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
