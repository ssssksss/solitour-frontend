import { Information } from "./information";

export interface InformationList {
  content: Information[];
  page: { totalPages: number; totalElements: number };
}
