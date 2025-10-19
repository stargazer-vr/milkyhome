import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const SortControls = ({ 
  sortBy = 'relevance', 
  onSortChange, 
  viewMode = 'grid', 
  onViewModeChange,
  resultCount = 0 
}) => {
  const sortOptions = [
    { value: 'relevance', label: '関連度順' },
    { value: 'rating', label: '評価順' },
    { value: 'price_low', label: '料金安い順' },
    { value: 'price_high', label: '料金高い順' },
    { value: 'availability', label: '予約可能順' },
    { value: 'newest', label: '新着順' }
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-card border border-border rounded-2xl shadow-soft">
      {/* Results Info */}
      <div className="flex items-center space-x-4">
        <span className="text-sm text-text-secondary">
          {resultCount}件の講師
        </span>
        <div className="hidden sm:block w-px h-4 bg-border" />
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={16} strokeWidth={2} className="text-text-secondary" />
          <span className="text-sm text-text-secondary">
            フィルター適用中
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-4">
        {/* Sort Dropdown */}
        <div className="min-w-[160px]">
          <Select
            placeholder="並び順"
            options={sortOptions}
            value={sortBy}
            onChange={onSortChange}
          />
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center border border-border rounded-lg overflow-hidden">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('grid')}
            className="rounded-none border-0"
          >
            <Icon name="Grid3X3" size={16} strokeWidth={2} />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('list')}
            className="rounded-none border-0 border-l border-border"
          >
            <Icon name="List" size={16} strokeWidth={2} />
          </Button>
        </div>

        {/* Refresh Button */}
        <Button variant="ghost" size="sm">
          <Icon name="RefreshCw" size={16} strokeWidth={2} />
        </Button>
      </div>
    </div>
  );
};

export default SortControls;