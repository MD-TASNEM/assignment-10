// import { use } from "react";
// import { Link, NavLink, useLocation } from "react-router";
// // import { AuthContext } from "../../context/AuthContext";
// import UserProfileDropdown from "../UserProfileDropDrown/UserProfileDropDrown";
// import { Leaf, Menu, X } from "lucide-react";
// import { useState } from "react";

// const Navbar = () => {
//   const { user } = use(AuthContext);
//   const location = useLocation();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const navLinks = [
//     { path: "/", label: "Home" },
//     { path: "/challenges", label: "Challenges" },
//     { path: "/my-activities", label: "My Activities" },
//     { path: "/addChallenge", label: "Add Challenge" },
//   ];

//   const isActivePath = (path) => {
//     if (path === "/") {
//       return location.pathname === "/";
//     }
//     return location.pathname.startsWith(path);
//   };

//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//   };

//   return (
//     <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200/60 sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <Link to="/" className="flex items-center space-x-3 group">
//             <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
//               <Leaf className="w-5 h-5 text-white" />
//             </div>
//             <div>
//               <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
//                 EcoTrack
//               </span>
//               <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-green-500 to-emerald-600 transition-all duration-300 rounded-full"></div>
//             </div>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden lg:flex items-center space-x-8">
//             {navLinks.map((link) => (
//               <NavLink
//                 key={link.path}
//                 to={link.path}
//                 className={({ isActive }) =>
//                   `relative px-3 py-2 font-medium transition-all duration-200 ${
//                     isActive || isActivePath(link.path)
//                       ? "text-green-600"
//                       : "text-gray-600 hover:text-green-600"
//                   }`
//                 }
//               >
//                 {link.label}
//                 {isActivePath(link.path) && (
//                   <div className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500 rounded-full"></div>
//                 )}
//               </NavLink>
//             ))}
//           </div>

//           {/* User Actions */}
//           <div className="flex items-center space-x-4">
//             {user ? (
//               <UserProfileDropdown user={user} />
//             ) : (
//               <>
//                 <Link
//                   to="/login"
//                   className="hidden sm:block text-green-600 hover:text-green-700 font-medium px-4 py-2 transition-colors duration-200 hover:bg-green-50 rounded-lg"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="hidden sm:block bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium px-6 py-2.5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//                 >
//                   Get Started
//                 </Link>
//               </>
//             )}

//             {/* Mobile Menu Button - Only show when user is NOT logged in */}
//             {!user && (
//               <button
//                 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//                 className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-green-600 hover:bg-gray-100 transition-colors duration-200 z-60"
//               >
//                 {isMobileMenuOpen ? (
//                   <X className="w-6 h-6" />
//                 ) : (
//                   <Menu className="w-6 h-6" />
//                 )}
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Mobile Menu - Only show when user is NOT logged in */}
//         {!user && (
//           <div
//             className={`lg:hidden transition-all duration-300 ease-in-out ${
//               isMobileMenuOpen
//                 ? "max-h-96 opacity-100 visible"
//                 : "max-h-0 opacity-0 invisible"
//             }`}
//           >
//             <div className="border-t border-gray-200 pt-4 pb-4 backdrop-blur-md rounded-b-2xl shadow-lg relative z-50">
//               <div className="flex flex-col space-y-3">
//                 {navLinks.map((link) => (
//                   <NavLink
//                     key={link.path}
//                     to={link.path}
//                     onClick={closeMobileMenu}
//                     className={({ isActive }) =>
//                       `px-4 py-3 font-medium rounded-lg transition-all duration-200 ${
//                         isActive || isActivePath(link.path)
//                           ? "bg-green-50 text-green-600 border-l-4 border-green-500"
//                           : "text-gray-600 hover:bg-gray-50 hover:text-green-600"
//                       }`
//                     }
//                   >
//                     {link.label}
//                   </NavLink>
//                 ))}

//                 <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200">
//                   <Link
//                     to="/login"
//                     onClick={closeMobileMenu}
//                     className="px-4 py-3 text-green-600 font-medium rounded-lg hover:bg-green-50 transition-colors duration-200 text-center"
//                   >
//                     Login
//                   </Link>
//                   <Link
//                     to="/register"
//                     onClick={closeMobileMenu}
//                     className="px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 text-center shadow-lg"
//                   >
//                     Get Started
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Only show when user is NOT logged in */}
//         {!user && isMobileMenuOpen && (
//           <div
//             className="lg:hidden fixed inset-0 bg-black/20 z-40"
//             onClick={closeMobileMenu}
//           />
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
