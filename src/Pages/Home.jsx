// import { NavLink } from "react-router";
// import Marquee from "react-fast-marquee";
// import { useContext, useEffect } from "react";
// import { AuthContext } from "../Context/AuthContext";
// import Service from "../Components/Service";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Autoplay, Navigation } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";

// import AOS from "aos";
// import "aos/dist/aos.css";

// // Images
// import bannerOne from "../assets/Json-mages/bannerOne.jpg";
// import bannerTwo from "../assets/Json-mages/nutrition.jpg";
// import bannerThree from "../assets/Json-mages/three.jpg";
// import bannerFour from "../assets/Json-mages/rec-5.jpg";
// import bannerFive from "../assets/Json-mages/cat-on-harness-1024x683.jpg";
// import reviewBg from "../assets/Json-mages/review.webp";
// import user1 from "../assets/Json-mages/user1.jpg";
// import user2 from "../assets/Json-mages/user2.jpg";
// import user3 from "../assets/Json-mages/user3.webp";

// const Home = () => {
//   const { data } = useContext(AuthContext);
//   const trimData = data?.slice(0, 8);

//   useEffect(() => {
//     AOS.init({
//       duration: 1000,
//       easing: "ease-out-cubic",
//       once: false,
//       mirror: true,
//     });
//   }, []);

//   return (
//     <>
//       {/* Hero Marquee */}
//       <div className="bg-gradient-to-r from-pink-50 to-purple-50 shadow-sm">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="py-4" data-aos="fade-down">
//             <Marquee gradient={false} speed={50}>
//               <span className="text-sm md:text-base font-medium text-purple-800">
//                 📰 Welcome to Pretty Kitty — Order by 11AM for next-day delivery
//                 (Sun-Wed) 🐾
//               </span>
//             </Marquee>
//           </div>
//         </div>
//       </div>

//       {/* Hero Section */}
//       <section className="bg-gradient-to-br from-purple-50 via-pink-50 to-white py-16">
//         <div className="max-w-7xl mx-auto px-4 text-center" data-aos="zoom-in">
//           <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
//             Keep Your Cat Cozy This Winter
//           </h1>
//           <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
//             Professional winter care, premium grooming, and personalized
//             pampering services tailored for your feline companion.
//           </p>
//         </div>
//       </section>

//       {/* Swiper Banner Carousel */}
//       <section className="py-16 bg-white">
//         <div className="max-w-7xl mx-auto px-4">
//           <Swiper
//             modules={[Autoplay, Pagination, Navigation]}
//             autoplay={{ delay: 3000, disableOnInteraction: false }}
//             pagination={{ clickable: true, dynamicBullets: true }}
//             navigation
//             loop
//             className="rounded-3xl shadow-2xl overflow-hidden"
//           >
//             {[
//               { img: bannerOne, title: "Nutrition", color: "bg-pink-100" },
//               { img: bannerTwo, title: "Health Care", color: "bg-purple-100" },
//               { img: bannerThree, title: "Grooming", color: "bg-indigo-100" },
//               { img: bannerFour, title: "Recreation", color: "bg-rose-100" },
//               { img: bannerFive, title: "Training", color: "bg-violet-100" },
//             ].map((slide, idx) => (
//               <SwiperSlide key={idx}>
//                 <div className="relative h-96 md:h-[500px] lg:h-[600px]">
//                   <img
//                     src={slide.img}
//                     alt={`${slide.title} for cats`}
//                     className="w-full h-full object-cover"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
//                   <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center">
//                     <span
//                       className={`${slide.color} text-white px-8 py-4 rounded-full text-2xl md:text-4xl font-bold shadow-lg`}
//                     >
//                       {slide.title}
//                     </span>
//                   </div>
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//       </section>

//       {/* Services Grid */}
//       <section className="py-20 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="text-center mb-12" data-aos="fade-up">
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
//               Our Premium Services
//             </h2>
//             <p className="mt-4 text-lg text-gray-600">
//               Tailored care for every stage of your cat's life
//             </p>
//           </div>

//           <div
//             className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6"
//             data-aos="fade-up"
//             data-aos-delay="200"
//           >
//             {trimData?.map((service, idx) => (
//               <div key={idx} data-aos="fade-up" data-aos-delay={idx * 100}>
//                 <Service data={service} />
//               </div>
//             ))}
//           </div>

//           <div className="text-center mt-12">
//             <NavLink to="/servicesAll">
//               <button className="btn btn-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 hover:from-purple-700 hover:to-pink-700 shadow-xl hover:shadow-2xl transition-all duration-300">
//                 Explore All Services
//               </button>
//             </NavLink>
//           </div>
//         </div>
//       </section>

