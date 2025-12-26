import React from "react";

type Props = {
  username: string;
  score: number;
  rankTitle: string;
};

const greetings = [
  "Mumbai is calling. Builders assemble.",
  "The ETHMumbai bus is arriving. Don’t miss it.",
  "From tweets to terminals — ETHMumbai is loading.",
  "Where builders meet the city that never sleeps.",
  "ETHMumbai isn’t an event. It’s a movement.",
];

export const MaxiShareCard = React.forwardRef<HTMLDivElement, Props>(
  ({ username, score, rankTitle }, ref) => {
    const greeting =
      greetings[Math.floor(Math.random() * greetings.length)];

    return (
      <div
        ref={ref}
        style={{
          width: 1080,
          height: 1080,
          backgroundColor: "#E2231A", // ETHMumbai red
          fontFamily: "Inter, sans-serif",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 80,
        }}
      >
        {/* Ethereum Logo */}
        <img
          src="/ethereum-red.png"
          alt="Ethereum"
          style={{
            width: 220,
            height: 220,
            marginBottom: 32,
          }}
        />

        {/* Username */}
        <h2
          style={{
            color: "#FFFFFF",
            fontSize: 40,
            fontWeight: 700,
            marginBottom: 24,
          }}
        >
          @{username}
        </h2>

        {/* Score */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            color: "#E2231A",
            borderRadius: 24,
            padding: "32px 64px",
            fontSize: 96,
            fontWeight: 900,
            lineHeight: 1,
          }}
        >
          {score}
        </div>

        {/* Rank */}
        <p
          style={{
            marginTop: 20,
            fontSize: 32,
            color: "#FFFFFF",
            fontWeight: 600,
          }}
        >
          {rankTitle}
        </p>

        {/* Caption */}
        <p
          style={{
            marginTop: 48,
            fontSize: 28,
            color: "#FFECEC",
            textAlign: "center",
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          {greeting}
        </p>

        {/* Footer */}
        <p
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 22,
            color: "#FFD6D3",
          }}
        >
          ethmumbai-maxi-checker.lovable.app
        </p>
      </div>
    );
  }
);

MaxiShareCard.displayName = "MaxiShareCard";
