import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { RefreshCw } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area
} from 'recharts';

interface TrafficDataPoint {
  name: string;
  traffic: number;
  previousPeriodTraffic: number;
}

const generateChartData = (period: 'day' | 'month' | 'year'): TrafficDataPoint[] => {
  const data: TrafficDataPoint[] = [];
  const now = new Date();
  let numPoints = 0;
  let labelFormat: (date: Date, index: number) => string = () => '';

  switch (period) {
    case 'day':
      numPoints = 24; // Hourly data for a day
      labelFormat = (date, i) => `${i}:00`;
      for (let i = 0; i < numPoints; i++) {
        data.push({
          name: labelFormat(now, i),
          traffic: Math.floor(Math.random() * 150) + 50 + Math.sin(i / 3) * 30,
          previousPeriodTraffic: Math.floor(Math.random() * 120) + 40 + Math.cos(i/2.5) * 25,
        });
      }
      break;
    case 'month':
      numPoints = 30; // Daily data for a month
      labelFormat = (date, i) => `${i + 1}`;
      for (let i = 0; i < numPoints; i++) {
        const day = new Date(now.getFullYear(), now.getMonth(), i + 1);
        data.push({
          name: labelFormat(day, i),
          traffic: Math.floor(Math.random() * 2000) + 500 + Math.sin(i / 5) * 500,
          previousPeriodTraffic: Math.floor(Math.random() * 1800) + 400 + Math.cos(i/4) * 400,
        });
      }
      break;
    case 'year':
      numPoints = 12; // Monthly data for a year
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      labelFormat = (date, i) => monthNames[i % 12];
      for (let i = 0; i < numPoints; i++) {
        const month = new Date(now.getFullYear(), i, 1);
        data.push({
          name: labelFormat(month, i),
          traffic: Math.floor(Math.random() * 25000) + 10000 + Math.sin(i / 2) * 8000,
          previousPeriodTraffic: Math.floor(Math.random() * 22000) + 8000 + Math.cos(i/1.5) * 7000,
        });
      }
      break;
  }
  // Ensure some highs and lows to make it visually complex
  if (data.length > 5) {
    data[1].traffic *= 0.7; data[1].previousPeriodTraffic *= 0.8;
    data[Math.floor(data.length / 2)].traffic *= 1.5; data[Math.floor(data.length / 2)].previousPeriodTraffic *= 1.3;
    data[data.length - 2].traffic *= 0.6; data[data.length - 2].previousPeriodTraffic *= 0.7;
  }
  return data;
};

const summaryStats = [
  { label: 'Visits', value: '29.703 Users', percentage: 40, color: 'bg-green-500' },
  { label: 'Unique', value: '24.093 Users', percentage: 20, color: 'bg-blue-500' },
  { label: 'Pageviews', value: '78.706 Views', percentage: 60, color: 'bg-yellow-500' },
  { label: 'New Users', value: '22.123 Users', percentage: 80, color: 'bg-red-500' },
  { label: 'Bounce Rate', value: '40.15%', percentage: 40, color: 'bg-sky-500' },
];

type Period = 'day' | 'month' | 'year';

const TrafficChart: React.FC = () => {
  const [activePeriod, setActivePeriod] = useState<Period>('month');
  const [chartData, setChartData] = useState<TrafficDataPoint[]>(generateChartData('month'));

  const handlePeriodChange = (period: Period) => {
    setActivePeriod(period);
    setChartData(generateChartData(period));
  };

  const refreshData = () => {
    setChartData(generateChartData(activePeriod));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <CardTitle className="text-lg font-semibold">Traffic</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">November 2017</CardDescription> {/* This is static as per image */}
          </div>
          <div className="flex items-center space-x-2 mt-2 sm:mt-0">
            <Tabs defaultValue="month" onValueChange={(value) => handlePeriodChange(value as Period)} className="w-auto">
              <TabsList className="h-8">
                <TabsTrigger value="day" className="px-2 py-1 text-xs h-auto">Day</TabsTrigger>
                <TabsTrigger value="month" className="px-2 py-1 text-xs h-auto">Month</TabsTrigger>
                <TabsTrigger value="year" className="px-2 py-1 text-xs h-auto">Year</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={refreshData}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div style={{ height: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 20, left: -25, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Area type="monotone" dataKey="traffic" stackId="1" name="Current Period" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3}  activeDot={{ r: 6 }} />
              <Area type="monotone" dataKey="previousPeriodTraffic" stackId="2" name="Previous Period" stroke="hsl(var(--accent-green))" fill="hsl(var(--accent-green))" fillOpacity={0.2} activeDot={{ r: 6 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-4">
          {summaryStats.map((stat) => (
            <div key={stat.label}>
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>{stat.label}</span>
                <span>{stat.value}</span>
              </div>
              <Progress value={stat.percentage} className={cn("h-1.5", stat.color)} indicatorClassName={stat.color} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrafficChart;
