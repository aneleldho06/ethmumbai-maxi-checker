import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BusLoader } from "./BusLoader";
import { ResultsCard } from "./ResultsCard";
import { ScoreRevealOverlay } from "./ScoreRevealOverlay";
import { calculateScore, getRank, generateMockTweetData } from "@/lib/rankingSystem";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface UsernameCheckerProps {
  onResultsUpdate: (
    username: string,
    score: number,
    originalCount: number,
    replyCount: number,
    retweetCount: number,
    totalMentions: number,
    rankTitle: string,
    profileImageUrl?: string | null
  ) => void;
}

interface Results {
  username: string;
  score: number;
  totalMentions: number;
  originalCount: number;
  replyCount: number;
  retweetCount: number;
  profileImageUrl: string | null;
}

export function UsernameChecker({ onResultsUpdate }: UsernameCheckerProps) {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Results | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);
  const [revealData, setRevealData] = useState<{
    username: string;
    score: number;
    originalCount: number;
    replyCount: number;
    retweetCount: number;
    totalMentions: number;
    rankTitle: string;
    rankEmoji: string;
  } | null>(null);

  const handleCheck = async () => {
    if (!username.trim()) return;
    
    const cleanUsername = username.replace("@", "").trim();
    
    setLoading(true);
    setResults(null);

    let tweetData: { originalCount: number; replyCount: number; retweetCount: number; totalMentions: number; profileImageUrl: string | null };

    try {
      // Try to fetch real Twitter data via edge function
      const { data, error } = await supabase.functions.invoke('twitter-search', {
        body: { username: cleanUsername }
      });

      if (error || data?.error || data?.fallback) {
        console.log('Twitter API unavailable, using mock data:', error || data?.error);
        // Fallback to mock data if Twitter API fails
        const mockData = generateMockTweetData(cleanUsername);
        tweetData = { ...mockData, profileImageUrl: null };
        toast({
          title: "Using simulated data",
          description: "Twitter API is unavailable. Showing estimated results.",
        });
      } else {
        tweetData = {
          originalCount: data.originalCount,
          replyCount: data.replyCount,
          retweetCount: data.retweetCount,
          totalMentions: data.totalMentions,
          profileImageUrl: data.profileImageUrl || null,
        };
      }
    } catch (err) {
      console.error('Error fetching Twitter data:', err);
      // Fallback to mock data
      const mockData = generateMockTweetData(cleanUsername);
      tweetData = { ...mockData, profileImageUrl: null };
      toast({
        title: "Using simulated data",
        description: "Could not connect to Twitter. Showing estimated results.",
      });
    }
    
    const score = calculateScore(tweetData);
    const rankInfo = getRank(score);
    
    // Update leaderboard via callback
    onResultsUpdate(
      cleanUsername,
      score,
      tweetData.originalCount,
      tweetData.replyCount,
      tweetData.retweetCount,
      tweetData.totalMentions,
      rankInfo.title,
      tweetData.profileImageUrl
    );
    
    // Store results for later display
    const resultData = {
      username: cleanUsername,
      score,
      totalMentions: tweetData.totalMentions,
      originalCount: tweetData.originalCount,
      replyCount: tweetData.replyCount,
      retweetCount: tweetData.retweetCount,
      profileImageUrl: tweetData.profileImageUrl,
    };
    
    // Set reveal data and trigger animation
    setRevealData({
      username: cleanUsername,
      score,
      originalCount: tweetData.originalCount,
      replyCount: tweetData.replyCount,
      retweetCount: tweetData.retweetCount,
      totalMentions: tweetData.totalMentions,
      rankTitle: rankInfo.title,
      rankEmoji: rankInfo.emoji,
    });
    
    setResults(resultData);
    setLoading(false);
    setIsRevealing(true);
  };

  const handleRevealComplete = () => {
    setIsRevealing(false);
    setRevealData(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCheck();
    }
  };

  return (
    <div className="space-y-8">
      {/* Score Reveal Animation Overlay */}
      {isRevealing && revealData && (
        <ScoreRevealOverlay
          username={revealData.username}
          score={revealData.score}
          originalCount={revealData.originalCount}
          replyCount={revealData.replyCount}
          retweetCount={revealData.retweetCount}
          totalMentions={revealData.totalMentions}
          rankTitle={revealData.rankTitle}
          rankEmoji={revealData.rankEmoji}
          onComplete={handleRevealComplete}
        />
      )}

      {/* Input section */}
      <div className="bus-card p-6 md:p-8">
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-extrabold text-foreground mb-2">
              Enter Your X Username
            </h2>
            <p className="text-muted-foreground">
              We'll analyze your ETHMumbai tweet activity
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">
                @
              </span>
              <Input
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pl-10"
                disabled={loading}
              />
            </div>
            <Button
              variant="yellow"
              size="lg"
              onClick={handleCheck}
              disabled={loading || !username.trim()}
              className="min-w-[200px]"
            >
              {loading ? (
                "Checking..."
              ) : (
                <>
                  <Sparkles className="mr-2" />
                  Check My Energy
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Loading state */}
      {loading && (
        <div className="bus-card">
          <div className="yellow-strip" />
          <BusLoader />
        </div>
      )}
      
      {/* Results - shown after animation completes */}
      {results && !loading && !isRevealing && (
        <ResultsCard
          username={results.username}
          score={results.score}
          totalMentions={results.totalMentions}
          originalCount={results.originalCount}
          replyCount={results.replyCount}
          retweetCount={results.retweetCount}
          rank={getRank(results.score)}
        />
      )}
    </div>
  );
}
