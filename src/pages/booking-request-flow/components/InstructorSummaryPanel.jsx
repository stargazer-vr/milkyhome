import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const InstructorSummaryPanel = ({ instructor }) => {
  const mockInstructor = {
    id: 1,
    name: "田中 美咲",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    specialties: ["音楽教育", "リトミック", "ピアノ"],
    rating: 4.8,
    reviewCount: 127,
    experience: "5年",
    location: "東京都渋谷区",
    isOnline: true,
    responseTime: "平均2時間以内",
    completedLessons: 234,
    bio: `幼児音楽教育の専門家として、5年間で200以上のレッスンを実施。\n子どもたちの創造性と音楽的感性を育むことを大切にしています。`,
    certifications: ["幼児音楽指導員", "リトミック指導資格"],
    equipment: ["電子ピアノ", "音響機器", "楽器セット"]
  };

  const instructorData = instructor || mockInstructor;

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-soft sticky top-6">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative">
          <Image
            src={instructorData?.avatar}
            alt={instructorData?.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          {instructorData?.isOnline && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success border-2 border-card rounded-full" />
          )}
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-noto font-semibold text-text-primary">
            {instructorData?.name}
          </h3>
          <div className="flex items-center space-x-2 mt-1">
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={14} className="text-warning fill-current" strokeWidth={2} />
              <span className="text-sm font-medium text-text-primary">
                {instructorData?.rating}
              </span>
            </div>
            <span className="text-sm text-text-secondary">
              ({instructorData?.reviewCount}件のレビュー)
            </span>
          </div>
        </div>
      </div>
      {/* Specialties */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-text-primary mb-3">専門分野</h4>
        <div className="flex flex-wrap gap-2">
          {instructorData?.specialties?.map((specialty, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent/20 text-accent-foreground"
            >
              {specialty}
            </span>
          ))}
        </div>
      </div>
      {/* Key Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-3 bg-muted rounded-xl">
          <div className="text-lg font-semibold text-text-primary">
            {instructorData?.completedLessons}
          </div>
          <div className="text-xs text-text-secondary">完了レッスン</div>
        </div>
        <div className="text-center p-3 bg-muted rounded-xl">
          <div className="text-lg font-semibold text-text-primary">
            {instructorData?.experience}
          </div>
          <div className="text-xs text-text-secondary">経験年数</div>
        </div>
      </div>
      {/* Quick Info */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="MapPin" size={16} className="text-text-secondary" strokeWidth={2} />
          <span className="text-sm text-text-secondary">{instructorData?.location}</span>
        </div>
        <div className="flex items-center space-x-3">
          <Icon name="Clock" size={16} className="text-text-secondary" strokeWidth={2} />
          <span className="text-sm text-text-secondary">{instructorData?.responseTime}</span>
        </div>
      </div>
      {/* Bio */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-text-primary mb-2">プロフィール</h4>
        <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">
          {instructorData?.bio}
        </p>
      </div>
      {/* Certifications */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-text-primary mb-3">資格・認定</h4>
        <div className="space-y-2">
          {instructorData?.certifications?.map((cert, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Icon name="Award" size={14} className="text-primary" strokeWidth={2} />
              <span className="text-sm text-text-secondary">{cert}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Equipment */}
      <div>
        <h4 className="text-sm font-medium text-text-primary mb-3">持参機材</h4>
        <div className="space-y-2">
          {instructorData?.equipment?.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Icon name="Package" size={14} className="text-secondary" strokeWidth={2} />
              <span className="text-sm text-text-secondary">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstructorSummaryPanel;