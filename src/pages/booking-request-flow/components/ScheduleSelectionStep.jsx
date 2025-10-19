import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';

const ScheduleSelectionStep = ({ data, onDataChange, onNext, onPrevious }) => {
  const [formData, setFormData] = useState({
    selectedDate: data?.selectedDate || '',
    selectedTime: data?.selectedTime || '',
    lessonMode: data?.lessonMode || 'onsite',
    alternativeDates: data?.alternativeDates || [],
    ...data
  });

  const [errors, setErrors] = useState({});
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Mock availability data
  const mockAvailability = {
    '2025-10-15': ['09:00', '10:30', '14:00', '15:30'],
    '2025-10-16': ['09:00', '11:00', '13:30'],
    '2025-10-17': ['10:00', '14:00', '16:00'],
    '2025-10-18': ['09:30', '11:30', '15:00'],
    '2025-10-22': ['09:00', '10:30', '14:00'],
    '2025-10-23': ['11:00', '13:30', '15:30'],
    '2025-10-24': ['09:00', '14:00', '16:00']
  };

  const lessonModeOptions = [
    { value: 'onsite', label: '対面レッスン（園内）' },
    { value: 'online', label: 'オンラインレッスン' }
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00'
  ];

  const generateCalendarDays = () => {
    const year = currentMonth?.getFullYear();
    const month = currentMonth?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate?.setDate(startDate?.getDate() - firstDay?.getDay());
    
    const days = [];
    const currentDate = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      const dateStr = currentDate?.toISOString()?.split('T')?.[0];
      const isCurrentMonth = currentDate?.getMonth() === month;
      const isToday = dateStr === new Date()?.toISOString()?.split('T')?.[0];
      const isPast = currentDate < new Date()?.setHours(0, 0, 0, 0);
      const hasAvailability = mockAvailability?.[dateStr];
      
      days?.push({
        date: new Date(currentDate),
        dateStr,
        day: currentDate?.getDate(),
        isCurrentMonth,
        isToday,
        isPast,
        hasAvailability,
        availableSlots: hasAvailability || []
      });
      
      currentDate?.setDate(currentDate?.getDate() + 1);
    }
    
    return days;
  };

  const handleInputChange = (field, value) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onDataChange(updatedData);
    
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleDateSelect = (dateStr) => {
    handleInputChange('selectedDate', dateStr);
    handleInputChange('selectedTime', ''); // Reset time when date changes
  };

  const handleTimeSelect = (time) => {
    handleInputChange('selectedTime', time);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.selectedDate) {
      newErrors.selectedDate = '日付を選択してください';
    }
    if (!formData?.selectedTime) {
      newErrors.selectedTime = '時間を選択してください';
    }
    if (!formData?.lessonMode) {
      newErrors.lessonMode = 'レッスン形式を選択してください';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth?.setMonth(newMonth?.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const calendarDays = generateCalendarDays();
  const selectedDateAvailability = formData?.selectedDate ? mockAvailability?.[formData?.selectedDate] || [] : [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-noto font-semibold text-text-primary mb-2">
          スケジュール選択
        </h2>
        <p className="text-text-secondary">
          希望の日時を選択してください
        </p>
      </div>
      {/* Lesson Mode Selection */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h3 className="text-lg font-noto font-medium text-text-primary mb-4 flex items-center">
          <Icon name="Monitor" size={20} className="mr-2" strokeWidth={2} />
          レッスン形式
        </h3>
        
        <Select
          options={lessonModeOptions}
          value={formData?.lessonMode}
          onChange={(value) => handleInputChange('lessonMode', value)}
          error={errors?.lessonMode}
          required
        />
      </div>
      {/* Calendar */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-noto font-medium text-text-primary flex items-center">
            <Icon name="Calendar" size={20} className="mr-2" strokeWidth={2} />
            日付選択
          </h3>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-2 hover:bg-muted rounded-lg transition-smooth"
            >
              <Icon name="ChevronLeft" size={16} strokeWidth={2} />
            </button>
            
            <span className="text-lg font-medium text-text-primary min-w-[120px] text-center">
              {currentMonth?.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long' })}
            </span>
            
            <button
              onClick={() => navigateMonth(1)}
              className="p-2 hover:bg-muted rounded-lg transition-smooth"
            >
              <Icon name="ChevronRight" size={16} strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {['日', '月', '火', '水', '木', '金', '土']?.map((day) => (
            <div key={day} className="p-2 text-center text-sm font-medium text-text-secondary">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {calendarDays?.map((day, index) => (
            <button
              key={index}
              onClick={() => day?.hasAvailability && day?.isCurrentMonth && !day?.isPast && handleDateSelect(day?.dateStr)}
              disabled={!day?.hasAvailability || !day?.isCurrentMonth || day?.isPast}
              className={`p-3 text-sm rounded-lg transition-smooth relative ${
                !day?.isCurrentMonth
                  ? 'text-text-secondary/30'
                  : day?.isPast
                  ? 'text-text-secondary/50 cursor-not-allowed'
                  : day?.hasAvailability
                  ? formData?.selectedDate === day?.dateStr
                    ? 'bg-gradient-to-r from-primary to-secondary text-white' :'hover:bg-muted text-text-primary' :'text-text-secondary/50 cursor-not-allowed'
              }`}
            >
              <span className={day?.isToday ? 'font-bold' : ''}>{day?.day}</span>
              {day?.hasAvailability && day?.isCurrentMonth && !day?.isPast && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-success rounded-full" />
              )}
            </button>
          ))}
        </div>

        {errors?.selectedDate && (
          <p className="text-error text-sm mt-2">{errors?.selectedDate}</p>
        )}
      </div>
      {/* Time Selection */}
      {formData?.selectedDate && (
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="text-lg font-noto font-medium text-text-primary mb-4 flex items-center">
            <Icon name="Clock" size={20} className="mr-2" strokeWidth={2} />
            時間選択
          </h3>

          {selectedDateAvailability?.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {selectedDateAvailability?.map((time) => (
                <button
                  key={time}
                  onClick={() => handleTimeSelect(time)}
                  className={`p-3 rounded-lg border transition-smooth ${
                    formData?.selectedTime === time
                      ? 'bg-gradient-to-r from-primary to-secondary text-white border-primary' :'border-border hover:bg-muted text-text-primary'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-text-secondary">
              <Icon name="Clock" size={48} strokeWidth={1} className="mx-auto mb-4 opacity-50" />
              <p>選択した日付に利用可能な時間がありません</p>
            </div>
          )}

          {errors?.selectedTime && (
            <p className="text-error text-sm mt-2">{errors?.selectedTime}</p>
          )}
        </div>
      )}
      {/* Selected Schedule Summary */}
      {formData?.selectedDate && formData?.selectedTime && (
        <div className="bg-gradient-to-r from-success/5 to-accent/5 border border-success/20 rounded-2xl p-6">
          <h3 className="text-lg font-noto font-medium text-text-primary mb-4 flex items-center">
            <Icon name="CheckCircle" size={20} className="mr-2 text-success" strokeWidth={2} />
            選択されたスケジュール
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">日付:</span>
              <span className="font-medium text-text-primary">
                {new Date(formData.selectedDate)?.toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  weekday: 'short'
                })}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">時間:</span>
              <span className="font-medium text-text-primary">{formData?.selectedTime}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">形式:</span>
              <span className="font-medium text-text-primary">
                {lessonModeOptions?.find(opt => opt?.value === formData?.lessonMode)?.label}
              </span>
            </div>
          </div>
        </div>
      )}
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6">
        <button
          onClick={onPrevious}
          className="px-6 py-3 border border-border rounded-xl font-medium text-text-secondary hover:bg-muted transition-smooth flex items-center justify-center"
        >
          <Icon name="ArrowLeft" size={16} className="mr-2" strokeWidth={2} />
          前に戻る
        </button>
        
        <button
          onClick={handleNext}
          className="flex-1 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-smooth flex items-center justify-center"
        >
          <span>次へ進む</span>
          <Icon name="ArrowRight" size={16} className="ml-2" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
};

export default ScheduleSelectionStep;