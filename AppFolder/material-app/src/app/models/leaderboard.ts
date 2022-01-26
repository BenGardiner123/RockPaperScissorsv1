export interface Leaderboard
{
    username: string | null,
    winRatio: number,
    turnsPlayed: number;
    
}

export interface LastFiveOutcomes
{
    lastFiveOutcomes: string | null;    
}

export interface LeaderboardEnvelope {
    leaderboard: Leaderboard[];
}

