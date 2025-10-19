import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ConversationSidebar = ({ 
  participant, 
  isOpen = false, 
  onClose,
  onScheduleLesson,
  onViewProfile 
}) => {
  if (!isOpen || !participant) return null;

  const lessonHistory = [
    {
      id: 1,
      title: "英語レッスン - 基礎会話",
      date: "2025-10-08",
      status: "completed",
      rating: 5
    },
    {
      id: 2,
      title: "英語レッスン - 発音練習",
      date: "2025-10-05",
      status: "completed",
      rating: 4
    },
    {
      id: 3,
      title: "英語レッスン - 文法基礎",
      date: "2025-10-15",
      status: "scheduled",
      rating: null
    }
  ];

  const sharedFiles = [
    {
      id: 1,
      name: "レッスン資料_10月.pdf",
      type: "pdf",
      size: "2.4 MB",
      date: "2025-10-08"
    },
    {
      id: 2,
      name: "宿題プリント.docx",
      type: "doc",
      size: "1.2 MB",
      date: "2025-10-05"
    },
    {
      id: 3,
      name: "発音練習音声.mp3",
      type: "audio",
      size: "5.8 MB",
      date: "2025-10-03"
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { label: '完了', color: 'bg-success/20 text-success' },
      scheduled: { label: '予定', color: 'bg-primary/20 text-primary' },
      cancelled: { label: 'キャンセル', color: 'bg-error/20 text-error' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.completed;
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const getFileIcon = (type) => {
    const icons = {
      pdf: 'FileText',
      doc: 'FileText',
      audio: 'Music',
      image: 'Image',
      video: 'Video'
    };
    return icons?.[type] || 'File';
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={12}
        strokeWidth={2}
        className={i < rating ? 'text-warning fill-current' : 'text-muted'}
      />
    ));
  };

  return (
    <>
      {/* Mobile Backdrop */}
      <div 
        className="lg:hidden fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
      {/* Sidebar */}
      <div className="fixed lg:relative right-0 top-0 h-full w-80 bg-card border-l border-border shadow-medium z-50 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary">詳細情報</h3>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={18} strokeWidth={2} />
            </Button>
          </div>

          {/* Participant Profile */}
          <div className="text-center">
            <Image
              src={participant?.avatar}
              alt={participant?.name}
              className="w-16 h-16 rounded-full object-cover mx-auto mb-3"
            />
            <h4 className="text-lg font-semibold text-text-primary mb-1">
              {participant?.name}
            </h4>
            <p className="text-sm text-text-secondary mb-3">
              {participant?.role}
            </p>
            
            {/* Quick Actions */}
            <div className="flex space-x-2">
              <Button variant="default" size="sm" onClick={onScheduleLesson} fullWidth>
                <Icon name="Calendar" size={14} strokeWidth={2} className="mr-1" />
                予約
              </Button>
              <Button variant="outline" size="sm" onClick={onViewProfile} fullWidth>
                <Icon name="User" size={14} strokeWidth={2} className="mr-1" />
                詳細
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Contact Info */}
          <div className="p-4 border-b border-border">
            <h5 className="text-sm font-semibold text-text-primary mb-3">連絡先情報</h5>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <Icon name="Mail" size={14} strokeWidth={2} className="text-text-secondary" />
                <span className="text-text-secondary">yamada@example.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Icon name="Phone" size={14} strokeWidth={2} className="text-text-secondary" />
                <span className="text-text-secondary">090-1234-5678</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Icon name="MapPin" size={14} strokeWidth={2} className="text-text-secondary" />
                <span className="text-text-secondary">東京都渋谷区</span>
              </div>
            </div>
          </div>

          {/* Lesson History */}
          <div className="p-4 border-b border-border">
            <h5 className="text-sm font-semibold text-text-primary mb-3">レッスン履歴</h5>
            <div className="space-y-3">
              {lessonHistory?.map((lesson) => (
                <div key={lesson?.id} className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h6 className="text-sm font-medium text-text-primary">
                      {lesson?.title}
                    </h6>
                    {getStatusBadge(lesson?.status)}
                  </div>
                  <div className="text-xs text-text-secondary mb-2">
                    {lesson?.date}
                  </div>
                  {lesson?.rating && (
                    <div className="flex items-center space-x-1">
                      {renderStars(lesson?.rating)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Shared Files */}
          <div className="p-4">
            <h5 className="text-sm font-semibold text-text-primary mb-3">共有ファイル</h5>
            <div className="space-y-2">
              {sharedFiles?.map((file) => (
                <div key={file?.id} className="flex items-center space-x-3 p-2 hover:bg-muted/50 rounded-lg transition-smooth">
                  <Icon 
                    name={getFileIcon(file?.type)} 
                    size={16} 
                    strokeWidth={2} 
                    className="text-text-secondary flex-shrink-0" 
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-text-primary truncate">
                      {file?.name}
                    </div>
                    <div className="text-xs text-text-secondary">
                      {file?.size} • {file?.date}
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-6 w-6 flex-shrink-0">
                    <Icon name="Download" size={12} strokeWidth={2} />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" fullWidth>
              <Icon name="Archive" size={14} strokeWidth={2} className="mr-1" />
              アーカイブ
            </Button>
            <Button variant="outline" size="sm" fullWidth>
              <Icon name="Flag" size={14} strokeWidth={2} className="mr-1" />
              報告
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConversationSidebar;