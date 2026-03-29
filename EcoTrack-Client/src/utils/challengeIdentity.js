export const getChallengeId = (value) => {
  if (!value) {
    return null;
  }

  const rawId =
    typeof value === "object"
      ? value._id ?? value.id ?? value.challengeId
      : value;

  if (rawId === undefined || rawId === null) {
    return null;
  }

  const normalizedId = String(rawId).trim();

  if (
    !normalizedId ||
    normalizedId === "undefined" ||
    normalizedId === "null"
  ) {
    return null;
  }

  return normalizedId;
};

export const hasChallengeId = (value) => Boolean(getChallengeId(value));

export const isLocalChallenge = (challenge) => {
  const challengeId = getChallengeId(challenge);
  return (
    challengeId?.startsWith("local-") ||
    challengeId?.startsWith("custom-")
  );
};

export const normalizeChallenge = (challenge) => {
  if (!challenge || typeof challenge !== "object") {
    return challenge;
  }

  const challengeId = getChallengeId(challenge);

  if (!challengeId) {
    return { ...challenge };
  }

  return {
    ...challenge,
    _id: challengeId,
    id: challengeId,
  };
};

export const normalizeChallenges = (challenges) =>
  Array.isArray(challenges)
    ? challenges.map((challenge) => normalizeChallenge(challenge))
    : [];
