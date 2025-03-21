import { Gathering } from "./gathering";

export interface GatheringList {
  content: Gathering[];
  page: { totalPages: number; totalElements: number };
}
