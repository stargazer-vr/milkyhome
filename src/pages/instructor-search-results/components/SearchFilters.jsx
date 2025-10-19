import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const SearchFilters = ({ 
  filters, 
  onFiltersChange, 
  resultCount = 0,
  isVisible = true,
  onToggle 
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const regionOptions = [
    { value: 'tokyo', label: '東京都' },
    { value: 'osaka', label: '大阪府' },
    { value: 'kanagawa', label: '神奈川県' },
    { value: 'saitama', label: '埼玉県' },
    { value: 'chiba', label: '千葉県' }
  ];

  const categoryOptions = [
    { value: 'music', label: '音楽' },
    { value: 'art', label: '美術・工作' },
    { value: 'sports', label: '体育・運動' },
    { value: 'english', label: '英語' },
    { value: 'science', label: '科学実験' },
    { value: 'dance', label: 'ダンス' }
  ];

  const ageGroupOptions = [
    { value: '0-1', label: '0-1歳' },
    { value: '2-3', label: '2-3歳' },
    { value: '4-5', label: '4-5歳' },
    { value: '6+', label: '6歳以上' }
  ];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleArrayFilterChange = (key, value, checked) => {
    const currentArray = localFilters?.[key] || [];
    const updatedArray = checked 
      ? [...currentArray, value]
      : currentArray?.filter(item => item !== value);
    
    handleFilterChange(key, updatedArray);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      keyword: '',
      region: '',
      categories: [],
      ageGroups: [],
      priceMin: '',
      priceMax: '',
      lessonMode: '',
      minRating: '',
      availability: false
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = Object.values(localFilters)?.some(value => 
    Array.isArray(value) ? value?.length > 0 : value !== '' && value !== false
  );

  return (
    <div className={`bg-card border border-border rounded-2xl shadow-soft transition-layout ${
      isVisible ? 'block' : 'hidden lg:block'
    }`}>
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-border">
        <h3 className="text-lg font-noto font-semibold text-text-primary">
          検索フィルター
        </h3>
        <Button variant="ghost" size="icon" onClick={onToggle}>
          <Icon name="X" size={20} strokeWidth={2} />
        </Button>
      </div>
      <div className="p-6 space-y-6">
        {/* Results Count */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-text-secondary">
            {resultCount}件の講師が見つかりました
          </div>
          {hasActiveFilters && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearAllFilters}
              className="text-primary hover:text-primary/80"
            >
              <Icon name="X" size={14} strokeWidth={2} className="mr-1" />
              クリア
            </Button>
          )}
        </div>

        {/* Keyword Search */}
        <div>
          <Input
            label="キーワード検索"
            type="search"
            placeholder="専門分野、スキルで検索..."
            value={localFilters?.keyword || ''}
            onChange={(e) => handleFilterChange('keyword', e?.target?.value)}
          />
        </div>

        {/* Region Filter */}
        <div>
          <Select
            label="地域"
            placeholder="地域を選択"
            options={regionOptions}
            value={localFilters?.region || ''}
            onChange={(value) => handleFilterChange('region', value)}
            clearable
          />
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            カテゴリー
          </label>
          <div className="space-y-2">
            {categoryOptions?.map((category) => (
              <Checkbox
                key={category?.value}
                label={category?.label}
                checked={(localFilters?.categories || [])?.includes(category?.value)}
                onChange={(e) => handleArrayFilterChange('categories', category?.value, e?.target?.checked)}
              />
            ))}
          </div>
        </div>

        {/* Age Groups */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            対象年齢
          </label>
          <div className="space-y-2">
            {ageGroupOptions?.map((ageGroup) => (
              <Checkbox
                key={ageGroup?.value}
                label={ageGroup?.label}
                checked={(localFilters?.ageGroups || [])?.includes(ageGroup?.value)}
                onChange={(e) => handleArrayFilterChange('ageGroups', ageGroup?.value, e?.target?.checked)}
              />
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            料金範囲（1時間あたり）
          </label>
          <div className="grid grid-cols-2 gap-3">
            <Input
              type="number"
              placeholder="最低料金"
              value={localFilters?.priceMin || ''}
              onChange={(e) => handleFilterChange('priceMin', e?.target?.value)}
            />
            <Input
              type="number"
              placeholder="最高料金"
              value={localFilters?.priceMax || ''}
              onChange={(e) => handleFilterChange('priceMax', e?.target?.value)}
            />
          </div>
        </div>

        {/* Lesson Mode */}
        <div>
          <Select
            label="授業形式"
            placeholder="形式を選択"
            options={[
              { value: 'onsite', label: '対面授業' },
              { value: 'online', label: 'オンライン授業' },
              { value: 'both', label: '両方対応' }
            ]}
            value={localFilters?.lessonMode || ''}
            onChange={(value) => handleFilterChange('lessonMode', value)}
            clearable
          />
        </div>

        {/* Rating Filter */}
        <div>
          <Select
            label="評価"
            placeholder="最低評価を選択"
            options={[
              { value: '4', label: '4.0以上' },
              { value: '3', label: '3.0以上' },
              { value: '2', label: '2.0以上' }
            ]}
            value={localFilters?.minRating || ''}
            onChange={(value) => handleFilterChange('minRating', value)}
            clearable
          />
        </div>

        {/* Availability */}
        <div>
          <Checkbox
            label="今すぐ予約可能"
            description="直近2週間で予約可能な講師のみ表示"
            checked={localFilters?.availability || false}
            onChange={(e) => handleFilterChange('availability', e?.target?.checked)}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;