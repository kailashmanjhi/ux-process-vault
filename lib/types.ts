export type Stage = {
  slug: "discover" | "define" | "design";
  title: string;
  description: string;
};

export type Task = {
  slug: string;
  stage: "discover" | "define" | "design";
  title: string;
  description: string;
};

export type AssetType = "template" | "canvas" | "framework" | "guide";
export type AssetFormat = "pdf" | "figjam" | "miro" | "doc";

export type Asset = {
  slug: string;
  title: string;
  description: string;
  stage: "discover" | "define" | "design";
  taskSlug: string;
  type: AssetType;
  format: AssetFormat;
  timeToUseMinutes: number;
  whenToUse: string;
  inputsRequired: string[];
  steps: string[];
  fileUrl: string | null;
  isPremium?: boolean;
};
