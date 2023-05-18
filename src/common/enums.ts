export enum MessageEnum {
  MEMBERS = 'members',
  MESSAGE = 'message',
  VOTESTART = 'votestart',
  VOTEEND = 'voteend',
  DELETED = 'deleted',
}

export enum AgendaStatus {
  PREPARE = 'prepare',
  PROGRESS = 'progress',
}

export enum LoginStatus {
  LoggedIn,
  NotLoggedIn,
  Pending,
}

export enum AwayStatus {
  Entered,
  Vacant,
}

export enum MemberState {
  ONLINE = 'online',
  OFFLINE = 'offline',
  VACANT = 'vacant',
}
