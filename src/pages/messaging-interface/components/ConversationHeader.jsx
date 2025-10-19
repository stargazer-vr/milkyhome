import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ConversationHeader = ({ 
  participant, 
  onVideoCall, 
  onViewProfile, 
  onToggleInfo,
  isInfoOpen = false 
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  if (!participant) {
    return (
      <div className="h-16 border-b border-border bg-card flex items-center justify-center">
        <span className="text-text-secondary">会話を選択してください</span>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-success';
      case 'away': return 'bg-warning';
      case 'busy': return 'bg-error';
      default: return 'bg-muted';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'online': return 'オンライン';
      case 'away': return '離席中';
      case 'busy': return '取り込み中';
      default: return '最終ログイン: 2時間前';
    }
  };

  const dropdownActions = [
    {
      id: 'profile',
      label: 'プロフィール表示',
      icon: 'User',
      action: onViewProfile
    },
    {
      id: 'schedule',
      label: 'レッスン予約',
      icon: 'Calendar',
      action: () => console.log('Schedule lesson')
    },
    {
      id: 'history',
      label: '予約履歴',
      icon: 'History',
      action: () => console.log('View history')
    },
    {
      id: 'block',
      label: 'ブロック',
      icon: 'Shield',
      action: () => console.log('Block user'),
      destructive: true
    }
  ];

  return (
    <div className="h-16 border-b border-border bg-card flex items-center justify-between px-4">
      {/* Participant Info */}
      <div className="flex items-center space-x-3 flex-1 min-w-0">
        {/* Avatar with Status */}
        <div className="relative flex-shrink-0">
          <Image
            src={participant?.avatar}
            alt={participant?.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 border-2 border-card rounded-full ${getStatusColor(participant?.status)}`} />
        </div>

        {/* Name and Status */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <h3 className="text-sm font-semibold text-text-primary truncate">
              {participant?.name}
            </h3>
            {participant?.role && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-accent/20 text-accent-foreground">
                {participant?.role}
              </span>
            )}
          </div>
          <div className="text-xs text-text-secondary">
            {getStatusText(participant?.status)}
          </div>
        </div>

        {/* Lesson Info Badge */}
        {participant?.currentLesson && (
          <div className="hidden sm:flex items-center space-x-1 px-2 py-1 bg-primary/10 text-primary rounded-lg text-xs">
            <Icon name="Calendar" size={12} strokeWidth={2} />
            <span>{participant?.currentLesson?.title}</span>
          </div>
        )}
      </div>
      {/* Action Buttons */}
      <div className="flex items-center space-x-2">
        {/* Video Call */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onVideoCall}
          className="hidden sm:flex"
          title="ビデオ通話"
        >
          <Icon name="Video" size={18} strokeWidth={2} />
        </Button>

        {/* Phone Call */}
        <Button
          variant="ghost"
          size="icon"
          className="hidden sm:flex"
          title="音声通話"
        >
          <Icon name="Phone" size={18} strokeWidth={2} />
        </Button>

        {/* Info Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleInfo}
          className={isInfoOpen ? 'bg-muted' : ''}
          title="詳細情報"
        >
          <Icon name="Info" size={18} strokeWidth={2} />
        </Button>

        {/* More Actions Dropdown */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowDropdown(!showDropdown)}
            title="その他のアクション"
          >
            <Icon name="MoreVertical" size={18} strokeWidth={2} />
          </Button>

          {showDropdown && (
            <>
              {/* Backdrop */}
              <div 
                className="fixed inset-0 z-10"
                onClick={() => setShowDropdown(false)}
              />
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 top-full mt-1 w-48 bg-card border border-border rounded-lg shadow-medium z-20">
                <div className="py-1">
                  {dropdownActions?.map((action) => (
                    <button
                      key={action?.id}
                      onClick={() => {
                        action?.action();
                        setShowDropdown(false);
                      }}
                      className={`w-full flex items-center space-x-2 px-3 py-2 text-sm hover:bg-muted transition-smooth ${
                        action?.destructive 
                          ? 'text-error hover:bg-error/10' :'text-text-primary'
                      }`}
                    >
                      <Icon name={action?.icon} size={16} strokeWidth={2} />
                      <span>{action?.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationHeader;