import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const IntroductionVideo = ({ videoUrl, instructor }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180); // 3 minutes mock duration
  const [quality, setQuality] = useState('720p');
  const [showControls, setShowControls] = useState(true);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const rect = e?.currentTarget?.getBoundingClientRect();
    const clickX = e?.clientX - rect?.left;
    const newTime = (clickX / rect?.width) * duration;
    setCurrentTime(newTime);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const qualityOptions = ['480p', '720p', '1080p'];

  return (
    <div className="bg-white rounded-2xl shadow-medium p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-noto font-semibold text-text-primary">
          紹介動画
        </h2>
        <div className="flex items-center space-x-2">
          <select
            value={quality}
            onChange={(e) => setQuality(e?.target?.value)}
            className="text-sm border border-border rounded-lg px-3 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            {qualityOptions?.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>
      {/* Video Player */}
      <div className="relative bg-gray-900 rounded-xl overflow-hidden aspect-video mb-4">
        {/* Video Thumbnail/Player */}
        <div className="absolute inset-0 flex items-center justify-center">
          {!isPlaying ? (
            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto backdrop-blur-sm">
                <Icon name="Play" size={32} color="white" strokeWidth={2} />
              </div>
              <p className="text-white text-sm">
                {instructor?.name}の紹介動画
              </p>
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <div className="text-center text-white">
                <Icon name="Pause" size={48} strokeWidth={2} className="mx-auto mb-2" />
                <p>動画再生中...</p>
              </div>
            </div>
          )}
        </div>

        {/* Play/Pause Overlay */}
        <button
          onClick={handlePlayPause}
          className="absolute inset-0 w-full h-full bg-black/0 hover:bg-black/10 transition-smooth flex items-center justify-center group"
        >
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth backdrop-blur-sm">
            <Icon 
              name={isPlaying ? "Pause" : "Play"} 
              size={24} 
              color="white" 
              strokeWidth={2} 
            />
          </div>
        </button>

        {/* Video Controls */}
        {showControls && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            {/* Progress Bar */}
            <div 
              className="w-full h-1 bg-white/30 rounded-full mb-3 cursor-pointer"
              onClick={handleSeek}
            >
              <div 
                className="h-full bg-white rounded-full transition-smooth"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePlayPause}
                  className="text-white hover:bg-white/20"
                >
                  <Icon name={isPlaying ? "Pause" : "Play"} size={16} strokeWidth={2} />
                </Button>
                <span className="text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                >
                  <Icon name="Volume2" size={16} strokeWidth={2} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                >
                  <Icon name="Maximize" size={16} strokeWidth={2} />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Video Info */}
      <div className="flex items-center justify-between text-sm text-text-secondary">
        <div className="flex items-center space-x-4">
          <span>再生時間: {formatTime(duration)}</span>
          <span>画質: {quality}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Icon name="Download" size={14} strokeWidth={2} className="mr-1" />
            ダウンロード
          </Button>
          <Button variant="ghost" size="sm">
            <Icon name="Share" size={14} strokeWidth={2} className="mr-1" />
            共有
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IntroductionVideo;