import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "鈴木 恵美",
      role: "さくら保育園 園長",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
      rating: 5,
      content: `Milkyhomeを導入してから、子どもたちの学習意欲が格段に向上しました。\n専門講師による質の高いレッスンで、保護者の方々からも大変好評をいただいています。\n特に音楽レッスンでは、子どもたちが積極的に参加する姿が印象的です。`,
      lessonType: "音楽・リトミック",
      period: "利用歴: 1年2ヶ月"
    },
    {
      id: 2,
      name: "田中 美咲",
      role: "フリーランス講師",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      rating: 5,
      content: `プラットフォームのおかげで安定した収入を得られるようになりました。\n予約管理や支払いシステムが非常にスムーズで、レッスンに集中できる環境が整っています。\n保育園との連携もスムーズで、子どもたちの成長を間近で感じられることが何よりの喜びです。`,
      lessonType: "アート・創作",
      period: "利用歴: 8ヶ月"
    },
    {
      id: 3,
      name: "山田 健太郎",
      role: "ABC教育サービス 代表",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      rating: 5,
      content: `企業として複数の講師を管理する上で、このプラットフォームは非常に効率的です。\n新規顧客の獲得から既存顧客との関係維持まで、すべてがスムーズに行えます。\nデータ分析機能により、サービス改善にも役立っています。`,
      lessonType: "体操・運動指導",
      period: "利用歴: 2年"
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials?.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials?.length) % testimonials?.length);
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex]);

  const renderStars = (rating) => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(rating)]?.map((_, i) => (
          <Icon key={i} name="Star" size={16} className="text-warning fill-current" strokeWidth={0} />
        ))}
      </div>
    );
  };

  const currentTestimonial = testimonials?.[currentIndex];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
            <Icon name="MessageSquare" size={16} strokeWidth={2} className="mr-2" />
            利用者の声
          </div>
          <h2 className="text-3xl lg:text-4xl font-noto font-bold text-text-primary mb-4">
            実際にご利用いただいている方々の声
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            保育園、講師、企業の皆様から寄せられた生の声をご紹介します。
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div 
            className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 lg:p-12 shadow-soft border border-border"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Navigation Buttons */}
            <div className="absolute top-6 right-6 flex space-x-2">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 bg-white border border-border rounded-full flex items-center justify-center hover:bg-muted transition-smooth"
              >
                <Icon name="ChevronLeft" size={16} strokeWidth={2} />
              </button>
              <button
                onClick={nextTestimonial}
                className="w-10 h-10 bg-white border border-border rounded-full flex items-center justify-center hover:bg-muted transition-smooth"
              >
                <Icon name="ChevronRight" size={16} strokeWidth={2} />
              </button>
            </div>

            {/* Testimonial Content */}
            <div className="grid lg:grid-cols-3 gap-8 items-center">
              {/* User Info */}
              <div className="text-center lg:text-left">
                <div className="relative inline-block mb-4">
                  <Image
                    src={currentTestimonial?.avatar}
                    alt={currentTestimonial?.name}
                    className="w-20 h-20 rounded-full object-cover mx-auto lg:mx-0"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-success border-2 border-white rounded-full flex items-center justify-center">
                    <Icon name="Check" size={14} color="white" strokeWidth={2} />
                  </div>
                </div>
                
                <h3 className="text-xl font-noto font-bold text-text-primary mb-1">
                  {currentTestimonial?.name}
                </h3>
                <p className="text-sm text-text-secondary mb-3">
                  {currentTestimonial?.role}
                </p>
                
                <div className="flex justify-center lg:justify-start mb-3">
                  {renderStars(currentTestimonial?.rating)}
                </div>
                
                <div className="space-y-2">
                  <div className="inline-flex items-center px-3 py-1 bg-primary/10 rounded-full text-xs font-medium text-primary">
                    {currentTestimonial?.lessonType}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {currentTestimonial?.period}
                  </div>
                </div>
              </div>

              {/* Testimonial Text */}
              <div className="lg:col-span-2">
                <div className="relative">
                  <Icon 
                    name="Quote" 
                    size={32} 
                    className="text-primary/20 absolute -top-4 -left-2" 
                    strokeWidth={1}
                  />
                  <blockquote className="text-lg leading-relaxed text-text-primary pl-8">
                    {currentTestimonial?.content?.split('\n')?.map((line, index) => (
                      <span key={index}>
                        {line}
                        {index < currentTestimonial?.content?.split('\n')?.length - 1 && <br />}
                      </span>
                    ))}
                  </blockquote>
                </div>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials?.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-smooth ${
                  index === currentIndex 
                    ? 'bg-primary' :'bg-border hover:bg-primary/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16 pt-16 border-t border-border">
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-text-primary mb-2">98%</div>
            <div className="text-sm text-text-secondary">満足度</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-text-primary mb-2">4.8</div>
            <div className="text-sm text-text-secondary">平均評価</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-text-primary mb-2">500+</div>
            <div className="text-sm text-text-secondary">レビュー数</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-text-primary mb-2">95%</div>
            <div className="text-sm text-text-secondary">リピート率</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;