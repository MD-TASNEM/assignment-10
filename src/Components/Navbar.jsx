const Navbar = () => {
  return (
    <header
      id="navbar"
      className="fixed w-full top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-white/10 transition-all"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-extrabold text-emerald-400">
          <i className="fas fa-leaf"></i> EcoTrack
        </h1>

        <nav className="hidden md:flex items-center gap-8 text-slate-200">
          <a href="#" className="hover:text-emerald-400">
            Home
          </a>
          <a href="#" className="hover:text-emerald-400">
            Impact
          </a>
          <a href="#" className="hover:text-emerald-400">
            Challenges
          </a>
          <a href="#" className="hover:text-emerald-400">
            Events
          </a>

          <div className="flex items-center gap-3">
            <button className="border border-emerald-400 px-4 py-1 rounded-full text-emerald-400 hover:bg-emerald-400/30 transition-colors font-medium">
              Login
            </button>
            <button className="bg-emerald-600 hover:bg-emerald-700 px-5 py-1 rounded-full font-semibold text-white transition-all duration-200 active:scale-95">
              Sign up
            </button>
          </div>
        </nav>

        <button id="menuBtn" className="md:hidden text-white text-xl">
          <i className="fas fa-bars"></i>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
