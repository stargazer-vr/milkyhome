import React, { useState, useEffect } from 'react';
import PublicHeader from '../../components/ui/PublicHeader';
import SearchFilters from './components/SearchFilters';
import SortControls from './components/SortControls';
import SearchResultsGrid from './components/SearchResultsGrid';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const InstructorSearchResults = () => {
  const [filters, setFilters] = useState({
    keyword: '',
    region: '',
    categories: [],
    ageGroups: [],
    priceMin: '',
    priceMax: '',
    lessonMode: '',
    minRating: '',
    availability: false
  });

  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Mock instructor data
  const mockInstructors = [
    {
      id: 1,
      name: '田中 美咲',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      specialties: ['音楽', 'ピアノ', '歌唱指導'],
      rating: 4.8,
      reviewCount: 127,
      hourlyRate: 3500,
      lessonModes: ['onsite', 'online'],
      ageGroups: ['2-3歳', '4-5歳'],
      isAvailable: true,
      location: '東京都渋谷区',
      bio: `音楽大学卒業後、10年間の保育園での指導経験があります。\n子どもたちの創造性を育む音楽教育を心がけています。`,
      recentReview: {
        comment: '子どもたちが楽しそうに歌っている姿が印象的でした。',
        reviewerName: '山田保育園'
      }
    },
    {
      id: 2,
      name: '佐藤 健太',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      specialties: ['体育', 'サッカー', '運動指導'],
      rating: 4.6,
      reviewCount: 89,
      hourlyRate: 4000,
      lessonModes: ['onsite'],
      ageGroups: ['4-5歳', '6歳以上'],
      isAvailable: true,
      location: '神奈川県横浜市',
      bio: `元プロサッカー選手として、子どもたちに運動の楽しさを伝えています。\n基礎体力向上と協調性を重視した指導を行います。`,
      recentReview: {
        comment: 'とても熱心で子どもたちも大喜びでした。',
        reviewerName: 'さくら保育園'
      }
    },
    {
      id: 3,
      name: '鈴木 花音',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      specialties: ['英語', '国際交流', '異文化理解'],
      rating: 4.9,
      reviewCount: 156,
      hourlyRate: 4500,
      lessonModes: ['both'],
      ageGroups: ['2-3歳', '4-5歳', '6歳以上'],
      isAvailable: false,
      location: '東京都新宿区',
      bio: `アメリカでの留学経験を活かし、楽しい英語教育を提供します。\n歌やゲームを通じて自然に英語に親しめる環境を作ります。`,
      recentReview: {
        comment: '子どもたちが英語を好きになりました。',
        reviewerName: 'みどり幼稚園'
      }
    },
    {
      id: 4,
      name: '山田 雅子',
      avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop&crop=face',
      specialties: ['美術', '工作', '創作活動'],
      rating: 4.7,
      reviewCount: 203,
      hourlyRate: 3200,
      lessonModes: ['onsite', 'online'],
      ageGroups: ['0-1歳', '2-3歳', '4-5歳'],
      isAvailable: true,
      location: '大阪府大阪市',
      bio: `美術大学で学んだ技術を活かし、子どもたちの創造力を育てます。\n季節に合わせた工作や絵画指導を得意としています。`,
      recentReview: {
        comment: '毎回素敵な作品ができて感動しています。',
        reviewerName: 'ひまわり保育園'
      }
    },
    {
      id: 5,
      name: '高橋 直樹',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      specialties: ['科学実験', 'STEM教育', '理科'],
      rating: 4.5,
      reviewCount: 67,
      hourlyRate: 5000,
      lessonModes: ['onsite'],
      ageGroups: ['4-5歳', '6歳以上'],
      isAvailable: true,
      location: '埼玉県さいたま市',
      bio: `理系大学院修了後、子ども向け科学教育に従事しています。\n安全で楽しい実験を通じて科学の面白さを伝えます。`,
      recentReview: {
        comment: '子どもたちが目を輝かせて実験に参加していました。',
        reviewerName: 'つばき保育園'
      }
    },
    {
      id: 6,
      name: '伊藤 麻衣',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
      specialties: ['ダンス', 'リトミック', '表現活動'],
      rating: 4.8,
      reviewCount: 134,
      hourlyRate: 3800,
      lessonModes: ['onsite', 'online'],
      ageGroups: ['2-3歳', '4-5歳'],
      isAvailable: true,
      location: '千葉県千葉市',
      bio: `ダンススタジオでの指導経験を活かし、リズム感と表現力を育てます。\n子どもたちが自由に体を動かせる楽しいレッスンを心がけています。`,
      recentReview: {
        comment: '子どもたちの笑顔が絶えない素晴らしい時間でした。',
        reviewerName: 'あおば幼稚園'
      }
    }
  ];

  const [instructors, setInstructors] = useState(mockInstructors);
  const [filteredInstructors, setFilteredInstructors] = useState(mockInstructors);

  // Filter and sort instructors
  useEffect(() => {
    let filtered = [...instructors];

    // Apply filters
    if (filters?.keyword) {
      filtered = filtered?.filter(instructor =>
        instructor?.name?.toLowerCase()?.includes(filters?.keyword?.toLowerCase()) ||
        instructor?.specialties?.some(specialty => 
          specialty?.toLowerCase()?.includes(filters?.keyword?.toLowerCase())
        ) ||
        instructor?.bio?.toLowerCase()?.includes(filters?.keyword?.toLowerCase())
      );
    }

    if (filters?.region) {
      filtered = filtered?.filter(instructor =>
        instructor?.location?.includes(filters?.region)
      );
    }

    if (filters?.categories?.length > 0) {
      filtered = filtered?.filter(instructor =>
        instructor?.specialties?.some(specialty =>
          filters?.categories?.some(category => {
            const categoryMap = {
              'music': '音楽',
              'art': '美術',
              'sports': '体育',
              'english': '英語',
              'science': '科学',
              'dance': 'ダンス'
            };
            return specialty?.includes(categoryMap?.[category]);
          })
        )
      );
    }

    if (filters?.ageGroups?.length > 0) {
      filtered = filtered?.filter(instructor =>
        instructor?.ageGroups?.some(age => filters?.ageGroups?.includes(age))
      );
    }

    if (filters?.priceMin) {
      filtered = filtered?.filter(instructor =>
        instructor?.hourlyRate >= parseInt(filters?.priceMin)
      );
    }

    if (filters?.priceMax) {
      filtered = filtered?.filter(instructor =>
        instructor?.hourlyRate <= parseInt(filters?.priceMax)
      );
    }

    if (filters?.lessonMode) {
      filtered = filtered?.filter(instructor =>
        instructor?.lessonModes?.includes(filters?.lessonMode) ||
        (filters?.lessonMode === 'both' && instructor?.lessonModes?.length > 1)
      );
    }

    if (filters?.minRating) {
      filtered = filtered?.filter(instructor =>
        instructor?.rating >= parseFloat(filters?.minRating)
      );
    }

    if (filters?.availability) {
      filtered = filtered?.filter(instructor => instructor?.isAvailable);
    }

    // Apply sorting
    switch (sortBy) {
      case 'rating':
        filtered?.sort((a, b) => b?.rating - a?.rating);
        break;
      case 'price_low':
        filtered?.sort((a, b) => a?.hourlyRate - b?.hourlyRate);
        break;
      case 'price_high':
        filtered?.sort((a, b) => b?.hourlyRate - a?.hourlyRate);
        break;
      case 'availability':
        filtered?.sort((a, b) => b?.isAvailable - a?.isAvailable);
        break;
      case 'newest':
        filtered?.sort((a, b) => b?.id - a?.id);
        break;
      default: // relevance
        break;
    }

    setFilteredInstructors(filtered);
  }, [filters, sortBy, instructors]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleLoadMore = () => {
    setLoading(true);
    // Simulate loading more results
    setTimeout(() => {
      setLoading(false);
      setHasMore(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      {/* Main Content */}
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-text-secondary mb-4">
              <span>ホーム</span>
              <Icon name="ChevronRight" size={14} strokeWidth={2} />
              <span>講師検索</span>
            </div>
            <h1 className="text-3xl font-noto font-bold text-text-primary mb-2">
              講師検索結果
            </h1>
            <p className="text-text-secondary">
              あなたの保育園にぴったりの講師を見つけましょう
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters - Desktop */}
            <aside className="hidden lg:block lg:w-80 flex-shrink-0">
              <div className="sticky top-24">
                <SearchFilters
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  resultCount={filteredInstructors?.length}
                  onToggle={() => {}}
                />
              </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 min-w-0">
              {/* Mobile Filter Toggle */}
              <div className="lg:hidden mb-6">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(true)}
                  iconName="Filter"
                  iconPosition="left"
                  fullWidth
                >
                  フィルター ({filteredInstructors?.length}件)
                </Button>
              </div>

              {/* Sort Controls */}
              <div className="mb-6">
                <SortControls
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                  viewMode={viewMode}
                  onViewModeChange={setViewMode}
                  resultCount={filteredInstructors?.length}
                />
              </div>

              {/* Results Grid */}
              <SearchResultsGrid
                instructors={filteredInstructors}
                viewMode={viewMode}
                loading={loading}
                hasMore={hasMore}
                onLoadMore={handleLoadMore}
              />
            </div>
          </div>
        </div>
      </main>
      {/* Mobile Filter Modal */}
      {showFilters && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50">
          <div className="fixed inset-y-0 left-0 w-full max-w-sm bg-background">
            <SearchFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              resultCount={filteredInstructors?.length}
              isVisible={showFilters}
              onToggle={() => setShowFilters(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorSearchResults;