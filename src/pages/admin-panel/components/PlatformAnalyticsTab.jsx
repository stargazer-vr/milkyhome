import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const PlatformAnalyticsTab = () => {
  const [timeRange, setTimeRange] = useState('30days');

  const timeRangeOptions = [
    { value: '7days', label: '過去7日間' },
    { value: '30days', label: '過去30日間' },
    { value: '90days', label: '過去90日間' },
    { value: '1year', label: '過去1年間' }
  ];

  const userGrowthData = [
    { month: '4月', instructors: 45, companies: 12, nurseries: 28 },
    { month: '5月', instructors: 52, companies: 15, nurseries: 34 },
    { month: '6月', instructors: 68, companies: 18, nurseries: 41 },
    { month: '7月', instructors: 75, companies: 22, nurseries: 48 },
    { month: '8月', instructors: 89, companies: 25, nurseries: 55 },
    { month: '9月', instructors: 102, companies: 28, nurseries: 62 },
    { month: '10月', instructors: 118, companies: 32, nurseries: 71 }
  ];

  const revenueData = [
    { month: '4月', revenue: 1250000, bookings: 156 },
    { month: '5月', revenue: 1480000, bookings: 189 },
    { month: '6月', revenue: 1720000, bookings: 234 },
    { month: '7月', revenue: 1950000, bookings: 267 },
    { month: '8月', revenue: 2180000, bookings: 298 },
    { month: '9月', revenue: 2350000, bookings: 325 },
    { month: '10月', revenue: 2450000, bookings: 342 }
  ];

  const categoryData = [
    { name: '音楽', value: 35, color: '#FFA07A' },
    { name: '体育', value: 28, color: '#8FD3FE' },
    { name: '美術', value: 22, color: '#A7E8BD' },
    { name: '英語', value: 15, color: '#D7B3FF' }
  ];

  const engagementMetrics = [
    {
      title: 'アクティブユーザー',
      value: '1,247',
      change: '+12.5%',
      changeType: 'increase',
      icon: 'Users'
    },
    {
      title: '平均セッション時間',
      value: '24分',
      change: '+8.2%',
      changeType: 'increase',
      icon: 'Clock'
    },
    {
      title: 'コンバージョン率',
      value: '3.8%',
      change: '+0.5%',
      changeType: 'increase',
      icon: 'TrendingUp'
    },
    {
      title: 'リピート率',
      value: '67%',
      change: '-2.1%',
      changeType: 'decrease',
      icon: 'RefreshCw'
    }
  ];

  const topInstructors = [
    { name: '田中 花子', bookings: 45, revenue: 540000, rating: 4.9 },
    { name: '山田 太郎', bookings: 38, revenue: 456000, rating: 4.8 },
    { name: '佐藤 美咲', bookings: 32, revenue: 384000, rating: 4.7 },
    { name: '鈴木 健一', bookings: 28, revenue: 336000, rating: 4.6 },
    { name: '高橋 由美', bookings: 25, revenue: 300000, rating: 4.5 }
  ];

  return (
    <div className="space-y-8">
      {/* Header with Time Range Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">プラットフォーム分析</h3>
          <p className="text-sm text-text-secondary">ユーザー行動と収益の詳細分析</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select
            options={timeRangeOptions}
            value={timeRange}
            onChange={setTimeRange}
            className="w-40"
          />
          <Button variant="outline" size="sm">
            <Icon name="Download" size={16} strokeWidth={2} />
            レポート出力
          </Button>
        </div>
      </div>
      {/* Engagement Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {engagementMetrics?.map((metric, index) => (
          <div key={index} className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Icon name={metric?.icon} size={24} strokeWidth={2} className="text-primary" />
              </div>
              <div className={`flex items-center space-x-1 ${
                metric?.changeType === 'increase' ? 'text-success' : 'text-error'
              }`}>
                <Icon 
                  name={metric?.changeType === 'increase' ? 'TrendingUp' : 'TrendingDown'} 
                  size={16} 
                  strokeWidth={2} 
                />
                <span className="text-sm font-medium">{metric?.change}</span>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-text-primary mb-1">{metric?.value}</h3>
              <p className="text-sm text-text-secondary">{metric?.title}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Growth Chart */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h4 className="text-lg font-semibold text-text-primary mb-4">ユーザー成長推移</h4>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="instructors" fill="#FFA07A" name="講師" />
                <Bar dataKey="companies" fill="#8FD3FE" name="企業" />
                <Bar dataKey="nurseries" fill="#A7E8BD" name="保育園" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h4 className="text-lg font-semibold text-text-primary mb-4">収益推移</h4>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px'
                  }}
                  formatter={(value, name) => [
                    name === 'revenue' ? `¥${value?.toLocaleString()}` : value,
                    name === 'revenue' ? '収益' : '予約数'
                  ]}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#FFA07A" 
                  strokeWidth={3}
                  dot={{ fill: '#FFA07A', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Category Distribution and Top Instructors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Category Distribution */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h4 className="text-lg font-semibold text-text-primary mb-4">カテゴリー別分布</h4>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name} ${value}%`}
                >
                  {categoryData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Instructors */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h4 className="text-lg font-semibold text-text-primary mb-4">トップ講師ランキング</h4>
          <div className="space-y-4">
            {topInstructors?.map((instructor, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">{index + 1}</span>
                  </div>
                  <div>
                    <div className="font-medium text-text-primary">{instructor?.name}</div>
                    <div className="text-sm text-text-secondary">
                      {instructor?.bookings}件の予約 • ¥{instructor?.revenue?.toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={16} strokeWidth={2} className="text-warning fill-current" />
                  <span className="text-sm font-medium text-text-primary">{instructor?.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Export Options */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h4 className="text-lg font-semibold text-text-primary mb-4">データエクスポート</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" fullWidth>
            <Icon name="FileText" size={16} strokeWidth={2} />
            ユーザーレポート (CSV)
          </Button>
          <Button variant="outline" fullWidth>
            <Icon name="BarChart3" size={16} strokeWidth={2} />
            収益レポート (PDF)
          </Button>
          <Button variant="outline" fullWidth>
            <Icon name="Activity" size={16} strokeWidth={2} />
            分析レポート (Excel)
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlatformAnalyticsTab;