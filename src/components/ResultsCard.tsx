import { useRef } from "react";
import html2canvas from "html2canvas";
import { Download, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RankBadge } from "./RankBadge";
import { RankInfo } from "@/lib/rankingSystem";
import { toast } from "@/hooks/use-toast";

interface ResultsCardProps {
  username: string;
  score: number;
  totalMentions: number;
  originalCount: number;
  replyCount: number;
  retweetCount: number;
  rank: RankInfo;
}

export function ResultsCard({
  username,
  score,
  totalMentions,
  originalCount,
  replyCount,
  retweetCount,
  rank,
}: ResultsCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // const downloadCard = async () => {
  //   if (!cardRef.current) return;

  //   try {
  //     const canvas = await html2canvas(cardRef.current, {
  //       backgroundColor: null,
  //       scale: 2,
  //     });

  //     const link = document.createElement("a");
  //     link.download = `ethmumbai-maxi-${username}.png`;
  //     link.href = canvas.toDataURL("image/png");
  //     link.click();

  //     toast({
  //       title: "Downloaded!",
  //       description: "Your ETHMumbai Maxi card has been saved.",
  //     });
  //   } catch {
  //     toast({
  //       title: "Error",
  //       description: "Failed to download the card.",
  //       variant: "destructive",
  //     });
  //   }
  import html2canvas from "html2canvas";

  const downloadCard = async () => {
    if (!shareCardRef.current) return;

    const canvas = await html2canvas(shareCardRef.current, {
      scale: 3, // 👈 key
      backgroundColor: null,
      useCORS: true,
    });

    const image = canvas.toDataURL("image/png", 1.0);

    const link = document.createElement("a");
    link.href = image;
    link.download = `ethmumbai-maxi-${username}.png`;
    link.click();
  };

  const shareOnTwitter = () => {
    const text = `I'm an ${rank.title} ${rank.emoji} with a score of ${score}!\n\nCheck how big of an #ETHMumbai fan YOU are 👇`;
    const url = window.location.href;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  return (
    <div className="space-y-4">
      {/* <div
        ref={cardRef}
        className="bus-card overflow-hidden animate-scale-in"
      > */}
      const shareCardRef = useRef<HTMLDivElement>(null);

        {/* Hidden Share Card */}
        <div style={{ position: "fixed", left: "-9999px", top: 0 }}>
          <MaxiShareCard
            ref={shareCardRef}
            username={username}
            score={score}
            rankTitle={rank.title}
          />
        </div>



        {/* Yellow strip header */}
        <div className="yellow-strip" />

        {/* Red header */}
        <div className="bg-primary px-6 py-4 text-center">
          <h3 className="text-primary-foreground text-xl font-extrabold">
            ETHMumbai Maxi Score
          </h3>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Username */}
          <div className="text-center">
            <p className="text-muted-foreground text-sm">@{username}</p>
          </div>

          {/* Score */}
          <div className="text-center">
            <div className="animate-score-pop">
              <span className="text-7xl font-black text-primary">{score}</span>
            </div>
            <p className="text-muted-foreground mt-2">Total Points</p>
          </div>

          {/* Rank Badge */}
          <div className="flex justify-center">
            <RankBadge rank={rank} size="lg" showDescription />
          </div>

          {/* Stats breakdown */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{originalCount}</p>
              <p className="text-xs text-muted-foreground">Tweets</p>
              <p className="text-xs text-best-green">×3 pts</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{replyCount}</p>
              <p className="text-xs text-muted-foreground">Replies</p>
              <p className="text-xs text-best-blue">×2 pts</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{retweetCount}</p>
              <p className="text-xs text-muted-foreground">Retweets</p>
              <p className="text-xs text-muted-foreground">×1 pt</p>
            </div>
          </div>

          {/* Total mentions */}
          <div className="text-center pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              <span className="font-bold text-foreground">{totalMentions}</span> total ETHMumbai mentions found
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-muted/50 px-6 py-3 text-center">
          <p className="text-xs text-muted-foreground">ethmumbai-maxi-checker.lovable.app</p>
        </div>
    </div>

      {/* Action buttons */ }
  <div className="flex gap-3 justify-center">
    <Button variant="outline" onClick={downloadCard}>
      <Download className="mr-2" />
      Download
    </Button>
    <Button variant="default" onClick={shareOnTwitter}>
      <Twitter className="mr-2" />
      Share
    </Button>
  </div>
    </div >
  );
}
