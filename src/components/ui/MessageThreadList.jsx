import React, { useState } from 'react';
import Icon from '../AppIcon';
import Image from '../AppImage';

const MessageThreadList = ({ 
  selectedThreadId = null, 
  onThreadSelect,
  threads = [
    {
      id: 1,
      participant: {
        name: '山田 花子',
        role: '保育園管理者',
        avatar: '/assets/images/avatar1.jpg',
        isOnline: true
      },
      lastMessage: {
        text: '来週の授業についてご相談があります。',
        timestamp: '2025-10-11T14:30:00',
        isRead: false,
        senderId: 2
      },
      unreadCount: 2,
      bookingId: 'BK-2025-001'
    },
    {
      id: 2,
      participant: {
        name: '佐藤 太郎',
        role: '企業担当者',
        avatar: '/assets/images/avatar2.jpg',
        isOnline: false
      },
      lastMessage: {
        text: 'ありがとうございました。',
        timestamp: '2025-10-11T10:15:00',
        isRead: true,
        senderId: 1
      },
      unreadCount: 0,
      bookingId: 'BK-2025-002'
    }
  ]
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return '今';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}時間前`;
    } else {
      return date?.toLocaleDateString('ja-JP', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const filteredThreads = threads?.filter(thread =>
    thread?.participant?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    thread?.lastMessage?.text?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  const handleThreadClick = (threadId) => {
    if (onThreadSelect) {
      onThreadSelect(threadId);
    }
  };

  return (
    <div className="flex flex-col h-full bg-card border-r border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-noto font-semibold text-text-primary">
            メッセージ
          </h2>
          <button className="p-2 hover:bg-muted rounded-lg transition-smooth">
            <Icon name="Plus" size={16} strokeWidth={2} />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Icon 
            name="Search" 
            size={16} 
            strokeWidth={2}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
          />
          <input
            type="text"
            placeholder="メッセージを検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-smooth"
          />
        </div>
      </div>
      {/* Thread List */}
      <div className="flex-1 overflow-y-auto">
        {filteredThreads?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <Icon name="MessageCircle" size={48} strokeWidth={1} className="text-text-secondary mb-4" />
            <div className="text-text-secondary">
              {searchQuery ? 'メッセージが見つかりません' : 'メッセージがありません'}
            </div>
          </div>
        ) : (
          <div className="space-y-1 p-2">
            {filteredThreads?.map((thread) => (
              <button
                key={thread?.id}
                onClick={() => handleThreadClick(thread?.id)}
                className={`w-full p-3 rounded-lg text-left transition-smooth hover:bg-muted ${
                  selectedThreadId === thread?.id
                    ? 'bg-primary/10 border border-primary/20' :'border border-transparent'
                }`}
              >
                <div className="flex items-start space-x-3">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <Image
                      src={thread?.participant?.avatar}
                      alt={thread?.participant?.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {thread?.participant?.isOnline && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success border-2 border-card rounded-full" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-text-primary truncate">
                          {thread?.participant?.name}
                        </span>
                        <span className="text-xs text-text-secondary">
                          {thread?.participant?.role}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 flex-shrink-0">
                        <span className="text-xs text-text-secondary">
                          {formatTimestamp(thread?.lastMessage?.timestamp)}
                        </span>
                        {thread?.unreadCount > 0 && (
                          <div className="w-5 h-5 bg-primary text-primary-foreground text-xs font-medium rounded-full flex items-center justify-center">
                            {thread?.unreadCount > 9 ? '9+' : thread?.unreadCount}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className={`text-sm truncate ${
                        thread?.lastMessage?.isRead 
                          ? 'text-text-secondary' :'text-text-primary font-medium'
                      }`}>
                        {thread?.lastMessage?.text}
                      </p>
                    </div>

                    {/* Booking ID */}
                    {thread?.bookingId && (
                      <div className="mt-1">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-accent/20 text-accent-foreground">
                          <Icon name="Calendar" size={12} strokeWidth={2} className="mr-1" />
                          {thread?.bookingId}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <span>{filteredThreads?.length} 件のメッセージ</span>
          <button className="flex items-center space-x-1 hover:text-text-primary transition-smooth">
            <Icon name="Archive" size={12} strokeWidth={2} />
            <span>アーカイブ</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageThreadList;