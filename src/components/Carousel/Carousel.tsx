import * as React from 'react';
import { Box, IconButton, Stack } from '@mui/material';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';

import { CarouselProps } from './Carousel.types';
import Dot from './Dot';

const CAROUSEL_ID = 'carousel-id-';
const STEP = 1;
const GAP = 10;

const Carousel: React.FC<React.PropsWithChildren<CarouselProps>> = ({ sx, children }) => {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState<number>(0);
  const [fit, setFit] = React.useState<boolean>(true);
  const length = React.useMemo(() => (Array.isArray(children) ? children.length : 1), [children]);
  const [visibleId, setVisibleId] = React.useState<number>(0);
  const [touch, setTouch] = React.useState<boolean>(false);
  const [touchWay, setTouchWay] = React.useState<number>(0);

  React.useEffect(() => {
    if (panelRef.current) {
      setHeight(panelRef.current.clientHeight);
    }

    const handleFit = () => {
      if (panelRef.current && rootRef.current) setFit(panelRef.current.scrollWidth <= rootRef.current.clientWidth);
    };
    handleFit();
    window.addEventListener('resize', handleFit);
    return () => {
      window.removeEventListener('resize', handleFit);
    };
  }, []);

  const handleNext = React.useCallback(
    (step = STEP, excludeWay = 0) => {
      const lastId = length - 1;
      const nextId = visibleId + step > lastId ? (visibleId + 1 > lastId ? 0 : visibleId + 1) : visibleId + step;

      const currentEl = document.querySelector('#' + CAROUSEL_ID + visibleId);
      const nextEl = document.querySelector('#' + CAROUSEL_ID + nextId);

      const currentRect = currentEl?.getBoundingClientRect();
      const nextRect = nextEl?.getBoundingClientRect();
      if (!nextRect || !currentRect) return;

      rootRef.current?.scrollBy({ left: nextRect.x - currentRect.x + excludeWay, behavior: 'smooth' });
      setVisibleId(nextId);
    },
    [length, visibleId],
  );
  const handlePrev = React.useCallback(
    (step = STEP, excludeWay = 0) => {
      const lastId = length - 1;
      const nextId = visibleId - step < 0 ? (visibleId - 1 < 0 ? lastId : visibleId - 1) : visibleId - step;

      const currentEl = document.querySelector('#' + CAROUSEL_ID + visibleId);
      const nextEl = document.querySelector('#' + CAROUSEL_ID + nextId);

      const currentRect = currentEl?.getBoundingClientRect();
      const nextRect = nextEl?.getBoundingClientRect();
      if (!nextRect || !currentRect) return;

      rootRef.current?.scrollBy({ left: nextRect.x - currentRect.x + excludeWay, behavior: 'smooth' });
      setVisibleId(nextId);
    },
    [length, visibleId],
  );
  const handleTouchStart = () => {
    setTouch(true);
  };
  const handleTouchEnd = () => {
    setTouch(false);
  };
  React.useEffect(() => {
    if (touch || !touchWay) return;

    const way = touchWay;
    setTouchWay(0);

    const currentEl = document.querySelector('#' + CAROUSEL_ID + visibleId);
    const currentRect = currentEl?.getBoundingClientRect();
    const currentWidth = currentRect?.width;
    if (!currentWidth) return;

    const step = Math.ceil(Math.abs(way) / currentWidth);
    if (way > 0) {
      handlePrev(step, way);
    } else {
      handleNext(step, way);
    }
  }, [handleNext, handlePrev, touch, touchWay, visibleId]);
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (fit || !touch) return;

    // TODO: проверить, работает ли
    rootRef.current?.scrollBy({ left: -e.changedTouches.length });
    setTouchWay((prev) => prev + e.changedTouches.length);
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (fit || !touch) return;

    rootRef.current?.scrollBy({ left: -e.movementX });
    setTouchWay((prev) => prev + e.movementX);
  };

  return (
    <Stack direction='column' sx={sx}>
      <Stack direction='row' alignItems='center'>
        {!fit && (
          <IconButton onClick={() => handlePrev()}>
            <NavigateBeforeRoundedIcon />
          </IconButton>
        )}
        <Box
          ref={rootRef}
          sx={{ position: 'relative', width: '100%', height: height, overflowX: 'hidden', overflowY: 'hidden' }}
        >
          <Stack
            direction='row'
            gap={GAP + 'px'}
            p={1}
            ref={panelRef}
            width='100%'
            justifyContent='space-evenly'
            sx={{ position: 'absolute' }}
            onMouseDown={handleTouchStart}
            onTouchStart={handleTouchStart}
            onMouseUp={handleTouchEnd}
            onTouchEnd={handleTouchEnd}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onMouseOut={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
          >
            {Array.isArray(children)
              ? children.map((child, id) => (
                  <Stack key={id} id={CAROUSEL_ID + id}>
                    {child}
                  </Stack>
                ))
              : children}
          </Stack>
        </Box>
        {!fit && (
          <IconButton onClick={() => handleNext()}>
            <NavigateNextRoundedIcon />
          </IconButton>
        )}
      </Stack>
      {!fit && (
        <Stack direction='row' gap={0.5} alignSelf='center' mt={1}>
          {Array.from({ length }).map((_, id) => (
            <Dot active={id === visibleId} key={id} />
          ))}
        </Stack>
      )}
    </Stack>
  );
};

export default Carousel;
