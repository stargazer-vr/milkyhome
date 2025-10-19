import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MessageComposer = ({ 
  onSendMessage, 
  onAttachFile, 
  onScheduleLesson,
  disabled = false,
  placeholder = "メッセージを入力してください..." 
}) => {
  const [message, setMessage] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const handleSend = () => {
    if (message?.trim() || attachments?.length > 0) {
      onSendMessage({
        text: message?.trim(),
        attachments: attachments,
        timestamp: new Date()?.toISOString()
      });
      setMessage('');
      setAttachments([]);
      setIsExpanded(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e?.target?.files);
    const newAttachments = files?.map(file => ({
      id: Date.now() + Math.random(),
      name: file?.name,
      size: file?.size,
      type: file?.type,
      file: file
    }));
    setAttachments(prev => [...prev, ...newAttachments]);
    if (fileInputRef?.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeAttachment = (attachmentId) => {
    setAttachments(prev => prev?.filter(att => att?.id !== attachmentId));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const quickActions = [
    {
      id: 'schedule',
      label: 'レッスン予約',
      icon: 'Calendar',
      action: onScheduleLesson,
      color: 'text-primary'
    },
    {
      id: 'payment',
      label: '支払い確認',
      icon: 'CreditCard',
      action: () => console.log('Payment discussion'),
      color: 'text-secondary'
    },
    {
      id: 'contract',
      label: '契約書確認',
      icon: 'FileText',
      action: () => console.log('Contract review'),
      color: 'text-accent'
    }
  ];

  return (
    <div className="border-t border-border bg-card">
      {/* Attachments Preview */}
      {attachments?.length > 0 && (
        <div className="p-4 border-b border-border">
          <div className="space-y-2">
            {attachments?.map((attachment) => (
              <div key={attachment?.id} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon name="Paperclip" size={16} strokeWidth={2} className="text-text-secondary" />
                  <div>
                    <div className="text-sm font-medium text-text-primary truncate max-w-48">
                      {attachment?.name}
                    </div>
                    <div className="text-xs text-text-secondary">
                      {formatFileSize(attachment?.size)}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeAttachment(attachment?.id)}
                  className="h-6 w-6"
                >
                  <Icon name="X" size={14} strokeWidth={2} />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Quick Actions */}
      {isExpanded && (
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Zap" size={16} strokeWidth={2} className="text-text-secondary" />
            <span className="text-sm font-medium text-text-secondary">クイックアクション</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {quickActions?.map((action) => (
              <Button
                key={action?.id}
                variant="outline"
                size="sm"
                onClick={action?.action}
                className="text-xs"
              >
                <Icon name={action?.icon} size={14} strokeWidth={2} className={`mr-1 ${action?.color}`} />
                {action?.label}
              </Button>
            ))}
          </div>
        </div>
      )}
      {/* Message Input */}
      <div className="p-4">
        <div className="flex items-end space-x-3">
          {/* Textarea */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e?.target?.value)}
              onKeyPress={handleKeyPress}
              onFocus={() => setIsExpanded(true)}
              placeholder={placeholder}
              disabled={disabled}
              rows={isExpanded ? 3 : 1}
              className="w-full px-4 py-3 bg-muted border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-smooth text-sm"
            />
            
            {/* Character count */}
            {isExpanded && message?.length > 0 && (
              <div className="absolute bottom-2 right-2 text-xs text-text-secondary">
                {message?.length}/1000
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {/* Attach File */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => fileInputRef?.current?.click()}
              disabled={disabled}
              className="flex-shrink-0"
            >
              <Icon name="Paperclip" size={18} strokeWidth={2} />
            </Button>

            {/* Emoji (placeholder) */}
            <Button
              variant="ghost"
              size="icon"
              disabled={disabled}
              className="flex-shrink-0"
            >
              <Icon name="Smile" size={18} strokeWidth={2} />
            </Button>

            {/* Send Button */}
            <Button
              variant="default"
              size="icon"
              onClick={handleSend}
              disabled={disabled || (!message?.trim() && attachments?.length === 0)}
              className="flex-shrink-0"
            >
              <Icon name="Send" size={18} strokeWidth={2} />
            </Button>
          </div>
        </div>

        {/* Collapse/Expand Toggle */}
        {isExpanded && (
          <div className="flex justify-between items-center mt-3 pt-3 border-t border-border">
            <div className="flex items-center space-x-4 text-xs text-text-secondary">
              <span>Shift + Enter で改行</span>
              <span>Enter で送信</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(false)}
              className="text-xs"
            >
              <Icon name="ChevronDown" size={14} strokeWidth={2} className="mr-1" />
              折りたたむ
            </Button>
          </div>
        )}
      </div>
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleFileSelect}
        className="hidden"
        accept="image/*,.pdf,.doc,.docx,.txt"
      />
    </div>
  );
};

export default MessageComposer;