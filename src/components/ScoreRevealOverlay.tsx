import { useEffect, useState, useRef, useCallback } from 'react';
import { AnimatedBus } from './AnimatedBus';
import { AnimatedCounter } from './AnimatedCounter';
import { MaxiShareCard } from './MaxiShareCard';
import html2canvas from 'html2canvas';
import { X, Download, Twitter, Copy, Check } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';

interface ScoreRevealOverlayProps {
  username: string;
  score: number;
  originalCount: number;
  replyCount: number;
  retweetCount: number;
  totalMentions: number;
  rankTitle: string;
  rankEmoji: string;
  onComplete: () => void;
}

type AnimationPhase = 
  | 'color-wipe'
  | 'bus-enter'
  | 'counters'
  | 'bus-stop'
  | 'spotlight'
  | 'final';

export function ScoreRevealOverlay({
  username,
  score,
  originalCount,
  replyCount,
  retweetCount,
  totalMentions,
  rankTitle,
  rankEmoji,
  onComplete,
}: ScoreRevealOverlayProps) {
  const [phase, setPhase] = useState<AnimationPhase>('color-wipe');
  const [showCounters, setShowCounters] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showUsername, setShowUsername] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [showRank, setShowRank] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const profileImageUrl = `https://unavatar.io/x/${username}`;

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Preload profile image
  useEffect(() => {
    const img = new Image();
    img.src = profileImageUrl;
  }, [profileImageUrl]);

  // Animation timeline
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    // Phase 1: Color wipe (0-500ms)
    timers.push(setTimeout(() => setPhase('bus-enter'), 500));

    // Phase 2: Bus enters (500-1500ms)
    timers.push(setTimeout(() => {
      setPhase('counters');
      setShowCounters(true);
    }, 1500));

    // Phase 3: Counters animate (1500-2500ms)
    timers.push(setTimeout(() => setPhase('bus-stop'), 2500));

    // Phase 4: Bus stops, spotlight begins (2500-3000ms)
    timers.push(setTimeout(() => {
      setPhase('spotlight');
      setShowProfile(true);
    }, 3000));

    // Show username (3300ms)
    timers.push(setTimeout(() => setShowUsername(true), 3300));

    // Show score (3600ms)
    timers.push(setTimeout(() => setShowScore(true), 3600));

    // Show rank (4000ms)
    timers.push(setTimeout(() => setShowRank(true), 4000));

    // Final state - show card (4500ms)
    timers.push(setTimeout(() => {
      setPhase('final');
      setShowCard(true);
    }, 4500));

    return () => timers.forEach(clearTimeout);
  }, []);

  const handleSkip = useCallback(() => {
    setPhase('final');
    setShowCounters(true);
    setShowProfile(true);
    setShowUsername(true);
    setShowScore(true);
    setShowRank(true);
    setShowCard(true);
  }, []);

  const downloadCard = async () => {
    if (!cardRef.current) return;
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: null,
        useCORS: true,
        allowTaint: true,
      });
      const link = document.createElement('a');
      link.download = `ethmumbai-maxi-${username}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      toast.success('Card downloaded!');
    } catch (error) {
      toast.error('Failed to download card');
    }
  };

  const shareOnTwitter = () => {
    const text = `🚌 I'm an ETHMumbai ${rankTitle}! ${rankEmoji}\n\nMy ETHMumbai Maxi Score: ${score}\n\nCheck your score at ethmumbai-maxi.lovable.app\n\n@AnnoyedApe @AKG1 @AkashHirani @AadityaGupta007 @AniketThaokar`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const copyImage = async () => {
    if (!cardRef.current) return;
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: null,
        useCORS: true,
        allowTaint: true,
      });
      canvas.toBlob(async (blob) => {
        if (blob) {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          setCopied(true);
          toast.success('Image copied to clipboard!');
          setTimeout(() => setCopied(false), 2000);
        }
      });
    } catch (error) {
      toast.error('Failed to copy image');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div 
        className={`absolute inset-0 bg-primary transition-opacity duration-500 ${
          phase === 'color-wipe' ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div 
        className={`absolute inset-0 bg-secondary transition-opacity duration-300 delay-200 ${
          phase === 'color-wipe' ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div 
        className={`absolute inset-0 transition-all duration-700 ${
          phase === 'final' ? 'bg-background' : 'bg-gradient-to-br from-primary via-primary/90 to-accent/30'
        }`}
      />
      
      {/* Animated particles/glow effect */}
      {phase !== 'final' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-secondary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/20 rounded-full blur-3xl animate-pulse delay-500" />
        </div>
      )}

      {/* Skip button */}
      {phase !== 'final' && (
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 bg-background/20 backdrop-blur-sm rounded-full text-primary-foreground hover:bg-background/30 transition-colors"
        >
          <span className="text-sm font-medium">Skip</span>
          <X className="w-4 h-4" />
        </button>
      )}

      {/* Bus Animation */}
      {phase !== 'final' && (
        <div 
          className={`absolute w-full max-w-md px-4 transition-all duration-1000 ease-out ${
            phase === 'color-wipe' ? '-translate-x-[150%]' : 
            phase === 'bus-enter' ? '-translate-x-[50%]' :
            phase === 'spotlight' ? 'translate-y-[100vh] opacity-0' :
            'translate-x-0'
          } ${phase === 'bus-stop' ? 'animate-bounce-slow' : ''}`}
        >
          <AnimatedBus
            originalCount={originalCount}
            replyCount={replyCount}
            retweetCount={retweetCount}
            totalMentions={totalMentions}
            showCounters={showCounters}
          />
        </div>
      )}

      {/* Spotlight Reveal Content */}
      {phase === 'spotlight' && !showCard && (
        <div className="flex flex-col items-center gap-4 z-10">
          {/* Profile Picture */}
          {showProfile && (
            <div className="animate-scale-in">
              <div className="w-28 h-28 rounded-full border-4 border-secondary shadow-[0_0_40px_rgba(255,215,0,0.5)] overflow-hidden">
                <img
                  src={profileImageUrl}
                  alt={username}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Username */}
          {showUsername && (
            <div className="animate-fade-in">
              <span className="text-2xl font-bold text-primary-foreground">@{username}</span>
            </div>
          )}

          {/* Score */}
          {showScore && (
            <div className="animate-scale-in flex flex-col items-center gap-1">
              <span className="text-sm uppercase tracking-widest text-primary-foreground/70">Maxi Score</span>
              <div className="text-6xl font-extrabold text-secondary drop-shadow-lg">
                <AnimatedCounter value={score} duration={800} />
              </div>
            </div>
          )}

          {/* Rank */}
          {showRank && (
            <div className="animate-scale-in mt-2">
              <div className="flex items-center gap-2 px-6 py-3 bg-secondary rounded-full shadow-lg">
                <span className="text-2xl">{rankEmoji}</span>
                <span className="text-xl font-extrabold text-secondary-foreground">{rankTitle}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Final Card State */}
      {showCard && (
        <div className="flex flex-col items-center gap-6 z-10 animate-fade-in p-4">
          {/* Card for html2canvas capture */}
          <div ref={cardRef}>
            <MaxiShareCard
              username={username}
              score={score}
              rankTitle={`${rankEmoji} ${rankTitle}`}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              onClick={downloadCard}
              className="flex items-center gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/90"
            >
              <Download className="w-4 h-4" />
              Download
            </Button>
            
            <Button
              onClick={shareOnTwitter}
              className="flex items-center gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <Twitter className="w-4 h-4" />
              Share on X
            </Button>
            
            <Button
              onClick={copyImage}
              variant="outline"
              className="flex items-center gap-2"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy Image'}
            </Button>
          </div>

          {/* Close Button */}
          <Button
            onClick={onComplete}
            variant="ghost"
            className="text-muted-foreground hover:text-foreground"
          >
            Close
          </Button>
        </div>
      )}
    </div>
  );
}
