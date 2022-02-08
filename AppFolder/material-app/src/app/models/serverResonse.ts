export interface serverResponse 
{
    username: string;
    playerChoice: string;
    cpuChoice: string;
    outcome: string;
    roundCounter: number;
    roundLimit: number;
    dateTimeStarted: Date;
 }

 export interface resultEnvelope{
   gameresults: serverResponse[];
 }

 export interface insertDBResponse {
   success: string;
 }

 


 