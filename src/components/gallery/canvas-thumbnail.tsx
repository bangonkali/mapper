import { useState, forwardRef } from 'react';
import { CanvasLayoutBox } from '../../models/CanvasLayoutBox';
import { produce } from 'immer';
import { Canvas } from '../../entities/canvas/canvas-schema';
import { usePutCanvas } from '../../data/react-query/mutations/use-put-canvas';
import { useNavigate } from '@tanstack/react-router';

export type CanvasThumbnailProps = {
  item: Canvas;
  layout: CanvasLayoutBox;
  focused: boolean;
};

export const CanvasThumbnail = forwardRef<
  HTMLImageElement,
  CanvasThumbnailProps
>(({ item, layout, focused }, focusElement) => {
  const putCanvas = usePutCanvas();
  const [isMouseHover, setIsMouseHover] = useState(false);
  const navigate = useNavigate({ from: '/gallery' });
  return (
    <div
      style={{
        padding: 0,
        margin: 0,
        position: 'absolute',
        top: layout.top,
        left: layout.left,
        width: layout.width,
        display: 'absolute',
      }}
      onMouseMove={() => {
        setIsMouseHover(true);
      }}
      onMouseLeave={() => {
        setIsMouseHover(false);
      }}
    >
      <img
        key={`img-${item.canvasId}`}
        src={item.src}
        alt={item.caption}
        style={{
          margin: 0,
          padding: 0,
          position: 'absolute',
          width: layout.width,
          height: layout.height,
          display: 'relative',
        }}
        ref={focused ? focusElement : null}
        onClick={() => {
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
            margin: 0,
            padding: 0,
            position: 'absolute',
            width: layout.width,
            height: layout.height,
            display: 'relative',
            pointerEvents: 'none',
          }}
        ></div>
      ) : null}

      {(isMouseHover && !item.selected) || item.selected ? (
        <div
          style={{
            margin: 0,
            padding: 0,
            position: 'absolute',
            display: 'relative',
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10,
            paddingBottom: 10,
          }}
          onClick={() => {
            putCanvas.mutate({
              data: produce(item, (draft) => {
                draft.selected = !draft.selected;
              }),
            });
          }}
        >
          <input type="checkbox" checked={item.selected} readOnly></input>
        </div>
      ) : null}
    </div>
  );
});
