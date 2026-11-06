import { useEffect, useState } from 'react';
import { SolutionPageTemplate } from '../components/SolutionPageTemplate';
import { solutionsData } from '../data/solutions';
import { getProjectsByCategory } from '../lib/content';
import { PortfolioProject } from '../types';

export function CenografiaPage() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const solution = solutionsData['cenografia-em-fibra-de-vidro'];

  useEffect(() => {
    getProjectsByCategory('cenografia').then(setProjects);
  }, []);

  return <SolutionPageTemplate solution={solution} relatedProjects={projects} />;
}
