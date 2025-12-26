import { getRank, RankInfo } from './rankingSystem';

export interface LeaderboardEntry {
  rank: number;
  username: string;
  score: number;
  rankInfo: RankInfo;
}

// Initial mock leaderboard data
const INITIAL_LEADERBOARD: Omit<LeaderboardEntry, 'rankInfo'>[] = [
  { rank: 1, username: "ethmumbai_og", score: 287 },
  { rank: 2, username: "web3_mumbai", score: 234 },
  { rank: 3, username: "blockchain_bai", score: 189 },
  { rank: 4, username: "defi_dave", score: 156 },
  { rank: 5, username: "nft_ninja", score: 143 },
  { rank: 6, username: "crypto_chai", score: 128 },
  { rank: 7, username: "dao_don", score: 112 },
  { rank: 8, username: "eth_enthusiast", score: 98 },
  { rank: 9, username: "solidity_sam", score: 87 },
  { rank: 10, username: "mumbai_maxi", score: 76 },
  { rank: 11, username: "gas_guru", score: 65 },
  { rank: 12, username: "layer2_larry", score: 54 },
  { rank: 13, username: "smart_contract", score: 48 },
  { rank: 14, username: "wallet_wizard", score: 42 },
  { rank: 15, username: "dapp_developer", score: 36 },
  { rank: 16, username: "token_trader", score: 28 },
  { rank: 17, username: "block_builder", score: 22 },
  { rank: 18, username: "chain_champ", score: 18 },
  { rank: 19, username: "meta_master", score: 12 },
  { rank: 20, username: "web3_newbie", score: 5 },
];

const STORAGE_KEY = 'ethmumbai_leaderboard';

function loadLeaderboard(): LeaderboardEntry[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Omit<LeaderboardEntry, 'rankInfo'>[];
      return parsed.map(entry => ({
        ...entry,
        rankInfo: getRank(entry.score),
      }));
    }
  } catch {
    // Ignore parse errors
  }
  
  return INITIAL_LEADERBOARD.map(entry => ({
    ...entry,
    rankInfo: getRank(entry.score),
  }));
}

function saveLeaderboard(entries: LeaderboardEntry[]): void {
  const toStore = entries.map(({ rank, username, score }) => ({ rank, username, score }));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
}

export function getLeaderboard(): LeaderboardEntry[] {
  return loadLeaderboard();
}

export function addToLeaderboard(username: string, score: number): LeaderboardEntry[] {
  let entries = loadLeaderboard();
  
  // Check if user already exists
  const existingIndex = entries.findIndex(
    e => e.username.toLowerCase() === username.toLowerCase()
  );
  
  if (existingIndex !== -1) {
    // Update score if higher
    if (score > entries[existingIndex].score) {
      entries[existingIndex].score = score;
      entries[existingIndex].rankInfo = getRank(score);
    }
  } else {
    // Add new entry
    entries.push({
      rank: 0,
      username,
      score,
      rankInfo: getRank(score),
    });
  }
  
  // Sort by score descending
  entries.sort((a, b) => b.score - a.score);
  
  // Update ranks
  entries = entries.map((entry, index) => ({
    ...entry,
    rank: index + 1,
  }));
  
  // Keep top 20
  entries = entries.slice(0, 20);
  
  saveLeaderboard(entries);
  return entries;
}

export function getUserRank(username: string): LeaderboardEntry | null {
  const entries = loadLeaderboard();
  return entries.find(e => e.username.toLowerCase() === username.toLowerCase()) || null;
}
