import bannerOne from "../assets/Json-mages/bannerOne.png";
import bannerTwo from "../assets/Json-mages/banner2.png";
import bannerThree from "../assets/Json-mages/banner3.png";
import bannerFour from "../assets/Json-mages/banner4.png";
import bannerFive from "../assets/Json-mages/banner5.jpg";

export const CUSTOM_CHALLENGES_KEY = "ecotrack.customChallenges";
const LOCAL_USER_CHALLENGES_KEY = "ecotrack.localUserChallenges";

const discardedStoredChallengeMatchers = [
  (challenge) =>
    challenge?.title === "Non amet in fugiat" &&
    challenge?.category === "Waste Reduction" &&
    Number(challenge?.duration) === 27 &&
    Number(challenge?.participants ?? 0) === 0 &&
    (challenge?.description || "").startsWith("Aute possimus conse") &&
    (challenge?.impactMetric || "").startsWith("Velit dolorem vero l"),
];

const readJson = (key, fallback) => {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const writeJson = (key, value) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
};

const shouldDiscardStoredChallenge = (challenge) =>
  discardedStoredChallengeMatchers.some((matcher) => matcher(challenge));

const pruneStoredUserChallenges = (challengeIds) => {
  if (typeof window === "undefined" || challengeIds.length === 0) {
    return;
  }

  const currentRecords = readJson(LOCAL_USER_CHALLENGES_KEY, []);
  const nextRecords = currentRecords.filter(
    (record) => !challengeIds.includes(record.challengeId),
  );

  if (nextRecords.length !== currentRecords.length) {
    writeJson(LOCAL_USER_CHALLENGES_KEY, nextRecords);
  }
};

const sanitizeStoredCustomChallenges = (storedChallenges) => {
  const safeChallenges = Array.isArray(storedChallenges) ? storedChallenges : [];
  const discardedIds = [];
  const nextChallenges = [];

  safeChallenges.forEach((challenge) => {
    if (!challenge) {
      return;
    }

    if (shouldDiscardStoredChallenge(challenge)) {
      if (challenge._id) {
        discardedIds.push(challenge._id);
      }
      return;
    }

    nextChallenges.push(challenge);
  });

  pruneStoredUserChallenges(discardedIds);

  return nextChallenges;
};

export const fallbackStats = {
  treesPlanted: 48000,
  totalCO2Saved: 152000,
  totalWaterSaved: 2800000,
  totalParticipants: 14000,
};

export const fallbackChallenges = [
  {
    _id: "sample-challenge-1",
    title: "Weekend Rewilding",
    category: "Green Living",
    description:
      "Spend one weekend restoring a small local area with native plants and pollinator-friendly habitats.",
    duration: 7,
    participants: 350,
    impactMetric: "12 kg CO2 saved",
    difficulty: "Easy",
    status: "Active",
    imageUrl: bannerOne,
    target: "Restore native plants and support pollinators in your neighborhood.",
    startDate: "2026-03-01T00:00:00.000Z",
    endDate: "2026-04-30T00:00:00.000Z",
    createdBy: "EcoTrack Community",
  },
  {
    _id: "sample-challenge-2",
    title: "Plastic Free Commute",
    category: "Sustainable Transport",
    description:
      "Replace single-use items on your commute with reusable alternatives for two weeks straight.",
    duration: 14,
    participants: 420,
    impactMetric: "18 kg CO2 saved",
    difficulty: "Medium",
    status: "Active",
    imageUrl: bannerTwo,
    target: "Cut waste during daily travel and build better habits.",
    startDate: "2026-03-10T00:00:00.000Z",
    endDate: "2026-04-12T00:00:00.000Z",
    createdBy: "EcoTrack Community",
  },
  {
    _id: "sample-challenge-3",
    title: "Energy Reset Challenge",
    category: "Energy Conservation",
    description:
      "Track your household energy use, switch to LEDs, and unplug devices you do not need.",
    duration: 21,
    participants: 260,
    impactMetric: "24 kg CO2 saved",
    difficulty: "Hard",
    status: "Upcoming",
    imageUrl: bannerFour,
    target: "Reduce electricity waste and learn where your biggest energy savings come from.",
    startDate: "2026-04-05T00:00:00.000Z",
    endDate: "2026-04-26T00:00:00.000Z",
    createdBy: "EcoTrack Community",
  },
  {
    _id: "sample-challenge-4",
    title: "Water Wise Week",
    category: "Water Conservation",
    description:
      "Cut water waste for a full week by fixing leaks, shortening showers, and reusing rinse water.",
    duration: 7,
    participants: 390,
    impactMetric: "5,000 L saved",
    difficulty: "Easy",
    status: "Active",
    imageUrl: bannerFive,
    target: "Find practical ways to lower water use at home and at work.",
    startDate: "2026-03-18T00:00:00.000Z",
    endDate: "2026-04-02T00:00:00.000Z",
    createdBy: "EcoTrack Community",
  },
  {
    _id: "sample-challenge-5",
    title: "Local Food Sprint",
    category: "Green Living",
    description:
      "Choose local and seasonal food for one week to reduce packaging and transport emissions.",
    duration: 10,
    participants: 180,
    impactMetric: "9 kg CO2 saved",
    difficulty: "Medium",
    status: "Completed",
    imageUrl: bannerThree,
    target: "Support local growers and reduce food miles.",
    startDate: "2026-02-01T00:00:00.000Z",
    endDate: "2026-02-10T00:00:00.000Z",
    createdBy: "EcoTrack Community",
  },
];

