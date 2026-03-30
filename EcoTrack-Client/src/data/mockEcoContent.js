import bannerOne from "../assets/Json-mages/bannerOne.png";
import bannerThree from "../assets/Json-mages/banner3.png";
import {
  getChallengeId,
  normalizeChallenge,
  normalizeChallenges,
} from "../utils/challengeIdentity";

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
  const safeChallenges = Array.isArray(storedChallenges)
    ? storedChallenges
    : [];
  const discardedIds = [];
  const nextChallenges = [];

  safeChallenges.forEach((challenge) => {
    if (!challenge) {
      return;
    }

    if (shouldDiscardStoredChallenge(challenge)) {
      const challengeId = getChallengeId(challenge);
      if (challengeId) {
        discardedIds.push(challengeId);
      }
      return;
    }

    nextChallenges.push(normalizeChallenge(challenge));
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

export const fallbackChallenges = [];

export const fallbackTips = [];

export const fallbackEvents = [];

export const getFallbackChallengeById = (challengeId) =>
  [...getStoredCustomChallenges(), ...fallbackChallenges].find(
    (challenge) => getChallengeId(challenge) === getChallengeId(challengeId),
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
  const normalizedChallenge = normalizeChallenge(challenge);
  const challengeId = getChallengeId(normalizedChallenge);
  const nextChallenges = [
    normalizedChallenge,
    ...currentChallenges.filter((item) => getChallengeId(item) !== challengeId),
  ];
  writeJson(CUSTOM_CHALLENGES_KEY, nextChallenges);
  return nextChallenges;
};

export const removeStoredCustomChallenge = (challengeId) => {
  const currentChallenges = getStoredCustomChallenges();
  const nextChallenges = currentChallenges.filter(
    (item) => item._id !== challengeId,
  );

  if (nextChallenges.length !== currentChallenges.length) {
    writeJson(CUSTOM_CHALLENGES_KEY, nextChallenges);
    pruneStoredUserChallenges([challengeId]);
  }

  return nextChallenges;
};

export const getMergedChallenges = () => [
  ...getStoredCustomChallenges(),
  ...normalizeChallenges(fallbackChallenges),
];
