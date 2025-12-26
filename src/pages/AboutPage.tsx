import { 
  Bus, 
  Twitter, 
  Search, 
  Trophy, 
  Download, 
  Share2, 
  Heart,
  ExternalLink,
  User,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const steps = [
  {
    icon: Search,
    title: "Enter Your Username",
    description: "Type your X (Twitter) username in the input field. No @ symbol needed.",
  },
  {
    icon: Sparkles,
    title: "Get Analyzed",
    description: "We scan your tweets for ETHMumbai mentions, hashtags, and engagement.",
  },
  {
    icon: Trophy,
    title: "See Your Score",
    description: "Get your Maxi Score based on original tweets, replies, and retweets.",
  },
  {
    icon: Download,
    title: "Share Your Results",
    description: "Download your scorecard or share directly on Twitter to flex your energy!",
  },
];

const scoringRules = [
  { type: "Original Tweet", points: 3, color: "text-green-500" },
  { type: "Reply mentioning ETHMumbai", points: 2, color: "text-eth-blue" },
  { type: "Retweet", points: 1, color: "text-secondary" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Hero section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-primary/10 px-6 py-3 rounded-full mb-6">
              <Bus className="w-6 h-6 text-primary" />
              <span className="font-bold text-primary">About ETHMumbai Maxi Checker</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">
              How Big of an ETHMumbai Fan Are You?
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The ETHMumbai Maxi Checker analyzes your X (Twitter) activity to determine 
              how passionate you are about ETHMumbai. The more you tweet, engage, and spread 
              the word, the higher your Maxi Score!
            </p>
          </div>

          {/* How It Works */}
          <section className="mb-12">
            <h2 className="text-2xl font-extrabold text-foreground mb-6 text-center">
              📝 How It Works
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {steps.map((step, index) => (
                <div key={index} className="bus-card p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-bold text-secondary">Step {index + 1}</span>
                      </div>
                      <h3 className="font-bold text-foreground mb-1">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Scoring System */}
          <section className="mb-12">
            <h2 className="text-2xl font-extrabold text-foreground mb-6 text-center">
              📊 Scoring System
            </h2>
            <div className="bus-card p-6">
              <p className="text-muted-foreground mb-6 text-center">
                Your Maxi Score is calculated based on your ETHMumbai-related tweet activity:
              </p>
              <div className="space-y-3">
                {scoringRules.map((rule, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className={`w-5 h-5 ${rule.color}`} />
                      <span className="font-medium text-foreground">{rule.type}</span>
                    </div>
                    <span className="font-black text-primary text-lg">+{rule.points} pts</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Ranking System */}
          <section className="mb-12">
            <h2 className="text-2xl font-extrabold text-foreground mb-6 text-center">
              🏆 Ranking Tiers
            </h2>
            <div className="bus-card p-6">
              <div className="grid gap-3">
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="font-medium">0-5 pts</span>
                  <span className="font-bold">🚌 Curious Commuter</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="font-medium">6-15 pts</span>
                  <span className="font-bold">🎫 ETHMumbai Rider</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="font-medium">16-40 pts</span>
                  <span className="font-bold">🚍 BEST Bus Regular</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="font-medium">41-80 pts</span>
                  <span className="font-bold">🏙️ ETHMumbai Local</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg border border-secondary/30">
                  <span className="font-medium">81-150 pts</span>
                  <span className="font-bold text-primary">🔥 ETHMumbai Maxi</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg border border-primary/30">
                  <span className="font-medium">150+ pts</span>
                  <span className="font-bold text-primary">❤️‍🔥 ETHMumbai OG</span>
                </div>
              </div>
            </div>
          </section>

          {/* Creator Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-extrabold text-foreground mb-6 text-center">
              👨‍💻 Creator
            </h2>
            <div className="bus-card overflow-hidden">
              <div className="yellow-strip" />
              <div className="p-8 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <User className="w-12 h-12 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-black text-foreground mb-2">
                  Hidden Minner
                </h3>
                <p className="text-muted-foreground mb-6">
                  Building cool stuff for the ETHMumbai community
                </p>
                <a
                  href="https://x.com/0xhiddenminner"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <Button variant="yellow" size="lg" className="gap-2">
                    <Twitter className="w-5 h-5" />
                    Follow @0xhiddenminner
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </a>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center">
            <div className="bus-card p-8 bg-gradient-to-br from-primary/5 to-secondary/5">
              <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-black text-foreground mb-4">
                Ready to Check Your Energy?
              </h3>
              <p className="text-muted-foreground mb-6">
                Head over to the home page and discover your ETHMumbai Maxi Score!
              </p>
              <Link to="/">
                <Button variant="yellow" size="lg" className="gap-2">
                  <Sparkles className="w-5 h-5" />
                  Check Now
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
