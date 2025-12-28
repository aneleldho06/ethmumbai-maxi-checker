import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getRank, RankInfo } from "@/lib/rankingSystem";
import { useToast } from "@/hooks/use-toast";

export interface LeaderboardEntry {
  id: string;
  rank: number;
  username: string;
  score: number;
  originalCount: number;
  replyCount: number;
  retweetCount: number;
  totalMentions: number;
  rankInfo: RankInfo;
  lastChecked: string;
  profileImageUrl: string | null;
}

export function useLeaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchLeaderboard = async () => {
    try {
      const { data, error } = await supabase
        .from("leaderboard")
        .select("*")
        .order("score", { ascending: false })
        .limit(20);

      if (error) throw error;

      const formattedEntries: LeaderboardEntry[] = (data || []).map((entry, index) => ({
        id: entry.id,
        rank: index + 1,
        username: entry.username,
        score: entry.score,
        originalCount: entry.original_count,
        replyCount: entry.reply_count,
        retweetCount: entry.retweet_count,
        totalMentions: entry.total_mentions,
        rankInfo: getRank(entry.score),
        lastChecked: entry.last_checked,
        profileImageUrl: entry.profile_image_url,
      }));

      setEntries(formattedEntries);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      toast({
        title: "Error",
        description: "Failed to load leaderboard",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const upsertEntry = async (data: {
    username: string;
    score: number;
    originalCount: number;
    replyCount: number;
    retweetCount: number;
    totalMentions: number;
    rankTitle: string;
    profileImageUrl?: string | null;
  }) => {
    try {
      const { error } = await supabase
        .from("leaderboard")
        .upsert(
          {
            username: data.username.toLowerCase(),
            score: data.score,
            original_count: data.originalCount,
            reply_count: data.replyCount,
            retweet_count: data.retweetCount,
            total_mentions: data.totalMentions,
            rank_title: data.rankTitle,
            profile_image_url: data.profileImageUrl,
          },
          {
            onConflict: "username",
          }
        );

      if (error) throw error;

      // Refetch leaderboard after upsert
      await fetchLeaderboard();
      return true;
    } catch (error) {
      console.error("Error upserting leaderboard entry:", error);
      toast({
        title: "Error",
        description: "Failed to update leaderboard",
        variant: "destructive",
      });
      return false;
    }
  };

  // Real-time subscription
  useEffect(() => {
    fetchLeaderboard();

    const channel = supabase
      .channel("leaderboard-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "leaderboard",
        },
        () => {
          fetchLeaderboard();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { entries, loading, fetchLeaderboard, upsertEntry };
}
