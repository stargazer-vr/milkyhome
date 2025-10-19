import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';
import Input from '../../../components/ui/Input';

const ContractReviewStep = ({ data, onDataChange, onNext, onPrevious }) => {
  const [formData, setFormData] = useState({
    agreementAccepted: data?.agreementAccepted || false,
    cancellationPolicyAccepted: data?.cancellationPolicyAccepted || false,
    privacyPolicyAccepted: data?.privacyPolicyAccepted || false,
    signatureName: data?.signatureName || '',
    signatureDate: data?.signatureDate || new Date()?.toISOString()?.split('T')?.[0],
    ...data
  });

  const [errors, setErrors] = useState({});
  const [showSignature, setShowSignature] = useState(false);

  // Mock contract terms
  const contractTerms = {
    lessonFee: 8000,
    platformFee: 800,
    totalAmount: 8800,
    instructorShare: 7200,
    nurseryShare: 800,
    cancellationPolicy: `キャンセルポリシー:\n• 24時間前まで: 無料キャンセル\n• 24時間以内: レッスン料の50%\n• 当日キャンセル: レッスン料の100%`,
    terms: `利用規約:\n1. レッスンの実施について\n   - 講師は指定された日時にレッスンを実施します\n   - 天候や交通事情による遅延の場合は事前にご連絡ください\n\n2. 支払いについて\n   - レッスン料は事前決済となります\n   - 返金は当社規定に従って処理されます\n\n3. 責任の範囲\n   - レッスン中の事故については双方で協議の上解決します\n   - 機材の破損については使用者が責任を負います`,
    privacyPolicy: `個人情報の取り扱い:\n• 収集した個人情報はレッスンの実施目的のみに使用します\n• 第三者への提供は行いません（法令に基づく場合を除く）\n• 個人情報の管理には十分注意を払います`
  };

  const handleInputChange = (field, value) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onDataChange(updatedData);
    
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.agreementAccepted) {
      newErrors.agreementAccepted = '利用規約への同意が必要です';
    }
    if (!formData?.cancellationPolicyAccepted) {
      newErrors.cancellationPolicyAccepted = 'キャンセルポリシーへの同意が必要です';
    }
    if (!formData?.privacyPolicyAccepted) {
      newErrors.privacyPolicyAccepted = 'プライバシーポリシーへの同意が必要です';
    }
    if (!formData?.signatureName?.trim()) {
      newErrors.signatureName = '署名者名を入力してください';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  const generateContract = () => {
    // Mock contract generation
    console.log('Generating contract PDF...');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-noto font-semibold text-text-primary mb-2">
          契約内容の確認
        </h2>
        <p className="text-text-secondary">
          契約条件を確認し、電子署名を行ってください
        </p>
      </div>
      {/* Fee Breakdown */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h3 className="text-lg font-noto font-medium text-text-primary mb-4 flex items-center">
          <Icon name="Calculator" size={20} className="mr-2" strokeWidth={2} />
          料金内訳
        </h3>

        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-text-secondary">レッスン料</span>
            <span className="font-medium text-text-primary">¥{contractTerms?.lessonFee?.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-text-secondary">プラットフォーム手数料 (10%)</span>
            <span className="font-medium text-text-primary">¥{contractTerms?.platformFee?.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center py-3 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl px-4">
            <span className="font-semibold text-text-primary">合計金額</span>
            <span className="text-xl font-bold text-text-primary">¥{contractTerms?.totalAmount?.toLocaleString()}</span>
          </div>
        </div>

        <div className="mt-6 p-4 bg-muted rounded-xl">
          <h4 className="font-medium text-text-primary mb-2">収益分配</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-text-secondary">講師収入:</span>
              <span className="ml-2 font-medium text-text-primary">¥{contractTerms?.instructorShare?.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-text-secondary">園収入:</span>
              <span className="ml-2 font-medium text-text-primary">¥{contractTerms?.nurseryShare?.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Contract Terms */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h3 className="text-lg font-noto font-medium text-text-primary mb-4 flex items-center">
          <Icon name="FileText" size={20} className="mr-2" strokeWidth={2} />
          契約条件
        </h3>

        <div className="space-y-6">
          {/* Terms of Service */}
          <div className="border border-border rounded-xl p-4">
            <h4 className="font-medium text-text-primary mb-3 flex items-center">
              <Icon name="Shield" size={16} className="mr-2" strokeWidth={2} />
              利用規約
            </h4>
            <div className="bg-muted rounded-lg p-4 max-h-40 overflow-y-auto">
              <pre className="text-sm text-text-secondary whitespace-pre-wrap font-sans">
                {contractTerms?.terms}
              </pre>
            </div>
            <div className="mt-3">
              <Checkbox
                label="上記の利用規約に同意します"
                checked={formData?.agreementAccepted}
                onChange={(e) => handleInputChange('agreementAccepted', e?.target?.checked)}
                error={errors?.agreementAccepted}
                required
              />
            </div>
          </div>

          {/* Cancellation Policy */}
          <div className="border border-border rounded-xl p-4">
            <h4 className="font-medium text-text-primary mb-3 flex items-center">
              <Icon name="Calendar" size={16} className="mr-2" strokeWidth={2} />
              キャンセルポリシー
            </h4>
            <div className="bg-muted rounded-lg p-4">
              <pre className="text-sm text-text-secondary whitespace-pre-wrap font-sans">
                {contractTerms?.cancellationPolicy}
              </pre>
            </div>
            <div className="mt-3">
              <Checkbox
                label="キャンセルポリシーに同意します"
                checked={formData?.cancellationPolicyAccepted}
                onChange={(e) => handleInputChange('cancellationPolicyAccepted', e?.target?.checked)}
                error={errors?.cancellationPolicyAccepted}
                required
              />
            </div>
          </div>

          {/* Privacy Policy */}
          <div className="border border-border rounded-xl p-4">
            <h4 className="font-medium text-text-primary mb-3 flex items-center">
              <Icon name="Lock" size={16} className="mr-2" strokeWidth={2} />
              プライバシーポリシー
            </h4>
            <div className="bg-muted rounded-lg p-4">
              <pre className="text-sm text-text-secondary whitespace-pre-wrap font-sans">
                {contractTerms?.privacyPolicy}
              </pre>
            </div>
            <div className="mt-3">
              <Checkbox
                label="プライバシーポリシーに同意します"
                checked={formData?.privacyPolicyAccepted}
                onChange={(e) => handleInputChange('privacyPolicyAccepted', e?.target?.checked)}
                error={errors?.privacyPolicyAccepted}
                required
              />
            </div>
          </div>
        </div>
      </div>
      {/* Electronic Signature */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h3 className="text-lg font-noto font-medium text-text-primary mb-4 flex items-center">
          <Icon name="PenTool" size={20} className="mr-2" strokeWidth={2} />
          電子署名
        </h3>

        <div className="space-y-4">
          <Input
            label="署名者名"
            type="text"
            placeholder="フルネームを入力してください"
            value={formData?.signatureName}
            onChange={(e) => handleInputChange('signatureName', e?.target?.value)}
            error={errors?.signatureName}
            required
            description="契約書に記載される署名者名です"
          />

          <Input
            label="署名日"
            type="date"
            value={formData?.signatureDate}
            onChange={(e) => handleInputChange('signatureDate', e?.target?.value)}
            required
          />

          <div className="bg-gradient-to-r from-accent/5 to-secondary/5 border border-accent/20 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={16} className="text-accent mt-0.5" strokeWidth={2} />
              <div className="text-sm text-text-secondary">
                <p className="font-medium text-text-primary mb-1">電子署名について</p>
                <p>
                  この電子署名は法的効力を持ちます。署名により、上記の契約条件に同意したものとみなされます。
                  契約書のPDFは署名完了後にダウンロード可能になります。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Contract Preview */}
      {formData?.signatureName && (
        <div className="bg-gradient-to-r from-success/5 to-accent/5 border border-success/20 rounded-2xl p-6">
          <h3 className="text-lg font-noto font-medium text-text-primary mb-4 flex items-center">
            <Icon name="FileCheck" size={20} className="mr-2 text-success" strokeWidth={2} />
            契約書プレビュー
          </h3>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">契約者:</span>
              <span className="font-medium text-text-primary">{formData?.signatureName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">署名日:</span>
              <span className="font-medium text-text-primary">
                {new Date(formData.signatureDate)?.toLocaleDateString('ja-JP')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">契約金額:</span>
              <span className="font-medium text-text-primary">¥{contractTerms?.totalAmount?.toLocaleString()}</span>
            </div>
          </div>

          <button
            onClick={generateContract}
            className="mt-4 w-full bg-white border border-border rounded-lg px-4 py-2 text-sm font-medium text-text-primary hover:bg-muted transition-smooth flex items-center justify-center"
          >
            <Icon name="Download" size={16} className="mr-2" strokeWidth={2} />
            契約書PDFをプレビュー
          </button>
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
          <span>支払いに進む</span>
          <Icon name="ArrowRight" size={16} className="ml-2" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
};

export default ContractReviewStep;