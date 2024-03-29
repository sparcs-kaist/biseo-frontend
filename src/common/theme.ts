import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    DEFAULT_TEXT: string;
    DEFAULT_PLACEHOLDER: string;

    ROOT_BG: string;

    HEADER_BG: string;
    HEADER_TAB_ACTIVE_BG: string;
    HEADER_TAB_INACTIVE_BG: string;

    MSG_CONTENT_USER_BACK: string;
    MSG_CONTENT_USER_TEXT: string;
    MSG_CONTENT_AWAY_BACK: string;
    MSG_CONTENT_AWAY_TEXT: string;
    MSG_USERNAME: string;

    CHATBOX_INPUTGROUP_TEXTAREA: string;
    CHATBOX_INPUTGROUP_BG: string;
    CHATBOX_INPUTGROUP_BORDER_TOP: string;
    CHATBOX_INPUTGROUP_BTN: string;
    CHATBOX_BROADCAST_BG: string;
    CHATBOX_BROADCAST_TEXT: string;
    CHATBOX_PARTICIPANTSBOX_BG: string;
    CHATBOX_PARTICIPANTSBOX_BORDER: string;
    CHATBOX_PARTICIPANTSBOX_TEXT: string;
    CHATBOX_INTERNAL_BG: string;
    CHATBOX_PARTICIPANTS_TEXT: string;
    CHATBOX_URL: string;

    AGENDA_CONTAINER_ACTIVE_BG: string;
    AGENDA_CONTAINER_INACTIVE_BG: string;
    AGENDA_CONTAINER_DETAILED: string;
    AGENDA_CONTAINER_NOT_DETAILED: string;
    AGENDA_CONTAINER_NOT_VOTED: string;

    AGENDA_STATEVIEW_OVERLAY_BG: string;
    AGENDA_STATEVIEW_BG: string;

    VOTERCHOICE_BUTTON_UNCHECK_BG: string;
    VOTERCHOICE_BUTTON_CHECK_BG: string;
    VOTERCHOICE_BUTTON_UNCHECK_BORDER: string;
    VOTERCHOICE_BUTTON_CHECK_BORDER: string;

    BISEO_BUTTON_DEFAULT_BG: string;
    BISEO_BUTTON_SELECT_BG: string;
    BISEO_BUTTON_BORDER: string;
  }
}

export const lightTheme = {
  DEFAULT_TEXT: '#000000',
  DEFAULT_PLACEHOLDER: '#b1b1b1',

  ROOT_BG: '#f7f6f3',

  HEADER_BG: '#ffffff',
  HEADER_TAB_ACTIVE_BG: '#ffffff',
  HEADER_TAB_INACTIVE_BG: '#f2a024',

  MSG_CONTENT_USER_BACK: '#fec46c',
  MSG_CONTENT_USER_TEXT: '#000000',
  MSG_CONTENT_AWAY_BACK: '#f7f6f3',
  MSG_CONTENT_AWAY_TEXT: '#000000',
  MSG_USERNAME: '#000000',

  CHATBOX_INPUTGROUP_TEXTAREA: '#444444',
  CHATBOX_INPUTGROUP_BG: '#fffbf0',
  CHATBOX_INPUTGROUP_BORDER_TOP: '#f2a024',
  CHATBOX_INPUTGROUP_BTN: '#f2a024',
  CHATBOX_BROADCAST_BG: '#111111cc',
  CHATBOX_BROADCAST_TEXT: '#ffffff',
  CHATBOX_PARTICIPANTSBOX_BG: '#ffffff',
  CHATBOX_PARTICIPANTSBOX_BORDER: '#f2a024',
  CHATBOX_PARTICIPANTSBOX_TEXT: '#000000',
  CHATBOX_INTERNAL_BG: '#ffffff',
  CHATBOX_PARTICIPANTS_TEXT: '#000000',
  CHATBOX_URL: '#595959',

  AGENDA_CONTAINER_ACTIVE_BG: '#fdfbee',
  AGENDA_CONTAINER_INACTIVE_BG: '#ffffff',
  AGENDA_CONTAINER_DETAILED: '#f2a024',
  AGENDA_CONTAINER_NOT_DETAILED: '#8c8c8c',
  AGENDA_CONTAINER_NOT_VOTED: '#8c8c8c',

  AGENDA_STATEVIEW_OVERLAY_BG: 'rgba(68, 68, 68, 0.6)',
  AGENDA_STATEVIEW_BG: '#ffffff',

  VOTERCHOICE_BUTTON_UNCHECK_BG: '#ffffff',
  VOTERCHOICE_BUTTON_CHECK_BG: '#FFBF43',
  VOTERCHOICE_BUTTON_UNCHECK_BORDER: '#D6D6D6',
  VOTERCHOICE_BUTTON_CHECK_BORDER: '#FFBF43',

  BISEO_BUTTON_DEFAULT_BG: '#ffffff',
  BISEO_BUTTON_SELECT_BG: 'f2a024',
  BISEO_BUTTON_BORDER: '#f2a024',
};

