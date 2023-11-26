import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { StyledWrapper } from './SvgWrapper.style';
import { ReactSVG } from 'react-svg';

interface SvgWrapperProps {
  img: string;
  onInit: (svg: SVGSVGElement) => void;
}

export const SvgWrapper: FC<SvgWrapperProps> = ({ img, onInit }) => {
  const scaleUp = true;

  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  const [isInit, setIsInit] = useState(false);

  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [containerHeight, setContainerHeight] = useState<number>(0);

  const [imageNaturalWidth, setImageNaturalWidth] = useState<number>(0);
  const [imageNaturalHeight, setImageNaturalHeight] = useState<number>(0);

  const imageScale = useMemo(() => {
    if (
      containerWidth === 0 ||
      containerHeight === 0 ||
      imageNaturalWidth === 0 ||
      imageNaturalHeight === 0
    )
      return 0;
    const scale = Math.min(
      containerWidth / imageNaturalWidth,
      containerHeight / imageNaturalHeight
    );
    return scaleUp ? scale : Math.max(scale, 1);
  }, [
    scaleUp,
    containerWidth,
    containerHeight,
    imageNaturalWidth,
    imageNaturalHeight,
  ]);

  const handleResize = useCallback(() => {
    if (container !== null) {
      const rect = container.getBoundingClientRect();
      setContainerWidth(rect.width);
      setContainerHeight(rect.height);
    } else {
      setContainerWidth(0);
      setContainerHeight(0);
    }
  }, [container]);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  const handleImageOnLoad = (image: HTMLImageElement) => {
    setImageNaturalWidth(image.naturalWidth);
    setImageNaturalHeight(image.naturalHeight);
  };

  useEffect(() => {
    const image = new Image();
    image.onload = () => handleImageOnLoad(image);
    image.src = img;
  }, [img]);

  return (
    <StyledWrapper ref={(el: HTMLDivElement | null) => setContainer(el)}>
      {imageScale > 0 && (
        <TransformWrapper initialScale={imageScale} minScale={imageScale}>
          {(utils) => (
            <TransformComponent
              wrapperStyle={{
                width: '100%',
                height: '100%',
              }}
            >
              <ReactSVG
                src={img}
                afterInjection={(svg) => {
                  if (!isInit) {
                    setIsInit(true);
                    utils.centerView();
                  }
                  onInit && onInit(svg);
                }}
              />
            </TransformComponent>
          )}
        </TransformWrapper>
      )}
    </StyledWrapper>
  );
};
