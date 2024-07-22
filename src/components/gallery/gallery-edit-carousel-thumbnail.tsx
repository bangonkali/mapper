import { useState, forwardRef } from 'react';
import { produce } from 'immer';
import { gallerySelectedAnnotationStore } from '../../data/store/gallery-items-store';
import { GalleryItem } from '../../entities/gallery-item/gallery-item-schema';
import { usePutGalleryItem } from '../../data/react-query/mutations/use-put-gallery-item';
import { useNavigate } from '@tanstack/react-router';

export type GalleryEditCarouselThumbnailProps = {
  item: GalleryItem;
  height: number;
  width: number;
  focused: boolean;
};

export const GalleryEditCarouselThumbnail = forwardRef<
  HTMLImageElement,
  GalleryEditCarouselThumbnailProps
>(({ item, height, width, focused }, focusElement) => {
  const navigate = useNavigate({ from: '/gallery' });
  const putGalleryItem = usePutGalleryItem();
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
        id={item.galleryItemId}
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
          const galleryItemId = item.galleryItemId;
          navigate({
            to: '/gallery/item/$galleryItemId',
            params: { galleryItemId },
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
          putGalleryItem.mutate({
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
