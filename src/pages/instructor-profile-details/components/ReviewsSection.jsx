import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ReviewsSection = ({ reviews, overallRating, ratingBreakdown }) => {
  const [sortBy, setSortBy] = useState('newest');
  const [filterRating, setFilterRating] = useState('all');
  const [expandedReviews, setExpandedReviews] = useState(new Set());

  const sortOptions = [
    { value: 'newest', label: '新しい順' },
    { value: 'oldest', label: '古い順' },
    { value: 'highest', label: '評価の高い順' },
    { value: 'lowest', label: '評価の低い順' },
    { value: 'helpful', label: '参考になった順' }
  ];

  const filterOptions = [
    { value: 'all', label: 'すべて' },
    { value: '5', label: '★★★★★' },
    { value: '4', label: '★★★★☆' },
    { value: '3', label: '★★★☆☆' },
    { value: '2', label: '★★☆☆☆' },
    { value: '1', label: '★☆☆☆☆' }
  ];

  const toggleReviewExpansion = (reviewId) => {
    const newExpanded = new Set(expandedReviews);
    if (newExpanded?.has(reviewId)) {
      newExpanded?.delete(reviewId);
    } else {
      newExpanded?.add(reviewId);
    }
    setExpandedReviews(newExpanded);
  };

  const handleHelpfulVote = (reviewId, isHelpful) => {
    // Mock implementation
    console.log(`Voted ${isHelpful ? 'helpful' : 'not helpful'} for review ${reviewId}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-medium p-6 mb-8">
      <h2 className="text-xl font-noto font-semibold text-text-primary mb-6">
        レビュー・評価
      </h2>
      {/* Rating Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Overall Rating */}
        <div className="text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start space-x-4 mb-4">
            <div className="text-4xl font-bold text-text-primary">
              {overallRating?.toFixed(1)}
            </div>
            <div>
              <div className="flex items-center space-x-1 mb-1">
                {[...Array(5)]?.map((_, i) => (
                  <Icon
                    key={i}
                    name="Star"
                    size={20}
                    strokeWidth={2}
                    className={i < Math.floor(overallRating) ? 'text-warning fill-current' : 'text-border'}
                  />
                ))}
              </div>
              <div className="text-sm text-text-secondary">
                {reviews?.length}件のレビュー
              </div>
            </div>
          </div>
        </div>

        {/* Rating Breakdown */}
        <div className="space-y-2">
          {ratingBreakdown?.map((breakdown, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="flex items-center space-x-1 w-16">
                <span className="text-sm text-text-secondary">{breakdown?.stars}</span>
                <Icon name="Star" size={12} strokeWidth={2} className="text-warning" />
              </div>
              <div className="flex-1 bg-muted rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-warning to-warning/80 h-2 rounded-full transition-layout"
                  style={{ width: `${breakdown?.percentage}%` }}
                />
              </div>
              <span className="text-sm text-text-secondary w-12 text-right">
                {breakdown?.count}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-6 border-b border-border">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={16} strokeWidth={2} className="text-text-secondary" />
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e?.target?.value)}
              className="text-sm border border-border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {filterOptions?.map(option => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Icon name="ArrowUpDown" size={16} strokeWidth={2} className="text-text-secondary" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="text-sm border border-border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            {sortOptions?.map(option => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Reviews List */}
      <div className="space-y-6">
        {reviews?.map((review) => (
          <div key={review?.id} className="border border-border rounded-xl p-6">
            {/* Review Header */}
            <div className="flex items-start space-x-4 mb-4">
              <Image
                src={review?.reviewer?.avatar}
                alt={review?.reviewer?.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-text-primary">
                      {review?.reviewer?.name}
                    </h4>
                    <p className="text-sm text-text-secondary">
                      {review?.reviewer?.nurseryName} • {formatDate(review?.date)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)]?.map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={14}
                        strokeWidth={2}
                        className={i < review?.rating ? 'text-warning fill-current' : 'text-border'}
                      />
                    ))}
                  </div>
                </div>

                {/* Lesson Info */}
                <div className="flex items-center space-x-4 text-xs text-text-secondary mb-3">
                  <span className="flex items-center space-x-1">
                    <Icon name="BookOpen" size={12} strokeWidth={2} />
                    <span>{review?.lessonType}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="Calendar" size={12} strokeWidth={2} />
                    <span>{review?.lessonDate}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="Users" size={12} strokeWidth={2} />
                    <span>{review?.participantCount}名参加</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Review Content */}
            <div className="mb-4">
              <p className={`text-text-secondary leading-relaxed ${
                !expandedReviews?.has(review?.id) && review?.content?.length > 200
                  ? 'line-clamp-3' :''
              }`}>
                {review?.content}
              </p>
              {review?.content?.length > 200 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleReviewExpansion(review?.id)}
                  className="mt-2 p-0 h-auto text-primary hover:text-primary/80"
                >
                  {expandedReviews?.has(review?.id) ? '折りたたむ' : 'もっと見る'}
                </Button>
              )}
            </div>

            {/* Review Images */}
            {review?.images && review?.images?.length > 0 && (
              <div className="flex space-x-2 mb-4 overflow-x-auto">
                {review?.images?.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={`レビュー画像 ${index + 1}`}
                    className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                  />
                ))}
              </div>
            )}

            {/* Helpful Votes */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleHelpfulVote(review?.id, true)}
                  className="flex items-center space-x-2 text-sm text-text-secondary hover:text-text-primary transition-smooth"
                >
                  <Icon name="ThumbsUp" size={14} strokeWidth={2} />
                  <span>参考になった ({review?.helpfulCount})</span>
                </button>
                <button
                  onClick={() => handleHelpfulVote(review?.id, false)}
                  className="flex items-center space-x-2 text-sm text-text-secondary hover:text-text-primary transition-smooth"
                >
                  <Icon name="ThumbsDown" size={14} strokeWidth={2} />
                  <span>参考にならなかった</span>
                </button>
              </div>

              {review?.verified && (
                <div className="flex items-center space-x-1 text-xs text-success">
                  <Icon name="CheckCircle" size={12} strokeWidth={2} />
                  <span>認証済みレビュー</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Load More */}
      <div className="text-center mt-8">
        <Button variant="outline">
          さらに読み込む
        </Button>
      </div>
    </div>
  );
};

export default ReviewsSection;