export const darkTheme = {
  DEFAULT_TEXT: '#ffffff',
  DEFAULT_PLACEHOLDER: '#bbbbbb',

  ROOT_BG: '#423D37',

  HEADER_BG: '#574B3C',
  HEADER_TAB_ACTIVE_BG: '#60574d',
  HEADER_TAB_INACTIVE_BG: '#FFC978',

  MSG_CONTENT_USER_BACK: '#E17D00',
  MSG_CONTENT_USER_TEXT: '#ffffff',
  MSG_CONTENT_AWAY_BACK: '#686868',
  MSG_CONTENT_AWAY_TEXT: '#ffffff',
  MSG_USERNAME: '#ffffff',

  CHATBOX_INPUTGROUP_TEXTAREA: '#ffffff',
  CHATBOX_INPUTGROUP_BG: '#8C6C4F',
  CHATBOX_INPUTGROUP_BORDER_TOP: '#f2a024',
  CHATBOX_INPUTGROUP_BTN: '#f2a024',
  CHATBOX_BROADCAST_BG: '##111111cc',
  CHATBOX_BROADCAST_TEXT: '#ffffff',
  CHATBOX_PARTICIPANTSBOX_BG: '#4f4f4f',
  CHATBOX_PARTICIPANTSBOX_BORDER: '#f2a024',
  CHATBOX_PARTICIPANTSBOX_TEXT: '#ffffff',
  CHATBOX_INTERNAL_BG: '#5a5751',
  CHATBOX_PARTICIPANTS_TEXT: '#ffffff',
  CHATBOX_URL: '#cccccc',

  AGENDA_CONTAINER_ACTIVE_BG: '#807466',
  AGENDA_CONTAINER_INACTIVE_BG: '#60574d',
  AGENDA_CONTAINER_DETAILED: '#f5c070',
  AGENDA_CONTAINER_NOT_DETAILED: '#bfbfbf',
  AGENDA_CONTAINER_NOT_VOTED: '#bfbfbf',

  AGENDA_STATEVIEW_OVERLAY_BG: 'rgba(18, 18, 18, 0.6)',
  AGENDA_STATEVIEW_BG: '#60574D',

  VOTERCHOICE_BUTTON_UNCHECK_BG: '#60574D',
  VOTERCHOICE_BUTTON_CHECK_BG: '#FFBF43',
  VOTERCHOICE_BUTTON_UNCHECK_BORDER: '#D6D6D6',
  VOTERCHOICE_BUTTON_CHECK_BORDER: '#FFBF43',

  BISEO_BUTTON_DEFAULT_BG: '#60574d',
  BISEO_BUTTON_SELECT_BG: '#f2a024',
  BISEO_BUTTON_BORDER: '#f2a024',
};
