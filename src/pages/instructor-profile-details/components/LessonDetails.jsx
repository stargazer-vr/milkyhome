import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const LessonDetails = ({ instructor }) => {
  const [activeTab, setActiveTab] = useState('specialties');

  const tabs = [
    { id: 'specialties', label: '専門分野', icon: 'BookOpen' },
    { id: 'modes', label: 'レッスン形式', icon: 'Monitor' },
    { id: 'pricing', label: '料金体系', icon: 'DollarSign' },
    { id: 'ages', label: '対象年齢', icon: 'Users' },
    { id: 'equipment', label: '必要機材', icon: 'Settings' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'specialties':
        return (
          <div className="space-y-4">
            {instructor?.detailedSpecialties?.map((specialty, index) => (
              <div key={index} className="border border-border rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={specialty?.icon} size={20} strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-text-primary mb-2">
                      {specialty?.name}
                    </h4>
                    <p className="text-text-secondary text-sm mb-3">
                      {specialty?.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {specialty?.skills?.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-lg"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'modes':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {instructor?.lessonModes?.map((mode, index) => (
              <div key={index} className="border border-border rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    mode?.available 
                      ? 'bg-gradient-to-br from-success/20 to-accent/20' :'bg-muted'
                  }`}>
                    <Icon 
                      name={mode?.icon} 
                      size={24} 
                      strokeWidth={2}
                      className={mode?.available ? 'text-success' : 'text-text-secondary'}
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary">
                      {mode?.name}
                    </h4>
                    <span className={`text-sm ${
                      mode?.available ? 'text-success' : 'text-text-secondary'
                    }`}>
                      {mode?.available ? '対応可能' : '対応不可'}
                    </span>
                  </div>
                </div>
                <p className="text-text-secondary text-sm mb-4">
                  {mode?.description}
                </p>
                <div className="space-y-2">
                  {mode?.features?.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <Icon name="Check" size={14} strokeWidth={2} className="text-success" />
                      <span className="text-sm text-text-secondary">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 'pricing':
        return (
          <div className="space-y-6">
            {instructor?.pricingPlans?.map((plan, index) => (
              <div key={index} className="border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-text-primary">
                      {plan?.name}
                    </h4>
                    <p className="text-text-secondary text-sm">
                      {plan?.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-text-primary">
                      ¥{plan?.price?.toLocaleString()}
                    </div>
                    <div className="text-sm text-text-secondary">
                      {plan?.duration}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-text-primary mb-2">含まれる内容</h5>
                    <ul className="space-y-1">
                      {plan?.includes?.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center space-x-2">
                          <Icon name="Check" size={14} strokeWidth={2} className="text-success" />
                          <span className="text-sm text-text-secondary">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-text-primary mb-2">追加料金</h5>
                    <ul className="space-y-1">
                      {plan?.additionalFees?.map((fee, feeIndex) => (
                        <li key={feeIndex} className="flex items-center justify-between">
                          <span className="text-sm text-text-secondary">{fee?.item}</span>
                          <span className="text-sm font-medium text-text-primary">
                            ¥{fee?.price?.toLocaleString()}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'ages':
        return (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {instructor?.targetAges?.map((ageGroup, index) => (
              <div
                key={index}
                className={`border rounded-xl p-4 text-center ${
                  ageGroup?.available
                    ? 'border-primary bg-gradient-to-br from-primary/10 to-secondary/10' :'border-border bg-muted'
                }`}
              >
                <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center ${
                  ageGroup?.available
                    ? 'bg-gradient-to-br from-primary to-secondary text-white' :'bg-border text-text-secondary'
                }`}>
                  <Icon name="Baby" size={20} strokeWidth={2} />
                </div>
                <h4 className="font-semibold text-text-primary mb-1">
                  {ageGroup?.range}
                </h4>
                <p className="text-xs text-text-secondary">
                  {ageGroup?.description}
                </p>
              </div>
            ))}
          </div>
        );

      case 'equipment':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-border rounded-xl p-6">
                <h4 className="font-semibold text-text-primary mb-4 flex items-center space-x-2">
                  <Icon name="Monitor" size={20} strokeWidth={2} />
                  <span>オンラインレッスン</span>
                </h4>
                <div className="space-y-3">
                  {instructor?.equipment?.online?.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Icon name={item?.icon} size={16} strokeWidth={2} className="text-text-secondary" />
                        <span className="text-sm text-text-primary">{item?.name}</span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        item?.required
                          ? 'bg-error/20 text-error' :'bg-muted text-text-secondary'
                      }`}>
                        {item?.required ? '必須' : '推奨'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-border rounded-xl p-6">
                <h4 className="font-semibold text-text-primary mb-4 flex items-center space-x-2">
                  <Icon name="MapPin" size={20} strokeWidth={2} />
                  <span>対面レッスン</span>
                </h4>
                <div className="space-y-3">
                  {instructor?.equipment?.onsite?.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Icon name={item?.icon} size={16} strokeWidth={2} className="text-text-secondary" />
                        <span className="text-sm text-text-primary">{item?.name}</span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        item?.provided
                          ? 'bg-success/20 text-success' :'bg-warning/20 text-warning'
                      }`}>
                        {item?.provided ? '持参' : '要準備'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-medium p-6 mb-8">
      <h2 className="text-xl font-noto font-semibold text-text-primary mb-6">
        レッスン詳細
      </h2>
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-border">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex items-center space-x-2 px-4 py-3 rounded-t-lg text-sm font-medium transition-smooth ${
              activeTab === tab?.id
                ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-text-secondary hover:text-text-primary hover:bg-muted'
            }`}
          >
            <Icon name={tab?.icon} size={16} strokeWidth={2} />
            <span>{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div className="min-h-[300px]">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default LessonDetails;