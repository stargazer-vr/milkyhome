import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const PaymentConfirmationStep = ({ data, onDataChange, onSubmit, onPrevious }) => {
  const [formData, setFormData] = useState({
    paymentMethod: data?.paymentMethod || 'credit_card',
    cardNumber: data?.cardNumber || '',
    expiryDate: data?.expiryDate || '',
    cvv: data?.cvv || '',
    cardholderName: data?.cardholderName || '',
    billingAddress: data?.billingAddress || '',
    saveCard: data?.saveCard || false,
    ...data
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const paymentMethodOptions = [
    { value: 'credit_card', label: 'クレジットカード' },
    { value: 'bank_transfer', label: '銀行振込' },
    { value: 'convenience_store', label: 'コンビニ決済' }
  ];

  // Mock payment summary
  const paymentSummary = {
    lessonFee: 8000,
    platformFee: 800,
    tax: 880,
    totalAmount: 9680,
    dueDate: '2025-10-15',
    bookingId: 'BK-2025-001'
  };

  const handleInputChange = (field, value) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onDataChange(updatedData);
    
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const formatCardNumber = (value) => {
    const v = value?.replace(/\s+/g, '')?.replace(/[^0-9]/gi, '');
    const matches = v?.match(/\d{4,16}/g);
    const match = matches && matches?.[0] || '';
    const parts = [];
    for (let i = 0, len = match?.length; i < len; i += 4) {
      parts?.push(match?.substring(i, i + 4));
    }
    if (parts?.length) {
      return parts?.join(' ');
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e?.target?.value);
    handleInputChange('cardNumber', formatted);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.paymentMethod) {
      newErrors.paymentMethod = '支払い方法を選択してください';
    }

    if (formData?.paymentMethod === 'credit_card') {
      if (!formData?.cardNumber || formData?.cardNumber?.replace(/\s/g, '')?.length < 16) {
        newErrors.cardNumber = '有効なカード番号を入力してください';
      }
      if (!formData?.expiryDate) {
        newErrors.expiryDate = '有効期限を入力してください';
      }
      if (!formData?.cvv || formData?.cvv?.length < 3) {
        newErrors.cvv = '有効なCVVを入力してください';
      }
      if (!formData?.cardholderName?.trim()) {
        newErrors.cardholderName = 'カード名義人を入力してください';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);
    
    try {
      // Mock payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setShowSuccess(true);
      setTimeout(() => {
        onSubmit(formData);
      }, 2000);
    } catch (error) {
      console.error('Payment failed:', error);
      setIsProcessing(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-gradient-to-r from-success to-accent rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="Check" size={32} className="text-white" strokeWidth={2} />
        </div>
        <h2 className="text-2xl font-noto font-semibold text-text-primary mb-4">
          予約が完了しました！
        </h2>
        <p className="text-text-secondary mb-6">
          予約ID: {paymentSummary?.bookingId}
        </p>
        <div className="bg-gradient-to-r from-success/5 to-accent/5 border border-success/20 rounded-2xl p-6 max-w-md mx-auto">
          <p className="text-sm text-text-secondary">
            確認メールを送信しました。講師からの連絡をお待ちください。
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-noto font-semibold text-text-primary mb-2">
          支払い確認
        </h2>
        <p className="text-text-secondary">
          支払い情報を入力して予約を確定してください
        </p>
      </div>
      {/* Payment Summary */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h3 className="text-lg font-noto font-medium text-text-primary mb-4 flex items-center">
          <Icon name="Receipt" size={20} className="mr-2" strokeWidth={2} />
          支払い内容
        </h3>

        <div className="space-y-4">
          <div className="flex justify-between items-center py-2">
            <span className="text-text-secondary">レッスン料</span>
            <span className="font-medium text-text-primary">¥{paymentSummary?.lessonFee?.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-text-secondary">プラットフォーム手数料</span>
            <span className="font-medium text-text-primary">¥{paymentSummary?.platformFee?.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-text-secondary">消費税 (10%)</span>
            <span className="font-medium text-text-primary">¥{paymentSummary?.tax?.toLocaleString()}</span>
          </div>
          <div className="border-t border-border pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-text-primary">合計金額</span>
              <span className="text-2xl font-bold text-text-primary">¥{paymentSummary?.totalAmount?.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-gradient-to-r from-warning/5 to-primary/5 border border-warning/20 rounded-xl">
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={16} className="text-warning" strokeWidth={2} />
            <span className="text-sm text-text-secondary">
              支払い期限: {new Date(paymentSummary.dueDate)?.toLocaleDateString('ja-JP')}
            </span>
          </div>
        </div>
      </div>
      {/* Payment Method */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h3 className="text-lg font-noto font-medium text-text-primary mb-4 flex items-center">
          <Icon name="CreditCard" size={20} className="mr-2" strokeWidth={2} />
          支払い方法
        </h3>

        <Select
          options={paymentMethodOptions}
          value={formData?.paymentMethod}
          onChange={(value) => handleInputChange('paymentMethod', value)}
          error={errors?.paymentMethod}
          required
        />

        {/* Credit Card Form */}
        {formData?.paymentMethod === 'credit_card' && (
          <div className="mt-6 space-y-4">
            <Input
              label="カード番号"
              type="text"
              placeholder="1234 5678 9012 3456"
              value={formData?.cardNumber}
              onChange={handleCardNumberChange}
              error={errors?.cardNumber}
              required
              maxLength={19}
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="有効期限"
                type="text"
                placeholder="MM/YY"
                value={formData?.expiryDate}
                onChange={(e) => {
                  let value = e?.target?.value?.replace(/\D/g, '');
                  if (value?.length >= 2) {
                    value = value?.substring(0, 2) + '/' + value?.substring(2, 4);
                  }
                  handleInputChange('expiryDate', value);
                }}
                error={errors?.expiryDate}
                required
                maxLength={5}
              />

              <Input
                label="CVV"
                type="text"
                placeholder="123"
                value={formData?.cvv}
                onChange={(e) => handleInputChange('cvv', e?.target?.value?.replace(/\D/g, ''))}
                error={errors?.cvv}
                required
                maxLength={4}
              />
            </div>

            <Input
              label="カード名義人"
              type="text"
              placeholder="TARO YAMADA"
              value={formData?.cardholderName}
              onChange={(e) => handleInputChange('cardholderName', e?.target?.value?.toUpperCase())}
              error={errors?.cardholderName}
              required
            />

            <Input
              label="請求先住所"
              type="text"
              placeholder="東京都渋谷区..."
              value={formData?.billingAddress}
              onChange={(e) => handleInputChange('billingAddress', e?.target?.value)}
              description="カードの請求先住所を入力してください"
            />

            <Checkbox
              label="このカード情報を保存する"
              checked={formData?.saveCard}
              onChange={(e) => handleInputChange('saveCard', e?.target?.checked)}
              description="次回の支払いで使用できます"
            />
          </div>
        )}

        {/* Bank Transfer Info */}
        {formData?.paymentMethod === 'bank_transfer' && (
          <div className="mt-6 p-4 bg-muted rounded-xl">
            <h4 className="font-medium text-text-primary mb-3">振込先情報</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">銀行名:</span>
                <span className="font-medium text-text-primary">みずほ銀行</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">支店名:</span>
                <span className="font-medium text-text-primary">渋谷支店</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">口座番号:</span>
                <span className="font-medium text-text-primary">普通 1234567</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">口座名義:</span>
                <span className="font-medium text-text-primary">ミルキーホーム株式会社</span>
              </div>
            </div>
            <p className="text-xs text-text-secondary mt-3">
              振込手数料はお客様負担となります。振込確認後、予約が確定されます。
            </p>
          </div>
        )}

        {/* Convenience Store Info */}
        {formData?.paymentMethod === 'convenience_store' && (
          <div className="mt-6 p-4 bg-muted rounded-xl">
            <h4 className="font-medium text-text-primary mb-3">コンビニ決済について</h4>
            <p className="text-sm text-text-secondary mb-3">
              以下のコンビニエンスストアでお支払いいただけます：
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center space-x-2">
                <Icon name="Store" size={14} strokeWidth={2} />
                <span>セブン-イレブン</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Store" size={14} strokeWidth={2} />
                <span>ファミリーマート</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Store" size={14} strokeWidth={2} />
                <span>ローソン</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Store" size={14} strokeWidth={2} />
                <span>ミニストップ</span>
              </div>
            </div>
            <p className="text-xs text-text-secondary mt-3">
              決済番号は予約確定後にメールでお送りします。
            </p>
          </div>
        )}
      </div>
      {/* Security Notice */}
      <div className="bg-gradient-to-r from-accent/5 to-secondary/5 border border-accent/20 rounded-2xl p-6">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} className="text-accent mt-0.5" strokeWidth={2} />
          <div>
            <h4 className="font-medium text-text-primary mb-2">セキュリティについて</h4>
            <p className="text-sm text-text-secondary">
              お客様の決済情報は SSL暗号化通信により保護されています。
              クレジットカード情報は当社では保存せず、Stripe社の安全なシステムで処理されます。
            </p>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6">
        <button
          onClick={onPrevious}
          disabled={isProcessing}
          className="px-6 py-3 border border-border rounded-xl font-medium text-text-secondary hover:bg-muted transition-smooth flex items-center justify-center disabled:opacity-50"
        >
          <Icon name="ArrowLeft" size={16} className="mr-2" strokeWidth={2} />
          前に戻る
        </button>
        
        <button
          onClick={handleSubmit}
          disabled={isProcessing}
          className="flex-1 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-smooth flex items-center justify-center disabled:opacity-50"
        >
          {isProcessing ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              処理中...
            </>
          ) : (
            <>
              <Icon name="Lock" size={16} className="mr-2" strokeWidth={2} />
              予約を確定する
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PaymentConfirmationStep;