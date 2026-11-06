import { useEffect, useState } from 'react';
import { SolutionPageTemplate } from '../components/SolutionPageTemplate';
import { solutionsData } from '../data/solutions';
import { getProjectsByCategory } from '../lib/content';
import { PortfolioProject } from '../types';

export function EsculturasPage() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const solution = solutionsData['esculturas-em-fibra-de-vidro'];

  useEffect(() => {
    getProjectsByCategory('esculturas').then(setProjects);
  }, []);

  return <SolutionPageTemplate solution={solution} relatedProjects={projects} />;
}
