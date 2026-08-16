export type EditionStatus = "available" | "draft" | "retired";

export interface Edition {
  id: string;
  name: string;
  slug: string;
  editionNumber: number;
  category: string;
  status: EditionStatus;
  intro: string;
}
