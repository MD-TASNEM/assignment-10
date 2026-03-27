import React, { useContext, useEffect } from "react";
import { useParams, Link } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";

const ChallengesDetails = () => {
  const { serviceId } = useParams();
  const { data: services } = useContext(AuthContext);

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-out-cubic" });
  }, []);

  const service = services?.find(
    (item) => Number(item.serviceId) === Number(serviceId),
  );

  const handleBook = (e) => {
    e.preventDefault();
    toast.success("Booking Confirmed! 🐾", {
      style: {
        borderRadius: "12px",
        background: "#1e1b4b",
        color: "#fff",
        padding: "16px",
      },
    });
    e.target.reset();
  };

  if (!services)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <span className="loading loading-dots loading-lg text-pink-500"></span>
      </div>
    );

  if (!service)
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <p className="text-xl text-gray-600 font-medium">
          Service not found 😿
        </p>
      </div>
    );

  return (
    <section className="bg-gray-50 min-h-screen pb-20">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-br from-purple-900 via-fuchsia-800 to-pink-700 py-28 text-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-5 py-2 rounded-full mb-6">
            <span className="text-sm font-medium">{service.category}</span>
            <span className="w-1.5 h-1.5 bg-pink-300 rounded-full animate-pulse"></span>
          </div>

          <h1
            className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight"
            data-aos="fade-up"
          >
            {service.serviceName}
          </h1>
          <p
            className="text-xl text-pink-100 max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            Premium winter care for your feline friend — because they deserve
            the best
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 -mt-20 relative z-10">
        {/* Service Card */}
        <div
          className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div className="grid md:grid-cols-2">
            {/* Left: Image */}
            <div className="relative overflow-hidden">
              <img
                src={service.image}
                alt={service.serviceName}
                className="w-full h-80 md:h-full object-cover transform transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent"></div>
            </div>

            {/* Right: Details */}
            <div className="p-10 md:p-12 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                {service.serviceName}
              </h2>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-star text-amber-400"></i>
                  <span className="font-semibold text-gray-800 text-xl">
                    {service.rating}
                  </span>
                </div>
                <p className="text-green-600 font-bold text-3xl">
                  ${service.price}
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                <span>Provider:</span>
                <span className="font-medium text-gray-700">
                  {service.providerName}
                </span>
              </div>

              <p className="text-gray-700 leading-relaxed text-lg mb-10">
                {service.description}
              </p>

              <div className="flex gap-4">
                <button
                  onClick={handleBook}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-pink-500/40 transform hover:scale-[1.02] transition-all duration-300"
                >
                  Book This Service 🐱
                </button>

                <Link
                  to="/services"
                  className="flex-1 border-2 border-gray-300 hover:border-gray-400 text-gray-700 py-4 rounded-2xl font-semibold text-lg text-center transition-all"
                >
                  Back to Services
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div
          className="mt-16 bg-white rounded-3xl shadow-xl border border-gray-100 p-10 md:p-14"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <div className="text-center mb-10">
            <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
              Reserve Your Spot
            </h3>
            <p className="text-gray-600 max-w-xl mx-auto">
              Fill in your details below — we'll confirm your winter service
              booking right away.
            </p>
          </div>

          <form
            onSubmit={handleBook}
            className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto"
          >
            <div>
              <label
                htmlFor="firstName"
                className="block text-gray-700 font-medium mb-2"
              >
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                required
                className="w-full px-5 py-3 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:outline-none transition-all"
                placeholder="Enter your first name"
              />
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-gray-700 font-medium mb-2"
              >
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                required
                className="w-full px-5 py-3 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:outline-none transition-all"
                placeholder="Enter your last name"
              />
            </div>

            <div className="col-span-2">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                className="w-full px-5 py-3 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:outline-none transition-all"
                placeholder="your@email.com"
              />
            </div>

            <div className="col-span-2 flex justify-center mt-6">
              <button
                type="submit"
                className="w-full sm:w-auto px-12 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl font-semibold text-lg shadow-xl hover:shadow-pink-500/50 transform hover:scale-105 transition-all"
              >
                Confirm Booking
              </button>
            </div>
          </form>
        </div>

        {/* Related Services */}
        <div
          className="mt-20 text-center"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Related Winter Services
          </h3>
          <p className="text-gray-600 mb-10">
            Other premium services your cat might love this winter
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services
              .filter((s) => s.serviceId !== service.serviceId)
              .slice(0, 3)
              .map((related) => (
                <Link
                  key={related.serviceId}
                  to={`/ChallengesDetails/${related.serviceId}`}
                  className="bg-white rounded-3xl shadow-lg overflow-hidden hover:-translate-y-2 transition-all duration-300 group"
                >
                  <img
                    src={related.image}
                    alt={related.serviceName}
                    className="h-52 w-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="p-6">
                    <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {related.serviceName}
                    </h4>
                    <p className="text-green-600 font-bold mb-3">
                      ${related.price}
                    </p>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {related.description}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChallengesDetails;
