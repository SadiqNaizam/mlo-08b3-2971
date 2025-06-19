import React from 'react';
import { cn } from '@/lib/utils';
import StatCard, { StatCardProps } from './StatCard';
import { DollarSign, TrendingUp, TrendingDown, Briefcase } from 'lucide-react';

interface StatsCardGridProps {
  className?: string;
}

const statsData: StatCardProps[] = [
  {
    title: 'Total Invested',
    value: '$2,390.68',
    icon: DollarSign,
    iconBgColor: 'bg-blue-100',
    iconColor: 'text-blue-500',
    percentageChange: 6.24,
    changeType: 'positive' as const,
    period: 'vs. previous month',
  },
  {
    title: 'Total Change',
    value: '$19,523.25',
    icon: TrendingUp,
    iconBgColor: 'bg-green-100',
    iconColor: 'text-green-500',
    percentageChange: 3.67,
    changeType: 'positive' as const,
    period: 'since last week',
  },
  {
    title: 'Day Change',
    value: '$14,799.44',
    icon: TrendingDown, // Could be TrendingUp or TrendingDown based on actual change
    iconBgColor: 'bg-red-100',
    iconColor: 'text-red-500',
    percentageChange: -4.80, // Negative value for a decrease
    changeType: 'negative' as const,
    period: 'since yesterday',
  },
  {
    title: 'Total Assets',
    value: '12',
    icon: Briefcase,
    iconBgColor: 'bg-yellow-100',
    iconColor: 'text-yellow-500',
    percentageChange: 1.5,
    changeType: 'positive' as const,
    period: 'crypto assets',
  },
];

const StatsCardGrid: React.FC<StatsCardGridProps> = ({ className }) => {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6', className)}>
      {statsData.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          iconBgColor={stat.iconBgColor}
          iconColor={stat.iconColor}
          percentageChange={stat.percentageChange}
          changeType={stat.changeType}
          period={stat.period}
        />
      ))}
    </div>
  );
};

export default StatsCardGrid;
