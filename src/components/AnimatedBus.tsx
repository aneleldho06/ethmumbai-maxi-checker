import { AnimatedCounter } from './AnimatedCounter';

interface AnimatedBusProps {
  originalCount: number;
  replyCount: number;
  retweetCount: number;
  totalMentions: number;
  showCounters: boolean;
  className?: string;
}

export function AnimatedBus({
  originalCount,
  replyCount,
  retweetCount,
  totalMentions,
  showCounters,
  className = '',
}: AnimatedBusProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Double Decker Bus SVG */}
      <svg
        viewBox="0 0 400 200"
        className="w-full h-auto"
        style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))' }}
      >
        {/* Bus Body - Lower Deck */}
        <rect
          x="20"
          y="120"
          width="360"
          height="60"
          rx="8"
          className="fill-primary"
        />
        
        {/* Bus Body - Upper Deck */}
        <rect
          x="40"
          y="50"
          width="320"
          height="75"
          rx="8"
          className="fill-primary"
        />
        
        {/* Yellow Accent Strip */}
        <rect
          x="20"
          y="115"
          width="360"
          height="10"
          className="fill-secondary"
        />
        
        {/* Upper Deck Yellow Strip */}
        <rect
          x="40"
          y="45"
          width="320"
          height="8"
          className="fill-secondary"
        />
        
        {/* Windows - Upper Deck (Stats Windows) */}
        <g>
          {/* Window 1 - Tweets */}
          <rect x="60" y="60" width="60" height="50" rx="4" className="fill-accent/20" />
          <rect x="62" y="62" width="56" height="46" rx="3" className="fill-background" />
          
          {/* Window 2 - Replies */}
          <rect x="135" y="60" width="60" height="50" rx="4" className="fill-accent/20" />
          <rect x="137" y="62" width="56" height="46" rx="3" className="fill-background" />
          
          {/* Window 3 - Retweets */}
          <rect x="210" y="60" width="60" height="50" rx="4" className="fill-accent/20" />
          <rect x="212" y="62" width="56" height="46" rx="3" className="fill-background" />
          
          {/* Window 4 - Mentions */}
          <rect x="285" y="60" width="60" height="50" rx="4" className="fill-accent/20" />
          <rect x="287" y="62" width="56" height="46" rx="3" className="fill-background" />
        </g>
        
        {/* Windows - Lower Deck */}
        <g>
          <rect x="60" y="130" width="50" height="35" rx="4" className="fill-accent/20" />
          <rect x="62" y="132" width="46" height="31" rx="3" className="fill-background/80" />
          
          <rect x="125" y="130" width="50" height="35" rx="4" className="fill-accent/20" />
          <rect x="127" y="132" width="46" height="31" rx="3" className="fill-background/80" />
          
          <rect x="190" y="130" width="50" height="35" rx="4" className="fill-accent/20" />
          <rect x="192" y="132" width="46" height="31" rx="3" className="fill-background/80" />
          
          <rect x="255" y="130" width="50" height="35" rx="4" className="fill-accent/20" />
          <rect x="257" y="132" width="46" height="31" rx="3" className="fill-background/80" />
          
          {/* Door */}
          <rect x="320" y="130" width="40" height="45" rx="4" className="fill-foreground/20" />
          <rect x="322" y="132" width="36" height="41" rx="3" className="fill-background/60" />
          <circle cx="352" cy="152" r="3" className="fill-secondary" />
        </g>
        
        {/* ETHMumbai Text on side */}
        <text
          x="200"
          y="175"
          textAnchor="middle"
          className="fill-secondary font-extrabold text-[14px]"
          style={{ fontFamily: 'Nunito, sans-serif' }}
        >
          ETHMumbai
        </text>
        
        {/* Front of bus */}
        <rect x="360" y="130" width="20" height="45" rx="4" className="fill-primary" />
        <rect x="365" y="135" width="12" height="20" rx="2" className="fill-accent/30" />
        <circle cx="375" cy="165" r="4" className="fill-secondary" />
        
        {/* Wheels */}
        <g className="animate-spin" style={{ transformOrigin: '70px 185px', animationDuration: '1s' }}>
          <circle cx="70" cy="185" r="18" className="fill-foreground" />
          <circle cx="70" cy="185" r="12" className="fill-muted" />
          <circle cx="70" cy="185" r="6" className="fill-foreground" />
        </g>
        <g className="animate-spin" style={{ transformOrigin: '330px 185px', animationDuration: '1s' }}>
          <circle cx="330" cy="185" r="18" className="fill-foreground" />
          <circle cx="330" cy="185" r="12" className="fill-muted" />
          <circle cx="330" cy="185" r="6" className="fill-foreground" />
        </g>
        
        {/* Wheel covers */}
        <path d="M45 175 Q70 160 95 175" className="fill-primary" />
        <path d="M305 175 Q330 160 355 175" className="fill-primary" />
      </svg>
      
      {/* Stat Counters Overlay - positioned over windows */}
      {showCounters && (
        <div className="absolute inset-0 flex items-start justify-center" style={{ paddingTop: '15%' }}>
          <div className="flex gap-[9.5%] ml-[2%]">
            {/* Tweets */}
            <div className="flex flex-col items-center w-[60px]">
              <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-wide">Tweets</span>
              <AnimatedCounter
                value={originalCount}
                duration={800}
                delay={0}
                className="text-sm font-extrabold text-foreground"
              />
            </div>
            
            {/* Replies */}
            <div className="flex flex-col items-center w-[60px]">
              <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-wide">Replies</span>
              <AnimatedCounter
                value={replyCount}
                duration={800}
                delay={200}
                className="text-sm font-extrabold text-foreground"
              />
            </div>
            
            {/* Retweets */}
            <div className="flex flex-col items-center w-[60px]">
              <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-wide">Retweets</span>
              <AnimatedCounter
                value={retweetCount}
                duration={800}
                delay={400}
                className="text-sm font-extrabold text-foreground"
              />
            </div>
            
            {/* Mentions */}
            <div className="flex flex-col items-center w-[60px]">
              <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-wide">Mentions</span>
              <AnimatedCounter
                value={totalMentions}
                duration={800}
                delay={600}
                className="text-sm font-extrabold text-foreground"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
