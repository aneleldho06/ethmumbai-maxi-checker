import React from "react";
import { RankInfo } from "@/lib/rankingSystem";
import { cn } from "@/lib/utils";

interface RankBadgeProps {
  rank: RankInfo;
  size?: "sm" | "md" | "lg";
  showDescription?: boolean;
}

export const RankBadge = React.memo(function RankBadge({ rank, size = "md", showDescription = false }: RankBadgeProps) {
  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-4 py-2",
    lg: "text-lg px-6 py-3",
  };

  const emojiSizes = {
    sm: "text-base",
    md: "text-xl",
    lg: "text-3xl",
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={cn(
          "rank-badge",
          rank.bgClass,
          sizeClasses[size]
        )}
      >
        <span className={emojiSizes[size]}>{rank.emoji}</span>
        <span>{rank.title}</span>
      </div>
      {showDescription && (
        <p className="text-muted-foreground text-center text-sm max-w-xs">
          {rank.description}
        </p>
      )}
    </div>
  );
});
