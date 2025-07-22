import React from 'react';
import { TrendingUp, Users, Calendar, DollarSign, BarChart3, Activity } from 'lucide-react';
import mockData from '../../data/mockData.json';

const Overview: React.FC = () => {
  const { dashboardData } = mockData;

  const kpiCards = [
    {
      title: 'Total Revenue',
      value: dashboardData.kpis.totalRevenue,
      icon: DollarSign,
      change: '+12.5%',
      trend: 'up'
    },
    {
      title: 'Active Users',
      value: dashboardData.kpis.activeUsers.toLocaleString(),
      icon: Users,
      change: '+8.2%',
      trend: 'up'
    },
    {
      title: 'Completion Rate',
      value: dashboardData.kpis.completionRate,
      icon: TrendingUp,
      change: '+3.1%',
      trend: 'up'
    },
    {
      title: 'Satisfaction',
      value: `${dashboardData.kpis.satisfaction}/5.0`,
      icon: Activity,
      change: '+0.3',
      trend: 'up'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          A brief overview of recent sales, key indicators, trends and analytics
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
                </div>
                <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-amber-600" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <span className="text-sm text-emerald-600 font-medium">{card.change}</span>
                <span className="text-sm text-gray-500 ml-2">vs last quarter</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Program Flow */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Program Flow</h3>
            <div className="flex items-center space-x-4">
              <button className="text-sm text-gray-500 hover:text-gray-700">Filter</button>
              <button className="text-sm text-gray-500 hover:text-gray-700">Customize</button>
            </div>
          </div>
          
          {/* Mock Chart */}
          <div className="bg-gray-900 rounded-lg p-6 h-64 flex items-center justify-center relative">
            <div className="text-white text-center">
              <BarChart3 className="w-16 h-16 mx-auto mb-4 text-amber-400" />
              <p className="text-lg font-semibold">Program Flow Analytics</p>
              <p className="text-sm text-gray-300 mt-2">
                {dashboardData.programFlow.totalSessions} Total Sessions
              </p>
            </div>
            
            {/* Mock data overlay */}
            <div className="absolute top-4 left-4 bg-gray-800 rounded-lg px-3 py-2">
              <div className="flex items-center space-x-2 text-white text-sm">
                <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                <span>Completed: {dashboardData.programFlow.completedSessions}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sales Overview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Session Overview</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Completed</span>
              <span className="text-sm font-semibold text-gray-900">
                {dashboardData.programFlow.completedSessions}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '65%' }}></div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Upcoming</span>
              <span className="text-sm font-semibold text-gray-900">
                {dashboardData.programFlow.upcomingSessions}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-amber-500 h-2 rounded-full" style={{ width: '25%' }}></div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Cancelled</span>
              <span className="text-sm font-semibold text-gray-900">
                {dashboardData.programFlow.cancelledSessions}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-red-500 h-2 rounded-full" style={{ width: '10%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
              <Calendar className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">New session scheduled</p>
              <p className="text-sm text-gray-500">Strategic Growth Planning with Sarah Chen</p>
            </div>
            <span className="text-sm text-gray-500">2h ago</span>
          </div>
          
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">New connection added</p>
              <p className="text-sm text-gray-500">Emma Watson joined your network</p>
            </div>
            <span className="text-sm text-gray-500">1d ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;