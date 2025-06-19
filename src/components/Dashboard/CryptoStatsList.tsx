import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button'; // For potential actions
import { Bitcoin, CircleDollarSign, MoreHorizontal, ArrowUp, ArrowDown } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, Tooltip } from 'recharts';

interface CryptoStat {
  id: string;
  name: string;
  symbol: string;
  icon: React.ElementType;
  iconColor: string;
  value: number;
  change: number; // percentage change
  chartData: Array<{ name: string; value: number }>;
}

const generateSparklineData = (points: number, base: number, volatility: number) => {
  const data = [];
  let currentValue = base;
  for (let i = 0; i < points; i++) {
    currentValue += (Math.random() - 0.5) * 2 * volatility;
    currentValue = Math.max(0, currentValue); // prevent negative values
    data.push({ name: `Pt${i}`, value: parseFloat(currentValue.toFixed(2)) });
  }
  return data;
};

const cryptoStatsData: CryptoStat[] = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    icon: Bitcoin,
    iconColor: 'text-orange-400',
    value: 1523647,
    change: 13.11,
    chartData: generateSparklineData(10, 50, 15),
  },
  {
    id: 'litecoin',
    name: 'Litecoin',
    symbol: 'LTC',
    icon: CircleDollarSign, // Placeholder, Lucide doesn't have LTC
    iconColor: 'text-gray-400',
    value: 2145687,
    change: 15.08,
    chartData: generateSparklineData(10, 60, 10),
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    icon: CircleDollarSign, // Placeholder, Lucide doesn't have ETH
    iconColor: 'text-indigo-500',
    value: 3312870,
    change: 8.57,
    chartData: generateSparklineData(10, 70, 20),
  },
  {
    id: 'binance',
    name: 'Binance',
    symbol: 'BNB',
    icon: CircleDollarSign, // Placeholder, Lucide doesn't have BNB
    iconColor: 'text-yellow-500',
    value: 1820045,
    change: -9.21,
    chartData: generateSparklineData(10, 40, 12),
  },
  {
    id: 'dash',
    name: 'Dash',
    symbol: 'DASH',
    icon: CircleDollarSign, // Placeholder, Lucide doesn't have Dash
    iconColor: 'text-blue-500',
    value: 9458153,
    change: 12.07,
    chartData: generateSparklineData(10, 80, 5),
  },
];

interface CryptoStatsListProps {
  className?: string;
}

const CryptoStatsList: React.FC<CryptoStatsListProps> = ({ className }) => {
  return (
    <div className={cn('grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6', className)}>
      {cryptoStatsData.map((crypto) => {
        const isPositive = crypto.change >= 0;
        return (
          <Card key={crypto.id} className="shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center">
                <crypto.icon className={cn('h-6 w-6 mr-2', crypto.iconColor)} />
                <CardTitle className="text-base font-medium text-foreground">{crypto.name}</CardTitle>
              </div>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between mb-2">
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    ${crypto.value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </p>
                  <div className="flex items-center text-xs">
                    <span className={cn('font-semibold', isPositive ? 'text-green-500' : 'text-red-500')}>
                      {isPositive ? <ArrowUp className="inline h-3 w-3 mr-0.5" /> : <ArrowDown className="inline h-3 w-3 mr-0.5" />}
                      {Math.abs(crypto.change).toFixed(2)}%
                    </span>
                    <span className="ml-1 text-muted-foreground">({crypto.symbol})</span>
                  </div>
                </div>
                <div className="h-[40px] w-[80px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={crypto.chartData}>
                      <Tooltip
                        contentStyle={{ display: 'none' }} // Hide default tooltip for sparklines
                        wrapperStyle={{ display: 'none' }}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke={isPositive ? 'hsl(var(--accent-secondary))' : 'hsl(var(--destructive))'}
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default CryptoStatsList;
