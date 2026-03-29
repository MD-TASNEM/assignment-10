const {
  serializeDocument,
  serializeDocuments,
  serializeIdentifier,
} = require("./mongo");

const CHALLENGE_CATEGORIES = [
  "Waste Reduction",
  "Energy Conservation",
  "Water Conservation",
  "Sustainable Transport",
  "Green Living",
  "Others",
];

const TIP_CATEGORIES = [
  "Waste Management",
  "Energy Saving",
  "Water Conservation",
  "Sustainable Transport",
  "Green Living",
  "Food & Diet",
];

const USER_CHALLENGE_STATUSES = ["Not Started", "Ongoing", "Finished"];
const DEFAULT_CHALLENGE_IMAGE =
  "https://via.placeholder.com/300x200?text=Eco+Challenge";

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
    this.statusCode = 400;
  }
}

const mergeDefined = (base = {}, updates = {}) => {
  const merged = { ...base };

  for (const [key, value] of Object.entries(updates)) {
    if (value !== undefined) {
      merged[key] = value;
    }
  }

  return merged;
};

const sanitizeInput = (input = {}) => {
  const { _id, id, ...rest } = input;
  return rest;
};

const asTrimmedString = (value) =>
  typeof value === "string" ? value.trim() : "";

const requireString = (value, requiredMessage, options = {}) => {
  const text = asTrimmedString(value);

  if (!text) {
    throw new ValidationError(requiredMessage);
  }

  if (options.minLength && text.length < options.minLength) {
    throw new ValidationError(options.minMessage || requiredMessage);
  }

  if (options.maxLength && text.length > options.maxLength) {
    throw new ValidationError(options.maxMessage || requiredMessage);
  }

  return text;
};

const optionalString = (value) => {
  if (value === undefined || value === null) {
    return undefined;
  }

  const text = String(value).trim();
  return text || undefined;
};

const parseRequiredDate = (value, requiredMessage) => {
  if (value === undefined || value === null || value === "") {
    throw new ValidationError(requiredMessage);
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new ValidationError(requiredMessage);
  }

  return date;
};

const parseOptionalDate = (value, invalidMessage = "Invalid date value") => {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new ValidationError(invalidMessage);
  }

  return date;
};

const parseRequiredNumber = (value, requiredMessage) => {
  if (value === undefined || value === null || value === "") {
    throw new ValidationError(requiredMessage);
  }

  const number = Number(value);

  if (Number.isNaN(number)) {
    throw new ValidationError(requiredMessage);
  }

  return number;
};

const parseOptionalNumber = (
  value,
  defaultValue,
  invalidMessage = "Invalid numeric value",
) => {
  if (value === undefined || value === null || value === "") {
    return defaultValue;
  }

  const number = Number(value);

  if (Number.isNaN(number)) {
    throw new ValidationError(invalidMessage);
  }

  return number;
};

const deriveChallengeStatus = (startDateValue, endDateValue, now = new Date()) => {
  const startDate = new Date(startDateValue);
  const endDate = new Date(endDateValue);

  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
    return null;
  }

  if (now < startDate) {
    return "Upcoming";
  }

  if (now <= endDate) {
    return "Active";
  }

  return "Completed";
};

const applyTimestamps = (document, existingDocument, now = new Date()) => ({
  ...document,
  createdAt: existingDocument?.createdAt
    ? new Date(existingDocument.createdAt)
    : now,
  updatedAt: now,
});

const prepareChallengeDocument = (
  input = {},
  { existingDocument, userEmail, now = new Date() } = {},
) => {
  const baseDocument = mergeDefined(existingDocument, sanitizeInput(input));
  const title = requireString(baseDocument.title, "Challenge title is required", {
    minLength: 3,
    maxLength: 100,
    minMessage: "Title must be at least 3 characters",
    maxMessage: "Title cannot exceed 100 characters",
  });
  const category = requireString(baseDocument.category, "Category is required");

  if (!CHALLENGE_CATEGORIES.includes(category)) {
    throw new ValidationError("Category is required");
  }

  const description = requireString(baseDocument.description, "Description is required", {
    minLength: 10,
    minMessage: "Description must be at least 10 characters",
  });
  const duration = parseRequiredNumber(baseDocument.duration, "Duration is required");

  if (duration < 1) {
    throw new ValidationError("Duration must be at least 1 day");
  }

  if (duration > 365) {
    throw new ValidationError("Duration cannot exceed 365 days");
  }

  const target = requireString(baseDocument.target, "Target is required");
  const participants = parseOptionalNumber(baseDocument.participants, 0);

  if (participants < 0) {
    throw new ValidationError("Participants cannot be negative");
  }

  const impactMetric = optionalString(baseDocument.impactMetric) || "kg CO2 saved";
  const createdBy = requireString(
    userEmail || baseDocument.createdBy,
    "createdBy is required",
  );
  const startDate = parseRequiredDate(baseDocument.startDate, "Start date is required");
  const endDate = parseRequiredDate(baseDocument.endDate, "End date is required");

  if (endDate < startDate) {
    throw new ValidationError("End date must be on or after start date");
  }

  const totalImpact = Number.isFinite(Number(baseDocument.totalImpact))
    ? Number(baseDocument.totalImpact)
    : participants * 10;

  return applyTimestamps(
    {
      ...baseDocument,
      title,
      category,
      description,
      duration,
      target,
      participants,
      impactMetric,
      createdBy,
      startDate,
      endDate,
      imageUrl: optionalString(baseDocument.imageUrl) || DEFAULT_CHALLENGE_IMAGE,
      status:
        deriveChallengeStatus(startDate, endDate, now) ||
        baseDocument.status ||
        "Upcoming",
      totalImpact,
    },
    existingDocument,
    now,
  );
};

const serializeChallenge = (document) => {
  const serializedDocument = serializeDocument(document);

  if (!serializedDocument) {
    return null;
  }

  return {
    ...serializedDocument,
    status:
      deriveChallengeStatus(
        serializedDocument.startDate,
        serializedDocument.endDate,
      ) ||
      serializedDocument.status ||
      "Upcoming",
    totalImpact: Number.isFinite(Number(serializedDocument.totalImpact))
      ? Number(serializedDocument.totalImpact)
      : Number(serializedDocument.participants || 0) * 10,
  };
};

const serializeChallenges = (documents = []) =>
  documents.map((document) => serializeChallenge(document));

const prepareTipDocument = (
  input = {},
  { existingDocument, author, authorName, now = new Date() } = {},
) => {
  const baseDocument = mergeDefined(existingDocument, sanitizeInput(input));
  const title = requireString(baseDocument.title, "Tip title is required", {
    minLength: 3,
    minMessage: "Title must be at least 3 characters",
  });
  const content = requireString(baseDocument.content, "Tip content is required", {
    minLength: 10,
    minMessage: "Content must be at least 10 characters",
  });
  const category = requireString(baseDocument.category, "Category is required");

  if (!TIP_CATEGORIES.includes(category)) {
    throw new ValidationError("Category is required");
  }

  return applyTimestamps(
    {
      ...baseDocument,
      title,
      content,
      category,
      author: requireString(author || baseDocument.author, "author is required"),
      authorName: requireString(
        authorName || baseDocument.authorName,
        "authorName is required",
      ),
      upvotes: parseOptionalNumber(baseDocument.upvotes, 0),
      imageUrl: optionalString(baseDocument.imageUrl),
    },
    existingDocument,
    now,
  );
};

const prepareEventDocument = (
  input = {},
  { existingDocument, organizer, now = new Date() } = {},
) => {
  const baseDocument = mergeDefined(existingDocument, sanitizeInput(input));
  const maxParticipants = parseOptionalNumber(baseDocument.maxParticipants, 50);

  if (maxParticipants < 1) {
    throw new ValidationError("maxParticipants must be at least 1");
  }

  const currentParticipants = parseOptionalNumber(baseDocument.currentParticipants, 0);

  if (currentParticipants < 0) {
    throw new ValidationError("currentParticipants cannot be negative");
  }

  if (currentParticipants > maxParticipants) {
    throw new ValidationError(
      "currentParticipants cannot exceed maxParticipants",
    );
  }

  return applyTimestamps(
    {
      ...baseDocument,
      title: requireString(baseDocument.title, "Event title is required"),
      description: requireString(
        baseDocument.description,
        "Event description is required",
      ),
      date: parseRequiredDate(baseDocument.date, "Event date is required"),
      location: requireString(baseDocument.location, "Event location is required"),
      organizer: requireString(
        organizer || baseDocument.organizer,
        "organizer is required",
      ),
      maxParticipants,
      currentParticipants,
      imageUrl: optionalString(baseDocument.imageUrl),
      isVirtual: Boolean(baseDocument.isVirtual),
    },
    existingDocument,
    now,
  );
};

const prepareUserChallengeDocument = (
  input = {},
  { existingDocument, userId, challengeId, now = new Date() } = {},
) => {
  const baseDocument = mergeDefined(existingDocument, sanitizeInput(input));
  const progress = parseOptionalNumber(baseDocument.progress, 0);

  if (progress < 0 || progress > 100) {
    throw new ValidationError("Progress must be between 0 and 100");
  }

  const resolvedUserId = requireString(
    userId || baseDocument.userId,
    "User id is required",
  );
  const resolvedChallengeId =
    challengeId !== undefined ? challengeId : baseDocument.challengeId;

  if (
    resolvedChallengeId === undefined ||
    resolvedChallengeId === null ||
    resolvedChallengeId === ""
  ) {
    throw new ValidationError("Challenge id is required");
  }

  const initialStatus =
    optionalString(baseDocument.status) || USER_CHALLENGE_STATUSES[0];
  let status = USER_CHALLENGE_STATUSES.includes(initialStatus)
    ? initialStatus
    : USER_CHALLENGE_STATUSES[0];

  if (progress >= 100) {
    status = "Finished";
  } else if (progress > 0 && status === "Not Started") {
    status = "Ongoing";
  }

  let completionDate = parseOptionalDate(baseDocument.completionDate);

  if (status === "Finished" && !completionDate) {
    completionDate = now;
  }

  if (status !== "Finished") {
    completionDate = undefined;
  }

  const notes = optionalString(baseDocument.notes);

  if (notes && notes.length > 500) {
    throw new ValidationError("Notes cannot exceed 500 characters");
  }

  return applyTimestamps(
    {
      ...baseDocument,
      userId: resolvedUserId,
      challengeId: resolvedChallengeId,
      status,
      progress,
      joinDate: existingDocument?.joinDate
        ? new Date(existingDocument.joinDate)
        : parseOptionalDate(baseDocument.joinDate) || now,
      completionDate,
      lastUpdated: now,
      notes,
    },
    existingDocument,
    now,
  );
};

const serializeUserChallenge = (document) => {
  const serializedDocument = serializeDocument(document);

  if (!serializedDocument) {
    return null;
  }

  if (
    serializedDocument.challengeId &&
    typeof serializedDocument.challengeId === "object" &&
    !Array.isArray(serializedDocument.challengeId)
  ) {
    serializedDocument.challengeId = serializeChallenge(
      serializedDocument.challengeId,
    );
  } else if (serializedDocument.challengeId !== undefined) {
    serializedDocument.challengeId = serializeIdentifier(
      serializedDocument.challengeId,
    );
  }

  return serializedDocument;
};

const serializeUserChallenges = (documents = []) =>
  documents.map((document) => serializeUserChallenge(document));

module.exports = {
  ValidationError,
  deriveChallengeStatus,
  prepareChallengeDocument,
  prepareEventDocument,
  prepareTipDocument,
  prepareUserChallengeDocument,
  serializeChallenge,
  serializeChallenges,
  serializeDocuments,
  serializeUserChallenge,
  serializeUserChallenges,
};
