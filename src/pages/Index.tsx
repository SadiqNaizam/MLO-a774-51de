import React from 'react';
import MainAppLayout from '@/components/layout/MainAppLayout';
import StatsCardGrid from '@/components/Dashboard/StatsCardGrid';
import TrafficChart from '@/components/Dashboard/TrafficChart';
import SocialStatsGrid from '@/components/Dashboard/SocialStatsGrid';
import TrafficSalesDetails from '@/components/Dashboard/TrafficSalesDetails';

/**
 * DashboardPage Component
 *
 * This component serves as the main overview page for the admin dashboard.
 * It utilizes the MainAppLayout to provide the consistent sidebar and header structure.
 * The content area is populated with various dashboard widgets:
 * - StatsCardGrid: Displays key performance indicators in a card format.
 * - TrafficChart: Shows website traffic trends over different periods.
 * - SocialStatsGrid: Presents social media engagement metrics.
 * - TrafficSalesDetails: Offers a more detailed breakdown of traffic sources and sales data.
 *
 * All data for these widgets is self-contained within their respective components as per requirements.
 */
const DashboardPage: React.FC = () => {
  return (
    <MainAppLayout>
      {/* 
        The MainAppLayout already includes a container div with `flex flex-col gap-6` 
        for its children, which aligns with the 'mainContent.container' requirement.
        The components below will be stacked vertically with a gap.
      */}
      <StatsCardGrid />
      <TrafficChart />
      <SocialStatsGrid />
      <TrafficSalesDetails />
    </MainAppLayout>
  );
};

export default DashboardPage;
