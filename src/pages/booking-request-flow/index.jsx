import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import PublicHeader from '../../components/ui/PublicHeader';
import BookingProgressIndicator from './components/BookingProgressIndicator';
import InstructorSummaryPanel from './components/InstructorSummaryPanel';
import LessonDetailsStep from './components/LessonDetailsStep';
import ScheduleSelectionStep from './components/ScheduleSelectionStep';
import ContractReviewStep from './components/ContractReviewStep';
import PaymentConfirmationStep from './components/PaymentConfirmationStep';

const BookingRequestFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);

  const handleStepChange = (step) => {
    setCurrentStep(step);
  };

  const handleDataChange = (stepData) => {
    setBookingData(prev => ({ ...prev, ...stepData }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (finalData) => {
    setBookingData(prev => ({ ...prev, ...finalData }));
    setIsCompleted(true);
    console.log('Booking submitted:', { ...bookingData, ...finalData });
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <LessonDetailsStep
            data={bookingData}
            onDataChange={handleDataChange}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <ScheduleSelectionStep
            data={bookingData}
            onDataChange={handleDataChange}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 3:
        return (
          <ContractReviewStep
            data={bookingData}
            onDataChange={handleDataChange}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 4:
        return (
          <PaymentConfirmationStep
            data={bookingData}
            onDataChange={handleDataChange}
            onSubmit={handleSubmit}
            onPrevious={handlePrevious}
          />
        );
      default:
        return null;
    }
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-background">
        <PublicHeader />
        
        <main className="pt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-success to-accent rounded-full flex items-center justify-center mx-auto mb-8">
                <Icon name="CheckCircle" size={40} className="text-white" strokeWidth={2} />
              </div>
              
              <h1 className="text-3xl font-noto font-bold text-text-primary mb-4">
                予約が完了しました！
              </h1>
              
              <p className="text-lg text-text-secondary mb-8">
                予約ID: BK-2025-001
              </p>

              <div className="bg-card border border-border rounded-2xl p-8 max-w-2xl mx-auto mb-8">
                <h2 className="text-xl font-noto font-semibold text-text-primary mb-6">
                  次のステップ
                </h2>
                
                <div className="space-y-4 text-left">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-semibold text-primary">1</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-text-primary">確認メールの受信</h3>
                      <p className="text-sm text-text-secondary">予約詳細と契約書PDFをメールでお送りします</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-semibold text-secondary">2</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-text-primary">講師からの連絡</h3>
                      <p className="text-sm text-text-secondary">24時間以内に講師から詳細な打ち合わせの連絡があります</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-semibold text-accent">3</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-text-primary">レッスンの実施</h3>
                      <p className="text-sm text-text-secondary">予定日時にレッスンを実施します</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/messaging-interface"
                  className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-smooth flex items-center justify-center"
                >
                  <Icon name="MessageCircle" size={16} className="mr-2" strokeWidth={2} />
                  メッセージを確認
                </Link>
                
                <Link
                  to="/landing-page"
                  className="px-6 py-3 border border-border rounded-xl font-medium text-text-secondary hover:bg-muted transition-smooth flex items-center justify-center"
                >
                  <Icon name="Home" size={16} className="mr-2" strokeWidth={2} />
                  ホームに戻る
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-text-secondary mb-8">
            <Link to="/landing-page" className="hover:text-text-primary transition-smooth">
              ホーム
            </Link>
            <Icon name="ChevronRight" size={14} strokeWidth={2} />
            <Link to="/instructor-search-results" className="hover:text-text-primary transition-smooth">
              講師検索
            </Link>
            <Icon name="ChevronRight" size={14} strokeWidth={2} />
            <Link to="/instructor-profile-details" className="hover:text-text-primary transition-smooth">
              講師詳細
            </Link>
            <Icon name="ChevronRight" size={14} strokeWidth={2} />
            <span className="text-text-primary font-medium">予約申込</span>
          </nav>

          {/* Progress Indicator */}
          <div className="mb-8">
            <BookingProgressIndicator
              currentStep={currentStep}
              onStepClick={handleStepChange}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-2xl p-6 lg:p-8 shadow-soft">
                {renderCurrentStep()}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <InstructorSummaryPanel instructor={bookingData.instructor || {}} />
              
              {/* Help Section */}
              <div className="mt-6 bg-card border border-border rounded-2xl p-6 shadow-soft">
                <h3 className="text-lg font-noto font-medium text-text-primary mb-4 flex items-center">
                  <Icon name="HelpCircle" size={20} className="mr-2" strokeWidth={2} />
                  サポート
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Icon name="Phone" size={16} className="text-primary mt-1" strokeWidth={2} />
                    <div>
                      <p className="text-sm font-medium text-text-primary">電話サポート</p>
                      <p className="text-sm text-text-secondary">03-1234-5678</p>
                      <p className="text-xs text-text-secondary">平日 9:00-18:00</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Icon name="Mail" size={16} className="text-secondary mt-1" strokeWidth={2} />
                    <div>
                      <p className="text-sm font-medium text-text-primary">メールサポート</p>
                      <p className="text-sm text-text-secondary">support@milkyhome.jp</p>
                      <p className="text-xs text-text-secondary">24時間受付</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Icon name="MessageCircle" size={16} className="text-accent mt-1" strokeWidth={2} />
                    <div>
                      <p className="text-sm font-medium text-text-primary">チャットサポート</p>
                      <p className="text-xs text-text-secondary">平日 9:00-18:00</p>
                    </div>
                  </div>
                </div>

                <button className="w-full mt-4 bg-gradient-to-r from-accent/10 to-secondary/10 border border-accent/20 text-accent-foreground px-4 py-2 rounded-xl text-sm font-medium hover:bg-accent/20 transition-smooth">
                  よくある質問を見る
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookingRequestFlow;