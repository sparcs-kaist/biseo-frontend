import { MessageEnum, AgendaStatus } from './enums';

export interface Agenda {
  _id: string;
  title: string;
  content: string;
  subtitle: string;
  choices: string[];
  votesCountMap: Record<string, number>;
  userChoice: string | null;
  expires: string; // ISO Date String
  status: AgendaStatus;
}

export interface MessageType {
  type: MessageEnum;
  payload: string;
  issuer?: string;
  date?: string;
}

// user type used for redux state
export interface User {
  ssoUID: string;
  sparcsID: string;
}

