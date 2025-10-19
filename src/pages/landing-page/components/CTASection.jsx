import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CTASection = () => {
  const userTypes = [
    {
      id: 1,
      title: "保育園として参加",
      description: "質の高い講師を見つけて、子どもたちに最高の学習体験を",
      icon: "School",
      color: "primary",
      features: ["講師検索", "予約管理", "収益創出"],
      buttonText: "保育園登録",
      route: "/instructor-search-results"
    },
    {
      id: 2,
      title: "講師として参加",
      description: "あなたのスキルを活かして、安定した収入を得ませんか",
      icon: "GraduationCap",
      color: "secondary",
      features: ["柔軟な働き方", "安定収入", "スキルアップ"],
      buttonText: "講師登録",
      route: "/instructor-profile-details"
    },
    {
      id: 3,
      title: "企業として参加",
      description: "教育サービス事業を拡大し、新たな顧客を獲得しましょう",
      icon: "Building2",
      color: "accent",
      features: ["事業拡大", "顧客獲得", "ブランド強化"],
      buttonText: "企業登録",
      route: "/admin-panel"
    }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'primary':
        return {
          bg: 'bg-gradient-to-br from-primary/10 to-primary/5',
          border: 'border-primary/20',
          icon: 'text-primary',
          button: 'bg-primary hover:bg-primary/90 text-primary-foreground'
        };
      case 'secondary':
        return {
          bg: 'bg-gradient-to-br from-secondary/10 to-secondary/5',
          border: 'border-secondary/20',
          icon: 'text-secondary',
          button: 'bg-secondary hover:bg-secondary/90 text-secondary-foreground'
        };
      case 'accent':
        return {
          bg: 'bg-gradient-to-br from-accent/10 to-accent/5',
          border: 'border-accent/20',
          icon: 'text-accent-foreground',
          button: 'bg-accent hover:bg-accent/90 text-accent-foreground'
        };
      default:
        return {
          bg: 'bg-muted',
          border: 'border-border',
          icon: 'text-text-secondary',
          button: 'bg-text-primary hover:bg-text-primary/90 text-white'
        };
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full text-sm font-medium text-text-primary mb-6">
            <Icon name="Rocket" size={16} strokeWidth={2} className="mr-2" />
            今すぐ始めよう
          </div>
          <h2 className="text-4xl lg:text-5xl font-noto font-bold text-text-primary mb-6">
            あなたの役割を選んで
            <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              今すぐ始めましょう
            </span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
            Milkyhomeは、保育園・講師・企業すべての方に価値を提供します。\nあなたに最適なプランを選んで、今すぐ始めてみませんか？
          </p>
        </div>

        {/* User Type Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {userTypes?.map((userType) => {
            const colorClasses = getColorClasses(userType?.color);
            
            return (
              <div 
                key={userType?.id}
                className={`${colorClasses?.bg} ${colorClasses?.border} border rounded-3xl p-8 text-center hover:scale-105 transition-layout group`}
              >
                {/* Icon */}
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-soft group-hover:shadow-medium transition-layout">
                  <Icon 
                    name={userType?.icon} 
                    size={40} 
                    strokeWidth={2} 
                    className={colorClasses?.icon}
                  />
                </div>
                {/* Content */}
                <h3 className="text-2xl font-noto font-bold text-text-primary mb-4">
                  {userType?.title}
                </h3>
                <p className="text-text-secondary mb-6 leading-relaxed">
                  {userType?.description}
                </p>
                {/* Features */}
                <div className="flex justify-center space-x-4 mb-8">
                  {userType?.features?.map((feature, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-white/80 rounded-full text-xs font-medium text-text-primary"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                {/* CTA Button */}
                <Link to={userType?.route}>
                  <Button 
                    variant="default"
                    size="lg"
                    fullWidth
                    iconName="ArrowRight"
                    iconPosition="right"
                    className={colorClasses?.button}
                  >
                    {userType?.buttonText}
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-r from-primary via-secondary to-accent rounded-3xl p-1">
          <div className="bg-white rounded-3xl p-8 lg:p-12 text-center">
            <h3 className="text-3xl lg:text-4xl font-noto font-bold text-text-primary mb-4">
              まだ迷っていますか？
            </h3>
            <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
              無料でアカウントを作成して、まずはプラットフォームを体験してみてください。\n料金は実際にサービスを利用した時のみ発生します。
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button 
                variant="default" 
                size="lg"
                iconName="Play"
                iconPosition="left"
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
              >
                デモ動画を見る
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                iconName="MessageCircle"
                iconPosition="left"
              >
                質問・相談する
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-text-secondary">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} strokeWidth={2} className="text-success" />
                <span>安全・安心の決済システム</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} strokeWidth={2} className="text-primary" />
                <span>24時間サポート対応</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Award" size={16} strokeWidth={2} className="text-warning" />
                <span>満足度98%の実績</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;