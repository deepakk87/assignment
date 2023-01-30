const crypto = require("crypto");

/**
 * This function takes an object or string . If its an object stringify it to convert into string
 * and return the sha3-512 hash of the object as HEX encoded string
 */
const createHexHash = (object) => {
  let dataToHash;
  if (typeof object !== "string") {
    dataToHash = JSON.stringify(object);
  } else {
    dataToHash = object;
  }
  return crypto.createHash("sha3-512").update(dataToHash).digest("hex");
}

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;
  // If not event short circuit and exit with default partition key.
  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  if (event.partitionKey) {
    candidate = typeof event.partitionKey !== 'string' ? 
            JSON.stringify(event.partitionKey) : event.partitionKey;
 
    if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
      candidate = createHexHash(candidate);
    }
    return candidate;
  }
  return createHexHash(event);
};



