// import React from "react";

// type Props = {
//   username: string;
//   score: number;
//   rankTitle: string;
// };

// const greetings = [
//   "Mumbai is calling. Builders assemble.",
//   "The ETHMumbai bus is arriving. Don’t miss it.",
//   "From tweets to terminals — ETHMumbai is loading.",
//   "Where builders meet the city that never sleeps.",
//   "ETHMumbai isn’t an event. It’s a movement.",
// ];

// export const MaxiShareCard = React.forwardRef<HTMLDivElement, Props>(
//   ({ username, score, rankTitle }, ref) => {
//     const greeting =
//       greetings[Math.floor(Math.random() * greetings.length)];

//     return (
//       <div
//         ref={ref}
//         style={{
//           width: 1080,
//           height: 1080,
//           backgroundColor: "#E2231A", // ETHMumbai red
//           fontFamily: "Inter, sans-serif",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           padding: 80,
//         }}
//       >
//         {/* Ethereum Logo */}
//         <img
//           src="/ethereum-red.png"
//           alt="Ethereum"
//           style={{
//             width: 220,
//             height: 220,
//             marginBottom: 32,
//           }}
//         />

//         {/* Username */}
//         <h2
//           style={{
//             color: "#FFFFFF",
//             fontSize: 40,
//             fontWeight: 700,
//             marginBottom: 24,
//           }}
//         >
//           @{username}
//         </h2>

//         {/* Score */}
//         <div
//           style={{
//             backgroundColor: "#FFFFFF",
//             color: "#E2231A",
//             borderRadius: 24,
//             padding: "32px 64px",
//             fontSize: 96,
//             fontWeight: 900,
//             lineHeight: 1,
//           }}
//         >
//           {score}
//         </div>

//         {/* Rank */}
//         <p
//           style={{
//             marginTop: 20,
//             fontSize: 32,
//             color: "#FFFFFF",
//             fontWeight: 600,
//           }}
//         >
//           {rankTitle}
//         </p>

//         {/* Caption */}
//         <p
//           style={{
//             marginTop: 48,
//             fontSize: 28,
//             color: "#FFECEC",
//             textAlign: "center",
//             maxWidth: 800,
//             lineHeight: 1.4,
//           }}
//         >
//           {greeting}
//         </p>

//         {/* Footer */}
//         <p
//           style={{
//             position: "absolute",
//             bottom: 40,
//             fontSize: 22,
//             color: "#FFD6D3",
//           }}
//         >
//           ethmumbai-maxi-checker.lovable.app
//         </p>
//       </div>
//     );
//   }
// );

// MaxiShareCard.displayName = "MaxiShareCard";


import React from "react";

type Props = {
  username: string;
  score: number;
  rankTitle: string;
};

const RANK_STYLES: Record<
  string,
  { emoji: string; color: string }
> = {
  "Curious Commuter": { emoji: "🚌", color: "#FFE082" },
  "ETHMumbai Rider": { emoji: "🎫", color: "#FFD54F" },
  "BEST Bus Regular": { emoji: "🚍", color: "#FFCA28" },
  "ETHMumbai Local": { emoji: "🏙️", color: "#FFB300" },
  "ETHMumbai Maxi": { emoji: "🔥", color: "#FF7043" },
  "ETHMumbai OG": { emoji: "❤️‍🔥", color: "#FFFFFF" },
};

const CAPTIONS = [
  "ETHMumbai isn’t an event. It’s a movement.",
  "From timelines to terminals — ETHMumbai is coming.",
  "Mumbai builds. ETHMumbai accelerates.",
  "This city doesn’t sleep. Builders don’t stop.",
  "The ETHMumbai bus has no brakes.",
];

export const MaxiShareCard = React.forwardRef<HTMLDivElement, Props>(
  ({ username, score, rankTitle }, ref) => {
    const rankStyle = RANK_STYLES[rankTitle] || {
      emoji: "🏆",
      color: "#FFFFFF",
    };

    const caption =
      CAPTIONS[Math.floor(Math.random() * CAPTIONS.length)];

    const profileImage = `https://unavatar.io/x/${username}`;

    return (
      <div
        ref={ref}
        style={{
          width: 1080,
          height: 1080,
          backgroundColor: "#E2231A",
          color: "#FFFFFF",
          fontFamily: "Inter, system-ui, sans-serif",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 80,
        }}
      >
        {/* Trophy */}
        <div
          style={{
            fontSize: 120,
            marginBottom: 20,
          }}
        >
          🏆
        </div>

        {/* Profile Picture */}
        <div
          style={{
            width: 200,
            height: 200,
            borderRadius: "50%",
            border: "8px solid #FFFFFF",
            overflow: "hidden",
            marginBottom: 24,
            backgroundColor: "#FFFFFF22",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 96,
          }}
        >
          <img
            src={profileImage}
            alt={username}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <span>{rankStyle.emoji}</span>
        </div>

        {/* Handle */}
        <div
          style={{
            fontSize: 36,
            fontWeight: 700,
            marginBottom: 32,
          }}
        >
          @{username}
        </div>

        {/* Score Box */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            color: "#E2231A",
            borderRadius: 28,
            padding: "28px 72px",
            fontSize: 96,
            fontWeight: 900,
            lineHeight: 1,
          }}
        >
          {score}
        </div>

        {/* Rank */}
        <div
          style={{
            marginTop: 24,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 22,
              letterSpacing: 2,
              opacity: 0.9,
            }}
          >
            RANK
          </div>
          <div
            style={{
              fontSize: 40,
              fontWeight: 800,
              color: rankStyle.color,
              marginTop: 6,
            }}
          >
            {rankStyle.emoji} {rankTitle}
          </div>
        </div>

        {/* Caption */}
        <div
          style={{
            marginTop: 48,
            fontSize: 28,
            textAlign: "center",
            maxWidth: 820,
            lineHeight: 1.4,
            opacity: 0.95,
          }}
        >
          {caption}
        </div>

        {/* Footer */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 60,
            fontSize: 20,
            opacity: 0.85,
          }}
        >
          ethmumbai-maxi-checker.lovable.app
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 60,
            fontSize: 20,
            opacity: 0.9,
          }}
        >
          Made by @0xhiddenminner
        </div>
      </div>
    );
  }
);

MaxiShareCard.displayName = "MaxiShareCard";
