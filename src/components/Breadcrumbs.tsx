import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Navegação estrutural" className="py-4">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-[#64748B]">
        <li>
          <Link to="/" className="hover:text-[#2A5FA5] transition-colors">
            Início
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8]" />
              {isLast || !item.path ? (
                <span className="text-[#0B1220] font-medium truncate max-w-xs sm:max-w-md" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link to={item.path} className="hover:text-[#2A5FA5] transition-colors">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
