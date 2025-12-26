import { Heart, Bus, Twitter, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      {/* Yellow strip */}
      <div className="yellow-strip" />
      
      <div className="container py-12">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Logo area */}
          <div className="flex items-center justify-center gap-3">
            <Bus className="w-8 h-8 text-secondary" />
            <span className="text-2xl font-black">ETHMumbai Maxi Checker</span>
          </div>
          
          {/* Love note */}
          <p className="text-background/80 flex items-center justify-center gap-2 flex-wrap">
            Built with{" "}
            <Heart className="w-5 h-5 text-primary fill-primary animate-pulse" />{" "}
            by the community for{" "}
            <a
              href="https://ethmumbai.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:underline inline-flex items-center gap-1"
            >
              ETHMumbai
              <ExternalLink className="w-4 h-4" />
            </a>
          </p>
          
          {/* Social links */}
          <div className="flex items-center justify-center gap-4">
            <a
              href="https://twitter.com/ETHMumbaiIn"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/10 hover:bg-background/20 transition-colors"
            >
              <Twitter className="w-5 h-5" />
              <span className="font-semibold">@ETHMumbaiIn</span>
            </a>
          </div>
          
          {/* Disclaimer */}
          <div className="pt-6 border-t border-background/20">
            <p className="text-sm text-background/60">
              Not affiliated with X (Twitter). This is a fun community project.
            </p>
            <p className="text-sm text-background/60 mt-1">
              Tweet data is simulated for demonstration purposes.
            </p>
          </div>
          
          {/* Copyright */}
          <p className="text-xs text-background/40">
            © {new Date().getFullYear()} ETHMumbai Maxi Checker. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
