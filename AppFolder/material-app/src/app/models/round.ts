export interface RoundCheckRespone {
    username: string;
    roundLimit: number;
    currentRound: number;
    DateTimeStarted: Date;
 }

 export interface RoundEnvelope {
    rounds: Round[];
 }

 export interface Round {
   username: string;
   playerChoice: string;
   roundLimit: number;
   currentRound: number;
   DateTimeStarted: Date;
}