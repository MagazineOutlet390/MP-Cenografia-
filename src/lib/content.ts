import { BlogPost, PortfolioProject } from '../types';
import { blogPosts } from '../data/blog';
import { portfolioProjects } from '../data/portfolio';

/**
 * Camada de Abstração de Conteúdo da MP Cenografia.
 * Todas as páginas e componentes consomem dados exclusivamente através destas funções assíncronas.
 * 
 * Integração Futura com Sanity CMS:
 * Quando o cliente configurar o Sanity, apenas as implementações internas deste arquivo
 * serão substituídas pelo client de consulta Sanity (ex: client.fetch(`*[_type == "post"]`)),
 * mantendo toda a camada visual e rotas 100% inalteradas.
 */

export async function getProjects(): Promise<PortfolioProject[]> {
  return Promise.resolve(portfolioProjects);
}

export async function getProjectBySlug(slug: string): Promise<PortfolioProject | null> {
  const project = portfolioProjects.find((p) => p.slug === slug);
  return Promise.resolve(project || null);
}

export async function getProjectsByCategory(category: string): Promise<PortfolioProject[]> {
  const filtered = portfolioProjects.filter((p) => p.category === category);
  return Promise.resolve(filtered);
}

export async function getPosts(): Promise<BlogPost[]> {
  return Promise.resolve(blogPosts);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const cleanSlug = slug.trim().replace(/\/+$/, '');
  const post = blogPosts.find((p) => p.slug === cleanSlug || p.slug === slug);
  return Promise.resolve(post || null);
}

export async function getRecentPosts(limit = 3): Promise<BlogPost[]> {
  return Promise.resolve(blogPosts.slice(0, limit));
}
