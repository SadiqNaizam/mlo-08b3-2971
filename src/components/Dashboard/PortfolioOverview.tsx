import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Bitcoin, CircleDollarSign, ChevronDown } from 'lucide-react'; // Using CircleDollarSign for ETH, LTC, DASH

interface Asset {
  id: string;
  name: string;
  symbol: string;
  value: number;
  usdValue: number;
  icon: React.ElementType;
  color: string;
  percentage: number;
}

const portfolioData: Asset[] = [
  { id: 'btc', name: 'Bitcoin', symbol: 'BTC', value: 0.00584875, usdValue: 19405.12, icon: Bitcoin, color: '#F7931A', percentage: 35 },
  { id: 'eth', name: 'Ethereum', symbol: 'ETH', value: 2.25842108, usdValue: 40552.18, icon: CircleDollarSign, color: '#627EEA', percentage: 40 },
  { id: 'ltc', name: 'Litecoin', symbol: 'LTC', value: 10.58963217, usdValue: 15824.58, icon: CircleDollarSign, color: '#BFBBBB', percentage: 15 },
  { id: 'dash', name: 'Dash', symbol: 'DASH', value: 204.28565885, usdValue: 30635.84, icon: CircleDollarSign, color: '#008DE4', percentage: 10 },
];

const totalValue = portfolioData.reduce((sum, asset) => sum + asset.usdValue, 0);

const PortfolioOverview: React.FC<{ className?: string }> = ({ className }) => {
  const [selectedCurrency, setSelectedCurrency] = React.useState<string>('btc');

  return (
    <Card className={cn('shadow-sm', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold">My Portfolio</CardTitle>
        <Select defaultValue="btc" onValueChange={setSelectedCurrency}>
          <SelectTrigger className="w-[100px] h-8">
            <SelectValue placeholder="Currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="btc">BTC</SelectItem>
            <SelectItem value="eth">ETH</SelectItem>
            <SelectItem value="usd">USD</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="h-[200px] w-full mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={portfolioData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                innerRadius={60}
                fill="#8884d8"
                dataKey="percentage"
                stroke="hsl(var(--card))" // Use card background for border to create spacing effect
                strokeWidth={3}
              >
                {portfolioData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number, name: string) => [`${value}%`, portfolioData.find(p => p.name === name)?.name]} />
              {/* <Legend /> */}
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center mt-[60px] pointer-events-none">
             {/* Positioned relative to chart center, may need adjustment based on actual chart rendering */}
            <p className="text-xs text-muted-foreground">Total Value</p>
            <p className="text-2xl font-bold text-foreground">
              ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </p>
          </div>
        </div>

        <ul className="w-full space-y-3">
          {portfolioData.map((asset) => (
            <li key={asset.id} className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: asset.color }} />
                <asset.icon className={cn("w-5 h-5 mr-2", asset.id === 'btc' ? "text-orange-400" : "text-gray-400")} />
                <div>
                    <span className="font-medium text-foreground">{asset.name}</span>
                    <span className="text-xs text-muted-foreground block">{asset.symbol}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-medium text-foreground">
                  {asset.symbol !== 'USD' ? `${asset.value.toFixed(4)} ${asset.symbol}` : `$${asset.value.toFixed(2)}`}
                </span>
                <span className="text-xs text-muted-foreground block">
                  ${asset.usdValue.toLocaleString('en-US', { style: 'currency', currency: 'USD' }).replace('$', '')}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default PortfolioOverview;
