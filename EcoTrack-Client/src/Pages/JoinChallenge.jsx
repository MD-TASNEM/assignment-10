import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaLeaf,
  FaPaperPlane,
  FaSpinner,
  FaChartLine,
  FaUsers,
  FaCalendarAlt,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { challengesAPI, userChallengesAPI } from "../api/api";
import { AuthContext } from "../Context/AuthContext";
import { getFallbackChallengeById, saveStoredCustomChallenge } from "../data/mockEcoContent";

const USER_CHALLENGES_KEY = "ecotrack.localUserChallenges";

const readJson = (key, fallback) => {
  if (typeof window === "undefined") return fallback;
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const writeJson = (key, value) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
};

const JoinChallenge = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [progress, setProgress] = useState(10);
  const [status, setStatus] = useState("Ongoing");
  const [notes, setNotes] = useState("");

  const savedRecord = useMemo(() => {
    const stored = readJson(USER_CHALLENGES_KEY, []);
    return stored.find((item) => item.challengeId === id) || null;
  }, [id]);

  useEffect(() => {
    let active = true;

    const fetchChallenge = async () => {
      setLoading(true);

      try {
        const response = await challengesAPI.getById(id);
        if (!active) return;
        setChallenge(response.data);
      } catch (error) {
        const fallbackChallenge = getFallbackChallengeById(id);
        if (!active) return;
        if (fallbackChallenge) {
          setChallenge(fallbackChallenge);
        } else {
          setChallenge(null);
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
  }, [id]);

  useEffect(() => {
    if (savedRecord) {
      setProgress(savedRecord.progress ?? 10);
      setStatus(savedRecord.status || "Ongoing");
      setNotes(savedRecord.notes || "");
    }
  }, [savedRecord]);

  const persistLocalRecord = (nextRecord) => {
    const records = readJson(USER_CHALLENGES_KEY, []);
    const nextRecords = [
      nextRecord,
      ...records.filter((item) => item.challengeId !== nextRecord.challengeId),
    ];
    writeJson(USER_CHALLENGES_KEY, nextRecords);
  };

  const handleJoin = async () => {
    if (!challenge) {
      toast.error("Challenge not found.");
      return;
    }

    setSubmitting(true);
    const record = {
      _id: `local-activity-${Date.now()}`,
      userId: user?.email || user?.uid || "local-user",
      challengeId: id,
      status,
      progress: Number(progress),
      joinDate: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      notes,
    };

    try {
      await challengesAPI.join(id);
      try {
        await userChallengesAPI.updateProgress(id, Number(progress));
      } catch {
        // The server may only expose join tracking or may be protected in this workspace.
      }

      if (challenge._id?.toString().startsWith("local-")) {
        saveStoredCustomChallenge({
          ...challenge,
          participants: (challenge.participants || 0) + 1,
          updatedAt: new Date().toISOString(),
        });
      }

      persistLocalRecord(record);
      toast.success("You joined the challenge successfully.");
      navigate("/my-activities");
    } catch (error) {
      persistLocalRecord(record);
      toast.success("Saved your join progress locally.");
      navigate("/my-activities");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center rounded-3xl bg-white shadow-sm">
        <div className="flex flex-col items-center gap-4 text-slate-600">
          <FaSpinner className="animate-spin text-3xl text-emerald-600" />
          <p className="text-sm font-medium">Loading challenge...</p>
        </div>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center rounded-3xl bg-gradient-to-br from-slate-50 to-emerald-50 px-6 text-center">
        <div className="max-w-xl space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-md">
            <FaLeaf className="text-2xl text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Challenge not found</h1>
          <p className="text-slate-600">
            The challenge you want to join could not be loaded.
          </p>
          <Link
            to="/challenges"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-emerald-700"
          >
            <FaArrowLeft />
            Back to Challenges
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative min-h-[300px]">
            <img
              src={challenge.imageUrl || "https://via.placeholder.com/1600x900?text=EcoTrack"}
              alt={challenge.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/80 via-slate-900/40 to-emerald-900/20" />
            <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
                <FaLeaf />
                Join challenge
              </span>
              <h1 className="mt-4 text-4xl font-black sm:text-5xl">{challenge.title}</h1>
              <p className="mt-4 max-w-2xl text-slate-200">{challenge.description}</p>
            </div>
          </div>

          <div className="space-y-6 p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-emerald-50 p-4">
                <p className="text-sm text-emerald-700">Category</p>
                <p className="mt-1 font-bold text-slate-900">{challenge.category}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Participants</p>
                <p className="mt-1 font-bold text-slate-900">
                  {(challenge.participants || 0).toLocaleString()}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Duration</p>
                <p className="mt-1 font-bold text-slate-900">{challenge.duration || 0} days</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Impact metric</p>
                <p className="mt-1 font-bold text-slate-900">
                  {challenge.impactMetric || "kg CO2 saved"}
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Progress: {progress}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={(event) => setProgress(event.target.value)}
                className="w-full accent-emerald-600"
              />
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Status
              </label>
              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              >
                <option value="Not Started">Not Started</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Finished">Finished</option>
              </select>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Notes
              </label>
              <textarea
                rows="4"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                placeholder="Write your plan or a quick progress update..."
              />
            </div>

            <button
              type="button"
              onClick={handleJoin}
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Saving..." : savedRecord ? "Update Progress" : "Join Challenge"}
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <FaChartLine className="text-2xl text-emerald-600" />
          <h2 className="mt-4 text-xl font-bold text-slate-900">Track progress</h2>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            Update your progress percentage and keep a simple note on what you
            completed this week.
          </p>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <FaUsers className="text-2xl text-emerald-600" />
          <h2 className="mt-4 text-xl font-bold text-slate-900">Community support</h2>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            Your join record is saved locally if the protected API is not
            available, so you can still keep moving forward.
          </p>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <FaCalendarAlt className="text-2xl text-emerald-600" />
          <h2 className="mt-4 text-xl font-bold text-slate-900">Return anytime</h2>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            Come back later to update your progress and keep building your
            sustainability streak.
          </p>
        </div>
      </section>
    </div>
  );
};

export default JoinChallenge;
