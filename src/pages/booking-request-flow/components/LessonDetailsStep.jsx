import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const LessonDetailsStep = ({ data, onDataChange, onNext }) => {
  const [formData, setFormData] = useState({
    duration: data?.duration || '60',
    participantCount: data?.participantCount || '10',
    ageGroup: data?.ageGroup || '',
    lessonType: data?.lessonType || '',
    specialRequirements: data?.specialRequirements || '',
    equipmentNeeds: data?.equipmentNeeds || [],
    additionalNotes: data?.additionalNotes || '',
    ...data
  });

  const [errors, setErrors] = useState({});

  const durationOptions = [
    { value: '30', label: '30分' },
    { value: '45', label: '45分' },
    { value: '60', label: '60分' },
    { value: '90', label: '90分' },
    { value: '120', label: '2時間' }
  ];

  const participantOptions = [
    { value: '5', label: '5名以下' },
    { value: '10', label: '6-10名' },
    { value: '15', label: '11-15名' },
    { value: '20', label: '16-20名' },
    { value: '25', label: '21-25名' },
    { value: '30', label: '26名以上' }
  ];

  const ageGroupOptions = [
    { value: '0-1', label: '0-1歳児' },
    { value: '2-3', label: '2-3歳児' },
    { value: '4-5', label: '4-5歳児' },
    { value: 'mixed', label: '混合年齢' }
  ];

  const lessonTypeOptions = [
    { value: 'music', label: '音楽・リトミック' },
    { value: 'art', label: '美術・工作' },
    { value: 'physical', label: '体操・運動' },
    { value: 'english', label: '英語' },
    { value: 'science', label: '科学実験' },
    { value: 'cooking', label: 'クッキング' },
    { value: 'other', label: 'その他' }
  ];

  const equipmentOptions = [
    { value: 'piano', label: 'ピアノ・キーボード' },
    { value: 'sound', label: '音響機器' },
    { value: 'art', label: '美術用品' },
    { value: 'sports', label: '運動用具' },
    { value: 'projector', label: 'プロジェクター' },
    { value: 'materials', label: '教材・資料' }
  ];

  const handleInputChange = (field, value) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onDataChange(updatedData);
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleEquipmentChange = (equipmentValue, checked) => {
    const updatedEquipment = checked
      ? [...formData?.equipmentNeeds, equipmentValue]
      : formData?.equipmentNeeds?.filter(item => item !== equipmentValue);
    
    handleInputChange('equipmentNeeds', updatedEquipment);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.duration) {
      newErrors.duration = 'レッスン時間を選択してください';
    }
    if (!formData?.participantCount) {
      newErrors.participantCount = '参加人数を選択してください';
    }
    if (!formData?.ageGroup) {
      newErrors.ageGroup = '対象年齢を選択してください';
    }
    if (!formData?.lessonType) {
      newErrors.lessonType = 'レッスン種類を選択してください';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-noto font-semibold text-text-primary mb-2">
          レッスン詳細の設定
        </h2>
        <p className="text-text-secondary">
          レッスンの基本情報を入力してください
        </p>
      </div>
      {/* Basic Settings */}
      <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
        <h3 className="text-lg font-noto font-medium text-text-primary flex items-center">
          <Icon name="Settings" size={20} className="mr-2" strokeWidth={2} />
          基本設定
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="レッスン時間"
            options={durationOptions}
            value={formData?.duration}
            onChange={(value) => handleInputChange('duration', value)}
            error={errors?.duration}
            required
          />

          <Select
            label="参加人数"
            options={participantOptions}
            value={formData?.participantCount}
            onChange={(value) => handleInputChange('participantCount', value)}
            error={errors?.participantCount}
            required
          />

          <Select
            label="対象年齢"
            options={ageGroupOptions}
            value={formData?.ageGroup}
            onChange={(value) => handleInputChange('ageGroup', value)}
            error={errors?.ageGroup}
            required
          />

          <Select
            label="レッスン種類"
            options={lessonTypeOptions}
            value={formData?.lessonType}
            onChange={(value) => handleInputChange('lessonType', value)}
            error={errors?.lessonType}
            required
          />
        </div>
      </div>
      {/* Equipment Requirements */}
      <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
        <h3 className="text-lg font-noto font-medium text-text-primary flex items-center">
          <Icon name="Package" size={20} className="mr-2" strokeWidth={2} />
          必要機材・設備
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {equipmentOptions?.map((option) => (
            <Checkbox
              key={option?.value}
              label={option?.label}
              checked={formData?.equipmentNeeds?.includes(option?.value)}
              onChange={(e) => handleEquipmentChange(option?.value, e?.target?.checked)}
            />
          ))}
        </div>
      </div>
      {/* Special Requirements */}
      <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
        <h3 className="text-lg font-noto font-medium text-text-primary flex items-center">
          <Icon name="AlertCircle" size={20} className="mr-2" strokeWidth={2} />
          特別な要望・注意事項
        </h3>

        <Input
          label="特別な要望"
          type="text"
          placeholder="アレルギー対応、特別な配慮など"
          value={formData?.specialRequirements}
          onChange={(e) => handleInputChange('specialRequirements', e?.target?.value)}
          description="必要に応じて特別な要望をご記入ください"
        />

        <Input
          label="追加メモ"
          type="text"
          placeholder="その他のご要望やメッセージ"
          value={formData?.additionalNotes}
          onChange={(e) => handleInputChange('additionalNotes', e?.target?.value)}
          description="講師への追加メッセージがあればご記入ください"
        />
      </div>
      {/* Summary Card */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 rounded-2xl p-6">
        <h3 className="text-lg font-noto font-medium text-text-primary mb-4 flex items-center">
          <Icon name="FileText" size={20} className="mr-2" strokeWidth={2} />
          設定内容の確認
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-text-secondary">レッスン時間:</span>
              <span className="font-medium text-text-primary">
                {durationOptions?.find(opt => opt?.value === formData?.duration)?.label || '-'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">参加人数:</span>
              <span className="font-medium text-text-primary">
                {participantOptions?.find(opt => opt?.value === formData?.participantCount)?.label || '-'}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-text-secondary">対象年齢:</span>
              <span className="font-medium text-text-primary">
                {ageGroupOptions?.find(opt => opt?.value === formData?.ageGroup)?.label || '-'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">レッスン種類:</span>
              <span className="font-medium text-text-primary">
                {lessonTypeOptions?.find(opt => opt?.value === formData?.lessonType)?.label || '-'}
              </span>
            </div>
          </div>
        </div>

        {formData?.equipmentNeeds?.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border">
            <span className="text-text-secondary text-sm">必要機材: </span>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData?.equipmentNeeds?.map((equipment) => (
                <span
                  key={equipment}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent/20 text-accent-foreground"
                >
                  {equipmentOptions?.find(opt => opt?.value === equipment)?.label}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6">
        <button
          onClick={handleNext}
          className="flex-1 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-smooth flex items-center justify-center"
        >
          <span>次へ進む</span>
          <Icon name="ArrowRight" size={16} className="ml-2" strokeWidth={2} />
        </button>
        
        <button className="px-6 py-3 border border-border rounded-xl font-medium text-text-secondary hover:bg-muted transition-smooth flex items-center justify-center">
          <Icon name="Save" size={16} className="mr-2" strokeWidth={2} />
          下書き保存
        </button>
      </div>
    </div>
  );
};

export default LessonDetailsStep;