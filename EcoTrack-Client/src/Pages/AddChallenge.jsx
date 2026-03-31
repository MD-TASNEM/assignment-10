import React, { useContext, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaChartLine,
  FaImage,
  FaLeaf,
  FaPaperPlane,
  FaTag,
  FaUsers,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { AuthContext } from "../Context/AuthContext";
import { challengesAPI } from "../api/api";
import { saveStoredCustomChallenge } from "../data/mockEcoContent";

const defaultForm = {
  title: "",
  category: "Waste Reduction",
  description: "",
  duration: 7,
  target: "",
  impactMetric: "",
  startDate: "",
  endDate: "",
  imageUrl: "",
};

const categoryOptions = [
  "Waste Reduction",
  "Energy Conservation",
  "Water Conservation",
  "Sustainable Transport",
  "Green Living",
];

const AddChallenge = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createdBy = useMemo(
    () => user?.email || user?.displayName || "eco@ecotrack.local",
    [user],
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: name === "duration" ? Number(value) : value,
    }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.title.trim()) nextErrors.title = "Title is required.";
    if (!form.description.trim())
      nextErrors.description = "Description is required.";
    if (!form.target.trim()) nextErrors.target = "Target is required.";
    if (!form.impactMetric.trim())
      nextErrors.impactMetric = "Impact metric is required.";
    if (!form.startDate) nextErrors.startDate = "Start date is required.";
    if (!form.endDate) nextErrors.endDate = "End date is required.";
    if (!form.imageUrl.trim()) nextErrors.imageUrl = "Image URL is required.";
    if (!form.duration || form.duration < 1)
      nextErrors.duration = "Duration must be at least 1 day.";

    if (
      form.startDate &&
      form.endDate &&
      new Date(form.startDate) > new Date(form.endDate)
    ) {
      nextErrors.endDate = "End date must be after the start date.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) {
      toast.error("Please fix the form errors before submitting.");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      ...form,
      participants: 0,
      createdBy,
      status: "Upcoming",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      _id: `local-${Date.now()}`,
    };

    try {
      await challengesAPI.create(payload);
      toast.success("Challenge created successfully.");
      navigate("/challenges");
    } catch (error) {
      saveStoredCustomChallenge(payload);
      toast.success("Saved locally and added to your challenge list.");
      navigate("/challenges");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link
              to="/challenges"
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition-colors hover:text-emerald-800"
            >
              <FaArrowLeft />
              Back to challenges
            </Link>
            <h1 className="mt-4 text-4xl font-black text-slate-900">
              Create a New Challenge
            </h1>
            <p className="mt-2 max-w-2xl text-slate-600">
              Share a sustainability challenge with the EcoTrack community and
              inspire more people to take action.
            </p>
          </div>
          <div className="rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
              Creator
            </p>
            <p className="mt-1 font-semibold text-slate-900">{createdBy}</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]"
        >
          <div className="space-y-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Challenge title
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                placeholder="Plastic-Free July"
              />
              {errors.title && (
                <p className="mt-2 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Category
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                >
                  {categoryOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Duration
                </label>
                <input
                  type="number"
                  name="duration"
                  min="1"
                  value={form.duration}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
                {errors.duration && (
                  <p className="mt-2 text-sm text-red-600">{errors.duration}</p>
                )}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Description
              </label>
              <textarea
                name="description"
                rows="5"
                value={form.description}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                placeholder="Explain the challenge and the sustainable habits users should follow."
              />
              {errors.description && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.description}
                </p>
              )}
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Target
                </label>
                <input
                  name="target"
                  value={form.target}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  placeholder="Reduce plastic waste by 90%"
                />
                {errors.target && (
                  <p className="mt-2 text-sm text-red-600">{errors.target}</p>
                )}
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Impact metric
                </label>
                <input
                  name="impactMetric"
                  value={form.impactMetric}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  placeholder="kg plastic saved"
                />
                {errors.impactMetric && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.impactMetric}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Start date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
                {errors.startDate && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.startDate}
                  </p>
                )}
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  End date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={form.endDate}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
                {errors.endDate && (
                  <p className="mt-2 text-sm text-red-600">{errors.endDate}</p>
                )}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Image URL
              </label>
              <input
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                placeholder="https://images.unsplash.com/..."
              />
              {errors.imageUrl && (
                <p className="mt-2 text-sm text-red-600">{errors.imageUrl}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Creating..." : "Create Challenge"}
              <FaPaperPlane />
            </button>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl bg-slate-900 p-6 text-white shadow-xl">
              <h2 className="text-2xl font-bold">
                Tips for a strong challenge
              </h2>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                <li className="flex gap-3">
                  <FaUsers className="mt-1 text-emerald-400" />
                  Keep the goal simple enough for people to start today.
                </li>
                <li className="flex gap-3">
                  <FaChartLine className="mt-1 text-emerald-400" />
                  Use an impact metric people can understand and track.
                </li>
                <li className="flex gap-3">
                  <FaCalendarAlt className="mt-1 text-emerald-400" />
                  Make the timeline realistic and achievable.
                </li>
                <li className="flex gap-3">
                  <FaTag className="mt-1 text-emerald-400" />
                  Keep the description short, clear, and action-oriented.
                </li>
                <li className="flex gap-3">
                  <FaImage className="mt-1 text-emerald-400" />
                  Use a clean image that matches the challenge theme.
                </li>
              </ul>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h3 className="text-xl font-bold text-slate-900">
                Preview requirements
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Your challenge will appear in the challenges grid and, if the
                backend is unavailable, it will still be saved locally so you
                can review it in the browser.
              </p>
              <div className="mt-4 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800">
                <FaLeaf className="mb-2 text-emerald-600" />
                Created challenges should use a measurable impact target like kg
                CO₂, liters of water, or kg of plastic saved.
              </div>
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
};

export default AddChallenge;
