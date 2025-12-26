import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BusLoader } from "./BusLoader";
import { ResultsCard } from "./ResultsCard";
import { generateMockTweetData, calculateScore, getRank } from "@/lib/rankingSystem";

interface UsernameCheckerProps {
  onResultsUpdate: (
    username: string,
    score: number,
    originalCount: number,
    replyCount: number,
    retweetCount: number,
    totalMentions: number,
    rankTitle: string
  ) => void;
}

interface Results {
  username: string;
  score: number;
  totalMentions: number;
  originalCount: number;
  replyCount: number;
  retweetCount: number;
}

export function UsernameChecker({ onResultsUpdate }: UsernameCheckerProps) {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Results | null>(null);

  const handleCheck = async () => {
    if (!username.trim()) return;
    
    const cleanUsername = username.replace("@", "").trim();
    
    setLoading(true);
    setResults(null);
    
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000 + Math.random() * 1000));
    
    // Generate mock data
    const tweetData = generateMockTweetData(cleanUsername);
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
      rankInfo.title
    );
    
    setResults({
      username: cleanUsername,
      score,
      totalMentions: tweetData.totalMentions,
      originalCount: tweetData.originalCount,
      replyCount: tweetData.replyCount,
      retweetCount: tweetData.retweetCount,
    });
    
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCheck();
    }
  };

  return (
    <div className="space-y-8">
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
      
      {/* Results */}
      {results && !loading && (
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
