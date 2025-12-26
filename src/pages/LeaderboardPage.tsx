import { Trophy, Medal, Award, RefreshCw } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RankBadge } from "@/components/RankBadge";
import { Button } from "@/components/ui/button";
import { useLeaderboard } from "@/hooks/useLeaderboard";
import { cn } from "@/lib/utils";

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Trophy className="w-6 h-6 text-yellow-500" />;
    case 2:
      return <Medal className="w-6 h-6 text-gray-400" />;
    case 3:
      return <Award className="w-6 h-6 text-amber-600" />;
    default:
      return (
        <span className="w-6 h-6 flex items-center justify-center font-bold text-muted-foreground">
          {rank}
        </span>
      );
  }
};

const getTopClass = (rank: number) => {
  switch (rank) {
    case 1:
      return "top-1";
    case 2:
      return "top-2";
    case 3:
      return "top-3";
    default:
      return "";
  }
};

export default function LeaderboardPage() {
  const { entries, loading, fetchLeaderboard } = useLeaderboard();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">
              🏆 Global Leaderboard
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              The top ETHMumbai Maxis ranked by their tweet energy. Real-time updates!
            </p>
          </div>

          {/* Refresh button */}
          <div className="flex justify-center mb-6">
            <Button
              variant="outline"
              onClick={() => fetchLeaderboard()}
              disabled={loading}
              className="gap-2"
            >
              <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
              Refresh
            </Button>
          </div>

          {/* Leaderboard */}
          <div className="bus-card overflow-hidden">
            {/* Yellow strip header */}
            <div className="yellow-strip" />
            
            {/* Header */}
            <div className="bg-primary px-6 py-4">
              <div className="flex items-center justify-center gap-3">
                <Trophy className="w-6 h-6 text-secondary" />
                <h2 className="text-xl font-extrabold text-primary-foreground">
                  Top 20 ETHMumbai Maxis
                </h2>
                <Trophy className="w-6 h-6 text-secondary" />
              </div>
            </div>
            
            {/* Loading state */}
            {loading && entries.length === 0 && (
              <div className="p-8 text-center">
                <RefreshCw className="w-8 h-8 mx-auto mb-4 animate-spin text-primary" />
                <p className="text-muted-foreground">Loading leaderboard...</p>
              </div>
            )}

            {/* Empty state */}
            {!loading && entries.length === 0 && (
              <div className="p-8 text-center">
                <Trophy className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  No entries yet! Be the first to check your ETHMumbai energy.
                </p>
              </div>
            )}
            
            {/* Leaderboard list */}
            {entries.length > 0 && (
              <div className="max-h-[600px] overflow-y-auto">
                <div className="p-4 space-y-2">
                  {entries.map((entry) => (
                    <div
                      key={entry.id}
                      className={cn("leaderboard-row", getTopClass(entry.rank))}
                    >
                      {/* Rank */}
                      <div className="flex-shrink-0 w-10 flex justify-center">
                        {getRankIcon(entry.rank)}
                      </div>
                      
                      {/* Username */}
                      <div className="flex-1 min-w-0">
                        <p className={cn(
                          "font-bold truncate",
                          entry.rank <= 3 ? "text-inherit" : "text-foreground"
                        )}>
                          @{entry.username}
                        </p>
                      </div>
                      
                      {/* Score */}
                      <div className="flex-shrink-0 text-right">
                        <p className={cn(
                          "text-xl font-black",
                          entry.rank <= 3 ? "text-inherit" : "text-primary"
                        )}>
                          {entry.score}
                        </p>
                      </div>
                      
                      {/* Rank badge */}
                      <div className="flex-shrink-0 hidden sm:block">
                        <RankBadge rank={entry.rankInfo} size="sm" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
