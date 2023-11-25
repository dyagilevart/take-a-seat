import map from 'assets/map.svg';
import { FC } from 'react';
import { StyledMap } from './PSBMap.style';
import { SvgWrapper } from 'components/SvgWrapper';

export const PSBMap: FC = () => {
  return (
    <StyledMap>
      <SvgWrapper img={map} />
    </StyledMap>
  );
};
