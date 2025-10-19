import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AvailabilityCalendar = ({ availability, onBookingRequest }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [viewMode, setViewMode] = useState('month'); // 'month' or 'week'

  const months = [
    '1月', '2月', '3月', '4月', '5月', '6月',
    '7月', '8月', '9月', '10月', '11月', '12月'
  ];

  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];

  const getDaysInMonth = (date) => {
    const year = date?.getFullYear();
    const month = date?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay?.getDate();
    const startingDayOfWeek = firstDay?.getDay();

    const days = [];
    
    // Previous month's trailing days
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days?.push({
        date: prevDate,
        isCurrentMonth: false,
        isToday: false,
        availability: null
      });
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const today = new Date();
      const dateKey = `${year}-${String(month + 1)?.padStart(2, '0')}-${String(day)?.padStart(2, '0')}`;
      
      days?.push({
        date,
        isCurrentMonth: true,
        isToday: date?.toDateString() === today?.toDateString(),
        availability: availability?.[dateKey] || null
      });
    }

    // Next month's leading days
    const remainingDays = 42 - days?.length;
    for (let day = 1; day <= remainingDays; day++) {
      const nextDate = new Date(year, month + 1, day);
      days?.push({
        date: nextDate,
        isCurrentMonth: false,
        isToday: false,
        availability: null
      });
    }

    return days;
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate?.setMonth(prev?.getMonth() + direction);
      return newDate;
    });
  };

  const handleDateClick = (dayInfo) => {
    if (!dayInfo?.isCurrentMonth || !dayInfo?.availability) return;
    setSelectedDate(dayInfo?.date);
    setSelectedTimeSlot(null);
  };

  const handleTimeSlotClick = (timeSlot) => {
    if (timeSlot?.available) {
      setSelectedTimeSlot(timeSlot);
    }
  };

  const handleBookingRequest = () => {
    if (selectedDate && selectedTimeSlot) {
      onBookingRequest({
        date: selectedDate,
        timeSlot: selectedTimeSlot
      });
    }
  };

  const getAvailabilityColor = (availability) => {
    if (!availability) return 'bg-muted text-text-secondary';
    
    const availableSlots = availability?.timeSlots?.filter(slot => slot?.available)?.length;
    const totalSlots = availability?.timeSlots?.length;
    
    if (availableSlots === 0) return 'bg-error/20 text-error';
    if (availableSlots === totalSlots) return 'bg-success/20 text-success';
    return 'bg-warning/20 text-warning';
  };

  const days = getDaysInMonth(currentDate);
  const selectedDateAvailability = selectedDate ? 
    availability?.[`${selectedDate?.getFullYear()}-${String(selectedDate?.getMonth() + 1)?.padStart(2, '0')}-${String(selectedDate?.getDate())?.padStart(2, '0')}`] : 
    null;

  return (
    <div className="bg-white rounded-2xl shadow-medium p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-noto font-semibold text-text-primary">
          空き状況・予約
        </h2>
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'month' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('month')}
          >
            月表示
          </Button>
          <Button
            variant={viewMode === 'week' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('week')}
          >
            週表示
          </Button>
        </div>
      </div>
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigateMonth(-1)}
        >
          <Icon name="ChevronLeft" size={20} strokeWidth={2} />
        </Button>
        
        <h3 className="text-lg font-semibold text-text-primary">
          {currentDate?.getFullYear()}年 {months?.[currentDate?.getMonth()]}
        </h3>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigateMonth(1)}
        >
          <Icon name="ChevronRight" size={20} strokeWidth={2} />
        </Button>
      </div>
      {/* Calendar Grid */}
      <div className="mb-6">
        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekdays?.map((day) => (
            <div key={day} className="p-2 text-center text-sm font-medium text-text-secondary">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {days?.map((dayInfo, index) => (
            <button
              key={index}
              onClick={() => handleDateClick(dayInfo)}
              disabled={!dayInfo?.isCurrentMonth || !dayInfo?.availability}
              className={`p-2 text-sm rounded-lg transition-smooth relative ${
                dayInfo?.isCurrentMonth
                  ? dayInfo?.availability
                    ? `cursor-pointer hover:bg-primary/10 ${getAvailabilityColor(dayInfo?.availability)} ${
                        selectedDate && selectedDate?.toDateString() === dayInfo?.date?.toDateString()
                          ? 'ring-2 ring-primary bg-primary/20' :''
                      }`
                    : 'text-text-secondary cursor-not-allowed' :'text-text-secondary/50 cursor-not-allowed'
              } ${dayInfo?.isToday ? 'font-bold' : ''}`}
            >
              {dayInfo?.date?.getDate()}
              {dayInfo?.availability && (
                <div className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-current" />
              )}
            </button>
          ))}
        </div>
      </div>
      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-6 text-xs">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded bg-success/20" />
          <span className="text-text-secondary">空きあり</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded bg-warning/20" />
          <span className="text-text-secondary">残りわずか</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded bg-error/20" />
          <span className="text-text-secondary">満席</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded bg-muted" />
          <span className="text-text-secondary">対応不可</span>
        </div>
      </div>
      {/* Time Slots */}
      {selectedDate && selectedDateAvailability && (
        <div className="border-t border-border pt-6">
          <h4 className="font-semibold text-text-primary mb-4">
            {selectedDate?.toLocaleDateString('ja-JP', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              weekday: 'long'
            })} の空き時間
          </h4>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
            {selectedDateAvailability?.timeSlots?.map((timeSlot, index) => (
              <button
                key={index}
                onClick={() => handleTimeSlotClick(timeSlot)}
                disabled={!timeSlot?.available}
                className={`p-3 rounded-lg text-sm font-medium transition-smooth ${
                  timeSlot?.available
                    ? selectedTimeSlot === timeSlot
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted hover:bg-primary/10 text-text-primary' :'bg-error/20 text-error cursor-not-allowed'
                }`}
              >
                <div className="font-medium">{timeSlot?.time}</div>
                <div className="text-xs opacity-80">
                  {timeSlot?.available ? `¥${timeSlot?.price?.toLocaleString()}` : '満席'}
                </div>
              </button>
            ))}
          </div>

          {/* Booking Action */}
          {selectedTimeSlot && (
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-text-primary">
                    {selectedDate?.toLocaleDateString('ja-JP')} {selectedTimeSlot?.time}
                  </div>
                  <div className="text-sm text-text-secondary">
                    料金: ¥{selectedTimeSlot?.price?.toLocaleString()} (税込)
                  </div>
                </div>
                <Button
                  variant="default"
                  onClick={handleBookingRequest}
                  iconName="Calendar"
                  iconPosition="left"
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                >
                  予約リクエスト
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AvailabilityCalendar;