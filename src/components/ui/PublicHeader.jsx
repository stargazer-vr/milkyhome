import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const PublicHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location?.pathname === path;

  const Logo = () => (
    <Link to="/landing-page" className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
        <Icon name="Home" size={20} color="white" strokeWidth={2} />
      </div>
      <span className="text-xl font-noto font-semibold text-text-primary">
        Milkyhome
      </span>
    </Link>
  );

  const navigationItems = [
    { path: '/landing-page', label: 'ホーム', icon: 'Home' },
    { path: '/instructor-search-results', label: '講師検索', icon: 'Search' },
    { path: '/instructor-profile-details', label: '講師詳細', icon: 'User' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-smooth ${
                  isActive(item?.path)
                    ? 'text-primary bg-primary/10' :'text-text-secondary hover:text-text-primary hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={16} strokeWidth={2} />
                <span>{item?.label}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              ログイン
            </Button>
            <Button variant="default" size="sm">
              新規登録
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Icon 
                name={isMobileMenuOpen ? "X" : "Menu"} 
                size={20} 
                strokeWidth={2} 
              />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background animate-slide-down">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium transition-smooth ${
                    isActive(item?.path)
                      ? 'text-primary bg-primary/10' :'text-text-secondary hover:text-text-primary hover:bg-muted'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon name={item?.icon} size={20} strokeWidth={2} />
                  <span>{item?.label}</span>
                </Link>
              ))}
              
              {/* Mobile Actions */}
              <div className="pt-4 space-y-2">
                <Button variant="ghost" fullWidth>
                  ログイン
                </Button>
                <Button variant="default" fullWidth>
                  新規登録
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default PublicHeader;