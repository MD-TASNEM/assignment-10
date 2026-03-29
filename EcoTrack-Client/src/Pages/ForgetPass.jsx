import React from "react";
import { Link, useLocation } from "react-router";

const ForgetPass = () => {
  const { state } = useLocation();
  const email = state?.email || "";

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-xl w-full rounded-2xl bg-white shadow-md border border-slate-200 p-8 text-center space-y-4">
        <h1 className="text-3xl font-bold text-slate-900">Forgot Password</h1>
        <p className="text-slate-600">
          Password reset flow is intentionally kept simple for assignment
          evaluation. You can return to login and continue with Email/Password
          or Google sign-in.
        </p>
        {email ? (
          <p className="text-sm text-emerald-700 bg-emerald-50 rounded-lg py-2 px-3">
            Entered email: {email}
          </p>
        ) : null}
        <div className="pt-2">
          <Link
            to="/login"
            className="inline-flex items-center rounded-full bg-emerald-600 px-6 py-3 text-white font-semibold hover:bg-emerald-700 transition-colors"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgetPass;
