import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FinancialSettingsTab = () => {
  const [platformFee, setPlatformFee] = useState('15');
  const [payoutSchedule, setPayoutSchedule] = useState('weekly');
  const [minimumPayout, setMinimumPayout] = useState('5000');

  const payoutScheduleOptions = [
    { value: 'daily', label: '毎日' },
    { value: 'weekly', label: '毎週' },
    { value: 'biweekly', label: '隔週' },
    { value: 'monthly', label: '毎月' }
  ];

  const recentTransactions = [
    {
      id: 'TXN-001',
      type: 'booking_payment',
      amount: 12000,
      fee: 1800,
      instructor: '田中 花子',
      nursery: 'さくら保育園',
      date: '2025-10-11',
      status: 'completed'
    },
    {
      id: 'TXN-002',
      type: 'payout',
      amount: 85000,
      fee: 0,
      instructor: '山田 太郎',
      nursery: null,
      date: '2025-10-10',
      status: 'processing'
    },
    {
      id: 'TXN-003',
      type: 'refund',
      amount: 8000,
      fee: -1200,
      instructor: '佐藤 美咲',
      nursery: 'ひまわり保育園',
      date: '2025-10-09',
      status: 'completed'
    }
  ];

  const getTransactionIcon = (type) => {
    const icons = {
      booking_payment: 'CreditCard',
      payout: 'ArrowUpRight',
      refund: 'ArrowDownLeft'
    };
    return icons?.[type] || 'DollarSign';
  };

  const getTransactionLabel = (type) => {
    const labels = {
      booking_payment: '予約支払い',
      payout: '支払い処理',
      refund: '返金処理'
    };
    return labels?.[type] || type;
  };

  const getStatusBadge = (status) => {
    const styles = {
      completed: 'bg-success/10 text-success border-success/20',
      processing: 'bg-warning/10 text-warning border-warning/20',
      failed: 'bg-error/10 text-error border-error/20'
    };
    const labels = {
      completed: '完了',
      processing: '処理中',
      failed: '失敗'
    };
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${styles?.[status]}`}>
        {labels?.[status]}
      </span>
    );
  };

  const formatCurrency = (amount) => {
    return `¥${amount?.toLocaleString()}`;
  };

  return (
    <div className="space-y-8">
      {/* Platform Fee Settings */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">プラットフォーム手数料設定</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Input
              label="プラットフォーム手数料 (%)"
              type="number"
              value={platformFee}
              onChange={(e) => setPlatformFee(e?.target?.value)}
              description="各予約から徴収する手数料の割合"
              min="0"
              max="50"
            />
          </div>
          
          <div>
            <Input
              label="最小支払い金額 (¥)"
              type="number"
              value={minimumPayout}
              onChange={(e) => setMinimumPayout(e?.target?.value)}
              description="支払い処理を行う最小金額"
              min="1000"
            />
          </div>
        </div>

        <div className="mt-6">
          <Select
            label="支払いスケジュール"
            options={payoutScheduleOptions}
            value={payoutSchedule}
            onChange={setPayoutSchedule}
            description="講師への支払い頻度を設定"
          />
        </div>

        <div className="flex justify-end mt-6">
          <Button variant="default">
            <Icon name="Save" size={16} strokeWidth={2} />
            設定を保存
          </Button>
        </div>
      </div>
      {/* Revenue Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Icon name="TrendingUp" size={24} strokeWidth={2} className="text-primary" />
          </div>
          <div className="text-2xl font-bold text-text-primary mb-1">¥2,450,000</div>
          <div className="text-sm text-text-secondary">今月の総売上</div>
        </div>
        
        <div className="bg-card border border-border rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Icon name="DollarSign" size={24} strokeWidth={2} className="text-success" />
          </div>
          <div className="text-2xl font-bold text-text-primary mb-1">¥367,500</div>
          <div className="text-sm text-text-secondary">プラットフォーム収益</div>
        </div>
        
        <div className="bg-card border border-border rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-warning/10 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Icon name="Clock" size={24} strokeWidth={2} className="text-warning" />
          </div>
          <div className="text-2xl font-bold text-text-primary mb-1">¥125,000</div>
          <div className="text-sm text-text-secondary">保留中の支払い</div>
        </div>
        
        <div className="bg-card border border-border rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Icon name="RefreshCw" size={24} strokeWidth={2} className="text-secondary" />
          </div>
          <div className="text-2xl font-bold text-text-primary mb-1">¥18,500</div>
          <div className="text-sm text-text-secondary">今月の返金</div>
        </div>
      </div>
      {/* Recent Transactions */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-text-primary">最近の取引</h3>
            <Button variant="outline" size="sm">
              <Icon name="Download" size={16} strokeWidth={2} />
              エクスポート
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-text-secondary">取引ID</th>
                <th className="text-left p-4 text-sm font-medium text-text-secondary">種類</th>
                <th className="text-left p-4 text-sm font-medium text-text-secondary">金額</th>
                <th className="text-left p-4 text-sm font-medium text-text-secondary">手数料</th>
                <th className="text-left p-4 text-sm font-medium text-text-secondary">関係者</th>
                <th className="text-left p-4 text-sm font-medium text-text-secondary">日付</th>
                <th className="text-left p-4 text-sm font-medium text-text-secondary">ステータス</th>
                <th className="text-left p-4 text-sm font-medium text-text-secondary">アクション</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions?.map((transaction) => (
                <tr key={transaction?.id} className="border-b border-border hover:bg-muted/50 transition-smooth">
                  <td className="p-4">
                    <span className="font-mono text-sm text-text-primary">{transaction?.id}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Icon name={getTransactionIcon(transaction?.type)} size={16} strokeWidth={2} />
                      <span className="text-sm text-text-primary">{getTransactionLabel(transaction?.type)}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="font-medium text-text-primary">{formatCurrency(transaction?.amount)}</span>
                  </td>
                  <td className="p-4">
                    <span className={`text-sm ${transaction?.fee > 0 ? 'text-success' : transaction?.fee < 0 ? 'text-error' : 'text-text-secondary'}`}>
                      {transaction?.fee !== 0 ? formatCurrency(Math.abs(transaction?.fee)) : '-'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="text-sm">
                      <div className="text-text-primary">{transaction?.instructor}</div>
                      {transaction?.nursery && (
                        <div className="text-text-secondary">{transaction?.nursery}</div>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-text-secondary">{transaction?.date}</span>
                  </td>
                  <td className="p-4">
                    {getStatusBadge(transaction?.status)}
                  </td>
                  <td className="p-4">
                    <Button variant="ghost" size="sm">
                      <Icon name="Eye" size={16} strokeWidth={2} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FinancialSettingsTab;