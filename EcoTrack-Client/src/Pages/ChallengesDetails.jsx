import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import toast from "react-hot-toast";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaChartLine,
  FaClock,
  FaLeaf,
  FaMapMarkerAlt,
  FaSeedling,
  FaSpinner,
  FaUsers,
  FaCheckCircle,
} from "react-icons/fa";
import { challengesAPI } from "../api/api";
import { getFallbackChallengeById } from "../data/mockEcoContent";

const formatDate = (value) => {
  if (!value) return "TBD";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "TBD";

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const statusTone = {
  Upcoming: "bg-blue-100 text-blue-700 ring-blue-200",
  Active: "bg-emerald-100 text-emerald-700 ring-emerald-200",
  Completed: "bg-slate-200 text-slate-700 ring-slate-300",
};

const detailCard = (
  title,
  value,
  icon,
  tone = "bg-white",
) => ({ title, value, icon, tone });

const ChallengesDetails = () => {
  const params = useParams();
  const ChallengesId = params.ChallengesId || params.id;
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [usingFallbackData, setUsingFallbackData] = useState(false);

  useEffect(() => {
    let active = true;

    const fetchChallenge = async () => {
      setLoading(true);
      setError("");
      setUsingFallbackData(false);

      try {
        const response = await challengesAPI.getById(ChallengesId);
        if (active) {
          setChallenge(response.data);
        }
      } catch (err) {
        const message =
          err?.response?.data?.message ||
          "We couldn't load this challenge right now.";
        const fallbackChallenge = getFallbackChallengeById(ChallengesId);

        if (active) {
          if (fallbackChallenge) {
            setChallenge(fallbackChallenge);
            setUsingFallbackData(true);
          } else {
            setError(message);
            setChallenge(null);
            toast.error(message, {
              id: `challenge-detail-load-${ChallengesId}`,
            });
          }
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchChallenge();

    return () => {
      active = false;
    };
  }, [ChallengesId]);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center rounded-3xl bg-white shadow-sm">
        <div className="flex flex-col items-center gap-4 text-slate-600">
          <FaSpinner className="animate-spin text-3xl text-emerald-600" />
          <p className="text-sm font-medium">Loading challenge details...</p>
        </div>
      </div>
    );
  }

  if (error || !challenge) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center rounded-3xl bg-gradient-to-br from-slate-50 to-emerald-50 px-6 text-center">
        <div className="max-w-xl space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-md">
            <FaLeaf className="text-2xl text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">
            Challenge not found
          </h1>
          <p className="text-slate-600">
            {error || "The requested challenge could not be loaded."}
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link
              to="/challenges"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-emerald-700"
            >
              <FaArrowLeft />
              Back to Challenges
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const cards = [
    detailCard("Duration", `${challenge.duration || 0} days`, <FaClock />),
    detailCard(
      "Participants",
      (challenge.participants || 0).toLocaleString(),
      <FaUsers />,
    ),
    detailCard(
      "Impact",
      challenge.impactMetric || "kg CO2 saved",
      <FaChartLine />,
    ),
    detailCard("Start Date", formatDate(challenge.startDate), <FaCalendarAlt />),
    detailCard("End Date", formatDate(challenge.endDate), <FaCalendarAlt />),
    detailCard(
      "Created By",
      challenge.createdBy || "EcoTrack Community",
      <FaSeedling />,
    ),
  ];

  return (
    <div className="space-y-8">
      {usingFallbackData && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Live challenge data is unavailable right now, so a sample challenge is shown below.
        </div>
      )}
      <section className="relative overflow-hidden rounded-3xl bg-slate-900 text-white shadow-2xl">
        <div className="absolute inset-0">
          <img
            src={
              challenge.imageUrl ||
              "https://via.placeholder.com/1600x900?text=EcoTrack+Challenge"
            }
            alt={challenge.title}
            className="h-full w-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-900/70 to-emerald-950/70" />
        </div>

        <div className="relative z-10 px-6 py-10 sm:px-10 lg:px-14 lg:py-16">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white/15 px-4 py-1 text-sm font-medium backdrop-blur">
              {challenge.category}
            </span>
            <span
              className={`rounded-full px-4 py-1 text-sm font-semibold ring-1 ${statusTone[challenge.status] || "bg-white/15 text-white ring-white/20"}`}
            >
              {challenge.status || "Upcoming"}
            </span>
          </div>

          <div className="max-w-3xl space-y-4">
            <p className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-emerald-300">
              <FaLeaf />
              Sustainability challenge
            </p>
            <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              {challenge.title}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-200">
              {challenge.description}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/challenges"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
            >
              <FaArrowLeft />
              Back to Challenges
            </Link>
            <Link
              to={`/challenges/join/${ChallengesId}`}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-emerald-700 shadow-lg transition-colors hover:bg-emerald-50"
            >
              <FaSeedling />
              Join Challenge
            </Link>
            <Link
              to="/my-activities"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-emerald-600"
            >
              <FaChartLine />
              Track My Impact
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-8">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
                  Challenge overview
                </p>
                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  What you will do
                </h2>
              </div>
              <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-600">
                <FaSeedling className="text-2xl" />
              </div>
            </div>

            <div className="prose max-w-none text-slate-600 prose-headings:text-slate-900 prose-a:text-emerald-600">
              <p className="text-base leading-8">
                {challenge.target ||
                  "This challenge helps the community build habits that reduce waste, emissions, and resource use over time."}
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {cards.slice(0, 4).map((card) => (
                <div
                  key={card.title}
                  className={`rounded-2xl border border-slate-200 p-5 ${card.tone}`}
                >
                  <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    {card.icon}
                  </div>
                  <p className="text-sm font-medium text-slate-500">{card.title}</p>
                  <p className="mt-1 text-lg font-bold text-slate-900">
                    {card.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-600 p-6 text-white shadow-xl sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-100">
                  Community impact
                </p>
                <h2 className="mt-2 text-2xl font-bold">
                  Why this challenge matters
                </h2>
              </div>
              <div className="rounded-2xl bg-white/15 p-3">
                <FaChartLine className="text-2xl" />
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
                <p className="text-sm text-emerald-100">Category</p>
                <p className="mt-1 text-xl font-bold">{challenge.category}</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
                <p className="text-sm text-emerald-100">Status</p>
                <p className="mt-1 text-xl font-bold">{challenge.status}</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
                <p className="text-sm text-emerald-100">Impact metric</p>
                <p className="mt-1 text-xl font-bold">
                  {challenge.impactMetric || "kg CO2 saved"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-600">
                <FaMapMarkerAlt className="text-xl" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
                  Timeline
                </p>
                <h2 className="text-2xl font-bold text-slate-900">Key dates</h2>
              </div>
            </div>

            <div className="space-y-4">
              {cards.slice(4).map((card) => (
                <div
                  key={card.title}
                  className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4"
                >
                  <div className="rounded-xl bg-white p-3 text-emerald-600 shadow-sm">
                    {card.icon}
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">{card.title}</p>
                    <p className="font-semibold text-slate-900">{card.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-slate-900 p-6 text-white shadow-sm sm:p-8">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-emerald-500/15 p-3 text-emerald-300">
                <FaCheckCircle className="text-xl" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">
                  Next step
                </p>
                <h2 className="text-2xl font-bold">Keep the momentum going</h2>
              </div>
            </div>

            <p className="mt-4 text-sm leading-7 text-slate-300">
              Use this challenge as inspiration for your next eco action, then
              log your progress from the Impact dashboard to keep building your
              personal sustainability streak.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <Link
                to="/my-activities"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-5 py-3 font-semibold text-white transition-colors hover:bg-emerald-600"
              >
                <FaChartLine />
                Go to Impact
              </Link>
              <Link
                to="/challenges"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                <FaArrowLeft />
                Browse more challenges
              </Link>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default ChallengesDetails;
