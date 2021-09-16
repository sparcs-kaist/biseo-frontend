import React from 'react';
import Logo from '@/public/sparcs.svg';
import BiseoButton from '@/components/BiseoButton';
import { COLOR } from '@/common/style';
import { MdSettings, MdAccountCircle } from 'react-icons/md';
import {
  HeaderContainer,
  HeaderContent,
  RHS,
  OptionButton,
  VacantContainer,
  EnteredContainer,
  MessageContainer,
} from './styled';
import { useState } from 'react';
import { AwayStatus } from '@/common/enums';

const Header: React.FC = () => {
  const [awayState, setAwayState] = useState<AwayStatus>(AwayStatus.Entered);
  const [buttonString, setButtonString] = useState<string>('enter');
  const [buttonColor, setButtonColor] = useState<string>(COLOR.primary);
  const changeAwayState = () => {
    switch (awayState) {
      case AwayStatus.Entered:
        setAwayState(AwayStatus.Vacant);
        setButtonString('vacant');
        setButtonColor(COLOR.vacant);
        break;
      case AwayStatus.Vacant:
        setAwayState(AwayStatus.Staying);
        break;
      case AwayStatus.Staying:
        setAwayState(AwayStatus.Entered);
        setButtonString('enter');
        setButtonColor(COLOR.primary);
        break;
    }

    console.log(awayState);
  };

  const AwayContainer =
    awayState !== AwayStatus.Entered ? VacantContainer : EnteredContainer;

  const AwayStateMessage =
    awayState === AwayStatus.Entered
      ? ''
      : awayState === AwayStatus.Vacant
      ? '자리비움 상태입니다'
      : '현재 투표가 진행중입니다. 다음 투표부터 참여 할 수 있습니다';

  return (
    <div>
      <HeaderContainer>
        <HeaderContent>
          <Logo style={{ height: 'var(--header-height)' }} />
          <RHS>
            <BiseoButton
              // background={awayState ? COLOR.primary : COLOR.vacant}
              background={buttonColor}
              foreground="white"
              onClick={changeAwayState}
            >
              {buttonString}
            </BiseoButton>
            <OptionButton>
              <MdSettings size="24px" />
            </OptionButton>
            <OptionButton>
              <MdAccountCircle size="24px" />
            </OptionButton>
          </RHS>
        </HeaderContent>
      </HeaderContainer>
      <AwayContainer>
        <MessageContainer>{AwayStateMessage}</MessageContainer>
      </AwayContainer>
    </div>
  );
};

export default Header;
