import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { UsernameChecker } from "@/components/UsernameChecker";
import { Leaderboard } from "@/components/Leaderboard";
import { Footer } from "@/components/Footer";
import { useLeaderboard } from "@/hooks/useLeaderboard";

const Index = () => {
  const [highlightUsername, setHighlightUsername] = useState<string>("");
  const { entries, loading, upsertEntry } = useLeaderboard();

  const handleResultsUpdate = async (
    username: string,
    score: number,
    originalCount: number,
    replyCount: number,
    retweetCount: number,
    totalMentions: number,
    rankTitle: string,
    profileImageUrl?: string | null
  ) => {
    await upsertEntry({
      username,
      score,
      originalCount,
      replyCount,
      retweetCount,
      totalMentions,
      rankTitle,
      profileImageUrl,
    });
    setHighlightUsername(username);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-16">
        <Hero />
      </div>

      {/* Main Content */}
      <main className="flex-1 container py-12 md:py-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-start">
          {/* Left Column - Checker */}
          <div className="space-y-8">
            <UsernameChecker onResultsUpdate={handleResultsUpdate} />
          </div>

          {/* Right Column - Leaderboard */}
          <div className="lg:sticky lg:top-24">
            <Leaderboard
              entries={entries}
              highlightUsername={highlightUsername}
              loading={loading}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
