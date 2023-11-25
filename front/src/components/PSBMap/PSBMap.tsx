/* eslint-disable @typescript-eslint/no-explicit-any */
import SvgMap from 'assets/map.svg?react';
import { FC, useCallback } from 'react';
import { StyledMap, magicTable } from './PSBMap.style';
import { SvgWrapper } from 'components/SvgWrapper';
import map from 'assets/map.svg';

export const PSBMap: FC = () => {
  const findElement = useCallback(
    (element: HTMLElement): HTMLElement | undefined => {
      if (/\d{3}/.test(element.id)) {
        return element;
      }
      if (element.parentNode) {
        return findElement(element.parentNode as HTMLElement);
      }
    },
    []
  );

  const onHover = useCallback(
    (event: Event) => {
      const target = findElement(event.target as HTMLElement);
      target?.classList.add(magicTable);
    },
    [findElement]
  );

  const onOut = useCallback(
    (event: Event) => {
      const target = findElement(event.target as HTMLElement);
      target?.classList.remove(magicTable);
    },
    [findElement]
  );

  const parseSvg = useCallback(
    (svg: SVGSVGElement) => {
      const ids = svg.querySelectorAll('g[id^="1"]');
      ids.forEach((id) => {
        id.addEventListener('mouseover', onHover);
        id.addEventListener('mouseout', onOut);
      });
    },
    [onHover, onOut]
  );

  return (
    <StyledMap>
      <SvgWrapper img={map} onInit={parseSvg} />
    </StyledMap>
  );
};
