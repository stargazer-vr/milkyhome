import React from 'react';
import InstructorCard from './InstructorCard';
import Icon from '../../../components/AppIcon';

const SearchResultsGrid = ({ 
  instructors = [], 
  viewMode = 'grid', 
  loading = false,
  hasMore = false,
  onLoadMore 
}) => {
  const LoadingSkeleton = () => (
    <div className="animate-pulse">
      {viewMode === 'grid' ? (
        <div className="bg-muted rounded-2xl p-6">
          <div className="flex items-start space-x-4 mb-4">
            <div className="w-16 h-16 bg-border rounded-full" />
            <div className="flex-1">
              <div className="h-4 bg-border rounded mb-2" />
              <div className="h-3 bg-border rounded w-2/3 mb-2" />
              <div className="h-3 bg-border rounded w-1/2" />
            </div>
          </div>
          <div className="space-y-2 mb-4">
            <div className="h-3 bg-border rounded" />
            <div className="h-3 bg-border rounded w-3/4" />
          </div>
          <div className="flex space-x-2 mb-4">
            <div className="h-6 bg-border rounded-full w-16" />
            <div className="h-6 bg-border rounded-full w-20" />
          </div>
          <div className="flex space-x-2">
            <div className="h-8 bg-border rounded flex-1" />
            <div className="h-8 bg-border rounded flex-1" />
          </div>
        </div>
      ) : (
        <div className="bg-muted rounded-2xl p-6">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-border rounded-full flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-border rounded w-1/4" />
              <div className="h-3 bg-border rounded w-1/3" />
              <div className="h-3 bg-border rounded w-full" />
              <div className="h-3 bg-border rounded w-3/4" />
            </div>
            <div className="flex-shrink-0 space-y-2">
              <div className="h-6 bg-border rounded w-20" />
              <div className="h-8 bg-border rounded w-24" />
            </div>
          </div>
        </div>
      )}
    </div>
  );

  if (loading && instructors?.length === 0) {
    return (
      <div className={`grid gap-6 ${
        viewMode === 'grid' ?'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' :'grid-cols-1'
      }`}>
        {Array.from({ length: 6 })?.map((_, index) => (
          <LoadingSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (instructors?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
          <Icon name="Search" size={32} strokeWidth={1} className="text-text-secondary" />
        </div>
        <h3 className="text-xl font-noto font-semibold text-text-primary mb-2">
          講師が見つかりませんでした
        </h3>
        <p className="text-text-secondary mb-6 max-w-md">
          検索条件を変更して再度お試しください。\nより多くの講師を見つけるために、フィルターを調整してみてください。
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-smooth">
            フィルターをリセット
          </button>
          <button className="px-6 py-2 border border-border text-text-primary rounded-lg hover:bg-muted transition-smooth">
            検索条件を変更
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Grid */}
      <div className={`grid gap-6 ${
        viewMode === 'grid' ?'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' :'grid-cols-1'
      }`}>
        {instructors?.map((instructor) => (
          <InstructorCard
            key={instructor?.id}
            instructor={instructor}
            viewMode={viewMode}
          />
        ))}
      </div>
      {/* Loading More */}
      {loading && instructors?.length > 0 && (
        <div className={`grid gap-6 ${
          viewMode === 'grid' ?'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' :'grid-cols-1'
        }`}>
          {Array.from({ length: 3 })?.map((_, index) => (
            <LoadingSkeleton key={`loading-${index}`} />
          ))}
        </div>
      )}
      {/* Load More Button */}
      {hasMore && !loading && (
        <div className="flex justify-center pt-8">
          <button
            onClick={onLoadMore}
            className="flex items-center space-x-2 px-8 py-3 bg-card border border-border text-text-primary rounded-lg hover:bg-muted transition-smooth"
          >
            <Icon name="ChevronDown" size={16} strokeWidth={2} />
            <span>さらに表示</span>
          </button>
        </div>
      )}
      {/* End of Results */}
      {!hasMore && instructors?.length > 0 && (
        <div className="text-center py-8">
          <div className="text-sm text-text-secondary">
            すべての結果を表示しました
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResultsGrid;