import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardSidebar from '../../components/ui/DashboardSidebar';
import MessageThreadList from '../../components/ui/MessageThreadList';
import ConversationHeader from './components/ConversationHeader';
import MessageList from './components/MessageList';
import MessageComposer from './components/MessageComposer';
import ConversationSidebar from './components/ConversationSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const MessagingInterface = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedThreadId, setSelectedThreadId] = useState(1);
  const [isInfoSidebarOpen, setIsInfoSidebarOpen] = useState(false);
  const [isMobileThreadListOpen, setIsMobileThreadListOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for threads
  const threads = [
    {
      id: 1,
      participant: {
        name: '山田 花子',
        role: '保育園管理者',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        isOnline: true,
        status: 'online'
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
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        isOnline: false,
        status: 'away'
      },
      lastMessage: {
        text: 'ありがとうございました。',
        timestamp: '2025-10-11T10:15:00',
        isRead: true,
        senderId: 1
      },
      unreadCount: 0,
      bookingId: 'BK-2025-002'
    },
    {
      id: 3,
      participant: {
        name: '田中 美咲',
        role: '保育園管理者',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        isOnline: true,
        status: 'online'
      },
      lastMessage: {
        text: 'レッスン資料を送付いたします。',
        timestamp: '2025-10-11T09:45:00',
        isRead: true,
        senderId: 3
      },
      unreadCount: 0,
      bookingId: 'BK-2025-003'
    }
  ];

  // Mock messages for selected thread
  const mockMessages = [
    {
      id: 1,
      senderId: 2,
      sender: {
        name: '山田 花子',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
      },
      text: 'こんにちは！来週の英語レッスンについてご相談があります。',
      timestamp: '2025-10-11T09:00:00',
      status: 'read'
    },
    {
      id: 2,
      senderId: 1,
      sender: {
        name: '田中 太郎',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      },
      text: 'はい、どのようなご相談でしょうか？',
      timestamp: '2025-10-11T09:05:00',
      status: 'read'
    },
    {
      id: 3,
      senderId: 2,
      sender: {
        name: '山田 花子',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
      },
      text: `子どもたちの年齢層が3-5歳なのですが、\nどのような内容のレッスンが適しているでしょうか？\n\n特に発音練習に重点を置きたいと考えています。`,
      timestamp: '2025-10-11T09:10:00',
      status: 'read'
    },
    {
      id: 4,
      senderId: 1,
      sender: {
        name: '田中 太郎',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      },
      text: '3-5歳でしたら、歌やゲームを取り入れた楽しいレッスンがおすすめです。',
      timestamp: '2025-10-11T09:15:00',
      status: 'read',
      attachments: [
        {
          type: 'file',
          name: 'レッスンプラン_3-5歳.pdf',
          size: '2.4 MB',
          fileType: 'application/pdf',
          url: '#'
        }
      ]
    },
    {
      id: 5,
      senderId: 1,
      sender: {
        name: '田中 太郎',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      },
      text: 'こちらのレッスンプランをご確認ください。',
      timestamp: '2025-10-11T09:16:00',
      status: 'read',
      lessonAction: {
        type: 'schedule_request',
        description: '来週火曜日 10:00-11:00 の英語レッスンをご提案いたします。'
      }
    },
    {
      id: 6,
      senderId: 2,
      sender: {
        name: '山田 花子',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
      },
      text: 'ありがとうございます！とても参考になります。',
      timestamp: '2025-10-11T14:30:00',
      status: 'delivered',
      reactions: [
        { emoji: '👍', count: 1 },
        { emoji: '❤️', count: 1 }
      ]
    }
  ];

  const selectedThread = threads?.find(thread => thread?.id === selectedThreadId);

  useEffect(() => {
    if (selectedThreadId) {
      setIsLoading(true);
      // Simulate loading messages
      setTimeout(() => {
        setMessages(mockMessages);
        setIsLoading(false);
      }, 500);
    }
  }, [selectedThreadId]);

  const handleThreadSelect = (threadId) => {
    setSelectedThreadId(threadId);
    setIsMobileThreadListOpen(false);
  };

  const handleSendMessage = (messageData) => {
    const newMessage = {
      id: Date.now(),
      senderId: 1,
      sender: {
        name: '田中 太郎',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      },
      text: messageData?.text,
      timestamp: messageData?.timestamp,
      status: 'sending',
      attachments: messageData?.attachments
    };

    setMessages(prev => [...prev, newMessage]);

    // Simulate message delivery
    setTimeout(() => {
      setMessages(prev => 
        prev?.map(msg => 
          msg?.id === newMessage?.id 
            ? { ...msg, status: 'delivered' }
            : msg
        )
      );
    }, 1000);
  };

  const handleVideoCall = () => {
    console.log('Starting video call...');
  };

  const handleViewProfile = () => {
    navigate('/instructor-profile-details');
  };

  const handleScheduleLesson = () => {
    navigate('/booking-request-flow');
  };

  const handleReply = (message) => {
    console.log('Reply to message:', message);
  };

  const handleReact = (messageId) => {
    console.log('React to message:', messageId);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <DashboardSidebar 
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      {/* Main Content */}
      <div className={`transition-layout ${
        isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      } pb-16 lg:pb-0`}>
        <div className="h-screen flex">
          {/* Thread List - Desktop */}
          <div className="hidden lg:block w-80 border-r border-border">
            <MessageThreadList
              threads={threads}
              selectedThreadId={selectedThreadId}
              onThreadSelect={handleThreadSelect}
            />
          </div>

          {/* Mobile Thread List Toggle */}
          <div className="lg:hidden fixed top-4 left-4 z-30">
            <Button
              variant="default"
              size="icon"
              onClick={() => setIsMobileThreadListOpen(true)}
              className="shadow-medium"
            >
              <Icon name="MessageSquare" size={18} strokeWidth={2} />
            </Button>
          </div>

          {/* Mobile Thread List Overlay */}
          {isMobileThreadListOpen && (
            <>
              <div 
                className="lg:hidden fixed inset-0 bg-black/50 z-40"
                onClick={() => setIsMobileThreadListOpen(false)}
              />
              <div className="lg:hidden fixed left-0 top-0 h-full w-80 z-50">
                <MessageThreadList
                  threads={threads}
                  selectedThreadId={selectedThreadId}
                  onThreadSelect={handleThreadSelect}
                />
              </div>
            </>
          )}

          {/* Conversation Area */}
          <div className="flex-1 flex flex-col">
            {selectedThread ? (
              <>
                {/* Conversation Header */}
                <ConversationHeader
                  participant={selectedThread?.participant}
                  onVideoCall={handleVideoCall}
                  onViewProfile={handleViewProfile}
                  onToggleInfo={() => setIsInfoSidebarOpen(!isInfoSidebarOpen)}
                  isInfoOpen={isInfoSidebarOpen}
                />

                {/* Messages */}
                <MessageList
                  messages={messages}
                  currentUserId={1}
                  onReply={handleReply}
                  onReact={handleReact}
                  isLoading={isLoading}
                />

                {/* Message Composer */}
                <MessageComposer
                  onSendMessage={handleSendMessage}
                  onScheduleLesson={handleScheduleLesson}
                  onAttachFile={() => console.log('File attachment not implemented yet')}
                />
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <Icon name="MessageCircle" size={64} strokeWidth={1} className="text-text-secondary mx-auto mb-4" />
                  <h2 className="text-xl font-semibold text-text-primary mb-2">
                    メッセージを選択
                  </h2>
                  <p className="text-text-secondary">
                    左側から会話を選択してメッセージを開始してください
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Conversation Sidebar */}
          <ConversationSidebar
            participant={selectedThread?.participant}
            isOpen={isInfoSidebarOpen}
            onClose={() => setIsInfoSidebarOpen(false)}
            onScheduleLesson={handleScheduleLesson}
            onViewProfile={handleViewProfile}
          />
        </div>
      </div>
    </div>
  );
};

export default MessagingInterface;