//       {/* Winter Care Tips */}
//       <section
//         id="WinterCare"
//         className="py-20 bg-gradient-to-br from-white to-blue-50"
//       >
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="flex items-center gap-4 mb-12" data-aos="fade-right">
//             <div className="text-4xl bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-4 text-white">
//               ⛄
//             </div>
//             <div>
//               <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
//                 Winter Care Tips
//               </h2>
//               <p className="text-gray-600 mt-2">
//                 Keep your feline friend warm and cozy this season
//               </p>
//             </div>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {[
//               {
//                 title: "Keep Them Warm",
//                 content:
//                   "Provide heated beds and cozy blankets away from cold drafts and floors.",
//                 icon: "🔥",
//                 color: "from-orange-500 to-red-500",
//               },
//               {
//                 title: "Limit Outdoor Time",
//                 content:
//                   "Reduce exposure to cold, wet conditions during winter months.",
//                 icon: "🏠",
//                 color: "from-blue-500 to-cyan-500",
//               },
//               {
//                 title: "Boost Nutrition",
//                 content:
//                   "Increase calorie intake to maintain body heat and energy levels.",
//                 icon: "🍲",
//                 color: "from-green-500 to-emerald-500",
//               },
//               {
//                 title: "Safe Heating",
//                 content:
//                   "Never let cats sleep directly on heaters to prevent burns.",
//                 icon: "⚠️",
//                 color: "from-yellow-500 to-amber-500",
//               },
//               {
//                 title: "Regular Grooming",
//                 content:
//                   "Brushing helps maintain insulating fur coat and prevents matting.",
//                 icon: "✨",
//                 color: "from-pink-500 to-rose-500",
//               },
//               {
//                 title: "Hydration Check",
//                 content:
//                   "Ensure fresh water is always available, as indoor heating can cause dehydration.",
//                 icon: "💧",
//                 color: "from-purple-500 to-violet-500",
//               },
//             ].map((tip, i) => (
//               <div
//                 key={i}
//                 className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
//                 data-aos="fade-up"
//                 data-aos-delay={i * 100}
//               >
//                 <div
//                   className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${tip.color}`}
//                 ></div>
//                 <div className="p-5">
//                   <div className="flex items-center gap-3 mb-3">
//                     <div
//                       className={`text-2xl bg-gradient-to-r ${tip.color} rounded-lg p-2 text-white`}
//                     >
//                       {tip.icon}
//                     </div>
//                     <h3 className="text-lg font-bold text-gray-800">
//                       {tip.title}
//                     </h3>
//                   </div>
//                   <p className="text-gray-600 text-sm leading-relaxed">
//                     {tip.content}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Meet Our Vets */}
//       <section id="Vets" className="py-20 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="flex items-center gap-3 mb-12" data-aos="fade-left">
//             <div className="text-4xl text-purple-600">🩺</div>
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
//               Meet Our Expert Vets
//             </h2>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//             {[
//               {
//                 name: "Prof. Kundu",
//                 title: "Assistant Professor",
//                 img: "https://i.ibb.co.com/GY15G6Z/Af.webp",
//               },
//               {
//                 name: "Dr. Das",
//                 title: "Senior Veterinarian",
//                 img: "https://i.ibb.co.com/JwGsNX9Q/vec2.jpg",
//               },
//               {
//                 name: "Dr. Khan",
//                 title: "Veterinary Surgeon",
//                 img: "https://i.ibb.co.com/Kpmx8mJs/Ex.jpg",
//               },
//               {
//                 name: "Dr. Bose",
//                 title: "Lead Surgeon",
//                 img: "https://i.ibb.co.com/gLdKdRnc/Ex-2.jpg",
//               },
//               {
//                 name: "Dr. Karim",
//                 title: "Consultant",
//                 img: "https://i.ibb.co.com/0y5mD0qZ/Sc.jpg",
//               },
//               {
//                 name: "Dr. Khatul",
//                 title: "Surgical Specialist",
//                 img: "https://i.ibb.co.com/JR2F0HRQ/Si.jpg",
//               },
//             ].map((vet, i) => (
//               <div
//                 key={i}
//                 className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group"
//                 data-aos="fade-up"
//                 data-aos-delay={i * 100}
//               >
//                 <div className="p-8 text-center">
//                   <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-purple-200 group-hover:border-purple-400 transition-all">
//                     <img
//                       src={vet.img}
//                       alt={vet.name}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                   <h3 className="text-2xl font-bold text-gray-800">
//                     {vet.name}
//                   </h3>
//                   <p className="text-purple-600 font-medium">{vet.title}</p>
//                   <p className="mt-4 text-gray-600 text-sm leading-relaxed">
//                     {i === 0
//                       ? "Specialized in preventive care and nutrition planning."
//                       : i === 1
//                       ? "20+ years in feline medicine and emergency care."
//                       : "Expert in advanced surgical procedures and recovery."}
//                   </p>
//                 </div>
//                 <div className="bg-gradient-to-r from-purple-600 to-pink-600 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Testimonials */}
//       <section className="py-20 bg-gradient-to-br from-purple-900 to-pink-800 text-white">
//         <div className="max-w-7xl mx-auto px-4">
//           <h2
//             className="text-4xl md:text-5xl font-bold text-center mb-16"
//             data-aos="fade-up"
//           >
//             Loved by Pet Parents Everywhere
//           </h2>

