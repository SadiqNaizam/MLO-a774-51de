import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Users, User, SearchCheck, Globe, TrendingUp, TrendingDown } from 'lucide-react';

interface DetailStat {
  label: string;
  value: string;
  color?: string; // For text color, if needed
}

interface ProgressListItem {
  id: string;
  label: string;
  value: number;
  displayValue?: string;
  icon?: React.ElementType;
  color: 'primary' | 'accent' | 'destructive' | 'green' | 'yellow'; // Added more specific colors
}

interface UserDemographic {
  id: string;
  label: string;
  icon: React.ElementType;
  percentage: number;
  color: 'primary' | 'pink'; // Specific for male/female like in image
}

interface SourceStat {
  id: string;
  icon: React.ElementType;
  label: string;
  value: string;
  trend: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

const mainStats: DetailStat[] = [
  { label: 'New Clients', value: '9,123', color: 'text-gray-500' },
  { label: 'Recurring Clients', value: '22,643', color: 'text-red-500' }, // Image shows red here
  { label: 'Pageviews', value: '78,623', color: 'text-yellow-600' }, // Image shows yellow
  { label: 'Organic', value: '49,123', color: 'text-green-500' }, // Image shows green
];

const dailyActivity: ProgressListItem[] = [
  { id: 'monday', label: 'Monday', value: 34, color: 'destructive' },
  { id: 'tuesday', label: 'Tuesday', value: 78, color: 'primary' },
  { id: 'wednesday', label: 'Wednesday', value: 52, color: 'accent' },
  { id: 'thursday', label: 'Thursday', value: 89, color: 'green' },
  { id: 'friday', label: 'Friday', value: 23, color: 'yellow' },
];

const userDemographics: UserDemographic[] = [
  { id: 'male', label: 'Male', icon: User, percentage: 43, color: 'primary' },
  { id: 'female', label: 'Female', icon: User, percentage: 37, color: 'pink' },
];

const trafficSources: SourceStat[] = [
  { id: 'organic', icon: SearchCheck, label: 'Organic Search', value: '191,235', trend: 'up', trendValue: '5%' },
  { id: 'direct', icon: Globe, label: 'Direct', value: '120,543', trend: 'down', trendValue: '2%' },
  { id: 'referral', icon: Users, label: 'Referral', value: '88,002', trend: 'neutral' },
];

const colorMap = {
  primary: 'bg-primary',
  accent: 'bg-accent',
  destructive: 'bg-destructive',
  green: 'bg-green-500',
  yellow: 'bg-yellow-500',
  pink: 'bg-pink-500'
};

const TrafficSalesDetails: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Traffic & Sales</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-6 text-center md:text-left">
          {mainStats.map((stat) => (
            <div key={stat.label}>
              <div className={cn("text-xs text-muted-foreground uppercase tracking-wider", stat.color && stat.color.startsWith('text-') ? '' : 'text-muted-foreground')}>{stat.label}</div>
              <div className={cn("text-2xl font-bold", stat.color)}>{stat.value}</div>
              {/* Horizontal line for visual separation, mimicking image */}
              <hr className={cn("mt-1 w-1/2 mx-auto md:mx-0 h-0.5", stat.color && stat.color.startsWith('text-') ? stat.color.replace('text-','bg-') : 'bg-muted')} />
            </div>
          ))}
        </div>

        {/* Daily Activity & User Demographics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            {dailyActivity.map((item) => (
              <div key={item.id}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className="text-sm font-medium">{item.value}%</span>
                </div>
                <Progress value={item.value} className={cn("h-2", colorMap[item.color])} indicatorClassName={cn(colorMap[item.color])} />
              </div>
            ))}
          </div>

          <div className="space-y-4">
            {userDemographics.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="flex items-center text-sm text-muted-foreground">
                      <Icon className="w-4 h-4 mr-2" /> {item.label}
                    </span>
                    <span className="text-sm font-medium">{item.percentage}%</span>
                  </div>
                  <Progress value={item.percentage} className={cn("h-2", colorMap[item.color])} indicatorClassName={cn(colorMap[item.color])} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Traffic Sources Table-like section */}
        <div>
          <div className="mb-2 text-sm font-medium text-foreground">Traffic Sources</div>
          <div className="divide-y divide-border">
            {trafficSources.map((source) => {
              const Icon = source.icon;
              const TrendIcon = source.trend === 'up' ? TrendingUp : source.trend === 'down' ? TrendingDown : null;
              return (
                <div key={source.id} className="flex items-center justify-between py-3">
                  <div className="flex items-center">
                    <Icon className="w-5 h-5 mr-3 text-muted-foreground" />
                    <span className="text-sm text-foreground">{source.label}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium mr-2">{source.value}</span>
                    {TrendIcon && source.trendValue && (
                      <span className={cn(
                        "text-xs flex items-center",
                        source.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      )}>
                        <TrendIcon className="w-3.5 h-3.5 mr-0.5" /> {source.trendValue}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrafficSalesDetails;
