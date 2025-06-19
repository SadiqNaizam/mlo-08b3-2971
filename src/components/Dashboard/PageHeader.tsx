import React from 'react';
import { cn } from '@/lib/utils';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ChevronRight } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  breadcrumbs: Array<{ label: string; path?: string }>;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, breadcrumbs, className }) => {
  return (
    <div className={cn('py-6 px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between', className)}>
      <h2 className="text-xl font-semibold text-foreground mb-2 sm:mb-0">{title}</h2>
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {crumb.path ? (
                  <BreadcrumbLink href={crumb.path}>{crumb.label}</BreadcrumbLink>
                ) : (
                  <BreadcrumbPage className="font-medium text-primary">{crumb.label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {index < breadcrumbs.length - 1 && (
                <BreadcrumbSeparator>
                  <ChevronRight className="h-4 w-4" />
                </BreadcrumbSeparator>
              )}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default PageHeader;
