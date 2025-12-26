export interface RankInfo {
  title: string;
  emoji: string;
  description: string;
  color: string;
  bgClass: string;
}

export const RANKS: Record<string, RankInfo> = {
  curious: {
    title: "Curious Commuter",
    emoji: "🚶",
    description: "Just hopped on the ETHMumbai bus. The journey begins!",
    color: "hsl(var(--muted-foreground))",
    bgClass: "bg-muted text-muted-foreground",
  },
  rider: {
    title: "ETHMumbai Rider",
    emoji: "🚌",
    description: "You've got a seat on the bus. Keep tweeting!",
    color: "hsl(var(--bus-green))",
    bgClass: "bg-best-green/20 text-best-green",
  },
  regular: {
    title: "BEST Bus Regular",
    emoji: "🎫",
    description: "You know all the stops. A true commuter!",
    color: "hsl(var(--eth-blue))",
    bgClass: "bg-best-blue/20 text-best-blue",
  },
  local: {
    title: "ETHMumbai Local",
    emoji: "🏠",
    description: "ETHMumbai runs in your veins. Almost a Maxi!",
    color: "hsl(var(--bus-yellow))",
    bgClass: "bg-secondary/30 text-secondary-foreground",
  },
  maxi: {
    title: "ETHMumbai Maxi",
    emoji: "🔥",
    description: "You never miss the ETHMumbai bus!",
    color: "hsl(var(--best-red))",
    bgClass: "bg-primary/20 text-primary",
  },
  og: {
    title: "ETHMumbai OG",
    emoji: "❤️‍🔥",
    description: "Legend. The bus driver knows you by name.",
    color: "hsl(var(--best-red))",
    bgClass: "bg-primary text-primary-foreground",
  },
};

export function getRank(score: number): RankInfo {
  if (score >= 150) return RANKS.og;
  if (score >= 81) return RANKS.maxi;
  if (score >= 41) return RANKS.local;
  if (score >= 16) return RANKS.regular;
  if (score >= 6) return RANKS.rider;
  return RANKS.curious;
}

export function calculateScore(tweets: {
  originalCount: number;
  replyCount: number;
  retweetCount: number;
}): number {
  return tweets.originalCount * 3 + tweets.replyCount * 2 + tweets.retweetCount;
}

// Mock tweet data generator
export function generateMockTweetData(username: string): {
  originalCount: number;
  replyCount: number;
  retweetCount: number;
  totalMentions: number;
} {
  // Generate deterministic but varied data based on username hash
  const hash = username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const seed = hash % 100;
  
  const originalCount = Math.floor((seed * 2.3) % 60);
  const replyCount = Math.floor((seed * 1.7) % 40);
  const retweetCount = Math.floor((seed * 1.1) % 25);
  
  return {
    originalCount,
    replyCount,
    retweetCount,
    totalMentions: originalCount + replyCount + retweetCount,
  };
}