//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             <div
//               className="rounded-3xl overflow-hidden shadow-2xl"
//               style={{
//                 backgroundImage: `url(${reviewBg})`,
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//                 minHeight: "500px",
//               }}
//               data-aos="fade-right"
//             >
//               <div className="bg-black/50 h-full flex items-center justify-center p-10">
//                 <div className="text-center">
//                   <h3 className="text-3xl md:text-5xl font-bold mb-6">
//                     Caring For Your Pets Like Family
//                   </h3>
//                   <p className="text-xl opacity-90">
//                     Trusted veterinary care and professional grooming since
//                     2018.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-8" data-aos="fade-left">
//               {[
//                 {
//                   name: "Mrinal Sen",
//                   role: "Luna's Mom",
//                   img: user1,
//                   text: "They saved my cat's life during an emergency. Compassionate and highly skilled!",
//                 },
//                 {
//                   name: "Nirmol Chowdhury",
//                   role: "Whiskers' Dad",
//                   img: user2,
//                   text: "Best grooming service in town. My Persian looks like a show cat every time!",
//                 },
//                 {
//                   name: "Sabrina Gardener",
//                   role: "Simba's Human",
//                   img: user3,
//                   text: "From kitten vaccines to senior care — they've been with us every step.",
//                 },
//               ].map((review, i) => (
//                 <div
//                   key={i}
//                   className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
//                 >
//                   <div className="flex items-start gap-4">
//                     <img
//                       src={review.img}
//                       alt={review.name}
//                       className="w-16 h-16 rounded-full object-cover border-2 border-white"
//                     />
//                     <div className="flex-1">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <h4 className="font-bold text-lg">{review.name}</h4>
//                           <p className="text-sm opacity-80">{review.role}</p>
//                         </div>
//                         <div className="text-3xl">⭐⭐⭐⭐⭐</div>
//                       </div>
//                       <p className="mt-3 text-gray-100 italic">
//                         "{review.text}"
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Footer */}
//       <section className="bg-gradient-to-r from-purple-600 to-pink-600 py-16">
//         <div className="max-w-7xl mx-auto px-4 text-center text-white">
//           <h2 className="text-4xl md:text-5xl4xl font-bold mb-6">
//             Ready to Pamper Your Kitty?
//           </h2>
//           <p className="text-xl mb-10 opacity-90">
//             Book an appointment or shop premium products today.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-6 justify-center">
//             <NavLink to="/">
//               <button className="btn btn-lg bg-white text-purple-700 hover:bg-gray-100 font-bold">
//                 Book Appointment
//               </button>
//             </NavLink>
//             <NavLink to="/">
//               <button className="btn btn-lg btn-outline text-white border-white hover:bg-white hover:text-purple-700 font-bold">
//                 Shop Now
//               </button>
//             </NavLink>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Home;



import { NavLink } from "react-router";
import Marquee from "react-fast-marquee";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import Service from "../Components/Service";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import AOS from "aos";
import "aos/dist/aos.css";

// Images
import bannerOne from "../assets/Json-mages/bannerOne.jpg";
import bannerTwo from "../assets/Json-mages/nutrition.jpg";
import bannerThree from "../assets/Json-mages/three.jpg";
import bannerFour from "../assets/Json-mages/rec-5.jpg";
import bannerFive from "../assets/Json-mages/cat-on-harness-1024x683.jpg";
import reviewBg from "../assets/Json-mages/review.webp";
import user1 from "../assets/Json-mages/user1.jpg";
import user2 from "../assets/Json-mages/user2.jpg";
import user3 from "../assets/Json-mages/user3.webp";

