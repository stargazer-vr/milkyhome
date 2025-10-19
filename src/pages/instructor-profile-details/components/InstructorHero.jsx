import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const InstructorHero = ({ instructor, onBookingRequest, onSendMessage, onSaveToFavorites }) => {
  return (
    <div className="bg-white rounded-2xl shadow-medium p-8 mb-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <div className="relative">
            <Image
              src={instructor?.profileImage}
              alt={instructor?.name}
              className="w-48 h-48 rounded-2xl object-cover"
            />
            <div className="absolute -bottom-2 -right-2 bg-success text-success-foreground px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
              <Icon name="CheckCircle" size={16} strokeWidth={2} />
              <span>認証済み</span>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-noto font-bold text-text-primary mb-2">
                {instructor?.name}
              </h1>
              <div className="flex items-center space-x-4 text-text-secondary mb-3">
                <div className="flex items-center space-x-1">
                  <Icon name="MapPin" size={16} strokeWidth={2} />
                  <span className="text-sm">{instructor?.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={16} strokeWidth={2} />
                  <span className="text-sm">経験 {instructor?.experience}年</span>
                </div>
              </div>
              
              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)]?.map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={16}
                      strokeWidth={2}
                      className={i < Math.floor(instructor?.rating) ? 'text-warning fill-current' : 'text-border'}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-text-primary">
                  {instructor?.rating}
                </span>
                <span className="text-sm text-text-secondary">
                  ({instructor?.reviewCount}件のレビュー)
                </span>
              </div>

              {/* Specialties */}
              <div className="flex flex-wrap gap-2 mb-4">
                {instructor?.specialties?.map((specialty, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-primary/20 to-secondary/20 text-text-primary border border-primary/30"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:flex-shrink-0">
              <Button
                variant="default"
                onClick={onBookingRequest}
                iconName="Calendar"
                iconPosition="left"
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
              >
                予約リクエスト
              </Button>
              <Button
                variant="outline"
                onClick={onSendMessage}
                iconName="MessageCircle"
                iconPosition="left"
              >
                メッセージ
              </Button>
              <Button
                variant="ghost"
                onClick={onSaveToFavorites}
                iconName="Heart"
                iconPosition="left"
              >
                お気に入り
              </Button>
            </div>
          </div>

          {/* Bio */}
          <div>
            <h3 className="text-lg font-noto font-semibold text-text-primary mb-3">
              自己紹介
            </h3>
            <p className="text-text-secondary leading-relaxed">
              {instructor?.bio}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorHero;