import { Bus, Flame, Heart } from "lucide-react";

export function Hero() {
  return (
    <section className="hero-gradient relative overflow-hidden">
      {/* Yellow strip at top */}
      <div className="yellow-strip" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-secondary/20 blur-2xl animate-pulse" />
        <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-secondary/10 blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 left-1/4 w-24 h-24 rounded-full bg-primary-foreground/10 blur-2xl animate-pulse" style={{ animationDelay: "0.5s" }} />
      </div>
      
      <div className="container py-16 md:py-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full border border-primary-foreground/20 animate-fade-in">
            <Bus className="w-5 h-5 text-secondary" />
            <span className="text-primary-foreground font-semibold text-sm">
              Build from Mumbai, For the World
            </span>
            <Flame className="w-5 h-5 text-secondary" />
          </div>
          
          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-primary-foreground leading-tight animate-slide-up" style={{ animationDelay: "0.1s" }}>
            How Big of an{" "}
            <span className="relative inline-block">
              <span className="relative z-10">ETHMumbai</span>
              <span className="absolute -bottom-2 left-0 right-0 h-4 bg-secondary/40 rounded-full -skew-x-3" />
            </span>{" "}
            Maxi Are You?
          </h1>
          
          {/* Subheading */}
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.2s" }}>
            Let your tweets prove your love for ETHMumbai{" "}
            <Heart className="inline w-6 h-6 text-secondary animate-pulse" fill="currentColor" />
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 pt-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-black text-secondary">500+</p>
              <p className="text-primary-foreground/80 text-sm">Maxis Checked</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-black text-secondary">10K+</p>
              <p className="text-primary-foreground/80 text-sm">Tweets Analyzed</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-black text-secondary">🔥</p>
              <p className="text-primary-foreground/80 text-sm">Pure Maxi Energy</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-12 md:h-20"
          fill="hsl(var(--background))"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.1,118.92,156.63,69.08,321.39,56.44Z" />
        </svg>
      </div>
      
      {/* Yellow strip at bottom of wave */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-secondary" />
    </section>
  );
}
