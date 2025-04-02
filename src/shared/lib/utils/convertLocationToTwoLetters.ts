import { LOCATION_MAP } from "@/shared/config";

export function convertLocationToTwoLetters(location: string) {
  return LOCATION_MAP[location] || location.substring(0, 2);
}
