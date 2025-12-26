import { useState, useEffect } from "react";
import { Hero } from "@/components/Hero";
import { UsernameChecker } from "@/components/UsernameChecker";
import { Leaderboard } from "@/components/Leaderboard";
import { Footer } from "@/components/Footer";
import { getLeaderboard, LeaderboardEntry } from "@/lib/leaderboard";

const Index = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [highlightUsername, setHighlightUsername] = useState<string>("");

  useEffect(() => {
    setLeaderboard(getLeaderboard());
  }, []);

  const handleResultsUpdate = (entries: LeaderboardEntry[], username: string) => {
    setLeaderboard(entries);
    setHighlightUsername(username);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Hero Section */}
      <Hero />

      {/* Main Content */}
      <main className="flex-1 container py-12 md:py-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-start">
          {/* Left Column - Checker */}
          <div className="space-y-8">
            <UsernameChecker onResultsUpdate={handleResultsUpdate} />
          </div>

          {/* Right Column - Leaderboard */}
          <div className="lg:sticky lg:top-8">
            <Leaderboard entries={leaderboard} highlightUsername={highlightUsername} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
