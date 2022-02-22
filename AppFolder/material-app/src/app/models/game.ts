import { Round } from "./round";

//create game model for the behavior subject
export interface Game {
    ///state of the game - enum <start, >
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
    gameCode: string;
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
    RoundNumber: number;
    PlayerOneChoice: string;
    PlayerTwoChoice: string;
    Winner: string;
}

export interface GameResultResponseModel {
    rounds: GameResultResponseModel_Round[];
}


export interface GameIdResultRequestModel {
    username: string;
    dateTimeStarted: Date;
}

//create a GamewinnerrepsosneModel
export interface GameWinnerResponseModel {
    gameWinner: string;
}

const test: GameWinnerResponseModel = {
    gameWinner: "sombody"
};

