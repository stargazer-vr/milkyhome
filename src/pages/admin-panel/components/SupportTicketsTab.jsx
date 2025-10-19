import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const SupportTicketsTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const tickets = [
    {
      id: 'TKT-001',
      title: 'ログインできない問題',
      description: 'パスワードリセット後もログインができません。',
      user: {
        name: '田中 花子',
        email: 'tanaka@example.com',
        role: 'instructor',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
      },
      priority: 'high',
      status: 'open',
      category: 'technical',
      createdDate: '2025-10-11',
      lastUpdate: '2025-10-11',
      assignedTo: '管理者A'
    },
    {
      id: 'TKT-002',
      title: '支払いが反映されない',
      description: '昨日の予約の支払いがアカウントに反映されていません。',
      user: {
        name: '山田 太郎',
        email: 'yamada@company.com',
        role: 'company',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      },
      priority: 'medium',
      status: 'in_progress',
      category: 'billing',
      createdDate: '2025-10-10',
      lastUpdate: '2025-10-11',
      assignedTo: '管理者B'
    },
    {
      id: 'TKT-003',
      title: 'プロフィール更新の問題',
      description: 'プロフィール画像をアップロードできません。',
      user: {
        name: '佐藤 美咲',
        email: 'sato@nursery.com',
        role: 'nursery',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
      },
      priority: 'low',
      status: 'resolved',
      category: 'account',
      createdDate: '2025-10-08',
      lastUpdate: '2025-10-09',
      assignedTo: '管理者C'
    }
  ];

  const priorityOptions = [
    { value: 'all', label: 'すべての優先度' },
    { value: 'high', label: '高' },
    { value: 'medium', label: '中' },
    { value: 'low', label: '低' }
  ];

  const statusOptions = [
    { value: 'all', label: 'すべてのステータス' },
    { value: 'open', label: '未対応' },
    { value: 'in_progress', label: '対応中' },
    { value: 'resolved', label: '解決済み' },
    { value: 'closed', label: 'クローズ' }
  ];

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

  const getStatusBadge = (status) => {
    const styles = {
      open: 'bg-error/10 text-error border-error/20',
      in_progress: 'bg-warning/10 text-warning border-warning/20',
      resolved: 'bg-success/10 text-success border-success/20',
      closed: 'bg-muted text-text-secondary border-border'
    };
    const labels = {
      open: '未対応',
      in_progress: '対応中',
      resolved: '解決済み',
      closed: 'クローズ'
    };
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${styles?.[status]}`}>
        {labels?.[status]}
      </span>
    );
  };

  const getCategoryIcon = (category) => {
    const icons = {
      technical: 'Settings',
      billing: 'CreditCard',
      account: 'User',
      general: 'MessageCircle'
    };
    return icons?.[category] || 'HelpCircle';
  };

  const getRoleLabel = (role) => {
    const labels = {
      instructor: '講師',
      company: '企業',
      nursery: '保育園'
    };
    return labels?.[role] || role;
  };

  const filteredTickets = tickets?.filter(ticket => {
    const matchesSearch = ticket?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         ticket?.user?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         ticket?.id?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesPriority = selectedPriority === 'all' || ticket?.priority === selectedPriority;
    const matchesStatus = selectedStatus === 'all' || ticket?.status === selectedStatus;
    return matchesSearch && matchesPriority && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="チケット番号、タイトル、ユーザー名で検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Select
            options={priorityOptions}
            value={selectedPriority}
            onChange={setSelectedPriority}
            className="w-full sm:w-48"
          />
          <Select
            options={statusOptions}
            value={selectedStatus}
            onChange={setSelectedStatus}
            className="w-full sm:w-48"
          />
        </div>
      </div>
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-error mb-1">8</div>
          <div className="text-sm text-text-secondary">未対応</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-warning mb-1">12</div>
          <div className="text-sm text-text-secondary">対応中</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-success mb-1">45</div>
          <div className="text-sm text-text-secondary">今月解決</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-text-primary mb-1">2.5</div>
          <div className="text-sm text-text-secondary">平均対応時間(h)</div>
        </div>
      </div>
      {/* Tickets List */}
      <div className="space-y-4">
        {filteredTickets?.map((ticket) => (
          <div key={ticket?.id} className="bg-card border border-border rounded-2xl p-6 hover:shadow-medium transition-smooth">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Icon name={getCategoryIcon(ticket?.category)} size={20} strokeWidth={2} className="text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-semibold text-text-primary">{ticket?.title}</h4>
                    <span className="text-sm text-text-secondary font-mono">{ticket?.id}</span>
                  </div>
                  <p className="text-sm text-text-secondary mb-3">{ticket?.description}</p>
                  
                  <div className="flex items-center space-x-4 text-xs text-text-secondary">
                    <span>作成日: {ticket?.createdDate}</span>
                    <span>最終更新: {ticket?.lastUpdate}</span>
                    <span>担当者: {ticket?.assignedTo}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {getPriorityBadge(ticket?.priority)}
                {getStatusBadge(ticket?.status)}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Image
                  src={ticket?.user?.avatar}
                  alt={ticket?.user?.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <div className="text-sm font-medium text-text-primary">{ticket?.user?.name}</div>
                  <div className="text-xs text-text-secondary">
                    {getRoleLabel(ticket?.user?.role)} • {ticket?.user?.email}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Icon name="MessageCircle" size={16} strokeWidth={2} />
                  返信
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="Eye" size={16} strokeWidth={2} />
                  詳細
                </Button>
                {ticket?.status === 'open' && (
                  <Button variant="default" size="sm">
                    <Icon name="Play" size={16} strokeWidth={2} />
                    対応開始
                  </Button>
                )}
                {ticket?.status === 'in_progress' && (
                  <Button variant="success" size="sm">
                    <Icon name="Check" size={16} strokeWidth={2} />
                    解決
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-text-secondary">
          {filteredTickets?.length} 件中 1-{Math.min(10, filteredTickets?.length)} 件を表示
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            <Icon name="ChevronLeft" size={16} strokeWidth={2} />
            前へ
          </Button>
          <Button variant="outline" size="sm">
            次へ
            <Icon name="ChevronRight" size={16} strokeWidth={2} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SupportTicketsTab;