const Home = () => {
  const { data } = useContext(AuthContext);
  const trimData = data?.slice(0, 8);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out-cubic",
      once: false,
      mirror: true,
    });
  }, []);

  return (
    <>
      {/* Hero Marquee - EcoTrack Style */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="py-3" data-aos="fade-down">
            <Marquee gradient={false} speed={50}>
              <span className="text-sm md:text-base font-medium text-white">
                🌍 Join 12,000+ changemakers making a difference! Track your impact, transform our planet 🌱
              </span>
            </Marquee>
          </div>
        </div>
      </div>

      {/* Hero Section - EcoTrack Style */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <span className="inline-block bg-emerald-400/20 text-emerald-300 px-4 py-1 rounded-full text-sm mb-6">
                🌍 12k+ changemakers
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                Track your <span className="text-emerald-400">impact</span>,
                <br />
                transform our planet
              </h1>
              <p className="text-lg text-slate-300 mb-8 max-w-lg">
                Turn everyday actions into measurable climate wins. Join our community of eco-conscious heroes making real change.
              </p>
              <div className="flex gap-4 flex-wrap">
                <NavLink to="/challenges">
                  <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                    Start Journey
                  </button>
                </NavLink>
                <NavLink to="/impact">
                  <button className="border-2 border-white hover:bg-white/10 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300">
                    Explore Impact
                  </button>
                </NavLink>
              </div>
            </div>

            <div data-aos="fade-left" className="relative">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-500">
                <img
                  src={bannerOne}
                  alt="Eco Challenge"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-bold text-xl text-gray-800">🌿 Weekend Rewilding</h3>
                  <p className="text-sm text-gray-600 mt-1">350+ joined this month</p>
                  <button className="mt-4 w-full bg-emerald-600 text-white py-2 rounded-full font-semibold hover:bg-emerald-700 transition-colors">
                    Join Challenge
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Community Impact */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Community Impact</h2>
            <p className="text-gray-600 text-lg">Together we're making a difference</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "48K", label: "Trees Planted", icon: "🌳" },
              { value: "152T", label: "CO₂ Saved", icon: "🌍" },
              { value: "2.8M", label: "Water Saved", icon: "💧" },
              { value: "14K", label: "Active Users", icon: "👥" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <h3 className="text-3xl font-bold text-emerald-600 mb-2">{stat.value}</h3>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Swiper Banner Carousel */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Sustainability Challenges</h2>
            <p className="text-gray-600 text-lg">Choose your path to make a difference</p>
          </div>

          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation
            loop
            className="rounded-3xl shadow-xl overflow-hidden"
          >
            {[
              { img: bannerOne, title: "Urban Gardening", desc: "Grow your own food", color: "bg-emerald-600" },
              { img: bannerTwo, title: "Zero Waste Living", desc: "Reduce plastic usage", color: "bg-teal-600" },
              { img: bannerThree, title: "Tree Plantation", desc: "Restore forests", color: "bg-green-600" },
              { img: bannerFour, title: "Clean Energy", desc: "Switch to renewables", color: "bg-cyan-600" },
              { img: bannerFive, title: "Water Conservation", desc: "Save every drop", color: "bg-blue-600" },
            ].map((slide, idx) => (
              <SwiperSlide key={idx}>
                <div className="relative h-[500px]">
                  <img
                    src={slide.img}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center w-full px-4">
                    <span className={`${slide.color} text-white px-8 py-3 rounded-full text-2xl font-bold shadow-lg inline-block mb-3`}>
                      {slide.title}
                    </span>
                    <p className="text-white text-lg">{slide.desc}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Challenges Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Active Challenges
            </h2>
            <p className="text-gray-600 text-lg">
              Join these eco-challenges and start making an impact today
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {trimData?.map((service, idx) => (
              <div key={idx} data-aos="fade-up" data-aos-delay={idx * 100}>
                <Service data={service} />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <NavLink to="/servicesAll">
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                Explore All Challenges
              </button>
            </NavLink>
          </div>
        </div>
      </section>

      {/* Eco Tips Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              💡 Eco Wisdom from the Tribe
            </h2>
            <p className="text-gray-600 text-lg">Practical tips shared by our community</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "☀️", title: "Air-dry laundry", tip: "Skip dryer — saves 2.4kg CO₂ per load", user: "Elena", likes: "3.2k" },
              { icon: "🚗", title: "Carpool", tip: "Cut emissions by 75% compared to solo driving", user: "Marcus", likes: "2.1k" },
              { icon: "🥗", title: "Meatless Mondays", tip: "Reduce carbon footprint by 15% weekly", user: "Sarah", likes: "4.5k" },
              { icon: "♻️", title: "Upcycle jars", tip: "Avoid 500+ plastic containers yearly", user: "James", likes: "1.8k" },
            ].map((tip, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <div className="text-3xl mb-3">{tip.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{tip.tip}</p>
                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span>⭐ {tip.likes} • {tip.user}</span>
                  <button className="text-emerald-600 hover:text-emerald-700 font-medium">Save Tip</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              📅 Upcoming Green Events
            </h2>
            <p className="text-gray-600 text-lg">Join local events and meet fellow eco-enthusiasts</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { img: bannerFour, title: "River Cleanup", date: "March 15, 2026", location: "Central Park", spots: "45 spots left" },
              { img: bannerTwo, title: "Permaculture Workshop", date: "March 22, 2026", location: "Community Garden", spots: "28 spots left" },
              { img: bannerThree, title: "Tree Nursery Day", date: "March 29, 2026", location: "Forest Reserve", spots: "100+ spots" },
            ].map((event, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={event.img}
                    alt={event.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-emerald-600 text-white text-xs px-3 py-1 rounded-full">
                    Register Now
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl text-gray-900 mb-2">{event.title}</h3>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <p className="flex items-center gap-2">📅 {event.date}</p>
                    <p className="flex items-center gap-2">📍 {event.location}</p>
                    <p className="flex items-center gap-2 text-emerald-600 font-medium">👥 {event.spots}</p>
                  </div>
                  <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-xl font-semibold transition-colors">
                    Register Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Go Green Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ✨ Why Go Green?
            </h2>
            <p className="text-gray-600 text-lg">Benefits beyond just saving the planet</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: "📊", title: "Track Impact", desc: "See your real environmental contribution" },
              { icon: "❤️", title: "Community", desc: "Connect with like-minded people" },
              { icon: "🌱", title: "Wellbeing", desc: "Improve mental and physical health" },
              { icon: "💰", title: "Save Money", desc: "Reduce bills through sustainable choices" },
            ].map((benefit, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-lg transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <div className="text-4xl mb-3">{benefit.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-emerald-900 to-teal-900 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12" data-aos="fade-up">
            ⚡ How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { step: "1", title: "Pick a Challenge", desc: "Choose from various eco-challenges that match your interests", icon: "🎯" },
              { step: "2", title: "Log Your Actions", desc: "Track your progress and log your sustainable activities", icon: "📝" },
              { step: "3", title: "Level Up", desc: "Earn badges, climb leaderboards, and see your impact", icon: "🏆" },
            ].map((step, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <div className="text-5xl mb-4">{step.icon}</div>
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-200">{step.desc}</p>
              </div>
            ))}
          </div>

          <NavLink to="/challenges">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
              Get Started Now
            </button>
          </NavLink>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" data-aos="fade-up">
            What Our Community Says
          </h2>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div
              className="rounded-3xl overflow-hidden shadow-2xl min-h-[400px]"
              style={{
                backgroundImage: `url(${reviewBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              data-aos="fade-right"
            >
              <div className="bg-black/60 h-full flex items-center justify-center p-10">
                <div className="text-center">
                  <h3 className="text-3xl md:text-4xl font-bold mb-6">
                    Join the Movement
                  </h3>
                  <p className="text-xl opacity-90">
                    Together we're making Earth greener, one action at a time.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6" data-aos="fade-left">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Zero Waste Advocate",
                  img: user1,
                  text: "This platform transformed how I think about sustainability. I've reduced my carbon footprint by 40% in just 3 months!",
                },
                {
                  name: "Michael Chen",
                  role: "Urban Gardener",
                  img: user2,
                  text: "The challenges are engaging and the community is so supportive. I've connected with amazing people who share my passion.",
                },
                {
                  name: "Emma Watson",
                  role: "Eco-Warrior",
                  img: user3,
                  text: "Tracking my impact has been incredibly motivating. Seeing real numbers makes me want to do even more!",
                },
              ].map((review, i) => (
                <div
                  key={i}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={review.img}
                      alt={review.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-emerald-400"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start flex-wrap gap-2">
                        <div>
                          <h4 className="font-bold text-lg">{review.name}</h4>
                          <p className="text-sm text-emerald-300">{review.role}</p>
                        </div>
                        <div className="text-emerald-400">⭐⭐⭐⭐⭐</div>
                      </div>
                      <p className="mt-3 text-gray-200 italic">
                        "{review.text}"
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-600 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" data-aos="fade-up">
            Ready to Make an Impact?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of changemakers already making a difference. Start your sustainability journey today!
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <NavLink to="/challenges">
              <button className="bg-white text-emerald-700 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg">
                Explore Challenges
              </button>
            </NavLink>
            <NavLink to="/signup">
              <button className="border-2 border-white hover:bg-white/10 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300">
                Join Community
              </button>
            </NavLink>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;