export const fallbackTips = [
  {
    _id: "sample-tip-1",
    title: "Keep a reusable bottle by the door",
    content:
      "Making your bottle visible makes it much more likely you will take it with you every day.",
    category: "Waste Reduction",
    author: "community@ecotrack.local",
    authorName: "Sarah Green",
    authorPhoto: null,
    upvotes: 47,
    createdAt: "2026-03-20T10:30:00.000Z",
  },
  {
    _id: "sample-tip-2",
    title: "Swap one commute per week",
    content:
      "Try public transport, biking, or walking for one trip a week to lower your carbon footprint without a big lifestyle change.",
    category: "Sustainable Transport",
    author: "community@ecotrack.local",
    authorName: "Mike Thompson",
    authorPhoto: null,
    upvotes: 32,
    createdAt: "2026-03-19T14:15:00.000Z",
  },
  {
    _id: "sample-tip-3",
    title: "Unplug idle electronics",
    content:
      "Use one power strip to turn off chargers and devices that keep drawing power even when they are not in use.",
    category: "Energy Conservation",
    author: "community@ecotrack.local",
    authorName: "Emma Waters",
    authorPhoto: null,
    upvotes: 28,
    createdAt: "2026-03-18T09:45:00.000Z",
  },
  {
    _id: "sample-tip-4",
    title: "Start a small compost bin",
    content:
      "Kitchen scraps and dry leaves can become rich compost that improves soil and reduces landfill waste.",
    category: "Waste Reduction",
    author: "community@ecotrack.local",
    authorName: "David Greenfield",
    authorPhoto: null,
    upvotes: 56,
    createdAt: "2026-03-17T16:20:00.000Z",
  },
];

export const fallbackEvents = [
  {
    _id: "sample-event-1",
    title: "River Cleanup Day",
    date: "2026-04-10T09:00:00.000Z",
    location: "Green River Park",
    description: "Join neighbors for a morning cleanup and litter audit.",
    organizer: "EcoTrack Community",
    imageUrl: bannerTwo,
    currentParticipants: 38,
    maxParticipants: 60,
  },
  {
    _id: "sample-event-2",
    title: "Solar Home Workshop",
    date: "2026-04-18T14:00:00.000Z",
    location: "Community Center",
    description: "Learn the basics of rooftop solar and home energy planning.",
    organizer: "EcoTrack Community",
    imageUrl: bannerFour,
    currentParticipants: 24,
    maxParticipants: 40,
  },
  {
    _id: "sample-event-3",
    title: "Neighborhood Tree Planting",
    date: "2026-04-26T08:30:00.000Z",
    location: "City Library Garden",
    description: "Plant shade trees and help build a cooler, greener block.",
    organizer: "EcoTrack Community",
    imageUrl: bannerFive,
    currentParticipants: 51,
    maxParticipants: 75,
  },
];

export const getFallbackChallengeById = (challengeId) =>
  [...getStoredCustomChallenges(), ...fallbackChallenges].find(
    (challenge) => challenge._id === challengeId,
  ) || null;

export const getStoredCustomChallenges = () => {
  const storedChallenges = readJson(CUSTOM_CHALLENGES_KEY, []);
  const sanitizedChallenges = sanitizeStoredCustomChallenges(storedChallenges);

  if (sanitizedChallenges.length !== storedChallenges.length) {
    writeJson(CUSTOM_CHALLENGES_KEY, sanitizedChallenges);
  }

  return sanitizedChallenges;
};

export const saveStoredCustomChallenge = (challenge) => {
  const currentChallenges = getStoredCustomChallenges();
  const nextChallenges = [challenge, ...currentChallenges.filter((item) => item._id !== challenge._id)];
  writeJson(CUSTOM_CHALLENGES_KEY, nextChallenges);
  return nextChallenges;
};

export const removeStoredCustomChallenge = (challengeId) => {
  const currentChallenges = getStoredCustomChallenges();
  const nextChallenges = currentChallenges.filter((item) => item._id !== challengeId);

  if (nextChallenges.length !== currentChallenges.length) {
    writeJson(CUSTOM_CHALLENGES_KEY, nextChallenges);
    pruneStoredUserChallenges([challengeId]);
  }

  return nextChallenges;
};

export const getMergedChallenges = () => [
  ...getStoredCustomChallenges(),
  ...fallbackChallenges,
];
