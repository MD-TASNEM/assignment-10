import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaCalendarAlt,
  FaChartLine,
  FaGlobe,
  FaHandsHelping,
  FaHeart,
  FaLeaf,
  FaSeedling,
  FaStar,
  FaTrophy,
  FaUsers,
} from "react-icons/fa";
import {
  fallbackChallenges,
  fallbackEvents,
  fallbackStats,
  fallbackTips,
} from "../data/mockEcoContent";

const communityValues = [
  {
    icon: <FaUsers className="text-2xl" />,
    title: "People First",
    description:
      "A welcoming space where beginners and advocates share wins, questions, and accountability.",
  },
  {
    icon: <FaHandsHelping className="text-2xl" />,
    title: "Practical Support",
    description:
      "Clear steps, friendly advice, and challenge check-ins that make sustainable living feel doable.",
  },
  {
    icon: <FaChartLine className="text-2xl" />,
    title: "Real Progress",
    description:
      "Track impact with metrics that show how many emissions, resources, and habits you have improved.",
  },
  {
    icon: <FaHeart className="text-2xl" />,
    title: "Shared Momentum",
    description:
      "Celebrate milestones together so small wins become long-term habits and community-wide change.",
  },
];

const waysToParticipate = [
  {
    step: "01",
    title: "Join the circle",
    text: "Create your account and introduce yourself to other eco-conscious members.",
  },
  {
    step: "02",
    title: "Pick a challenge",
    text: "Choose from challenges like waste reduction, energy saving, transport, and water care.",
  },
  {
    step: "03",
    title: "Share your wins",
    text: "Post updates, save tips, and encourage others by showing what works in real life.",
  },
];

const memberStories = [
  {
    name: "Sarah Green",
    role: "Zero Waste Advocate",
    impact: "12 completed challenges",
    quote:
      "The community kept me consistent. Having people cheer each other on made the habits stick.",
  },
  {
    name: "Mike Eco",
    role: "Energy Saver",
    impact: "2.3k kg CO₂ saved",
    quote:
      "I joined for the challenges, but stayed for the support and the practical ideas people share.",
  },
  {
    name: "Emma Commute",
    role: "Green Transport Member",
    impact: "45 day streak",
    quote:
      "Seeing others make changes gave me the confidence to start small and keep going.",
  },
];

const formatStatValue = (value) => Number(value ?? 0).toLocaleString();

const communityStats = [
  {
    icon: <FaUsers className="text-2xl" />,
    label: "Members",
    value: formatStatValue(fallbackStats.totalParticipants),
  },
  {
    icon: <FaTrophy className="text-2xl" />,
    label: "Challenges",
    value: formatStatValue(fallbackChallenges.length),
  },
  {
    icon: <FaCalendarAlt className="text-2xl" />,
    label: "Events",
    value: formatStatValue(fallbackEvents.length),
  },
  {
    icon: <FaSeedling className="text-2xl" />,
    label: "Tips Shared",
    value: formatStatValue(fallbackTips.length),
  },
  {
    icon: <FaLeaf className="text-2xl" />,
    label: "Active Challenges",
    value: formatStatValue(
      fallbackChallenges.filter((challenge) => challenge.status === "Active")
        .length,
    ),
  },
  {
    icon: <FaGlobe className="text-2xl" />,
    label: "Countries",
    value: "45",
  },
];

const Community = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-slate-50">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-950 to-teal-900 text-white">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-emerald-500 blur-3xl" />
          <div className="absolute right-0 top-32 h-80 w-80 rounded-full bg-teal-400 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
                <FaLeaf />
                EcoTrack Community
              </span>
              <h1 className="mt-6 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                Join a community that makes sustainable living feel possible.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
                Meet people sharing practical eco habits, take on challenges
                together, and celebrate progress with a community that keeps you
                moving forward.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <button
                  type="button"
                  onClick={() => navigate("/register")}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-emerald-700 transition-transform hover:scale-105"
                >
                  Join now
                  <FaArrowRight />
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/challenges")}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Explore challenges
                </button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {communityStats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-3xl border border-white/10 bg-white/10 p-5 shadow-xl backdrop-blur"
                >
                  <div className="mb-4 inline-flex rounded-2xl bg-white/10 p-3 text-emerald-200">
                    {item.icon}
                  </div>
                  <p className="text-sm text-slate-300">{item.label}</p>
                  <p className="mt-2 text-3xl font-black">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-600">
            What you get
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
            Built for people who want support, not pressure.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {communityValues.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="inline-flex rounded-2xl bg-emerald-50 p-3 text-emerald-600">
                {item.icon}
              </div>
              <h3 className="mt-5 text-xl font-bold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-3 leading-7 text-slate-600">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="rounded-3xl bg-slate-900 p-8 text-white shadow-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-300">
                How it works
              </p>
              <h2 className="mt-3 text-3xl font-bold">
                Three simple steps to get involved
              </h2>
              <div className="mt-8 space-y-5">
                {waysToParticipate.map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500 font-bold text-white">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="mt-1 text-sm leading-7 text-slate-300">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              {memberStories.map((story) => (
                <article
                  key={story.name}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">
                        {story.name}
                      </h3>
                      <p className="text-sm text-emerald-700">{story.role}</p>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
                      <FaStar className="text-yellow-500" />
                      {story.impact}
                    </div>
                  </div>
                  <p className="mt-4 leading-8 text-slate-600">
                    "{story.quote}"
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-emerald-600 to-teal-600 py-16 text-white">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to be part of the movement?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-emerald-50">
            Join EcoTrack to connect with people, share progress, and keep
            building habits that matter.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-emerald-700 transition-transform hover:scale-105"
            >
              Join Community
              <FaArrowRight />
            </button>
            <button
              type="button"
              onClick={() => navigate("/my-activities")}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/15"
            >
              View impact dashboard
              <FaChartLine />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Community;
