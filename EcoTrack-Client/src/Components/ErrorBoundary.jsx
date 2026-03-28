import React from "react";
import { FaExclamationTriangle, FaHome, FaRedoAlt } from "react-icons/fa";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Runtime error captured by ErrorBoundary:", error, info);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 px-6 py-16 text-white">
          <div className="mx-auto flex max-w-2xl flex-col items-center rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl backdrop-blur">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-400/15 text-amber-300">
              <FaExclamationTriangle className="text-2xl" />
            </div>
            <h1 className="mt-6 text-3xl font-black sm:text-4xl">
              Something went wrong
            </h1>
            <p className="mt-4 max-w-xl text-slate-300">
              The app hit an unexpected runtime error. Refresh the page or go
              back home and we&apos;ll get you moving again.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button
                type="button"
                onClick={this.handleReload}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-900 transition-transform hover:scale-105"
              >
                <FaRedoAlt />
                Reload
              </button>
              <button
                type="button"
                onClick={() => {
                  window.location.href = "/";
                }}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/15"
              >
                <FaHome />
                Go home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
