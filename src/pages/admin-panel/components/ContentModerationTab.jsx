import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ContentModerationTab = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const flaggedContent = [
    {
      id: 1,
      type: 'profile',
      title: '不適切なプロフィール画像',
      reporter: '匿名ユーザー',
      reportedUser: '田中 太郎',
      reportedDate: '2025-10-10',
      status: 'pending',
      priority: 'high',
      description: 'プロフィール画像に不適切な内容が含まれています。',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 2,
      type: 'review',
      title: '攻撃的なレビュー内容',
      reporter: '山田 花子',
      reportedUser: '佐藤 次郎',
      reportedDate: '2025-10-09',
      status: 'reviewing',
      priority: 'medium',
      description: 'レビューに攻撃的な言葉が使用されています。',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 3,
      type: 'lesson',
      title: 'レッスン内容の虚偽記載',
      reporter: 'システム自動検出',
      reportedUser: '鈴木 美咲',
      reportedDate: '2025-10-08',
      status: 'resolved',
      priority: 'low',
      description: 'レッスン内容に実際と異なる記載があります。',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'すべて' },
    { value: 'pending', label: '承認待ち' },
    { value: 'reviewing', label: '審査中' },
    { value: 'resolved', label: '解決済み' }
  ];

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-warning/10 text-warning border-warning/20',
      reviewing: 'bg-secondary/10 text-secondary border-secondary/20',
      resolved: 'bg-success/10 text-success border-success/20'
    };
    const labels = {
      pending: '承認待ち',
      reviewing: '審査中',
      resolved: '解決済み'
    };
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${styles?.[status]}`}>
        {labels?.[status]}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const styles = {
      high: 'bg-error/10 text-error border-error/20',
      medium: 'bg-warning/10 text-warning border-warning/20',
      low: 'bg-success/10 text-success border-success/20'
    };
    const labels = {
      high: '高',
      medium: '中',
      low: '低'
    };
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${styles?.[priority]}`}>
        {labels?.[priority]}
      </span>
    );
  };

  const getTypeIcon = (type) => {
    const icons = {
      profile: 'User',
      review: 'Star',
      lesson: 'BookOpen'
    };
    return icons?.[type] || 'Flag';
  };

  const filteredContent = flaggedContent?.filter(item => 
    selectedFilter === 'all' || item?.status === selectedFilter
  );

  return (
    <div className="space-y-6">
      {/* Header and Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">コンテンツモデレーション</h3>
          <p className="text-sm text-text-secondary">報告されたコンテンツの審査と管理</p>
        </div>
        <div className="w-full sm:w-48">
          <Select
            options={filterOptions}
            value={selectedFilter}
            onChange={setSelectedFilter}
            placeholder="ステータスで絞り込み"
          />
        </div>
      </div>
      {/* Content Cards */}
      <div className="space-y-4">
        {filteredContent?.map((item) => (
          <div key={item?.id} className="bg-card border border-border rounded-2xl p-6 hover:shadow-medium transition-smooth">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-error/10 rounded-xl flex items-center justify-center">
                  <Icon name={getTypeIcon(item?.type)} size={20} strokeWidth={2} className="text-error" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-text-primary mb-1">{item?.title}</h4>
                  <p className="text-sm text-text-secondary mb-2">{item?.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-text-secondary">
                    <span>報告者: {item?.reporter}</span>
                    <span>対象: {item?.reportedUser}</span>
                    <span>報告日: {item?.reportedDate}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getPriorityBadge(item?.priority)}
                {getStatusBadge(item?.status)}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Image
                  src={item?.avatar}
                  alt={item?.reportedUser}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-sm font-medium text-text-primary">{item?.reportedUser}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Icon name="Eye" size={16} strokeWidth={2} />
                  詳細
                </Button>
                {item?.status === 'pending' && (
                  <>
                    <Button variant="success" size="sm">
                      <Icon name="Check" size={16} strokeWidth={2} />
                      承認
                    </Button>
                    <Button variant="destructive" size="sm">
                      <Icon name="X" size={16} strokeWidth={2} />
                      拒否
                    </Button>
                  </>
                )}
                {item?.status === 'reviewing' && (
                  <Button variant="outline" size="sm">
                    <Icon name="MessageCircle" size={16} strokeWidth={2} />
                    コメント
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-warning mb-1">12</div>
          <div className="text-sm text-text-secondary">承認待ち</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-secondary mb-1">8</div>
          <div className="text-sm text-text-secondary">審査中</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-success mb-1">45</div>
          <div className="text-sm text-text-secondary">今月解決</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-text-primary mb-1">2.3</div>
          <div className="text-sm text-text-secondary">平均処理日数</div>
        </div>
      </div>
    </div>
  );
};

export default ContentModerationTab;