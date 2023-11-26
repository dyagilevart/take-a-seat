/* eslint-disable @typescript-eslint/no-explicit-any */
import { Popup } from '@gravity-ui/uikit';
import { FC, useCallback, useMemo, useState } from 'react';
import { StyledMap, magicTable } from './PSBMap.style';
import { SvgWrapper } from 'components/SvgWrapper';
import map from 'assets/map.svg';

interface VirtualElement {
  getBoundingClientRect: () => DOMRect;
  contextElement?: Element;
}

function generateGetBoundingClientRect(x = 0, y = 0) {
  return () => ({
    width: 0,
    height: 0,
    top: y,
    right: x,
    bottom: y,
    left: x,
    x,
    y,
    toJSON: () => {},
  });
}

export const PSBMap: FC = () => {
  const [place, setPlace] = useState<HTMLElement | null>(null);
  const [showMagicPopup, setShowMagicPopup] = useState(false);

  const findElement = useCallback(
    (element: HTMLElement): HTMLElement | undefined => {
      if (/^\d{3}$/.test(element.id)) {
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
      if (target) {
        target?.classList.add(magicTable);
        setPlace(target);
        setShowMagicPopup(true);
      }
    },
    [findElement]
  );

  const onOut = useCallback(
    (event: Event) => {
      const target = findElement(event.target as HTMLElement);
      if (target) {
        target?.classList.remove(magicTable);
        setPlace(null);
        setShowMagicPopup(false);
      }
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

  const virtualElement: VirtualElement = useMemo(() => {
    const coordinates = place?.getBoundingClientRect();

    const x = coordinates?.x || 0;
    const y = coordinates?.y || 0;
    console.log(place, x, y);

    return {
      getBoundingClientRect: generateGetBoundingClientRect(x, y),
    };
  }, [place]);

  return (
    <StyledMap>
      <SvgWrapper img={map} onInit={parseSvg} />
      <Popup
        anchorRef={{ current: virtualElement }}
        open={showMagicPopup}
        placement='bottom'
        keepMounted
      >
        Content
      </Popup>
    </StyledMap>
  );
};
