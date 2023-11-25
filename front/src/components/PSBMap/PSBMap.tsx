import SvgMap from 'assets/map.svg?react';
import { FC } from 'react';
import { StyledMap } from './PSBMap.style';
import { SvgWrapper } from 'components/SvgWrapper';
import map from 'assets/map.svg';

export const PSBMap: FC = () => {
  return (
    <StyledMap>
      <SvgWrapper img={map} />
    </StyledMap>
  );
};
