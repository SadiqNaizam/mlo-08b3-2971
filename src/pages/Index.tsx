import React from 'react';
import MainAppLayout from '@/components/layout/MainAppLayout';
import PageHeader from '@/components/Dashboard/PageHeader';
import StatsCardGrid from '@/components/Dashboard/StatsCardGrid';
import PortfolioOverview from '@/components/Dashboard/PortfolioOverview';
import MarketGraph from '@/components/Dashboard/MarketGraph';
import CryptoStatsList from '@/components/Dashboard/CryptoStatsList';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

const CryptoDashboardPage: React.FC = () => {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Dashboards", path: "#" }, // Placeholder path for Dashboards
    { label: "Crypto" },
  ];

  return (
    <MainAppLayout>
      <div className="space-y-6">
        <PageHeader title="Crypto" breadcrumbs={breadcrumbs} />
        
        <StatsCardGrid />
        
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-6 items-start">
          {/* Left column: PortfolioOverview should define its own internal structure */}
          <PortfolioOverview />
          
          {/* Right column: MarketGraph should define its own internal structure */}
          <MarketGraph />
        </div>
        
        <CryptoStatsList />
      </div>
    </MainAppLayout>
  );
};

export default CryptoDashboardPage;
