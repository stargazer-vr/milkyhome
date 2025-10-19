import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MessageBubble = ({ 
  message, 
  isOwn = false, 
  showAvatar = true, 
  showTimestamp = true,
  onReply,
  onReact
}) => {
  const [showActions, setShowActions] = useState(false);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = (now - date) / (1000 * 60);

    if (diffInMinutes < 1) {
      return '今';
    } else if (diffInMinutes < 60) {
      return `${Math.floor(diffInMinutes)}分前`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}時間前`;
    } else {
      return date?.toLocaleDateString('ja-JP', { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const getFileIcon = (fileType) => {
    if (fileType?.startsWith('image/')) return 'Image';
    if (fileType?.includes('pdf')) return 'FileText';
    if (fileType?.includes('word') || fileType?.includes('doc')) return 'FileText';
    return 'File';
  };

  const renderAttachment = (attachment) => {
    if (attachment?.type === 'image') {
      return (
        <div className="mt-2 rounded-lg overflow-hidden max-w-xs">
          <Image
            src={attachment?.url}
            alt={attachment?.name}
            className="w-full h-auto object-cover"
          />
        </div>
      );
    }

    if (attachment?.type === 'file') {
      return (
        <div className="mt-2 p-3 bg-muted/50 rounded-lg border border-border max-w-xs">
          <div className="flex items-center space-x-2">
            <Icon name={getFileIcon(attachment?.fileType)} size={16} strokeWidth={2} />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-text-primary truncate">
                {attachment?.name}
              </div>
              <div className="text-xs text-text-secondary">
                {attachment?.size}
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <Icon name="Download" size={12} strokeWidth={2} />
            </Button>
          </div>
        </div>
      );
    }

    return null;
  };

  const renderLessonAction = (action) => {
    const actionIcons = {
      'schedule_request': 'Calendar',
      'payment_reminder': 'CreditCard',
      'contract_update': 'FileText',
      'lesson_completed': 'CheckCircle'
    };

    const actionLabels = {
      'schedule_request': 'レッスン予約リクエスト',
      'payment_reminder': '支払いリマインダー',
      'contract_update': '契約書更新',
      'lesson_completed': 'レッスン完了'
    };

    return (
      <div className="mt-2 p-3 bg-primary/10 border border-primary/20 rounded-lg max-w-xs">
        <div className="flex items-center space-x-2 mb-2">
          <Icon 
            name={actionIcons?.[action?.type]} 
            size={16} 
            strokeWidth={2} 
            className="text-primary" 
          />
          <span className="text-sm font-medium text-primary">
            {actionLabels?.[action?.type]}
          </span>
        </div>
        <div className="text-sm text-text-primary mb-3">
          {action?.description}
        </div>
        <div className="flex space-x-2">
          <Button variant="default" size="sm" className="text-xs">
            確認
          </Button>
          <Button variant="outline" size="sm" className="text-xs">
            詳細
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div 
      className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4 group`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className={`flex max-w-xs lg:max-w-md ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        {showAvatar && !isOwn && (
          <div className="flex-shrink-0 mr-3">
            <Image
              src={message?.sender?.avatar}
              alt={message?.sender?.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          </div>
        )}

        {/* Message Content */}
        <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
          {/* Sender Name */}
          {!isOwn && showAvatar && (
            <div className="text-xs text-text-secondary mb-1 px-1">
              {message?.sender?.name}
            </div>
          )}

          {/* Message Bubble */}
          <div className={`relative px-4 py-3 rounded-2xl ${
            isOwn 
              ? 'bg-primary text-primary-foreground rounded-br-md' 
              : 'bg-card border border-border rounded-bl-md'
          }`}>
            {/* Text Content */}
            {message?.text && (
              <div className={`text-sm ${isOwn ? 'text-primary-foreground' : 'text-text-primary'}`}>
                {message?.text}
              </div>
            )}

            {/* Attachments */}
            {message?.attachments && message?.attachments?.map((attachment, index) => (
              <div key={index}>
                {renderAttachment(attachment)}
              </div>
            ))}

            {/* Lesson Actions */}
            {message?.lessonAction && renderLessonAction(message?.lessonAction)}

            {/* Message Status */}
            {isOwn && (
              <div className="flex items-center justify-end mt-1 space-x-1">
                {message?.status === 'sending' && (
                  <Icon name="Clock" size={12} strokeWidth={2} className="text-primary-foreground/70" />
                )}
                {message?.status === 'sent' && (
                  <Icon name="Check" size={12} strokeWidth={2} className="text-primary-foreground/70" />
                )}
                {message?.status === 'delivered' && (
                  <div className="flex">
                    <Icon name="Check" size={12} strokeWidth={2} className="text-primary-foreground/70 -mr-1" />
                    <Icon name="Check" size={12} strokeWidth={2} className="text-primary-foreground/70" />
                  </div>
                )}
                {message?.status === 'read' && (
                  <div className="flex">
                    <Icon name="Check" size={12} strokeWidth={2} className="text-success -mr-1" />
                    <Icon name="Check" size={12} strokeWidth={2} className="text-success" />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Timestamp */}
          {showTimestamp && (
            <div className={`text-xs text-text-secondary mt-1 px-1 ${isOwn ? 'text-right' : 'text-left'}`}>
              {formatTimestamp(message?.timestamp)}
            </div>
          )}

          {/* Reactions */}
          {message?.reactions && message?.reactions?.length > 0 && (
            <div className="flex items-center space-x-1 mt-1">
              {message?.reactions?.map((reaction, index) => (
                <div key={index} className="flex items-center space-x-1 px-2 py-1 bg-muted rounded-full text-xs">
                  <span>{reaction?.emoji}</span>
                  <span className="text-text-secondary">{reaction?.count}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Message Actions */}
        {showActions && (
          <div className={`flex items-center space-x-1 mx-2 opacity-0 group-hover:opacity-100 transition-smooth ${
            isOwn ? 'flex-row-reverse' : 'flex-row'
          }`}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onReact && onReact(message?.id)}
              className="h-6 w-6 bg-background/80 backdrop-blur-sm"
            >
              <Icon name="Smile" size={12} strokeWidth={2} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onReply && onReply(message)}
              className="h-6 w-6 bg-background/80 backdrop-blur-sm"
            >
              <Icon name="Reply" size={12} strokeWidth={2} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;