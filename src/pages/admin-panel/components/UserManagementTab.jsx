import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const UserManagementTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState([]);

  const users = [
    {
      id: 1,
      name: "田中 花子",
      email: "tanaka@example.com",
      role: "instructor",
      status: "active",
      verified: true,
      joinDate: "2025-09-15",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "山田 太郎",
      email: "yamada@company.com",
      role: "company",
      status: "pending",
      verified: false,
      joinDate: "2025-10-01",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "佐藤 美咲",
      email: "sato@nursery.com",
      role: "nursery",
      status: "active",
      verified: true,
      joinDate: "2025-08-20",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const roleOptions = [
    { value: 'all', label: 'すべての役割' },
    { value: 'instructor', label: '講師' },
    { value: 'company', label: '企業' },
    { value: 'nursery', label: '保育園' }
  ];

  const statusOptions = [
    { value: 'active', label: 'アクティブ' },
    { value: 'pending', label: '承認待ち' },
    { value: 'suspended', label: '停止中' }
  ];

  const getRoleLabel = (role) => {
    const labels = {
      instructor: '講師',
      company: '企業',
      nursery: '保育園'
    };
    return labels?.[role] || role;
  };

  const getStatusBadge = (status) => {
    const styles = {
      active: 'bg-success/10 text-success border-success/20',
      pending: 'bg-warning/10 text-warning border-warning/20',
      suspended: 'bg-error/10 text-error border-error/20'
    };
    const labels = {
      active: 'アクティブ',
      pending: '承認待ち',
      suspended: '停止中'
    };
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${styles?.[status]}`}>
        {labels?.[status]}
      </span>
    );
  };

  const handleUserSelect = (userId) => {
    setSelectedUsers(prev => 
      prev?.includes(userId) 
        ? prev?.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    setSelectedUsers(selectedUsers?.length === users?.length ? [] : users?.map(u => u?.id));
  };

  const filteredUsers = users?.filter(user => {
    const matchesSearch = user?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         user?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesRole = selectedRole === 'all' || user?.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="ユーザー名またはメールで検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
          />
        </div>
        <div className="w-full sm:w-48">
          <Select
            options={roleOptions}
            value={selectedRole}
            onChange={setSelectedRole}
            placeholder="役割で絞り込み"
          />
        </div>
      </div>
      {/* Bulk Actions */}
      {selectedUsers?.length > 0 && (
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-text-primary">
              {selectedUsers?.length} 人のユーザーが選択されています
            </span>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                一括承認
              </Button>
              <Button variant="outline" size="sm">
                一括停止
              </Button>
              <Button variant="outline" size="sm">
                メール送信
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Users Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="text-left p-4">
                  <input
                    type="checkbox"
                    checked={selectedUsers?.length === users?.length}
                    onChange={handleSelectAll}
                    className="rounded border-border"
                  />
                </th>
                <th className="text-left p-4 text-sm font-medium text-text-secondary">ユーザー</th>
                <th className="text-left p-4 text-sm font-medium text-text-secondary">役割</th>
                <th className="text-left p-4 text-sm font-medium text-text-secondary">ステータス</th>
                <th className="text-left p-4 text-sm font-medium text-text-secondary">認証</th>
                <th className="text-left p-4 text-sm font-medium text-text-secondary">登録日</th>
                <th className="text-left p-4 text-sm font-medium text-text-secondary">アクション</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers?.map((user) => (
                <tr key={user?.id} className="border-b border-border hover:bg-muted/50 transition-smooth">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers?.includes(user?.id)}
                      onChange={() => handleUserSelect(user?.id)}
                      className="rounded border-border"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={user?.avatar}
                        alt={user?.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-medium text-text-primary">{user?.name}</div>
                        <div className="text-sm text-text-secondary">{user?.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-text-primary">{getRoleLabel(user?.role)}</span>
                  </td>
                  <td className="p-4">
                    {getStatusBadge(user?.status)}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center">
                      {user?.verified ? (
                        <Icon name="CheckCircle" size={16} className="text-success" strokeWidth={2} />
                      ) : (
                        <Icon name="XCircle" size={16} className="text-error" strokeWidth={2} />
                      )}
                      <span className="ml-2 text-sm text-text-secondary">
                        {user?.verified ? '認証済み' : '未認証'}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-text-secondary">{user?.joinDate}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Icon name="Eye" size={16} strokeWidth={2} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Icon name="Edit" size={16} strokeWidth={2} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Icon name="MoreHorizontal" size={16} strokeWidth={2} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-text-secondary">
          {filteredUsers?.length} 人中 1-{Math.min(10, filteredUsers?.length)} 人を表示
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

export default UserManagementTab;