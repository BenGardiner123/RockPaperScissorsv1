export interface Leaderboard {
    username: string;
    gamesPlayed: number;
    gamesWon: number;
    gamesLost: number;
    gamesTied: number;
    winPercentage: number;
    mostUsedChoice: string;
}

export interface LastFiveOutcomes
{
    lastFiveOutcomes: string | null;    
}

export interface LeaderboardEnvelope {
    leaders: Leaderboard[];
}

