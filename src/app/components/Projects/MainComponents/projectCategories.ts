/** Option B (merged): LLM/agents + generative & 3D in one bucket */

export type ProjectCategoryId =
  | "intelligent-generative-ai"
  | "data-mining-quality"
  | "ml-supervised"
  | "systems-infrastructure"
  | "full-stack";

export const PROJECT_CATEGORY_META: Record<
  ProjectCategoryId,
  { label: string; shortLabel: string }
> = {
  "intelligent-generative-ai": {
    label: "LLMs, agents & generative AI",
    shortLabel: "LLM & generative",
  },
  "data-mining-quality": {
    label: "Data mining & quality",
    shortLabel: "Data & quality",
  },
  "ml-supervised": {
    label: "Supervised machine learning",
    shortLabel: "Supervised ML",
  },
  "systems-infrastructure": {
    label: "Systems & infrastructure",
    shortLabel: "Systems",
  },
  "full-stack": {
    label: "Full-stack applications",
    shortLabel: "Full-stack",
  },
};

export const PROJECT_CATEGORY_ORDER: ProjectCategoryId[] = [
  "intelligent-generative-ai",
  "data-mining-quality",
  "ml-supervised",
  "systems-infrastructure",
  "full-stack",
];
