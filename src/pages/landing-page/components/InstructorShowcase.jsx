import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const InstructorShowcase = () => {
  const featuredInstructors = [
    {
      id: 1,
      name: "田中 美咲",
      specialty: "音楽・リトミック",
      rating: 4.9,
      reviewCount: 127,
      experience: "8年",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      lessonTypes: ["対面", "オンライン"],
      ageGroups: ["0-2歳", "3-5歳"],
      price: "¥3,500",
      badges: ["認定講師", "人気"],
      description: "音楽を通じて子どもたちの感性と表現力を育みます。楽しいリトミックで心と体の成長をサポート。"
    },
    {
      id: 2,
      name: "佐藤 健太",
      specialty: "体操・運動",
      rating: 4.8,
      reviewCount: 89,
      experience: "6年",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      lessonTypes: ["対面"],
      ageGroups: ["3-5歳"],
      price: "¥4,000",
      badges: ["体操指導員"],
      description: "運動の楽しさを伝え、基礎体力向上と協調性を育てる体操レッスンを提供しています。"
    },
    {
      id: 3,
      name: "山田 花子",
      specialty: "アート・創作",
      rating: 4.9,
      reviewCount: 156,
      experience: "10年",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      lessonTypes: ["対面", "オンライン"],
      ageGroups: ["2-4歳", "4-6歳"],
      price: "¥3,200",
      badges: ["認定講師", "新着"],
      description: "創造力を引き出すアート活動で、子どもたちの想像力と表現力を豊かに育てます。"
    }
  ];

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex items-center space-x-1">
        {[...Array(fullStars)]?.map((_, i) => (
          <Icon key={i} name="Star" size={14} className="text-warning fill-current" strokeWidth={0} />
        ))}
        {hasHalfStar && (
          <Icon name="Star" size={14} className="text-warning fill-current opacity-50" strokeWidth={0} />
        )}
        <span className="text-sm font-medium text-text-primary ml-1">{rating}</span>
      </div>
    );
  };

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-secondary/10 rounded-full text-sm font-medium text-secondary mb-4">
            <Icon name="Users" size={16} strokeWidth={2} className="mr-2" />
            厳選された講師陣
          </div>
          <h2 className="text-3xl lg:text-4xl font-noto font-bold text-text-primary mb-4">
            信頼できる専門講師たち
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            経験豊富で資格を持つ講師が、子どもたちの成長に合わせた質の高いレッスンを提供します。
          </p>
        </div>

        {/* Instructor Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredInstructors?.map((instructor) => (
            <div key={instructor?.id} className="bg-white rounded-2xl border border-border shadow-soft hover:shadow-medium transition-layout group">
              {/* Card Header */}
              <div className="p-6 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="relative flex-shrink-0">
                    <Image
                      src={instructor?.avatar}
                      alt={instructor?.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success border-2 border-white rounded-full flex items-center justify-center">
                      <Icon name="Check" size={12} color="white" strokeWidth={2} />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-noto font-semibold text-text-primary mb-1">
                      {instructor?.name}
                    </h3>
                    <p className="text-sm text-text-secondary mb-2">
                      {instructor?.specialty}
                    </p>
                    <div className="flex items-center space-x-3">
                      {renderStars(instructor?.rating)}
                      <span className="text-xs text-text-secondary">
                        ({instructor?.reviewCount}件)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {instructor?.badges?.map((badge, index) => (
                    <span
                      key={index}
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        badge === "認定講師" ?"bg-success/10 text-success" 
                          : badge === "人気" ?"bg-primary/10 text-primary" :"bg-accent/10 text-accent-foreground"
                      }`}
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Content */}
              <div className="px-6 pb-4">
                <p className="text-sm text-text-secondary mb-4 line-clamp-2">
                  {instructor?.description}
                </p>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-xs text-text-secondary mb-1">対象年齢</div>
                    <div className="flex flex-wrap gap-1">
                      {instructor?.ageGroups?.map((age, index) => (
                        <span key={index} className="text-xs bg-muted px-2 py-1 rounded">
                          {age}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-text-secondary mb-1">レッスン形式</div>
                    <div className="flex flex-wrap gap-1">
                      {instructor?.lessonTypes?.map((type, index) => (
                        <span key={index} className="text-xs bg-muted px-2 py-1 rounded">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Price and Experience */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-xs text-text-secondary">料金（1回）</div>
                    <div className="text-lg font-semibold text-text-primary">
                      {instructor?.price}〜
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-text-secondary">経験年数</div>
                    <div className="text-sm font-medium text-text-primary">
                      {instructor?.experience}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 pb-6">
                <Link to="/instructor-profile-details">
                  <Button 
                    variant="outline" 
                    fullWidth
                    iconName="ArrowRight"
                    iconPosition="right"
                    className="group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-smooth"
                  >
                    プロフィール詳細
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link to="/instructor-search-results">
            <Button 
              variant="outline" 
              size="lg"
              iconName="Search"
              iconPosition="left"
            >
              すべての講師を見る
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default InstructorShowcase;