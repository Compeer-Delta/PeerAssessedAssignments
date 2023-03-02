// This function generates a UUID using the uuid package
// https://www.npmjs.com/package/uuid
import { v4 as uuidv4 } from "uuid";

export function generateUUID() {
  return uuidv4();
}
