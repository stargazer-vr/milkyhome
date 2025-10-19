import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import MetricsCard from './components/MetricsCard';
import UserManagementTab from './components/UserManagementTab';
import ContentModerationTab from './components/ContentModerationTab';
import FinancialSettingsTab from './components/FinancialSettingsTab';
import PlatformAnalyticsTab from './components/PlatformAnalyticsTab';
import SupportTicketsTab from './components/SupportTicketsTab';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const platformMetrics = [
    {
      title: '総ユーザー数',
      value: '2,847',
      change: '+12.5%',
      changeType: 'increase',
      icon: 'Users',
      color: 'primary'
    },
    {
      title: 'アクティブ予約',
      value: '342',
      change: '+8.2%',
      changeType: 'increase',
      icon: 'Calendar',
      color: 'success'
    },
    {
      title: '今月の収益',
      value: '¥2,450,000',
      change: '+15.7%',
      changeType: 'increase',
      icon: 'DollarSign',
      color: 'warning'
    },
    {
      title: 'システム稼働率',
      value: '99.8%',
      change: '+0.1%',
      changeType: 'increase',
      icon: 'Activity',
      color: 'secondary'
    }
  ];

  const tabs = [
    { id: 'overview', label: '概要', icon: 'BarChart3' },
    { id: 'users', label: 'ユーザー管理', icon: 'Users' },
    { id: 'moderation', label: 'コンテンツ管理', icon: 'Shield' },
    { id: 'financial', label: '財務設定', icon: 'CreditCard' },
    { id: 'analytics', label: '分析', icon: 'TrendingUp' },
    { id: 'support', label: 'サポート', icon: 'HelpCircle' }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'user_registration',
      message: '新しい講師が登録されました',
      user: '田中 花子',
      timestamp: '5分前',
      icon: 'UserPlus'
    },
    {
      id: 2,
      type: 'booking_completed',
      message: '予約が完了しました',
      user: 'さくら保育園',
      timestamp: '15分前',
      icon: 'CheckCircle'
    },
    {
      id: 3,
      type: 'payment_processed',
      message: '支払いが処理されました',
      user: '山田 太郎',
      timestamp: '32分前',
      icon: 'CreditCard'
    },
    {
      id: 4,
      type: 'support_ticket',
      message: '新しいサポートチケットが作成されました',
      user: '佐藤 美咲',
      timestamp: '1時間前',
      icon: 'MessageCircle'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'users':
        return <UserManagementTab />;
      case 'moderation':
        return <ContentModerationTab />;
      case 'financial':
        return <FinancialSettingsTab />;
      case 'analytics':
        return <PlatformAnalyticsTab />;
      case 'support':
        return <SupportTicketsTab />;
      default:
        return (
          <div className="space-y-8">
            {/* Platform Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {platformMetrics?.map((metric, index) => (
                <MetricsCard
                  key={index}
                  title={metric?.title}
                  value={metric?.value}
                  change={metric?.change}
                  changeType={metric?.changeType}
                  icon={metric?.icon}
                  color={metric?.color}
                />
              ))}
            </div>
            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">クイックアクション</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button variant="outline" fullWidth className="h-20 flex-col space-y-2">
                  <Icon name="UserCheck" size={24} strokeWidth={2} />
                  <span>ユーザー承認</span>
                </Button>
                <Button variant="outline" fullWidth className="h-20 flex-col space-y-2">
                  <Icon name="Settings" size={24} strokeWidth={2} />
                  <span>設定変更</span>
                </Button>
                <Button variant="outline" fullWidth className="h-20 flex-col space-y-2">
                  <Icon name="FileText" size={24} strokeWidth={2} />
                  <span>レポート生成</span>
                </Button>
                <Button variant="outline" fullWidth className="h-20 flex-col space-y-2">
                  <Icon name="Mail" size={24} strokeWidth={2} />
                  <span>一括通知</span>
                </Button>
              </div>
            </div>
            {/* Recent Activities */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-text-primary">最近のアクティビティ</h3>
                <Button variant="ghost" size="sm">
                  <Icon name="RefreshCw" size={16} strokeWidth={2} />
                  更新
                </Button>
              </div>
              
              <div className="space-y-4">
                {recentActivities?.map((activity) => (
                  <div key={activity?.id} className="flex items-center space-x-4 p-3 bg-muted/50 rounded-lg">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon name={activity?.icon} size={16} strokeWidth={2} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-text-primary">{activity?.message}</p>
                      <p className="text-xs text-text-secondary">ユーザー: {activity?.user}</p>
                    </div>
                    <span className="text-xs text-text-secondary">{activity?.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* System Health */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">システム状態</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">API サーバー</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span className="text-sm text-success">正常</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">データベース</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span className="text-sm text-success">正常</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">決済システム</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-warning rounded-full"></div>
                      <span className="text-sm text-warning">注意</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">メール配信</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span className="text-sm text-success">正常</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">今日の統計</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">新規登録</span>
                    <span className="text-lg font-semibold text-text-primary">23</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">新規予約</span>
                    <span className="text-lg font-semibold text-text-primary">45</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">完了した予約</span>
                    <span className="text-lg font-semibold text-text-primary">38</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">サポートチケット</span>
                    <span className="text-lg font-semibold text-text-primary">7</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>管理パネル - Milkyhome</title>
        <meta name="description" content="プラットフォーム管理とシステム監視のための総合管理パネル" />
      </Helmet>
      {/* Header */}
      <header className="bg-card border-b border-border shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Shield" size={20} color="white" strokeWidth={2} />
              </div>
              <div>
                <h1 className="text-xl font-noto font-semibold text-text-primary">管理パネル</h1>
                <p className="text-sm text-text-secondary">プラットフォーム管理システム</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Icon name="Bell" size={16} strokeWidth={2} />
                通知
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="Settings" size={16} strokeWidth={2} />
                設定
              </Button>
            </div>
          </div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-border">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-smooth ${
                    activeTab === tab?.id
                      ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} strokeWidth={2} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="pb-16">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;