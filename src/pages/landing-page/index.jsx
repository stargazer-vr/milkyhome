import React from 'react';
import { Helmet } from 'react-helmet';
import PublicHeader from '../../components/ui/PublicHeader';
import HeroSection from './components/HeroSection';
import InstructorShowcase from './components/InstructorShowcase';
import BenefitsSection from './components/BenefitsSection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';

const LandingPage = () => {
  return (
    <>
      <Helmet>
        <title>Milkyhome - 保育園と講師をつなぐプラットフォーム</title>
        <meta name="description" content="質の高い教育をすべての子どもたちに。Milkyhomeは保育園と専門講師をマッチングし、子どもたちの成長をサポートする革新的なプラットフォームです。" />
        <meta name="keywords" content="保育園, 講師, 教育, レッスン, 子ども, 幼児教育, マッチング" />
        <meta property="og:title" content="Milkyhome - 保育園と講師をつなぐプラットフォーム" />
        <meta property="og:description" content="質の高い教育をすべての子どもたちに。音楽、アート、体操など多彩な分野の講師が、質の高いレッスンを提供します。" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/landing-page" />
      </Helmet>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <PublicHeader />

        {/* Main Content */}
        <main className="pt-16">
          {/* Hero Section */}
          <HeroSection />

          {/* Instructor Showcase */}
          <InstructorShowcase />

          {/* Benefits Section */}
          <BenefitsSection />

          {/* Testimonials Section */}
          <TestimonialsSection />

          {/* CTA Section */}
          <CTASection />
        </main>

        {/* Footer */}
        <footer className="bg-text-primary text-white py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              {/* Company Info */}
              <div className="lg:col-span-2">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">M</span>
                  </div>
                  <span className="text-xl font-noto font-semibold">Milkyhome</span>
                </div>
                <p className="text-gray-300 mb-4 max-w-md">
                  保育園と講師をつなぐプラットフォームとして、すべての子どもたちに質の高い教育機会を提供します。
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white transition-smooth">
                    <span className="sr-only">Facebook</span>
                    <div className="w-6 h-6 bg-gray-600 rounded"></div>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-smooth">
                    <span className="sr-only">Twitter</span>
                    <div className="w-6 h-6 bg-gray-600 rounded"></div>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-smooth">
                    <span className="sr-only">Instagram</span>
                    <div className="w-6 h-6 bg-gray-600 rounded"></div>
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-noto font-semibold mb-4">サービス</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-300 hover:text-white transition-smooth">講師検索</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-smooth">レッスン予約</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-smooth">講師登録</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-smooth">保育園登録</a></li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h3 className="text-lg font-noto font-semibold mb-4">サポート</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-300 hover:text-white transition-smooth">ヘルプセンター</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-smooth">お問い合わせ</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-smooth">利用規約</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-smooth">プライバシーポリシー</a></li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © {new Date()?.getFullYear()} Milkyhome. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-smooth">
                  特定商取引法に基づく表記
                </a>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-smooth">
                  運営会社
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;