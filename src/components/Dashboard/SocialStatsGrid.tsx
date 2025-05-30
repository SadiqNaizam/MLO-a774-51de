import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

interface SocialStat {
  id: string;
  platformName: string;
  icon: React.ElementType;
  bgColor: string;
  textColor: string;
  metrics: {
    value: string;
    label: string;
  }[];
  chartLineData?: number[]; // Optional: for small line in background
}

const socialStatsData: SocialStat[] = [
  {
    id: 'facebook',
    platformName: 'Facebook',
    icon: Facebook,
    bgColor: 'bg-blue-600',
    textColor: 'text-white',
    metrics: [
      { value: '89k', label: 'FRIENDS' },
      { value: '459', label: 'FEEDS' },
    ],
    chartLineData: [30, 50, 40, 60, 50, 70, 60],
  },
  {
    id: 'twitter',
    platformName: 'Twitter',
    icon: Twitter,
    bgColor: 'bg-sky-500',
    textColor: 'text-white',
    metrics: [
      { value: '973k', label: 'FOLLOWERS' },
      { value: '1.792', label: 'TWEETS' },
    ],
    chartLineData: [60, 40, 55, 35, 65, 45, 70],
  },
  {
    id: 'linkedin',
    platformName: 'LinkedIn',
    icon: Linkedin,
    bgColor: 'bg-blue-800', // LinkedIn Blue
    textColor: 'text-white',
    metrics: [
      { value: '500+', label: 'CONTACTS' },
      { value: '292', label: 'FEEDS' },
    ],
    chartLineData: [20, 45, 30, 50, 40, 60, 55],
  },
  {
    id: 'instagram',
    platformName: 'Instagram',
    icon: Instagram,
    // Instagram gradient: from-yellow-400 via-pink-500 to-purple-600
    bgColor: 'bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600',
    textColor: 'text-white',
    metrics: [
      { value: '894', label: 'FOLLOWERS' },
      { value: '92', label: 'POSTS' }, // Changed from CIRCLES for G+
    ],
    chartLineData: [50, 30, 60, 40, 70, 50, 65],
  },
];

const SocialStatsGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {socialStatsData.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.id} className={cn('overflow-hidden', stat.bgColor, stat.textColor)}>
            <CardContent className="p-0 relative">
              {/* Background line chart - simplified */} 
              {stat.chartLineData && (
                <svg viewBox="0 0 100 40" className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none">
                  <polyline
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    points={
                      stat.chartLineData.map((val, i) => 
                        `${(i / (stat.chartLineData!.length -1)) * 100},${40 - (val/100 * 30)}`
                      ).join(' ')
                    }
                  />
                </svg>
              )}
              <div className="relative p-4">
                <div className="flex justify-center items-center mb-3">
                  <Icon className="h-12 w-12" />
                </div>
                <div className="grid grid-cols-2 divide-x divide-white/30">
                  {stat.metrics.map((metric, index) => (
                    <div key={index} className="text-center px-2 py-2">
                      <div className="text-xl font-bold">{metric.value}</div>
                      <div className="text-xs uppercase tracking-wider opacity-80">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default SocialStatsGrid;
