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
