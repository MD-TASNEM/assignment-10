// pages/PrivacyPolicy.jsx
import React, { useState } from "react";
import {
  FaShieldAlt,
  FaCookie,
  FaDatabase,
  FaEnvelope,
  FaUserSecret,
  FaGlobe,
  FaCheckCircle,
} from "react-icons/fa";

const PrivacyPolicy = () => {
  const [lastUpdated] = useState("March 27, 2026");

  const sections = [
    {
      icon: <FaShieldAlt className="text-3xl text-green-600" />,
      title: "Information We Collect",
      content: [
        "Account Information: When you register, we collect your name, email address, and optional profile photo.",
        "Challenge Data: Information about challenges you join, your progress, and impact metrics.",
        "Usage Data: How you interact with our platform, including pages visited, time spent, and features used.",
        "Device Information: Browser type, IP address, and device identifiers for security and optimization.",
      ],
    },
    {
      icon: <FaDatabase className="text-3xl text-blue-600" />,
      title: "How We Use Your Information",
      content: [
        "Track and display your environmental impact and progress.",
        "Personalize your experience with relevant challenges and tips.",
        "Improve our platform based on user behavior and feedback.",
        "Communicate important updates about challenges and community events.",
        "Ensure platform security and prevent fraudulent activity.",
      ],
    },
    {
      icon: <FaCookie className="text-3xl text-yellow-600" />,
      title: "Cookies and Tracking",
      content: [
        "We use cookies to remember your preferences and keep you logged in.",
        "Analytics cookies help us understand how users interact with EcoTrack.",
        "You can control cookie settings through your browser preferences.",
        "Third-party services may set cookies for authentication and analytics.",
      ],
    },
    {
      icon: <FaUserSecret className="text-3xl text-purple-600" />,
      title: "Data Sharing and Disclosure",
      content: [
        "We never sell your personal information to third parties.",
        "Public profile information (name, impact stats) is visible to other users.",
        "We may share data with service providers who help operate our platform.",
        "Information may be disclosed if required by law or to protect our rights.",
      ],
    },
    {
      icon: <FaGlobe className="text-3xl text-red-600" />,
      title: "Your Rights and Choices",
      content: [
        "Access and download your personal data through account settings.",
        "Update or correct your profile information at any time.",
        "Delete your account and all associated data.",
        "Opt out of marketing communications.",
        "Control PrivacyPolicy settings for your public profile.",
      ],
    },
    {
      icon: <FaEnvelope className="text-3xl text-indigo-600" />,
      title: "Contact Us",
      content: [
        "For PrivacyPolicy-related questions, contact our Data Protection Officer at PrivacyPolicy@ecotrack.com.",
        "We respond to all PrivacyPolicy inquiries within 30 days.",
        "For data deletion requests, please email delete@ecotrack.com.",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-6 shadow-lg">
            <FaShieldAlt className="text-white text-4xl" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600">Last Updated: {lastUpdated}</p>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4">
            Your privacy is important to us. This policy explains how we
            collect, use, and protect your information.
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <p className="text-gray-700 leading-relaxed">
            At EcoTrack, we are committed to protecting your privacy and
            ensuring the security of your personal information. This Privacy
            Policy describes our practices regarding the collection, use, and
            disclosure of information we collect through our platform. By
            using EcoTrack, you agree to the terms of this policy.
          </p>
        </div>

        {/* Sections */}
        {sections.map((section, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 mb-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">{section.icon}</div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {section.title}
                </h2>
                <ul className="space-y-3">
                  {section.content.map((item, i) => (
                    <li key={i} className="flex items-start space-x-3">
                      <FaCheckCircle
                        className="text-green-500 mt-1 flex-shrink-0"
                        size={16}
                      />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}

        {/* Data Security */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-6 text-white mb-6">
          <h2 className="text-2xl font-bold mb-3">Data Security</h2>
          <p className="text-green-100 leading-relaxed">
            We implement industry-standard security measures to protect your
            information, including encryption, secure servers, and regular
            security audits. However, no method of transmission over the
            internet is 100% secure, and we cannot guarantee absolute security.
          </p>
        </div>

        {/* Children's PrivacyPolicy */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Children's Privacy
          </h2>
          <p className="text-gray-700 leading-relaxed">
            EcoTrack is not intended for children under 13 years of age. We do
            not knowingly collect personal information from children under 13.
            If you believe we have collected information from a child under 13,
            please contact us immediately.
          </p>
        </div>

        {/* Changes to Policy */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Changes to This Policy
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by posting the new policy on this page and
            updating the "Last Updated" date. We encourage you to review this
            policy periodically for any changes.
          </p>
        </div>

        {/* Contact Section */}
        <div className="bg-gray-50 rounded-xl p-6 text-center border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Questions About Privacy?
          </h2>
          <p className="text-gray-600 mb-4">
            If you have any questions or concerns about our privacy practices,
            please contact us:
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <div className="flex items-center justify-center space-x-2">
              <FaEnvelope className="text-green-600" />
              <a
                href="mailto:privacy@ecotrack.com"
                className="text-green-600 hover:underline"
              >
                privacy@ecotrack.com
              </a>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <FaGlobe className="text-green-600" />
              <span className="text-gray-600">
                EcoTrack, 123 Green Street, Eco City
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
