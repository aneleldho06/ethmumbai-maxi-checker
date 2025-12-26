import { Trophy, Medal, Award } from "lucide-react";
import { LeaderboardEntry } from "@/lib/leaderboard";
import { RankBadge } from "./RankBadge";
import { cn } from "@/lib/utils";

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  highlightUsername?: string;
}

export function Leaderboard({ entries, highlightUsername }: LeaderboardProps) {
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
      
      {/* Leaderboard list */}
      <div className="max-h-[600px] overflow-y-auto">
        <div className="p-4 space-y-2">
          {entries.map((entry) => (
            <div
              key={entry.username}
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
    </div>
  );
}
