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
  participants: string[];
}

export interface MessageType {
  type: MessageEnum;
  message?: string;
  username?: string;
  date?: string;
}

// user type used for redux state
export interface User {
  ssoUID: string;
  sparcsID: string;
  isUserAdmin: boolean;
}

export interface RootState {
  user: User;
  loggedIn: boolean;
  agendas: Agenda[];
}
