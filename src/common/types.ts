import { MessageEnum } from './enums';

export interface Agenda {
  _id: string;
  title: string;
  content: string;
  subtitle: string;
  choices: string[];
  votesCountMap: Record<string, number>;
  userChoice: string | null;
  expires: string; // ISO Date String
}

export interface MessageType {
  type: MessageEnum;
  payload: string;
  issuer?: string;
  date?: string;
}
