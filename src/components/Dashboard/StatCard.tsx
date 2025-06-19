import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, ArrowDown } from 'lucide-react';

export interface StatCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  iconBgColor?: string;
  iconColor?: string;
  percentageChange: number;
  changeType: 'positive' | 'negative';
  period?: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  iconBgColor = 'bg-primary/10',
  iconColor = 'text-primary',
  percentageChange,
  changeType,
  period,
  className,
}) => {
  const isPositive = changeType === 'positive';

  return (
    <Card className={cn('shadow-sm hover:shadow-md transition-shadow', className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          <div className={cn('p-2 rounded-md', iconBgColor)}>
            <Icon className={cn('w-5 h-5', iconColor)} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-foreground">{value}</div>
        <div className="flex items-center text-xs mt-1">
          <span
            className={cn(
              'flex items-center px-2 py-0.5 rounded-full text-xs font-semibold',
              isPositive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
            )}
          >
            {isPositive ? (
              <ArrowUp className="w-3 h-3 mr-1" />
            ) : (
              <ArrowDown className="w-3 h-3 mr-1" />
            )}
            {Math.abs(percentageChange).toFixed(2)}%
          </span>
          {period && <span className="ml-2 text-muted-foreground">{period}</span>}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
