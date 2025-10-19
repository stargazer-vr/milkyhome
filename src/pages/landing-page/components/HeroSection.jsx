import React from 'react';

import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-white via-gray-50 to-white py-20 lg:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-accent to-secondary rounded-full blur-xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-6">
              <Icon name="Sparkles" size={16} strokeWidth={2} className="mr-2" />
              保育園と講師をつなぐプラットフォーム
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-noto font-bold text-text-primary mb-6 leading-tight">
              質の高い教育を
              <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                すべての子どもたちに
              </span>
            </h1>
            
            <p className="text-lg lg:text-xl text-text-secondary mb-8 leading-relaxed max-w-2xl">
              Milkyhomeは保育園と専門講師をマッチングし、子どもたちの成長をサポートする革新的なプラットフォームです。音楽、アート、体操など多彩な分野の講師が、質の高いレッスンを提供します。
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                variant="default" 
                size="lg"
                iconName="ArrowRight"
                iconPosition="right"
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
              >
                今すぐ始める
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                iconName="Play"
                iconPosition="left"
              >
                サービス紹介動画
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border">
              <div className="text-center lg:text-left">
                <div className="text-2xl lg:text-3xl font-bold text-text-primary">500+</div>
                <div className="text-sm text-text-secondary">登録講師数</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl lg:text-3xl font-bold text-text-primary">200+</div>
                <div className="text-sm text-text-secondary">提携保育園</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl lg:text-3xl font-bold text-text-primary">10,000+</div>
                <div className="text-sm text-text-secondary">開催レッスン</div>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-3xl p-8 lg:p-12">
              {/* Floating Cards */}
              <div className="space-y-4">
                <div className="bg-white rounded-2xl p-4 shadow-medium transform rotate-2 hover:rotate-0 transition-layout">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                      <Icon name="Music" size={20} color="white" strokeWidth={2} />
                    </div>
                    <div>
                      <div className="font-medium text-text-primary">音楽レッスン</div>
                      <div className="text-sm text-text-secondary">リトミック・楽器演奏</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-4 shadow-medium transform -rotate-1 hover:rotate-0 transition-layout ml-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-accent to-secondary rounded-full flex items-center justify-center">
                      <Icon name="Palette" size={20} color="white" strokeWidth={2} />
                    </div>
                    <div>
                      <div className="font-medium text-text-primary">アートレッスン</div>
                      <div className="text-sm text-text-secondary">絵画・工作・創作活動</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-4 shadow-medium transform rotate-1 hover:rotate-0 transition-layout">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center">
                      <Icon name="Zap" size={20} color="white" strokeWidth={2} />
                    </div>
                    <div>
                      <div className="font-medium text-text-primary">体操レッスン</div>
                      <div className="text-sm text-text-secondary">運動・ダンス・体育</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full opacity-60"></div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br from-accent to-secondary rounded-full opacity-40"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;