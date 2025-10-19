import React from 'react';
import Icon from '../../../components/AppIcon';

const BenefitsSection = () => {
  const benefits = [
    {
      id: 1,
      title: "保育園向け",
      subtitle: "質の高い教育プログラム",
      icon: "School",
      color: "primary",
      features: [
        "専門講師による質の高いレッスン",
        "柔軟なスケジュール調整",
        "追加収益の創出機会",
        "保護者満足度の向上",
        "カリキュラムの充実化"
      ],
      description: "保育園の教育プログラムを充実させ、子どもたちにより良い学習機会を提供できます。"
    },
    {
      id: 2,
      title: "講師向け",
      subtitle: "安定した収入と成長機会",
      icon: "GraduationCap",
      color: "secondary",
      features: [
        "安定した収入源の確保",
        "柔軟な働き方の実現",
        "スキルアップの機会",
        "信頼できる支払いシステム",
        "プロフェッショナルな環境"
      ],
      description: "専門スキルを活かして安定した収入を得ながら、子どもたちの成長に貢献できます。"
    },
    {
      id: 3,
      title: "企業向け",
      subtitle: "事業拡大とブランド強化",
      icon: "Building2",
      color: "accent",
      features: [
        "新規顧客の獲得",
        "ブランド認知度の向上",
        "効率的な営業活動",
        "品質管理の標準化",
        "データ分析による改善"
      ],
      description: "教育サービス企業として市場拡大を図り、ブランド価値を高めることができます。"
    }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'primary':
        return {
          bg: 'bg-primary/10',
          icon: 'text-primary',
          border: 'border-primary/20'
        };
      case 'secondary':
        return {
          bg: 'bg-secondary/10',
          icon: 'text-secondary',
          border: 'border-secondary/20'
        };
      case 'accent':
        return {
          bg: 'bg-accent/10',
          icon: 'text-accent-foreground',
          border: 'border-accent/20'
        };
      default:
        return {
          bg: 'bg-muted',
          icon: 'text-text-secondary',
          border: 'border-border'
        };
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-accent/10 rounded-full text-sm font-medium text-accent-foreground mb-4">
            <Icon name="Heart" size={16} strokeWidth={2} className="mr-2" />
            みんなにメリット
          </div>
          <h2 className="text-3xl lg:text-4xl font-noto font-bold text-text-primary mb-4">
            すべての関係者にとって価値のあるプラットフォーム
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            保育園、講師、企業それぞれが Win-Win の関係を築けるよう設計されたサービスです。
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {benefits?.map((benefit) => {
            const colorClasses = getColorClasses(benefit?.color);
            
            return (
              <div 
                key={benefit?.id} 
                className={`bg-white rounded-2xl border ${colorClasses?.border} shadow-soft hover:shadow-medium transition-layout p-8 group`}
              >
                {/* Icon and Header */}
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 ${colorClasses?.bg} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-layout`}>
                    <Icon 
                      name={benefit?.icon} 
                      size={32} 
                      strokeWidth={2} 
                      className={colorClasses?.icon}
                    />
                  </div>
                  <h3 className="text-xl font-noto font-bold text-text-primary mb-2">
                    {benefit?.title}
                  </h3>
                  <p className="text-sm font-medium text-text-secondary">
                    {benefit?.subtitle}
                  </p>
                </div>
                {/* Description */}
                <p className="text-sm text-text-secondary mb-6 text-center">
                  {benefit?.description}
                </p>
                {/* Features List */}
                <div className="space-y-3">
                  {benefit?.features?.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`w-5 h-5 ${colorClasses?.bg} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <Icon 
                          name="Check" 
                          size={12} 
                          strokeWidth={2} 
                          className={colorClasses?.icon}
                        />
                      </div>
                      <span className="text-sm text-text-secondary">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
                {/* Hover Effect */}
                <div className="mt-6 pt-6 border-t border-border opacity-0 group-hover:opacity-100 transition-smooth">
                  <div className="text-center">
                    <span className={`text-sm font-medium ${colorClasses?.icon}`}>
                      詳細を見る →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-3xl p-8 lg:p-12">
            <h3 className="text-2xl lg:text-3xl font-noto font-bold text-text-primary mb-4">
              今すぐ始めませんか？
            </h3>
            <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
              あなたの役割に応じて最適なプランをご用意しています。まずは無料でアカウントを作成してみましょう。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-white rounded-xl p-4 border border-border shadow-soft">
                <div className="text-sm text-text-secondary mb-1">保育園として</div>
                <div className="font-medium text-text-primary">講師を探す</div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-border shadow-soft">
                <div className="text-sm text-text-secondary mb-1">講師として</div>
                <div className="font-medium text-text-primary">レッスンを提供</div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-border shadow-soft">
                <div className="text-sm text-text-secondary mb-1">企業として</div>
                <div className="font-medium text-text-primary">事業を拡大</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;