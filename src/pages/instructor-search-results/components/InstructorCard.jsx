import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const InstructorCard = ({ instructor, viewMode = 'grid' }) => {
  const {
    id,
    name,
    avatar,
    specialties = [],
    rating = 0,
    reviewCount = 0,
    hourlyRate,
    lessonModes = [],
    ageGroups = [],
    isAvailable = false,
    location,
    bio,
    recentReview
  } = instructor;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0
    })?.format(price);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars?.push(
          <Icon key={i} name="Star" size={14} className="text-warning fill-current" strokeWidth={0} />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars?.push(
          <Icon key={i} name="Star" size={14} className="text-warning fill-current opacity-50" strokeWidth={0} />
        );
      } else {
        stars?.push(
          <Icon key={i} name="Star" size={14} className="text-border" strokeWidth={1} />
        );
      }
    }
    return stars;
  };

  const getLessonModeIcon = (mode) => {
    switch (mode) {
      case 'onsite': return 'MapPin';
      case 'online': return 'Video';
      case 'both': return 'Globe';
      default: return 'BookOpen';
    }
  };

  const getLessonModeLabel = (mode) => {
    switch (mode) {
      case 'onsite': return '対面';
      case 'online': return 'オンライン';
      case 'both': return '両方対応';
      default: return mode;
    }
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-card border border-border rounded-2xl shadow-soft hover:shadow-medium transition-smooth p-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
          {/* Avatar and Basic Info */}
          <div className="flex items-start space-x-4 flex-shrink-0">
            <div className="relative">
              <Image
                src={avatar}
                alt={name}
                className="w-16 h-16 rounded-full object-cover"
              />
              {isAvailable && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success border-2 border-card rounded-full" />
              )}
            </div>
            
            <div className="min-w-0">
              <h3 className="text-lg font-noto font-semibold text-text-primary mb-1">
                {name}
              </h3>
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex items-center space-x-1">
                  {renderStars(rating)}
                </div>
                <span className="text-sm text-text-secondary">
                  {rating?.toFixed(1)} ({reviewCount}件)
                </span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="MapPin" size={14} strokeWidth={2} />
                <span>{location}</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="mb-3">
              <p className="text-sm text-text-secondary line-clamp-2">
                {bio}
              </p>
            </div>

            {/* Specialties */}
            <div className="flex flex-wrap gap-2 mb-3">
              {specialties?.slice(0, 3)?.map((specialty, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent/20 text-accent-foreground"
                >
                  {specialty}
                </span>
              ))}
              {specialties?.length > 3 && (
                <span className="text-xs text-text-secondary">
                  +{specialties?.length - 3}個
                </span>
              )}
            </div>

            {/* Lesson Modes and Age Groups */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary">
              <div className="flex items-center space-x-2">
                {lessonModes?.map((mode, index) => (
                  <div key={index} className="flex items-center space-x-1">
                    <Icon name={getLessonModeIcon(mode)} size={14} strokeWidth={2} />
                    <span>{getLessonModeLabel(mode)}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Users" size={14} strokeWidth={2} />
                <span>{ageGroups?.join(', ')}</span>
              </div>
            </div>
          </div>

          {/* Price and Actions */}
          <div className="flex flex-col items-end space-y-3 flex-shrink-0">
            <div className="text-right">
              <div className="text-2xl font-semibold text-text-primary">
                {formatPrice(hourlyRate)}
              </div>
              <div className="text-sm text-text-secondary">
                1時間あたり
              </div>
            </div>

            <div className="flex flex-col space-y-2 w-full lg:w-auto">
              <Link to={`/instructor-profile-details?id=${id}`}>
                <Button variant="outline" size="sm" fullWidth>
                  プロフィール表示
                </Button>
              </Link>
              <Link to={`/booking-request-flow?instructorId=${id}`}>
                <Button variant="default" size="sm" fullWidth>
                  予約リクエスト
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-2xl shadow-soft hover:shadow-medium transition-smooth overflow-hidden">
      {/* Header with Avatar */}
      <div className="relative p-6 pb-4">
        <div className="flex items-start space-x-4">
          <div className="relative flex-shrink-0">
            <Image
              src={avatar}
              alt={name}
              className="w-16 h-16 rounded-full object-cover"
            />
            {isAvailable && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success border-2 border-card rounded-full" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-noto font-semibold text-text-primary mb-1 truncate">
              {name}
            </h3>
            <div className="flex items-center space-x-2 mb-2">
              <div className="flex items-center space-x-1">
                {renderStars(rating)}
              </div>
              <span className="text-sm text-text-secondary">
                {rating?.toFixed(1)}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-text-secondary">
              <Icon name="MapPin" size={14} strokeWidth={2} />
              <span className="truncate">{location}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="px-6 pb-4">
        {/* Bio */}
        <p className="text-sm text-text-secondary line-clamp-2 mb-4">
          {bio}
        </p>

        {/* Specialties */}
        <div className="flex flex-wrap gap-2 mb-4">
          {specialties?.slice(0, 2)?.map((specialty, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent/20 text-accent-foreground"
            >
              {specialty}
            </span>
          ))}
          {specialties?.length > 2 && (
            <span className="text-xs text-text-secondary">
              +{specialties?.length - 2}
            </span>
          )}
        </div>

        {/* Lesson Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name={getLessonModeIcon(lessonModes?.[0])} size={14} strokeWidth={2} />
            <span>{lessonModes?.map(mode => getLessonModeLabel(mode))?.join(', ')}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="Users" size={14} strokeWidth={2} />
            <span>{ageGroups?.join(', ')}</span>
          </div>
        </div>

        {/* Recent Review */}
        {recentReview && (
          <div className="bg-muted rounded-lg p-3 mb-4">
            <p className="text-xs text-text-secondary line-clamp-2">
              "{recentReview?.comment}"
            </p>
            <div className="text-xs text-text-secondary mt-1">
              - {recentReview?.reviewerName}
            </div>
          </div>
        )}
      </div>
      {/* Footer */}
      <div className="px-6 py-4 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-xl font-semibold text-text-primary">
              {formatPrice(hourlyRate)}
            </div>
            <div className="text-xs text-text-secondary">
              1時間あたり
            </div>
          </div>
          <div className="text-xs text-text-secondary">
            {reviewCount}件のレビュー
          </div>
        </div>

        <div className="flex space-x-2">
          <Link to={`/instructor-profile-details?id=${id}`} className="flex-1">
            <Button variant="outline" size="sm" fullWidth>
              詳細表示
            </Button>
          </Link>
          <Link to={`/booking-request-flow?instructorId=${id}`} className="flex-1">
            <Button variant="default" size="sm" fullWidth>
              予約する
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InstructorCard;