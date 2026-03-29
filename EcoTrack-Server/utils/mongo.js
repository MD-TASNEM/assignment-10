const { ObjectId } = require("mongodb");

const serializeIdentifier = (value) => {
  if (value === undefined || value === null) {
    return value;
  }

  if (value instanceof ObjectId) {
    return value.toHexString();
  }

  if (typeof value === "object" && typeof value.toHexString === "function") {
    return value.toHexString();
  }

  return String(value);
};

const toObjectId = (identifier) => {
  if (identifier instanceof ObjectId) {
    return identifier;
  }

  if (typeof identifier !== "string") {
    return null;
  }

  const trimmedIdentifier = identifier.trim();

  if (!trimmedIdentifier || !ObjectId.isValid(trimmedIdentifier)) {
    return null;
  }

  return new ObjectId(trimmedIdentifier);
};

const buildObjectIdFilter = (field, identifier) => {
  const objectId = toObjectId(identifier);

  if (!objectId) {
    return null;
  }

  return { [field]: objectId };
};

const buildIdFilter = (identifier) => buildObjectIdFilter("_id", identifier);

const findById = async (collection, identifier) => {
  const filter = buildIdFilter(identifier);

  if (!filter) {
    return null;
  }

  return collection.findOne(filter);
};

const serializeDocument = (document) => {
  if (!document) {
    return null;
  }

  const serializedId = serializeIdentifier(document._id);

  return {
    ...document,
    _id: serializedId,
    id: serializedId,
  };
};

const serializeDocuments = (documents = []) =>
  documents.map((document) => serializeDocument(document));

module.exports = {
  buildIdFilter,
  buildObjectIdFilter,
  findById,
  serializeDocument,
  serializeDocuments,
  serializeIdentifier,
  toObjectId,
};
