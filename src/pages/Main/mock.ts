import { UserVoteItemProps } from '@/components/UserVoteItem';

export const mockTabs = [
  {
    title: 'Foo',
    choices: ['A', 'B', 'C'],
    extendableChoices: true
  },
  {
    title: 'Bar',
    choices: ['D', 'E', 'F'],
    extendableChoices: false
  },
  {
    title: 'Baz',
    choices: ['D', 'E'],
    extendableChoices: false
  }
];

export const mockVoteItems: UserVoteItemProps[] = [
  {
    active: true,
    title: 'SPARCS 종강총회 개발자 - 홍길동',
    content:
      'SPARCS 종강총회 안건 중 "디자이너"를 투표하기 위한 설문조사입니다.\n각 안건이 진행될 당시 "활동중인 정회원"만이 투표권을 갖습니다.\n투표 결과는 집계가 완료되면 총회 진행중에 공지하도록 하겠습니다.',
    subtitle: '최다은(cheddar) 회원의 디자이너 자격 획득에 대한 투표',
    choices: ['찬성', '반대']
  },
  {
    active: false,
    title: 'SPARCS 종강총회 개발자 - 스팍스'
  },
  {
    active: false,
    title: 'SPARCS 종강총회 개발자 - 스비서'
  }
];
