import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import map from 'assets/map.svg';
import { FC } from 'react';

export const PSBMap: FC = () => {
  return (
    <TransformWrapper initialScale={0.5}>
      <TransformComponent>
        <img src={map} alt='test' />
      </TransformComponent>
    </TransformWrapper>
  );
};
