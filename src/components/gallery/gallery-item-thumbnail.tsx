import { useState, forwardRef } from "react";
import { GalleryItemLayoutBox } from "../../models/GalleryItemLayoutBox";
import { produce } from "immer";
import { focusedImageStore } from "../../data/store/gallery-items-store";
import { GalleryItem } from "../../entities/gallery-item/gallery-item-schema";
import { usePutGalleryItem } from "../../data/react-query/mutations/use-put-gallery-item";
import { useNavigate } from "@tanstack/react-router";

export type GalleryItemThumbnailProps = {
  item: GalleryItem;
  layout: GalleryItemLayoutBox;
  focused: boolean;
};

export const GalleryItemThumbnail = forwardRef<
  HTMLImageElement,
  GalleryItemThumbnailProps
>(({ item, layout, focused }, focusElement) => {
  const putGalleryItem = usePutGalleryItem();
  const [isMouseHover, setIsMouseHover] = useState(false);
  const navigate = useNavigate({ from: "/gallery" });
  return (
    <div
      className="ns"
      style={{
        padding: 0,
        margin: 0,
        position: "absolute",
        top: layout.top,
        left: layout.left,
        width: layout.width,
        display: "absolute",
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
        key={`img-${item.galleryItemId}`}
        src={item.src}
        alt={item.caption}
        style={{
          margin: 0,
          padding: 0,
          position: "absolute",
          width: layout.width,
          height: layout.height,
          display: "relative",
        }}
        ref={focused ? focusElement : null}
        onClick={() => {
          const galleryId = item.galleryItemId;
          navigate({ to: "/selected-image/$galleryId", params: { galleryId } });
          focusedImageStore.setState(() => item.galleryItemId);
        }}
      />
      {focused ? (
        <div
          className="ns"
          style={{
            margin: 0,
            padding: 0,
            position: "absolute",
            width: layout.width,
            height: layout.height,
            display: "relative",
            pointerEvents: "none",
          }}
        ></div>
      ) : null}

      {(isMouseHover && !item.selected) || item.selected ? (
        <div
          className="ns"
          style={{
            margin: 0,
            padding: 0,
            position: "absolute",
            display: "relative",
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10,
            paddingBottom: 10,
          }}
          onClick={() => {
            putGalleryItem.mutate({
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
