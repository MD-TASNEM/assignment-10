import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import { FaChartLine, FaLeaf, FaSpinner } from "react-icons/fa";
import { AuthContext } from "../Context/AuthContext";
import { userChallengesAPI } from "../api/api";
import { getFallbackChallengeById } from "../data/mockEcoContent";

const LOCAL_USER_CHALLENGES_KEY = "ecotrack.localUserChallenges";

const readLocalRecords = () => {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const stored = JSON.parse(
      window.localStorage.getItem(LOCAL_USER_CHALLENGES_KEY) || "[]",
    );
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
};

const writeLocalRecords = (records) => {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(LOCAL_USER_CHALLENGES_KEY, JSON.stringify(records));
};

const resolveChallengeTitle = (record) => {
  if (record?.challengeId && typeof record.challengeId === "object") {
    return record.challengeId.title || "Untitled Challenge";
  }
  const fallback = getFallbackChallengeById(record?.challengeId);
  return fallback?.title || "Untitled Challenge";
};

const resolveChallengeMetric = (record) => {
  if (record?.challengeId && typeof record.challengeId === "object") {
    return record.challengeId.impactMetric || "impact";
  }
  const fallback = getFallbackChallengeById(record?.challengeId);
  return fallback?.impactMetric || "impact";
};

const Impact = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState([]);
  const [stats, setStats] = useState({
    totalChallenges: 0,
    completedChallenges: 0,
    ongoingChallenges: 0,
    averageProgress: 0,
  });
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [recordsRes, statsRes] = await Promise.all([
          userChallengesAPI.getAll(),
          userChallengesAPI.getStats(),
        ]);
        const apiRecords = Array.isArray(recordsRes?.data) ? recordsRes.data : [];
        setRecords(apiRecords);
        setStats({
          totalChallenges: statsRes?.data?.totalChallenges || apiRecords.length,
          completedChallenges: statsRes?.data?.completedChallenges || 0,
          ongoingChallenges: statsRes?.data?.ongoingChallenges || 0,
          averageProgress: statsRes?.data?.averageProgress || 0,
        });
      } catch {
        const localRecords = readLocalRecords();
        setRecords(localRecords);
        const completed = localRecords.filter((item) => item.status === "Finished").length;
        const ongoing = localRecords.filter((item) => item.status === "Ongoing").length;
        const avg = localRecords.length
          ? Math.round(
              localRecords.reduce((sum, item) => sum + Number(item.progress || 0), 0) /
                localRecords.length,
            )
          : 0;
        setStats({
          totalChallenges: localRecords.length,
          completedChallenges: completed,
          ongoingChallenges: ongoing,
          averageProgress: avg,
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user?.uid]);

  const overallImpactText = useMemo(() => {
    if (!records.length) {
      return "No tracked activities yet.";
    }
    const finished = records.filter((item) => item.status === "Finished").length;
    return `${finished} finished challenge(s), ${stats.averageProgress}% average progress`;
  }, [records, stats.averageProgress]);

  const handleProgressChange = (recordId, value) => {
    setRecords((current) =>
      current.map((record) =>
        record._id === recordId ? { ...record, progress: Number(value) } : record,
      ),
    );
  };

  const handleProgressSave = async (record) => {
    const challengeId =
      typeof record.challengeId === "object" ? record.challengeId?._id : record.challengeId;
    if (!challengeId) {
      toast.error("Challenge id is missing for this record.");
      return;
    }

    const nextProgress = Number(record.progress || 0);
    const nextStatus =
      nextProgress >= 100 ? "Finished" : nextProgress > 0 ? "Ongoing" : "Not Started";
    setUpdatingId(record._id);

    try {
      await userChallengesAPI.updateProgress(challengeId, nextProgress);
      setRecords((current) =>
        current.map((item) =>
          item._id === record._id
            ? { ...item, progress: nextProgress, status: nextStatus }
            : item,
        ),
      );
      toast.success("Progress updated.");
    } catch {
      const localRecords = readLocalRecords();
      const updatedRecords = localRecords.map((item) =>
        item._id === record._id
          ? {
              ...item,
              progress: nextProgress,
              status: nextStatus,
              lastUpdated: new Date().toISOString(),
            }
          : item,
      );
      writeLocalRecords(updatedRecords);
      setRecords((current) =>
        current.map((item) =>
          item._id === record._id
            ? { ...item, progress: nextProgress, status: nextStatus }
            : item,
        ),
      );
      toast.success("Saved progress locally.");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-600">
          <FaSpinner className="animate-spin text-2xl text-emerald-600" />
          <span>Loading your activities...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold">My Activities</h1>
        <p className="mt-2 text-emerald-100">{overallImpactText}</p>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-xl bg-white/10 p-4">
            <p className="text-sm text-emerald-100">Total Joined</p>
            <p className="text-2xl font-bold">{stats.totalChallenges}</p>
          </div>
          <div className="rounded-xl bg-white/10 p-4">
            <p className="text-sm text-emerald-100">Completed</p>
            <p className="text-2xl font-bold">{stats.completedChallenges}</p>
          </div>
          <div className="rounded-xl bg-white/10 p-4">
            <p className="text-sm text-emerald-100">Ongoing</p>
            <p className="text-2xl font-bold">{stats.ongoingChallenges}</p>
          </div>
          <div className="rounded-xl bg-white/10 p-4">
            <p className="text-sm text-emerald-100">Avg Progress</p>
            <p className="text-2xl font-bold">{stats.averageProgress}%</p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <FaChartLine className="text-emerald-600" />
            Challenge Progress
          </h2>
          <Link
            to="/challenges"
            className="rounded-full bg-emerald-600 px-5 py-2 text-white font-semibold hover:bg-emerald-700 transition-colors"
          >
            Join More
          </Link>
        </div>

        {!records.length ? (
          <div className="text-center py-14">
            <FaLeaf className="mx-auto text-4xl text-emerald-500" />
            <h3 className="mt-4 text-xl font-semibold text-slate-900">
              No challenge activity yet
            </h3>
            <p className="mt-2 text-slate-600">
              Join a challenge to start tracking your progress.
            </p>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {records.map((record) => (
              <div
                key={record._id}
                className="rounded-2xl border border-slate-200 p-5 bg-slate-50"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {resolveChallengeTitle(record)}
                    </h3>
                    <p className="text-sm text-slate-600">
                      Status: {record.status || "Not Started"} • Metric:{" "}
                      {resolveChallengeMetric(record)}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-emerald-700">
                    {Number(record.progress || 0)}%
                  </p>
                </div>

                <div className="mt-4 h-2 w-full rounded-full bg-slate-200">
                  <div
                    className="h-2 rounded-full bg-emerald-600"
                    style={{ width: `${Math.max(0, Math.min(100, Number(record.progress || 0)))}%` }}
                  />
                </div>

                <div className="mt-4 flex flex-col md:flex-row gap-3 md:items-center">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={Number(record.progress || 0)}
                    onChange={(event) =>
                      handleProgressChange(record._id, event.target.value)
                    }
                    className="w-full md:flex-1 accent-emerald-600"
                  />
                  <button
                    type="button"
                    onClick={() => handleProgressSave(record)}
                    disabled={updatingId === record._id}
                    className="rounded-full bg-emerald-600 px-5 py-2 text-white font-semibold hover:bg-emerald-700 disabled:opacity-60"
                  >
                    {updatingId === record._id ? "Saving..." : "Save Progress"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Impact;
