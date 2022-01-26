//create game model for the behavior subject
export interface Game {
    username: string;
    startDateTime: Date;
    roundCounter: number;
    roundLimit: number;
    aiSelection: string;
    selection: string;
    outcome: string;
}


export interface GameCheckRequestModel {
    username: string;
    roundLimit: number;
    currentRound: number;
    DateTimeStarted: Date;
}