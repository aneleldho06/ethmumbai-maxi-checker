import React from "react";
import { Bus } from "lucide-react";

interface BusLoaderProps {
  message?: string;
}

export const BusLoader = React.memo(function BusLoader({ message = "Scanning tweets..." }: BusLoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-12">
      <div className="relative">
        {/* Road */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-2 bg-foreground/20 rounded-full" />
        
        {/* Yellow stripes on road */}
        <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-40 flex gap-2 justify-center">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="w-4 h-1 bg-secondary rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
        
        {/* Bus */}
        <div className="animate-bounce-slow mb-2">
          <div className="relative">
            <Bus className="w-16 h-16 text-primary" strokeWidth={2} />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full animate-pulse" />
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <p className="text-lg font-bold text-foreground">{message}</p>
        <p className="text-sm text-muted-foreground mt-1">
          Counting ETHMumbai mentions...
        </p>
      </div>
      
      {/* Progress dots */}
      <div className="flex gap-2">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-3 h-3 rounded-full bg-primary animate-pulse"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}
      </div>
    </div>
  );
});
