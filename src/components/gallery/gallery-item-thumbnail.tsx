import { useState } from "react";
import { GalleryItemLayoutBox } from "../../models/GalleryItemLayoutBox";
import { produce } from "immer";
import { focusedImageStore } from "../../data/store/gallery-items-store";
import { GalleryItem } from "../../entities/gallery-item/gallery-item-schema";
import { usePutGalleryItem } from "../../data/react-query/mutations/use-put-gallery-item";

export type GalleryItemThumbnailProps = {
  item: GalleryItem;
  layout: GalleryItemLayoutBox;
};

export const GalleryItemThumbnail: React.FC<GalleryItemThumbnailProps> = ({
  item,
  layout,
}) => {
  const putGalleryItem = usePutGalleryItem();
  const [isMouseHover, setIsMouseHover] = useState(false);

  return (
    <div
      className="ns"
      style={{
        padding: "0px",
        margin: "0px",
        position: "absolute",
        top: `${layout.top}px`,
        left: `${layout.left}px`,
        width: `${layout.width}px`,
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
          margin: "0px",
          padding: "0px",
          position: "absolute",
          width: `${layout.width}px`,
          height: `${layout.height}px`,
          display: "relative",
        }}
        onClick={() => {
          focusedImageStore.setState(() => item.galleryItemId);
        }}
      />
      {item.selected ? (
        <div
          className="ns"
          style={{
            margin: "0px",
            padding: "0px",
            position: "absolute",
            width: `${layout.width}px`,
            height: `${layout.height}px`,
            display: "relative",
            pointerEvents: "none",
          }}
        ></div>
      ) : null}

      {(isMouseHover && !item.selected) || item.selected ? (
        <div
          className="ns"
          style={{
            margin: "0px",
            padding: "0px",
            position: "absolute",
            display: "relative",
            paddingLeft: "10px",
            paddingRight: "10px",
            paddingTop: "10px",
            paddingBottom: "10px",
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
};
