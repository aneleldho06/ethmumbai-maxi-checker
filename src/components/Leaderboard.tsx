import { Trophy, Medal, Award, RefreshCw } from "lucide-react";
import { LeaderboardEntry } from "@/hooks/useLeaderboard";
import { RankBadge } from "./RankBadge";
import { cn } from "@/lib/utils";

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  highlightUsername?: string;
  loading?: boolean;
}

export function Leaderboard({ entries, highlightUsername, loading }: LeaderboardProps) {
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

  return (
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
                className={cn(
                  "leaderboard-row",
                  getTopClass(entry.rank),
                  highlightUsername?.toLowerCase() === entry.username.toLowerCase() &&
                    "ring-2 ring-primary ring-offset-2"
                )}
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
  );
}
