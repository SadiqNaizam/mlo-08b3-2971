import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area } from 'recharts';

interface MarketGraphProps {
  className?: string;
}

const generateRandomData = (numPoints: number, basePrice: number, volatility: number) => {
  const data = [];
  let currentDate = new Date(2023, 9, 6, 23, 0, 0); // Start from 23:00 06 Oct
  let currentPrice = basePrice;
  for (let i = 0; i < numPoints; i++) {
    const change = (Math.random() - 0.5) * 2 * volatility;
    currentPrice += change;
    currentPrice = Math.max(currentPrice, basePrice * 0.8); // Ensure price doesn't drop too low
    currentPrice = Math.min(currentPrice, basePrice * 1.2); // Ensure price doesn't rise too high
    
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    let timeLabel = `${hours}:${minutes}`;
    if (i % (numPoints/6) === 0) { // Label every ~1/6th point for readability
        timeLabel = `${hours}:${minutes} ${currentDate.getDate()} Oct`;
    }

    data.push({
      time: timeLabel,
      price: parseFloat(currentPrice.toFixed(2)),
      high: parseFloat((currentPrice * (1 + Math.random() * 0.01)).toFixed(2)),
      low: parseFloat((currentPrice * (1 - Math.random() * 0.01)).toFixed(2)),
    });
    currentDate.setMinutes(currentDate.getMinutes() + (24*60 / numPoints)); // Simulate time progression
  }
  return data;
};

const marketData = generateRandomData(60, 6600, 30); // 60 data points, base price 6600, volatility 30

const initialStats = {
  currentPrice: 0.014756,
  changeValue: 75.69,
  changePercentage: 1.99,
  high: 0.014578,
  low: 0.0175489,
  totalBalance: 72800,
  profit: 49700,
  loss: 23100,
};

const MarketGraph: React.FC<MarketGraphProps> = ({ className }) => {
  const [activeInterval, setActiveInterval] = React.useState<'1H' | '7D' | '1M' | '1Y' | 'ALL'>('ALL');
  const [stats, setStats] = React.useState(initialStats);

  // In a real app, this would fetch new data
  const handleIntervalChange = (interval: '1H' | '7D' | '1M' | '1Y' | 'ALL') => {
    setActiveInterval(interval);
    // Simulate data change - in reality, fetch new data
    const newBasePrice = 6600 + (Math.random() - 0.5) * 500;
    const newVolatility = 30 + (Math.random() - 0.5) * 10;
    const newData = generateRandomData(60, newBasePrice, newVolatility);
    // For simplicity, stats are not deeply tied to graph data in this example
    setStats(prev => ({ ...prev, currentPrice: newData[newData.length -1].price / 100000 + Math.random()*0.001 })); 
  };

  return (
    <Card className={cn('shadow-sm', className)}>
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <CardTitle className="text-lg font-semibold mb-2 sm:mb-0">Market Graph</CardTitle>
          <div className="flex space-x-1">
            {(['1H', '7D', '1M', '1Y', 'ALL'] as const).map((interval) => (
              <Button
                key={interval}
                variant={activeInterval === interval ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleIntervalChange(interval)}
                className={cn(activeInterval === interval ? 'bg-primary text-primary-foreground' : 'text-muted-foreground')}
              >
                {interval}
              </Button>
            ))}
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-baseline gap-x-6 gap-y-2 text-sm">
            <div className="flex items-baseline">
                <span className="text-2xl font-bold text-foreground mr-1">{stats.currentPrice.toFixed(6)}</span>
                <span className="text-muted-foreground mr-2">(${stats.changeValue.toFixed(2)})</span>
                <span className={cn("font-semibold", stats.changePercentage >= 0 ? 'text-green-500' : 'text-red-500')}>
                    {stats.changePercentage >= 0 ? '+' : ''}{stats.changePercentage.toFixed(2)}%
                </span>
            </div>
            <div className="text-muted-foreground">
                High: <span className="text-foreground font-medium">{stats.high.toFixed(6)}</span>
            </div>
            <div className="text-muted-foreground">
                Low: <span className="text-foreground font-medium">{stats.low.toFixed(6)}</span>
            </div>
        </div>
      </CardHeader>
      <CardContent className="h-[350px] pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={marketData} margin={{ top: 5, right: 20, left: -25, bottom: 5 }}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis 
              dataKey="time" 
              tickLine={false} 
              axisLine={false} 
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              interval="preserveStartEnd"
              padding={{ left: 20, right: 20 }}
            />
            <YAxis 
              tickLine={false} 
              axisLine={false} 
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} 
              domain={['dataMin - 20', 'dataMax + 20']}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
              formatter={(value: number, name: string) => {
                const nameStr = name.charAt(0).toUpperCase() + name.slice(1);
                return [`$${value.toFixed(2)}`, nameStr];
              }}
            />
            <Area type="monotone" dataKey="price" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#priceGradient)" strokeWidth={2} dot={false} activeDot={{ r: 6, strokeWidth: 2, fill: 'hsl(var(--card))' }} />
            {/* Example of candlestick data (not directly supported by AreaChart, better use a library or custom SVG) */}
            {/* For simplicity, we are only showing the line/area chart for price. */}
          </AreaChart>
        </ResponsiveContainer>
        <div className="mt-6 flex justify-around text-center">
            <div>
                <p className="text-sm text-muted-foreground">Total Balance</p>
                <p className="text-xl font-semibold text-foreground">${(stats.totalBalance/1000).toFixed(1)}k</p>
            </div>
            <div>
                <p className="text-sm text-muted-foreground">Profit</p>
                <p className="text-xl font-semibold text-green-500">+${(stats.profit/1000).toFixed(1)}k</p>
            </div>
            <div>
                <p className="text-sm text-muted-foreground">Loss</p>
                <p className="text-xl font-semibold text-red-500">-${(stats.loss/1000).toFixed(1)}k</p>
            </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketGraph;
