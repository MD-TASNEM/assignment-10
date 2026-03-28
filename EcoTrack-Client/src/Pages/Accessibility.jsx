// pages/Accessibility.jsx
import React from "react";
import {
  FaUniversalAccess, FaKeyboard, FaEye, FaVolumeUp,
  FaMousePointer, FaMobileAlt, FaAdjust, FaTextHeight,
  FaCheckCircle, FaHandsHelping, FaGlobe, FaEnvelope,
  FaPhone, FaChrome, FaFirefox, FaSafari, FaEdge
} from "react-icons/fa";

const Accessibility = () => {
  const features = [
    {
      icon: <FaKeyboard className="text-2xl text-green-600" />,
      title: "Keyboard Navigation",
      description: "All features are accessible via keyboard. Use Tab to navigate, Enter to activate, and arrow keys for dropdowns and menus."
    },
    {
      icon: <FaEye className="text-2xl text-blue-600" />,
      title: "Screen Reader Support",
      description: "Our platform includes ARIA labels, semantic HTML, and proper heading structure to ensure compatibility with screen readers."
    },
    {
      icon: <FaAdjust className="text-2xl text-purple-600" />,
      title: "High Contrast & Color Settings",
      description: "We maintain sufficient color contrast ratios (WCAG 2.1 AA compliant) for users with visual impairments. The site remains readable in high contrast mode."
    },
    {
      icon: <FaTextHeight className="text-2xl text-yellow-600" />,
      title: "Resizable Text",
      description: "Text can be resized up to 200% without breaking layout or functionality. Use browser zoom or text-only zoom features."
    },
    {
      icon: <FaVolumeUp className="text-2xl text-red-600" />,
      title: "Alt Text for Images",
      description: "All images include descriptive alt text to convey meaning to users who cannot see them."
    },
    {
      icon: <FaMobileAlt className="text-2xl text-indigo-600" />,
      title: "Responsive Design",
      description: "Our platform works seamlessly across all devices and screen sizes, ensuring accessibility on mobile, tablet, and desktop."
    }
  ];

  const commitments = [
    "WCAG 2.1 AA compliance as our accessibility standard",
    "Regular accessibility audits and testing",
    "Continuous improvement based on user feedback",
    "Accessibility training for our development team",
    "Inclusive design principles in all new features"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-6 shadow-lg">
            <FaUniversalAccess className="text-white text-4xl" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent mb-4">
            Accessibility Statement
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            EcoTrack is committed to making our platform accessible to everyone, regardless of ability or technology.
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <p className="text-gray-700 leading-relaxed">
            At EcoTrack, we believe that everyone should have equal access to tools that help them live sustainably.
            We are committed to ensuring our platform is accessible to people with disabilities, including those who
            use assistive technologies such as screen readers, keyboard navigation, and voice recognition software.
          </p>
        </div>

        {/* Accessibility Features */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Accessibility Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">{feature.icon}</div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Our Commitment */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-6 text-white mb-8">
          <h2 className="text-2xl font-bold mb-4">Our Commitment</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {commitments.map((commitment, index) => (
              <div key={index} className="flex items-start space-x-2">
                <FaCheckCircle className="mt-1 flex-shrink-0" />
                <span>{commitment}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Standards Compliance */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Standards Compliance</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We strive to meet the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA conformance.
            These internationally recognized guidelines explain how to make web content more accessible to
            people with a wide range of disabilities.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">WCAG 2.1</div>
              <div className="text-sm text-gray-600">Level AA</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">Section 508</div>
              <div className="text-sm text-gray-600">Compliant</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">ARIA 1.1</div>
              <div className="text-sm text-gray-600">Supported</div>
            </div>
          </div>
        </div>

        {/* Assistive Technology */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Assistive Technology Support</h2>
          <p className="text-gray-700 leading-relaxed">
            EcoTrack is tested with various assistive technologies including:
          </p>
          <ul className="mt-4 space-y-2">
            <li className="flex items-center space-x-2">
              <FaCheckCircle className="text-green-500" />
              <span>NVDA (NonVisual Desktop Access) screen reader</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaCheckCircle className="text-green-500" />
              <span>JAWS (Job Access With Speech) screen reader</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaCheckCircle className="text-green-500" />
              <span>VoiceOver (macOS/iOS)</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaCheckCircle className="text-green-500" />
              <span>TalkBack (Android)</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaCheckCircle className="text-green-500" />
              <span>Dragon Naturally Speaking voice recognition</span>
            </li>
          </ul>
        </div>

        {/* Feedback and Support */}
        <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Feedback and Support</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We're continuously working to improve accessibility. If you encounter any accessibility barriers
            while using EcoTrack, or if you have suggestions for improvement, please let us know.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 bg-white rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                <FaEnvelope className="text-green-600" />
                <span>Email Us</span>
              </h3>
              <a href="mailto:accessibility@ecotrack.com" className="text-green-600 hover:underline">
                accessibility@ecotrack.com
              </a>
            </div>
            <div className="flex-1 bg-white rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                <FaPhone className="text-green-600" />
                <span>Call Us</span>
              </h3>
              <p className="text-gray-600">+1 (555) 123-4567</p>
              <p className="text-xs text-gray-500">TTY relay available</p>
            </div>
          </div>
        </div>

        {/* Accessibility Options */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Browser Accessibility Features</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Most modern browsers include accessibility features that can enhance your experience:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-gray-50 rounded-lg flex items-center space-x-3">
              <FaChrome className="text-blue-600 text-xl" />
              <div>
                <p className="font-semibold text-gray-900">Chrome</p>
                <p className="text-sm text-gray-600">Settings → Accessibility</p>
              </div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg flex items-center space-x-3">
              <FaFirefox className="text-orange-600 text-xl" />
              <div>
                <p className="font-semibold text-gray-900">Firefox</p>
                <p className="text-sm text-gray-600">Menu → Preferences → Accessibility</p>
              </div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg flex items-center space-x-3">
              <FaSafari className="text-blue-500 text-xl" />
              <div>
                <p className="font-semibold text-gray-900">Safari</p>
                <p className="text-sm text-gray-600">Preferences → Advanced → Accessibility</p>
              </div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg flex items-center space-x-3">
              <FaEdge className="text-blue-700 text-xl" />
              <div>
                <p className="font-semibold text-gray-900">Edge</p>
                <p className="text-sm text-gray-600">Settings → Accessibility</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Additional Resources</h2>
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Web Accessibility Initiative (WAI)</h3>
              <a
                href="https://www.w3.org/WAI/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:underline text-sm"
              >
                www.w3.org/WAI/
              </a>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">WCAG 2.1 Guidelines</h3>
              <a
                href="https://www.w3.org/TR/WCAG21/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:underline text-sm"
              >
                www.w3.org/TR/WCAG21/
              </a>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Section 508 Standards</h3>
              <a
                href="https://www.section508.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:underline text-sm"
              >
                www.section508.gov/
              </a>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Last updated: March 27, 2026</p>
          <p className="mt-2">EcoTrack is committed to digital inclusion and accessibility for all users.</p>
        </div>
      </div>
    </div>
  );
};

export default Accessibility;