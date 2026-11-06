import { useEffect, useState } from 'react';
import { SolutionPageTemplate } from '../components/SolutionPageTemplate';
import { solutionsData } from '../data/solutions';
import { getProjectsByCategory } from '../lib/content';
import { PortfolioProject } from '../types';

export function PecasTecnicasPage() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const solution = solutionsData['pecas-tecnicas-em-fibra-de-vidro'];

  useEffect(() => {
    getProjectsByCategory('tecnicas').then(setProjects);
  }, []);

  return <SolutionPageTemplate solution={solution} relatedProjects={projects} />;
}
