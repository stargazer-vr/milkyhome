import React from 'react';
import Icon from '../AppIcon';

const BookingFlowStepper = ({ 
  currentStep = 1, 
  totalSteps = 4, 
  onStepClick,
  steps = [
    { id: 1, title: '講師選択', description: '講師を選んでください' },
    { id: 2, title: '日時選択', description: '希望日時を選択' },
    { id: 3, title: '詳細入力', description: '予約詳細を入力' },
    { id: 4, title: '確認・完了', description: '内容確認と完了' }
  ]
}) => {
  const isStepCompleted = (stepId) => stepId < currentStep;
  const isStepActive = (stepId) => stepId === currentStep;
  const isStepClickable = (stepId) => stepId <= currentStep;

  const handleStepClick = (stepId) => {
    if (isStepClickable(stepId) && onStepClick) {
      onStepClick(stepId);
    }
  };

  return (
    <div className="w-full">
      {/* Desktop Horizontal Stepper */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between">
          {steps?.map((step, index) => (
            <div key={step?.id} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="flex items-center">
                <button
                  onClick={() => handleStepClick(step?.id)}
                  disabled={!isStepClickable(step?.id)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-smooth ${
                    isStepCompleted(step?.id)
                      ? 'bg-success text-success-foreground cursor-pointer hover:bg-success/90'
                      : isStepActive(step?.id)
                      ? 'bg-primary text-primary-foreground cursor-pointer'
                      : 'bg-muted text-text-secondary cursor-not-allowed'
                  }`}
                >
                  {isStepCompleted(step?.id) ? (
                    <Icon name="Check" size={16} strokeWidth={2} />
                  ) : (
                    step?.id
                  )}
                </button>
                
                {/* Step Info */}
                <div className="ml-3 min-w-0">
                  <div className={`text-sm font-medium ${
                    isStepActive(step?.id) || isStepCompleted(step?.id)
                      ? 'text-text-primary' :'text-text-secondary'
                  }`}>
                    {step?.title}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {step?.description}
                  </div>
                </div>
              </div>

              {/* Connector Line */}
              {index < steps?.length - 1 && (
                <div className="flex-1 mx-4">
                  <div className={`h-0.5 transition-smooth ${
                    isStepCompleted(step?.id + 1)
                      ? 'bg-success' :'bg-border'
                  }`} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Mobile Vertical Stepper */}
      <div className="md:hidden space-y-4">
        {steps?.map((step, index) => (
          <div key={step?.id} className="flex items-start">
            {/* Step Circle and Line */}
            <div className="flex flex-col items-center mr-4">
              <button
                onClick={() => handleStepClick(step?.id)}
                disabled={!isStepClickable(step?.id)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-smooth ${
                  isStepCompleted(step?.id)
                    ? 'bg-success text-success-foreground'
                    : isStepActive(step?.id)
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-text-secondary'
                }`}
              >
                {isStepCompleted(step?.id) ? (
                  <Icon name="Check" size={14} strokeWidth={2} />
                ) : (
                  step?.id
                )}
              </button>
              
              {/* Vertical Line */}
              {index < steps?.length - 1 && (
                <div className={`w-0.5 h-8 mt-2 transition-smooth ${
                  isStepCompleted(step?.id + 1)
                    ? 'bg-success' :'bg-border'
                }`} />
              )}
            </div>

            {/* Step Content */}
            <div className="flex-1 pb-4">
              <div className={`text-sm font-medium ${
                isStepActive(step?.id) || isStepCompleted(step?.id)
                  ? 'text-text-primary' :'text-text-secondary'
              }`}>
                {step?.title}
              </div>
              <div className="text-xs text-text-secondary mt-1">
                {step?.description}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Progress Bar */}
      <div className="mt-6">
        <div className="flex items-center justify-between text-xs text-text-secondary mb-2">
          <span>進行状況</span>
          <span>{currentStep} / {totalSteps}</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-layout"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingFlowStepper;