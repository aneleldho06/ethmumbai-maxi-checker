// // import React from "react";

// // type Props = {
// //   username: string;
// //   score: number;
// //   rankTitle: string;
// // };

// // const greetings = [
// //   "Mumbai is calling. Builders assemble.",
// //   "The ETHMumbai bus is arriving. Don’t miss it.",
// //   "From tweets to terminals — ETHMumbai is loading.",
// //   "Where builders meet the city that never sleeps.",
// //   "ETHMumbai isn’t an event. It’s a movement.",
// // ];

// // export const MaxiShareCard = React.forwardRef<HTMLDivElement, Props>(
// //   ({ username, score, rankTitle }, ref) => {
// //     const greeting =
// //       greetings[Math.floor(Math.random() * greetings.length)];

// //     return (
// //       <div
// //         ref={ref}
// //         style={{
// //           width: 1080,
// //           height: 1080,
// //           backgroundColor: "#E2231A", // ETHMumbai red
// //           fontFamily: "Inter, sans-serif",
// //           display: "flex",
// //           flexDirection: "column",
// //           alignItems: "center",
// //           justifyContent: "center",
// //           padding: 80,
// //         }}
// //       >
// //         {/* Ethereum Logo */}
// //         <img
// //           src="/ethereum-red.png"
// //           alt="Ethereum"
// //           style={{
// //             width: 220,
// //             height: 220,
// //             marginBottom: 32,
// //           }}
// //         />

// //         {/* Username */}
// //         <h2
// //           style={{
// //             color: "#FFFFFF",
// //             fontSize: 40,
// //             fontWeight: 700,
// //             marginBottom: 24,
// //           }}
// //         >
// //           @{username}
// //         </h2>

// //         {/* Score */}
// //         <div
// //           style={{
// //             backgroundColor: "#FFFFFF",
// //             color: "#E2231A",
// //             borderRadius: 24,
// //             padding: "32px 64px",
// //             fontSize: 96,
// //             fontWeight: 900,
// //             lineHeight: 1,
// //           }}
// //         >
// //           {score}
// //         </div>

// //         {/* Rank */}
// //         <p
// //           style={{
// //             marginTop: 20,
// //             fontSize: 32,
// //             color: "#FFFFFF",
// //             fontWeight: 600,
// //           }}
// //         >
// //           {rankTitle}
// //         </p>

// //         {/* Caption */}
// //         <p
// //           style={{
// //             marginTop: 48,
// //             fontSize: 28,
// //             color: "#FFECEC",
// //             textAlign: "center",
// //             maxWidth: 800,
// //             lineHeight: 1.4,
// //           }}
// //         >
// //           {greeting}
// //         </p>

// //         {/* Footer */}
// //         <p
// //           style={{
// //             position: "absolute",
// //             bottom: 40,
// //             fontSize: 22,
// //             color: "#FFD6D3",
// //           }}
// //         >
// //           ethmumbai-maxi-checker.lovable.app
// //         </p>
// //       </div>
// //     );
// //   }
// // );

// // MaxiShareCard.displayName = "MaxiShareCard";

// //HELLO BRO NEWWWWWWWWWW UPDATE dsckjdsckdscdcdscdskc -------------

// import React from "react";

// type Props = {
//   username: string;
//   score: number;
//   rankTitle: string;
// };

// const RANK_STYLES: Record<
//   string,
//   { emoji: string; color: string }
// > = {
//   "Curious Commuter": { emoji: "🚌", color: "#ffffffff" },
//   "ETHMumbai Rider": { emoji: "🎫", color: "#ffffffff" },
//   "BEST Bus Regular": { emoji: "🚍", color: "#ffffffff" },
//   "ETHMumbai Local": { emoji: "🏙️", color: "#ffffffff" },
//   "ETHMumbai Maxi": { emoji: "🔥", color: "#ffffffff" },
//   "ETHMumbai OG": { emoji: "❤️‍🔥", color: "#FFFFFF" },
// };

// const CAPTIONS = [
//   "ETHMumbai isn’t an event. It’s a movement.",
//   "From timelines to terminals — ETHMumbai is coming.",
//   "Mumbai builds. ETHMumbai accelerates.",
//   "This city doesn’t sleep. Builders don’t stop.",
//   "The ETHMumbai bus has no brakes.",
// ];

// export const MaxiShareCard = React.forwardRef<HTMLDivElement, Props>(
//   ({ username, score, rankTitle }, ref) => {
//     const rankStyle = RANK_STYLES[rankTitle] || {
//       emoji: "🏆",
//       color: "#FFFFFF",
//     };

//     const caption =
//       CAPTIONS[Math.floor(Math.random() * CAPTIONS.length)];

//     const profileImage = `https://unavatar.io/x/${username}`;

//     return (
//       <div
//         ref={ref}
//         style={{
//           width: 1080,
//           height: 1080,
//           backgroundColor: "#E2231A",
//           color: "#FFFFFF",
//           fontFamily: "Inter, system-ui, sans-serif",
//           position: "relative",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           padding: 80,
//         }}
//       >
//         {/* Trophy */}
//         <div
//           style={{
//             fontSize: 120,
//             marginBottom: 20,
//           }}
//         >
//           🏆
//         </div>

//         {/* Profile Picture */}
//         <div
//           style={{
//             width: 200,
//             height: 200,
//             borderRadius: "50%",
//             border: "8px solid #FFFFFF",
//             overflow: "hidden",
//             marginBottom: 24,
//             backgroundColor: "#FFFFFF22",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             fontSize: 96,
//           }}
//         >
//           <img
//             src={profileImage}
//             alt={username}
//             onError={(e) => {
//               e.currentTarget.style.display = "none";
//             }}
//             style={{
//               width: "100%",
//               height: "100%",
//               objectFit: "cover",
//             }}
//           />
//           <span>{rankStyle.emoji}</span>
//         </div>

//         {/* Handle */}
//         <div
//           style={{
//             fontSize: 36,
//             fontWeight: 700,
//             marginBottom: 32,
//           }}
//         >
//           @{username}
//         </div>

//         {/* Score Box */}
//         <div
//           style={{
//             backgroundColor: "#FFFFFF",
//             color: "#E2231A",
//             borderRadius: 28,
//             padding: "28px 72px",
//             fontSize: 96,
//             fontWeight: 900,
//             lineHeight: 1,
//           }}
//         >
//           {score}
//         </div>

//         {/* Rank */}
//         <div
//           style={{
//             marginTop: 24,
//             textAlign: "center",
//           }}
//         >
//           <div
//             style={{
//               fontSize: 22,
//               letterSpacing: 2,
//               opacity: 0.9,
//             }}
//           >
//             RANK
//           </div>
//           <div
//             style={{
//               fontSize: 40,
//               fontWeight: 800,
//               color: rankStyle.color,
//               marginTop: 6,
//             }}
//           >
//             {rankStyle.emoji} {rankTitle}
//           </div>
//         </div>

//         {/* Caption */}
//         <div
//           style={{
//             marginTop: 48,
//             fontSize: 28,
//             textAlign: "center",
//             maxWidth: 820,
//             lineHeight: 1.4,
//             opacity: 0.95,
//           }}
//         >
//           {caption}
//         </div>

//         {/* Footer */}
//         <div
//           style={{
//             position: "absolute",
//             bottom: 40,
//             left: 60,
//             fontSize: 20,
//             opacity: 0.85,
//           }}
//         >
//           ethmumbai-maxi-checker.lovable.app
//         </div>

//         <div
//           style={{
//             position: "absolute",
//             bottom: 40,
//             right: 60,
//             fontSize: 20,
//             opacity: 0.9,
//           }}
//         >
//           Made by @0xhiddenminner
//         </div>
//       </div>
//     );
//   }
// );

// MaxiShareCard.displayName = "MaxiShareCard";

//-------------NEW UPDATE----------------890218w12w21

// import { RANKS } from "@/lib/rankingSystem";
// import React from "react";

// type Props = {
//   username: string;
//   score: number;
//   rankTitle: string;
//   rankPosition?: number; // Optional - may not have leaderboard position yet
// };

// const RANK_STYLES: Record<
//   string,
//   { emoji: string; color: string }
// > = {
//   "Curious Commuter": { emoji: "🚌", color: "#FFE082" },
//   "ETHMumbai Rider": { emoji: "🎫", color: "#ffffffff" },
//   "BEST Bus Regular": { emoji: "🚍", color: "#ffffffff" },
//   "ETHMumbai Local": { emoji: "🏙️", color: "#ffffffff" },
//   "ETHMumbai Maxi": { emoji: "🔥", color: "#ffffffff" },
//   "ETHMumbai OG": { emoji: "❤️‍🔥", color: "#FFFFFF" },
// };

// const CAPTIONS = [
//   "The ETHMumbai bus has no brakes.",
//   "Mumbai builds. ETHMumbai accelerates.",
//   "ETHMumbai isn’t an event. It’s a movement.",
//   "From timelines to terminals — ETHMumbai is coming.",
//   "ETHMumbai is stronger because of you.",
//   "Keep building — ETHMumbai believes in you.",
//   "Every great Ethereum builder started with small steps.",
//   "Skip one chai. Get an ETHMumbai ticket.",
// ];

// export const MaxiShareCard = React.forwardRef<HTMLDivElement, Props>(
//   ({ username, score, rankTitle, rankPosition }, ref) => {
//     const rankStyle = RANK_STYLES[rankTitle] || {
//       emoji: "🏆",
//       color: "#FFFFFF",
//     };

//     const caption =
//       CAPTIONS[Math.floor(Math.random() * CAPTIONS.length)];

//     const profileImage = `https://unavatar.io/x/${username}`;

//     return (
//       <div
//         ref={ref}
//         style={{
//           width: 1080,
//           height: 1080,
//           backgroundColor: "#E2231A",
//           color: "#FFFFFF",
//           fontFamily: "Inter, system-ui, sans-serif",
//           position: "relative",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           paddingTop: 120,
//         }}
//       >
//         {/* TOP LEFT RANK */}
//         {rankPosition !== undefined && (
//           <div
//             style={{
//               position: "absolute",
//               top: 40,
//               left: 40,
//               fontSize: 28,
//               fontWeight: 800,
//               color: "#FFD600",
//               letterSpacing: 1,
//             }}
//           >
//             RANK – #{rankPosition}
//           </div>
//         )}


//         {/* PROFILE PICTURE */}
//         <div
//           style={{
//             width: 350,                 // ⬆️ 2x
//             height: 350,                // ⬆️ 2x
//             borderRadius: "50%",
//             border: "12px solid #FFFFFF", // ⬆️ thicker border
//             overflow: "hidden",
//             marginBottom: 28,           // slight increase
//             backgroundColor: "#FFFFFF22",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             fontSize: 120,              // ⬆️ fallback emoji size
//           }}
//         >
//           <img
//             src={profileImage}
//             alt={username}
//             onError={(e) => {
//               e.currentTarget.style.display = "none";
//             }}
//             style={{
//               width: "100%",
//               height: "100%",
//               objectFit: "cover",
//             }}
//           />

//         </div>

//         {/* HANDLE */}
//         <div
//           style={{
//             fontSize: 38,
//             fontWeight: 800,
//             marginBottom: 36,
//           }}
//         >
//           @{username}
//         </div>

//         {/* SCORE CARD */}
//         <div
//           style={{
//             backgroundColor: "#FFFFFF",
//             color: "#E2231A",
//             borderRadius: 28,
//             padding: "28px 80px",
//             textAlign: "center",
//             marginBottom: 28,
//           }}
//         >
//           <div
//             style={{
//               fontSize: 40,
//               fontWeight: 800,
//               letterSpacing: 2,
//             }}
//           >
//             SCORE
//           </div>
//           <div
//             style={{
//               fontSize: 70,
//               fontWeight: 900,
//               lineHeight: 1,
//             }}
//           >
//             {score}
//           </div>
//         </div>





//         {/* RANK TITLE */}
//         <div
//           style={{
//             fontSize: 40,
//             fontWeight: 900,
//             color: rankStyle.color,
//             marginBottom: 36,
//           }}
//         >
//           {rankStyle.emoji} {rankTitle}
//         </div>

//         {/* CAPTION */}
//         <div
//           style={{
//             fontSize: 30,
//             textAlign: "center",
//             maxWidth: 820,
//             lineHeight: 1.4,
//             opacity: 0.95,
//           }}
//         >
//           {caption}
//         </div>

//         {/* FOOTER */}
//         <div
//           style={{
//             position: "absolute",
//             bottom: 40,
//             left: 60,
//             fontSize: 20,
//             opacity: 0.85,
//           }}
//         >
//           ethmumbai-maxi-checker.lovable.app
//         </div>

//         <div
//           style={{
//             position: "absolute",
//             bottom: 40,
//             right: 60,
//             fontSize: 20,
//             opacity: 0.9,
//           }}
//         >
//           Made by @0xhiddenminner
//         </div>
//       </div >
//     );
//   }
// );

// MaxiShareCard.displayName = "MaxiShareCard";


//------------------EDA MONAEEE GOOD VERY GOOD--------

async function imageToBase64(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, { mode: "cors" });
    const blob = await response.blob();

    return await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}
import { useEffect, useState } from "react";

import React from "react";

interface MaxiShareCardProps {
  username: string;
  score: number;
  rankTitle: string;
}

export const MaxiShareCard = React.forwardRef<
  const [avatar, setAvatar] = useState<string | null>(null);
  useEffect(() => {
  const loadAvatar = async () => {
    const url = `https://unavatar.io/twitter/${username}`;
    const base64 = await imageToBase64(url);
    setAvatar(base64);
  };

  loadAvatar();
}, [username]);

  HTMLDivElement,
  MaxiShareCardProps
>(({ username, score, rankTitle }, ref) => {
 

  return (
    <div
      ref={ref}
      style={{
        width: 1080,
        height: 1080,
        position: "relative",
        backgroundImage: "url(/ethmumbai-bg.png)", // EXACT background
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      {/* CENTER CARD */}
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
<div
  style={{
    width: 820,
    backgroundColor: "#FFFFFF",
    borderRadius: 56,
    padding: "180px 80px 80px",
    textAlign: "center",
    position: "relative",
    overflow: "visible", // REQUIRED
  }}
>


{/* PROFILE PICTURE (VISIBLE FIX) */}
<div
  style={{
    width: 320,
    height: 320,
    borderRadius: "50%",
    border: "12px solid #FFFFFF",
    overflow: "hidden",
    position: "absolute",
    top: -160,
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 120,
    backgroundColor: "transparent", // ❌ no yellow
    zIndex: 20, // ✅ REQUIRED
  }}
>
{avatar ? (
  <img
    src={avatar}
    alt={username}
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
      zIndex: 10,
    }}
  />
) : (
  <span style={{ fontSize: 120 }}>🔥</span>
)}

</div>



          {/* USERNAME */}
          <div
            style={{
              marginTop: 24,
              fontSize: 40,
              fontWeight: 800,
              color: "#DC2626",
              marginBottom: 32,
            }}
          >
            @{username}
          </div>

          {/* SCORE PILL */}
          <div
            style={{
              display: "inline-flex",
              borderRadius: 28,
              overflow: "hidden",
              marginBottom: 36,
            }}
          >
            <div
              style={{
                backgroundColor: "#0EA5E9",
                color: "#FFFFFF",
                padding: "20px 40px",
                fontSize: 36,
                fontWeight: 800,
              }}
            >
              SCORE
            </div>
            <div
              style={{
                backgroundColor: "#FACC15",
                color: "#7C2D12",
                padding: "20px 48px",
                fontSize: 44,
                fontWeight: 900,
              }}
            >
              {score}
            </div>
          </div>

          {/* RANK TITLE */}
          <div
            style={{
              fontSize: 44,
              fontWeight: 900,
              color: "#DC2626",
              marginBottom: 24,
            }}
          >
            {rankTitle}
          </div>

          {/* TAGLINE */}
          <div
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: "#B91C1C",
              lineHeight: 1.4,
            }}
          >
            ETHMumbai isn’t an event. It’s a movement.
          </div>
        </div>
      </div>

      {/* FOOTER LEFT */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: 60,
          color: "#FFFFFF",
          fontSize: 22,
        }}
      >
        ethmumbai-maxi-checker
      </div>

      {/* FOOTER RIGHT */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: 60,
          color: "#FFFFFF",
          fontSize: 22,
        }}
      >
        Made by @0xhiddenminner
      </div>
    </div>
  );
});

MaxiShareCard.displayName = "MaxiShareCard";
