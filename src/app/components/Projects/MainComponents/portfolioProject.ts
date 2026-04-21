import type { ReactElement } from 'react';
import type { ProjectCategoryId } from './projectCategories';

export type PortfolioProject = {
  category: ProjectCategoryId;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  docUrl?: string;
  interactiveComponent: ReactElement;
  telegramUrl?: string;
  colabUrl?: string;
  interactive?: boolean;
  note?: string;
};

export type ProjectCardProps = Omit<PortfolioProject, 'category'>;
