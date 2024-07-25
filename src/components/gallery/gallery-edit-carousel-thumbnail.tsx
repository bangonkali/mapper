import { useState, forwardRef } from 'react';
import { produce } from 'immer';
import { gallerySelectedAnnotationStore } from '../../data/store/canvases-store';
import { Canvas } from '../../entities/canvas/canvas-schema';
import { usePutCanvas } from '../../data/react-query/mutations/use-put-canvas';
import { useNavigate } from '@tanstack/react-router';

export type GalleryEditCarouselThumbnailProps = {
  item: Canvas;
  height: number;
  width: number;
  focused: boolean;
};

export const GalleryEditCarouselThumbnail = forwardRef<
  HTMLImageElement,
  GalleryEditCarouselThumbnailProps
>(({ item, height, width, focused }, focusElement) => {
  const navigate = useNavigate({ from: '/gallery' });
  const putCanvas = usePutCanvas();
  const [isMouseHover, setIsMouseHover] = useState(false);

  return (
    <div
      className="ns"
      style={{
        position: 'relative',
        maxWidth: width,
        minWidth: width,
        width: width,
        height: height,
        minHeight: height,
        maxHeight: height,
        marginLeft: 2,
      }}
      onMouseMove={() => {
        setIsMouseHover(true);
      }}
      onMouseLeave={() => {
        setIsMouseHover(false);
      }}
    >
      <img
        className="ns"
        id={item.canvasId}
        src={item.src}
        alt={item.caption}
        style={{
          display: 'block',
          maxWidth: width,
          minWidth: width,
          width: width,
          height: height,
          minHeight: height,
          maxHeight: height,
        }}
        ref={focused ? focusElement : null}
        onClick={() => {
          gallerySelectedAnnotationStore.setState(() => null);
          const canvasId = item.canvasId;
          navigate({
            to: '/canvas/$canvasId',
            params: { canvasId },
          });
        }}
      />
      {focused ? (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontSize: '1.5rem',
            fontWeight: 'bold',
          }}
        ></div>
      ) : null}
      <div
        onClick={(e) => {
          e.stopPropagation();
          putCanvas.mutate({
            data: produce(item, (draft) => {
              draft.selected = !draft.selected;
            }),
          });
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: 20,
          width: 20,
        }}
      >
        {item.selected || (!item.selected && isMouseHover) ? (
          <input type="checkbox" checked={item.selected} readOnly />
        ) : null}
      </div>
    </div>
  );
});
