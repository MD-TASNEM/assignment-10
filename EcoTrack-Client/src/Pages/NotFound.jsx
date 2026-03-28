import React from "react";
import { Link } from "react-router";
import { FaArrowLeft, FaHome, FaLeaf } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 px-6 py-16 text-white">
      <div className="mx-auto flex max-w-2xl flex-col items-center rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl backdrop-blur">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-400/15 text-emerald-300">
          <FaLeaf className="text-2xl" />
        </div>
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
          404
        </p>
        <h1 className="mt-3 text-3xl font-black sm:text-4xl">
          Page not found
        </h1>
        <p className="mt-4 max-w-xl text-slate-300">
          The page you&apos;re looking for does not exist or was moved to a
          different route.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-900 transition-transform hover:scale-105"
          >
            <FaHome />
            Back home
          </Link>
          <Link
            to="/challenges"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/15"
          >
            <FaArrowLeft />
            Browse challenges
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
