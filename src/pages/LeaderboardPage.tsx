import { Trophy, RefreshCw, Crown, Medal, Award, User } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useLeaderboard, LeaderboardEntry } from "@/hooks/useLeaderboard";
import { cn } from "@/lib/utils";

const ProfileImage = ({ 
  src, 
  username, 
  size = "md" 
}: { 
  src: string | null; 
  username: string; 
  size?: "sm" | "md" | "lg" | "xl";
}) => {
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-14 h-14",
    lg: "w-20 h-20",
    xl: "w-28 h-28",
  };

  const fallbackSizeClasses = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl",
    xl: "text-4xl",
  };

  return (
    <div className={cn(
      "rounded-full bg-destructive flex items-center justify-center overflow-hidden border-4 border-background shadow-lg",
      sizeClasses[size]
    )}>
      {src ? (
        <img 
          src={src} 
          alt={`@${username}`}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            e.currentTarget.nextElementSibling?.classList.remove('hidden');
          }}
        />
      ) : null}
      <div className={cn(
        "w-full h-full flex items-center justify-center bg-destructive text-destructive-foreground font-bold",
        fallbackSizeClasses[size],
        src ? "hidden" : ""
      )}>
        {username.charAt(0).toUpperCase()}
      </div>
    </div>
  );
};

const PodiumCard = ({ entry, position }: { entry: LeaderboardEntry; position: 1 | 2 | 3 }) => {
  const positionConfig = {
    1: {
      icon: <Crown className="w-8 h-8 text-secondary" />,
      bgClass: "bg-gradient-to-b from-secondary/30 to-secondary/10",
      borderClass: "border-secondary",
      scale: "scale-110",
      order: "order-2",
      height: "min-h-[280px]",
      badge: "🥇",
    },
    2: {
      icon: <Medal className="w-6 h-6 text-muted-foreground" />,
      bgClass: "bg-gradient-to-b from-muted/50 to-muted/20",
      borderClass: "border-muted-foreground/50",
      scale: "",
      order: "order-1",
      height: "min-h-[240px]",
      badge: "🥈",
    },
    3: {
      icon: <Award className="w-6 h-6 text-amber-600" />,
      bgClass: "bg-gradient-to-b from-amber-500/20 to-amber-500/5",
      borderClass: "border-amber-600/50",
      scale: "",
      order: "order-3",
      height: "min-h-[220px]",
      badge: "🥉",
    },
  };

  const config = positionConfig[position];

  return (
    <div className={cn(
      "flex flex-col items-center justify-end p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl",
      config.bgClass,
      config.borderClass,
      config.order,
      config.height,
      config.scale
    )}>
      {/* Crown/Medal Icon */}
      <div className="mb-2 animate-bounce-slow">
        {config.icon}
      </div>

      {/* Profile Image */}
      <div className="relative mb-4">
        <ProfileImage 
          src={entry.profileImageUrl} 
          username={entry.username} 
          size={position === 1 ? "xl" : "lg"}
        />
        <span className="absolute -bottom-2 -right-2 text-2xl">{config.badge}</span>
      </div>

      {/* Username */}
      <p className={cn(
        "font-black truncate max-w-full",
        position === 1 ? "text-xl" : "text-lg"
      )}>
        @{entry.username}
      </p>

      {/* Score */}
      <p className={cn(
        "font-black text-primary mt-1",
        position === 1 ? "text-4xl animate-pulse-slow" : "text-3xl"
      )}>
        {entry.score}
      </p>

      {/* Rank Badge */}
      <span className={cn(
        "mt-2 px-3 py-1 rounded-full text-xs font-bold",
        "bg-primary/10 text-primary"
      )}>
        {entry.rankInfo.title}
      </span>
    </div>
  );
};

const RankCard = ({ entry }: { entry: LeaderboardEntry }) => {
  return (
    <div className="leaderboard-card group">
      {/* Rank Number */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
        <span className="text-sm font-bold text-primary">{entry.rank}</span>
      </div>

      {/* Profile Image */}
      <ProfileImage 
        src={entry.profileImageUrl} 
        username={entry.username} 
        size="sm"
      />

      {/* Username */}
      <div className="flex-1 min-w-0">
        <p className="font-bold text-foreground truncate">@{entry.username}</p>
        <p className="text-xs text-muted-foreground">{entry.rankInfo.title}</p>
      </div>

      {/* Score */}
      <div className="flex-shrink-0 text-right">
        <p className="text-xl font-black text-primary">{entry.score}</p>
      </div>
    </div>
  );
};

export default function LeaderboardPage() {
  const { entries, loading, fetchLeaderboard } = useLeaderboard();

  const top3 = entries.slice(0, 3);
  const rest = entries.slice(3);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Yellow Header Section */}
        <div className="leaderboard-header-bg py-12 md:py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Trophy className="w-10 h-10 text-bus-black" />
              <h1 className="text-4xl md:text-6xl font-black text-bus-black">
                Global Leaderboard
              </h1>
              <Trophy className="w-10 h-10 text-bus-black" />
            </div>
            <p className="text-lg md:text-xl text-bus-black/80 max-w-xl mx-auto mb-6">
              The top ETHMumbai Maxis ranked by their tweet energy
            </p>
            <Button
              variant="outline"
              onClick={() => fetchLeaderboard()}
              disabled={loading}
              className="gap-2 bg-background hover:bg-background/90 border-bus-black text-bus-black"
            >
              <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
              Refresh Rankings
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12 max-w-5xl">
          {/* Loading State */}
          {loading && entries.length === 0 && (
            <div className="py-16 text-center">
              <RefreshCw className="w-12 h-12 mx-auto mb-4 animate-spin text-primary" />
              <p className="text-muted-foreground text-lg">Loading leaderboard...</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && entries.length === 0 && (
            <div className="py-16 text-center">
              <Trophy className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-bold mb-2">No entries yet!</h2>
              <p className="text-muted-foreground">
                Be the first to check your ETHMumbai energy and claim the top spot.
              </p>
            </div>
          )}

          {/* Podium Section - Top 3 */}
          {top3.length > 0 && (
            <section className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-end">
                {top3.map((entry, index) => (
                  <PodiumCard 
                    key={entry.id} 
                    entry={entry} 
                    position={(index + 1) as 1 | 2 | 3} 
                  />
                ))}
              </div>
            </section>
          )}

          {/* Rest of Rankings (4-20) */}
          {rest.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <User className="w-6 h-6 text-primary" />
                Ranks 4-20
              </h2>
              <div className="grid gap-3 md:grid-cols-2">
                {rest.map((entry) => (
                  <RankCard key={entry.id} entry={entry} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}