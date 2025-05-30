import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Cog, Users, TrendingUp, TrendingDown, DollarSign, BarChartBig } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, Tooltip } from 'recharts';

interface StatCardData {
  id: string;
  title: string;
  value: string;
  description: string;
  icon: React.ElementType;
  color: string;
  chartType: 'line' | 'bar';
  chartData: { name: string; value: number }[];
}

const statsData: StatCardData[] = [
  {
    id: 'membersOnline',
    title: 'Members Online',
    value: '9,823',
    description: '+2.5% since last month',
    icon: Users,
    color: 'bg-blue-500',
    chartType: 'line' as const,
    chartData: [
      { name: 'Jan', value: 65 }, { name: 'Feb', value: 59 }, { name: 'Mar', value: 80 },
      { name: 'Apr', value: 81 }, { name: 'May', value: 56 }, { name: 'Jun', value: 55 },
      { name: 'Jul', value: 40 }, { name: 'Aug', value: 70 }, { name: 'Sep', value: 60 }
    ],
  },
  {
    id: 'newSignups',
    title: 'New Signups',
    value: '1,204',
    description: '+15% this week',
    icon: Users,
    color: 'bg-sky-500',
    chartType: 'line' as const,
    chartData: [
      { name: 'Mon', value: 30 }, { name: 'Tue', value: 45 }, { name: 'Wed', value: 20 },
      { name: 'Thu', value: 60 }, { name: 'Fri', value: 75 }, { name: 'Sat', value: 50 },
      { name: 'Sun', value: 90 }, { name: 'Mon+', value: 65 }
    ],
  },
  {
    id: 'revenue',
    title: 'Revenue',
    value: '$45,890',
    description: '-3.1% vs last period',
    icon: DollarSign,
    color: 'bg-amber-500',
    chartType: 'line' as const,
    chartData: [
      { name: 'W1', value: 1200 }, { name: 'W2', value: 2100 }, { name: 'W3', value: 900 },
      { name: 'W4', value: 1600 }, { name: 'W5', value: 1300 }, { name: 'W6', value: 2400 },
      { name: 'W7', value: 1800 }, { name: 'W8', value: 2200 }
    ],
  },
  {
    id: 'activeTickets',
    title: 'Active Tickets',
    value: '287',
    description: 'Avg. response: 2h',
    icon: BarChartBig,
    color: 'bg-red-500',
    chartType: 'bar' as const,
    chartData: [
      { name: 'A', value: 10 }, { name: 'B', value: 15 }, { name: 'C', value: 7 },
      { name: 'D', value: 20 }, { name: 'E', value: 12 }, { name: 'F', value: 18 },
      { name: 'G', value: 5 }, { name: 'H', value: 22 }
    ],
  },
];

const StatsCardGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statsData.map((stat) => {
        const Icon = stat.icon;
        const ChartComponent = stat.chartType === 'line' ? LineChart : BarChart;
        const ChartElement = stat.chartType === 'line' ? Line : Bar;

        return (
          <Card key={stat.id} className={cn('text-white overflow-hidden', stat.color)}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl font-bold">{stat.value}</CardTitle>
                  <CardDescription className="text-sm text-white/80">{stat.title}</CardDescription>
                </div>
                <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10 -mr-2 -mt-2">
                  <Cog className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0 h-24 relative">
              <ResponsiveContainer width="100%" height="100%">
                <ChartComponent data={stat.chartData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                  <Tooltip
                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.7)', border: 'none', borderRadius: '4px'}}
                    labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <ChartElement 
                    type="monotone" 
                    dataKey="value" 
                    strokeWidth={stat.chartType === 'line' ? 2 : undefined} 
                    stroke={stat.chartType === 'line' ? '#ffffff' : undefined}
                    fill={stat.chartType === 'bar' ? '#ffffff' : undefined}
                    fillOpacity={stat.chartType === 'bar' ? 0.6 : undefined}
                    dot={false}
                    isAnimationActive={true}
                  />
                </ChartComponent>
              </ResponsiveContainer>
              {/* Description overlaying the chart slightly - for image accuracy */}
              <div className="absolute bottom-2 left-4 text-xs text-white/80">
                {stat.description}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default StatsCardGrid;
