import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PublicHeader from '../../components/ui/PublicHeader';
import InstructorHero from './components/InstructorHero';
import IntroductionVideo from './components/IntroductionVideo';
import LessonDetails from './components/LessonDetails';
import ReviewsSection from './components/ReviewsSection';
import AvailabilityCalendar from './components/AvailabilityCalendar';

const InstructorProfileDetails = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('ja');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'ja';
    setCurrentLanguage(savedLanguage);
  }, []);

  // Mock instructor data
  const instructor = {
    id: 1,
    name: "田中 美咲",
    location: "東京都渋谷区",
    experience: 8,
    rating: 4.8,
    reviewCount: 127,
    profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    specialties: ["音楽教育", "リトミック", "ピアノ", "歌唱指導"],
    bio: `8年間の幼児教育経験を持つ音楽講師です。\n\n音楽大学でピアノと幼児教育を専攻し、卒業後は複数の保育園で音楽指導を行ってきました。子どもたちの創造性と表現力を育むことを大切にし、一人ひとりの個性に合わせたレッスンを心がけています。\n\nリトミックを取り入れた楽しい音楽活動を通じて、子どもたちの感性と協調性を育てることを目標としています。`,
    detailedSpecialties: [
      {
        name: "ピアノ指導",
        icon: "Music",
        description: "基礎から応用まで、年齢に応じたピアノレッスンを提供します。楽譜の読み方から始めて、簡単な楽曲の演奏まで指導いたします。",
        skills: ["基礎技術", "楽譜読解", "表現力", "リズム感"]
      },
      {
        name: "リトミック",
        icon: "Users",
        description: "音楽に合わせた身体表現を通じて、リズム感や協調性を育みます。グループ活動を中心とした楽しいプログラムです。",
        skills: ["身体表現", "リズム感", "協調性", "創造性"]
      },
      {
        name: "歌唱指導",
        icon: "Mic",
        description: "正しい発声方法から始めて、童謡や季節の歌を楽しく歌えるよう指導します。合唱指導も可能です。",
        skills: ["発声法", "音程", "表現力", "合唱指導"]
      }
    ],
    lessonModes: [
      {
        name: "対面レッスン",
        icon: "Users",
        available: true,
        description: "保育園に直接お伺いして、対面でのレッスンを行います。",
        features: [
          "楽器の実演指導",
          "グループ活動の充実",
          "個別指導の組み合わせ",
          "教材の持参"
        ]
      },
      {
        name: "オンラインレッスン",
        icon: "Monitor",
        available: true,
        description: "ビデオ通話を使用したオンラインレッスンです。",
        features: [
          "画面共有での楽譜表示",
          "録画レッスンの提供",
          "個別フィードバック",
          "柔軟なスケジュール"
        ]
      }
    ],
    pricingPlans: [
      {
        name: "基本レッスン",
        description: "60分の標準的なレッスンプラン",
        price: 8000,
        duration: "60分",
        includes: [
          "レッスン指導",
          "教材提供",
          "進捗レポート",
          "質問対応"
        ],
        additionalFees: [
          { item: "交通費", price: 500 },
          { item: "楽器レンタル", price: 1000 }
        ]
      },
      {
        name: "プレミアムレッスン",
        description: "90分の充実したレッスンプラン",
        price: 12000,
        duration: "90分",
        includes: [
          "レッスン指導",
          "教材提供",
          "進捗レポート",
          "質問対応",
          "個別カウンセリング",
          "録画レッスン"
        ],
        additionalFees: [
          { item: "交通費", price: 500 }
        ]
      }
    ],
    targetAges: [
      { range: "0-1歳", description: "乳児向け", available: false },
      { range: "2-3歳", description: "幼児向け", available: true },
      { range: "4-5歳", description: "年中・年長", available: true },
      { range: "6歳以上", description: "小学生", available: true }
    ],
    equipment: {
      online: [
        { name: "Webカメラ", icon: "Camera", required: true },
        { name: "マイク", icon: "Mic", required: true },
        { name: "安定したインターネット", icon: "Wifi", required: true },
        { name: "ピアノ・キーボード", icon: "Music", required: false }
      ],
      onsite: [
        { name: "ポータブルキーボード", icon: "Music", provided: true },
        { name: "楽譜・教材", icon: "BookOpen", provided: true },
        { name: "音響機器", icon: "Speaker", provided: false },
        { name: "プロジェクター", icon: "Monitor", provided: false }
      ]
    }
  };

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      reviewer: {
        name: "山田 花子",
        nurseryName: "さくら保育園",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
      },
      rating: 5,
      date: "2025-09-15",
      lessonType: "ピアノ・リトミック",
      lessonDate: "2025-09-10",
      participantCount: 15,
      content: `田中先生のレッスンは本当に素晴らしいです。子どもたちが音楽を心から楽しんでいる様子が伝わってきます。\n\n特にリトミックの指導が上手で、普段恥ずかしがりやの子どもたちも積極的に参加していました。ピアノの基礎指導も丁寧で、短時間で子どもたちが簡単な曲を弾けるようになりました。\n\n保護者の方々からも「家でも歌を歌うようになった」「音楽に興味を持つようになった」という声をいただいています。`,
      images: [
        "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop"
      ],
      helpfulCount: 23,
      verified: true
    },
    {
      id: 2,
      reviewer: {
        name: "佐藤 太郎",
        nurseryName: "ひまわり幼稚園",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
      },
      rating: 4,
      date: "2025-08-28",
      lessonType: "歌唱指導",
      lessonDate: "2025-08-25",
      participantCount: 20,
      content: `歌唱指導をお願いしました。発声の基礎から丁寧に教えていただき、子どもたちの歌声が格段に良くなりました。季節の歌を中心に、楽しく学べる内容でした。`,
      helpfulCount: 15,
      verified: true
    }
  ];

  const overallRating = 4.8;
  const ratingBreakdown = [
    { stars: 5, count: 89, percentage: 70 },
    { stars: 4, count: 28, percentage: 22 },
    { stars: 3, count: 7, percentage: 6 },
    { stars: 2, count: 2, percentage: 1.5 },
    { stars: 1, count: 1, percentage: 0.5 }
  ];

  // Mock availability data
  const availability = {
    "2025-10-15": {
      timeSlots: [
        { time: "09:00-10:00", price: 8000, available: true },
        { time: "10:30-11:30", price: 8000, available: true },
        { time: "14:00-15:00", price: 8000, available: false },
        { time: "15:30-16:30", price: 8000, available: true }
      ]
    },
    "2025-10-16": {
      timeSlots: [
        { time: "09:00-10:00", price: 8000, available: false },
        { time: "10:30-11:30", price: 8000, available: true },
        { time: "14:00-15:00", price: 8000, available: true }
      ]
    },
    "2025-10-17": {
      timeSlots: [
        { time: "09:00-10:00", price: 8000, available: true },
        { time: "14:00-15:00", price: 8000, available: true },
        { time: "15:30-16:30", price: 8000, available: true }
      ]
    },
    "2025-10-22": {
      timeSlots: [
        { time: "09:00-10:00", price: 8000, available: true },
        { time: "10:30-11:30", price: 8000, available: false },
        { time: "14:00-15:00", price: 8000, available: true },
        { time: "15:30-16:30", price: 8000, available: true }
      ]
    },
    "2025-10-23": {
      timeSlots: [
        { time: "09:00-10:00", price: 8000, available: true },
        { time: "14:00-15:00", price: 8000, available: true }
      ]
    }
  };

  const handleBookingRequest = (bookingData) => {
    console.log('Booking request:', bookingData);
    navigate('/booking-request-flow', { 
      state: { 
        instructor: instructor,
        selectedDate: bookingData?.date,
        selectedTimeSlot: bookingData?.timeSlot
      }
    });
  };

  const handleSendMessage = () => {
    navigate('/messaging-interface', { 
      state: { 
        instructorId: instructor?.id,
        instructorName: instructor?.name
      }
    });
  };

  const handleSaveToFavorites = () => {
    console.log('Saved to favorites:', instructor?.id);
    // Mock implementation - would typically update user's favorites
  };

  return (
    <div className="min-h-screen bg-surface">
      <PublicHeader />
      
      <main className="pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <InstructorHero
            instructor={instructor}
            onBookingRequest={() => handleBookingRequest()}
            onSendMessage={handleSendMessage}
            onSaveToFavorites={handleSaveToFavorites}
          />

          <IntroductionVideo
            videoUrl="/mock-video.mp4"
            instructor={instructor}
          />

          <LessonDetails instructor={instructor} />

          <AvailabilityCalendar
            availability={availability}
            onBookingRequest={handleBookingRequest}
          />

          <ReviewsSection
            reviews={reviews}
            overallRating={overallRating}
            ratingBreakdown={ratingBreakdown}
          />
        </div>
      </main>
    </div>
  );
};

export default InstructorProfileDetails;