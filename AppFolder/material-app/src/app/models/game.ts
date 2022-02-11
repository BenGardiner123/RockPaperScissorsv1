import { Round } from "./round";

//create game model for the behavior subject
export interface Game {
    username: string;
    gameCode: string;
    startDateTime: Date | null;
    roundCounter: number;
    roundLimit: number;
    aiSelection: string | null;
    selection: string | null;
    outcome: string | null;
}


export interface GameCheckRequestModel {
    username: string;
    roundLimit: number;
    currentRound: number;
    DateTimeStarted: Date;
}

export interface GameCheckResponseModel {
    username: string;
    roundLimit: number;
    currentRound: number;
    DateTimeStarted: Date;
}

export interface GameCodeRequestModel {
    username: string;
    DateTimeStarted: Date;
}  

export interface GameCodeResponseModel {
    gameCode: string;
}  

export interface GameResultRequestModel {
    username: string;
    DateTimeStarted: Date;
}   

export interface GameResultResponseModel_Round {
    roundNumber: number;
    PlayerOneChoice: string;
    PlayerTwoChoice: string;
    Winner: string;
}   

export interface GameResultResponseModel{
    rounds: GameResultResponseModel_Round[];
    winner: string;
} 

export interface GameIdResultRequestModel {
    username: string;
    dateTimeStarted: Date;
}   