import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const DashboardSidebar = ({ isCollapsed = false, onToggle }) => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isActive = (path) => location?.pathname === path;

  const Logo = () => (
    <Link to="/landing-page" className="flex items-center space-x-3 p-4">
      <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center flex-shrink-0">
        <Icon name="Home" size={20} color="white" strokeWidth={2} />
      </div>
      {!isCollapsed && (
        <span className="text-xl font-noto font-semibold text-text-primary">
          Milkyhome
        </span>
      )}
    </Link>
  );

  const navigationItems = [
    { 
      path: '/booking-request-flow', 
      label: '予約管理', 
      icon: 'Calendar',
      description: '予約の確認・管理'
    },
    { 
      path: '/messaging-interface', 
      label: 'メッセージ', 
      icon: 'MessageCircle',
      description: 'チャット・連絡'
    },
    { 
      path: '/admin-panel', 
      label: '管理パネル', 
      icon: 'Settings',
      description: 'システム管理'
    },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="border-b border-border">
        <Logo />
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems?.map((item) => (
          <Link
            key={item?.path}
            to={item?.path}
            className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-smooth group ${
              isActive(item?.path)
                ? 'text-primary bg-primary/10 border border-primary/20' :'text-text-secondary hover:text-text-primary hover:bg-muted'
            }`}
            title={isCollapsed ? item?.label : ''}
          >
            <Icon 
              name={item?.icon} 
              size={20} 
              strokeWidth={2}
              className="flex-shrink-0"
            />
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <div className="font-medium">{item?.label}</div>
                <div className="text-xs text-text-secondary group-hover:text-text-primary transition-smooth">
                  {item?.description}
                </div>
              </div>
            )}
          </Link>
        ))}
      </nav>

      {/* User Section */}
      <div className="border-t border-border p-4">
        <div className={`flex items-center space-x-3 ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="User" size={16} strokeWidth={2} />
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-text-primary truncate">
                田中 太郎
              </div>
              <div className="text-xs text-text-secondary">
                講師アカウント
              </div>
            </div>
          )}
        </div>
        
        {!isCollapsed && (
          <div className="mt-3 space-y-1">
            <Button variant="ghost" size="sm" fullWidth className="justify-start">
              <Icon name="LogOut" size={16} strokeWidth={2} className="mr-2" />
              ログアウト
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex-col bg-card border-r border-border shadow-soft transition-layout ${
        isCollapsed ? 'lg:w-16' : 'lg:w-64'
      }`}>
        <SidebarContent />
        
        {/* Collapse Toggle */}
        <div className="border-t border-border p-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className={`w-full ${isCollapsed ? 'px-2' : 'justify-start'}`}
          >
            <Icon 
              name={isCollapsed ? "ChevronRight" : "ChevronLeft"} 
              size={16} 
              strokeWidth={2}
              className={isCollapsed ? '' : 'mr-2'}
            />
            {!isCollapsed && <span>折りたたむ</span>}
          </Button>
        </div>
      </aside>
      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border shadow-medium">
        <div className="flex items-center justify-around py-2">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-smooth ${
                isActive(item?.path)
                  ? 'text-primary' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name={item?.icon} size={20} strokeWidth={2} />
              <span className="text-xs font-medium">{item?.label}</span>
            </Link>
          ))}
        </div>
      </nav>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-30 bg-black/50"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
};

export default DashboardSidebar;