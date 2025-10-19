import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import Icon from '../../../components/AppIcon';

const MessageList = ({ 
  messages = [], 
  currentUserId = 1,
  onReply,
  onReact,
  isLoading = false 
}) => {
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const shouldShowAvatar = (message, index) => {
    if (index === messages?.length - 1) return true;
    const nextMessage = messages?.[index + 1];
    return nextMessage?.senderId !== message?.senderId;
  };

  const shouldShowTimestamp = (message, index) => {
    if (index === 0) return true;
    const prevMessage = messages?.[index - 1];
    const timeDiff = new Date(message.timestamp) - new Date(prevMessage.timestamp);
    return timeDiff > 300000; // 5 minutes
  };

  const groupMessagesByDate = (messages) => {
    const groups = [];
    let currentGroup = null;

    messages?.forEach((message, index) => {
      const messageDate = new Date(message.timestamp)?.toDateString();
      
      if (!currentGroup || currentGroup?.date !== messageDate) {
        currentGroup = {
          date: messageDate,
          messages: []
        };
        groups?.push(currentGroup);
      }
      
      currentGroup?.messages?.push({ ...message, originalIndex: index });
    });

    return groups;
  };

  const formatDateHeader = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday?.setDate(yesterday?.getDate() - 1);

    if (date?.toDateString() === today?.toDateString()) {
      return '今日';
    } else if (date?.toDateString() === yesterday?.toDateString()) {
      return '昨日';
    } else {
      return date?.toLocaleDateString('ja-JP', { 
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
      });
    }
  };

  if (messages?.length === 0 && !isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <Icon name="MessageCircle" size={48} strokeWidth={1} className="text-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            会話を始めましょう
          </h3>
          <p className="text-text-secondary">
            メッセージを送信して会話を開始してください
          </p>
        </div>
      </div>
    );
  }

  const messageGroups = groupMessagesByDate(messages);

  return (
    <div 
      ref={containerRef}
      className="flex-1 overflow-y-auto p-4 space-y-4"
    >
      {messageGroups?.map((group, groupIndex) => (
        <div key={groupIndex}>
          {/* Date Header */}
          <div className="flex items-center justify-center my-6">
            <div className="px-3 py-1 bg-muted text-text-secondary text-xs font-medium rounded-full">
              {formatDateHeader(group?.date)}
            </div>
          </div>

          {/* Messages */}
          <div className="space-y-1">
            {group?.messages?.map((message, messageIndex) => (
              <MessageBubble
                key={message?.id}
                message={message}
                isOwn={message?.senderId === currentUserId}
                showAvatar={shouldShowAvatar(message, message?.originalIndex)}
                showTimestamp={shouldShowTimestamp(message, message?.originalIndex)}
                onReply={onReply}
                onReact={onReact}
              />
            ))}
          </div>
        </div>
      ))}
      {/* Loading Indicator */}
      {isLoading && (
        <div className="flex justify-center py-4">
          <div className="flex items-center space-x-2 text-text-secondary">
            <div className="animate-spin">
              <Icon name="Loader2" size={16} strokeWidth={2} />
            </div>
            <span className="text-sm">メッセージを読み込み中...</span>
          </div>
        </div>
      )}
      {/* Scroll Anchor */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;