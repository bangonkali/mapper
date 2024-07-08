import { useStore } from "@tanstack/react-store";
import { GalleryComputedLayout } from "../../models/app/app-layout";
import { GalleryEditCarousel } from "./gallery-edit-carousel";
import { GalleryEditCavnas } from "./gallery-edit-canvas";
import { GalleryEditToolbar } from "./gallery-edit-toolbar";
import { focusedImageStore } from "../../data/store/gallery-items-store";
import { useGalleryItemsQuery } from "../../data/react-query/queries/use-gallery-items-query";
import { GalleryItem } from "../../entities/gallery-item/gallery-item-schema";
import Button from "@mui/material/Button";
import { usePutAnnotation } from "../../data/react-query/mutations/use-put-annotation";
import { v4 as uuid } from "uuid";
import HexRandomColorHook from "../../Hooks/HexRandomColorHook";
import { useAnnotationsQuery } from "../../data/react-query/queries/use-annotations-query";
import Modal from "../../Hooks/ModalHook";
import { useCallback, useState } from "react";
export type GalleryEditViewProps = {
  layout: GalleryComputedLayout;
};

import { FaSquareFull } from "react-icons/fa";
import { FaDiamond } from "react-icons/fa6";
import { MdRectangle } from "react-icons/md";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ButtonGroup, TextField } from "@mui/material";
import "./gallery-edit-view.css"; // Example CSS for styling the button group

export const GalleryEditView: React.FC<GalleryEditViewProps> = ({ layout }) => {
  const galleryItemsQuery = useGalleryItemsQuery();
  const focusedImageId = useStore(focusedImageStore);
  const mutateAnnotation = usePutAnnotation();
  const annotationQuery = useAnnotationsQuery({
    galleryItemId: focusedImageId!,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [shapeInfo, setShareInfo] = useState({
    title: "",
    description: "",
  });
  const shapes = {
    rectangle: "rectangle",
    rhombus: "rhombus",
    square: "square",
  };
  const [selectedShape, setSelectedShape] = useState<string>("rectangle");
  const [generateOutline, generateRandomHexColor] = HexRandomColorHook();
  const carouselHeight = 60;
  const toolbarHeight = 40;
  const canvasHeight =
    layout.docks.workspace.height - carouselHeight - toolbarHeight;
  const items: GalleryItem[] = galleryItemsQuery.data ?? [];
  const focusedImage = items.find(
    (item) => item.galleryItemId === focusedImageId
  );

  if (!focusedImage) {
    return <p>No item</p>;
  }

  if (items.length === 0) {
    return <p>No items</p>;
  }

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const handleAddShape = async () => {
    openModal();
  };
  const handleSubmitShape = useCallback(() => {
    const newUuid = uuid();
    const hexColor = generateRandomHexColor;
    const outlineHexColor = generateOutline;

    const lastElement = annotationQuery.data?.length! - 1;
    const LastItem = Math.max(...annotationQuery.data!.map((item) => item.x));
    let height = annotationQuery.data![lastElement].height;
    let width = annotationQuery.data![lastElement].width;
    let rotation = 0.0;

    if (selectedShape === shapes.rhombus) {
      height = 85;
      width = 85;
      rotation = 45;
    } else if (selectedShape === shapes.square) {
      height = 85;
      width = 85;
    } else {
      height = annotationQuery.data![lastElement].height;
      width = annotationQuery.data![lastElement].width;
    }
    mutateAnnotation.mutate({
      data: {
        galleryItemId: focusedImageId!,
        annotationId: newUuid,
        height: height,
        width: width,
        title: shapeInfo.title,
        description: shapeInfo.description,
        type: selectedShape,
        frame: 0.0,
        rotation: rotation,
        x: LastItem + 100,
        y: annotationQuery.data![lastElement]!.y,
        fill: {
          color: hexColor.toString(),
          alpha: 0.5,
        },
        outline: {
          brush: {
            color: outlineHexColor.toString(),
            alpha: 0.5,
          },
          thickness: 2.0,
        },
      },
    });
  }, [selectedShape, shapeInfo, annotationQuery]);
  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setShareInfo((prevShareInfo) => ({
      ...prevShareInfo,
      [name]: value,
    }));
  };
  const buttons = [
    <Button
      className={selectedShape === shapes.rectangle ? "active" : ""}
      startIcon={<MdRectangle />}
      onClick={() => setSelectedShape("rectangle")}
    >
      Rectangle
    </Button>,
    <Button
      className={selectedShape === shapes.square ? "active" : ""}
      key="two"
      startIcon={<FaSquareFull />}
      onClick={() => setSelectedShape("square")}
    >
      Square
    </Button>,
    <Button
      className={selectedShape === shapes.rhombus ? "active" : ""}
      key="three"
      startIcon={<FaDiamond />}
      onClick={() => setSelectedShape("rhombus")}
    >
      Rhombus
    </Button>,
  ];

  return (
    <div
      style={{
        display: "absolute",
        position: "absolute",
        left: 0,
        right: 0,
        height: `${layout.docks.workspace.height}px`,
        width: `${layout.docks.workspace.width}px`,
      }}
    >
      <div
        style={{
          height: toolbarHeight,
          width: layout.docks.workspace.width,
          left: 0,
          top: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <GalleryEditToolbar
          width={layout.docks.workspace.width}
          height={toolbarHeight}
        />

        <Button onClick={() => handleAddShape()} variant="contained">
          Add New shape
        </Button>
      </div>
      <div
        style={{
          left: 0,
          top: toolbarHeight,
          height: canvasHeight,
          width: layout.docks.workspace.width,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <GalleryEditCavnas
          focusedImage={focusedImage}
          width={layout.docks.workspace.width}
          height={canvasHeight}
        />
      </div>
      <div
        className="ns"
        style={{
          left: 0,
          top: layout.docks.workspace.height - carouselHeight,
          height: carouselHeight,
          width: layout.docks.workspace.width,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <GalleryEditCarousel
          items={items}
          height={carouselHeight}
          focusedItem={focusedImage}
        />
      </div>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <DialogTitle>Add New shape</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add the shape a title and a description.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="title"
            label="Title"
            type="text"
            fullWidth
            onChange={handleChange}
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="desc"
            label="Description"
            type="text"
            fullWidth
            onChange={handleChange}
            variant="standard"
          />
          <ButtonGroup size="large" aria-label="Large button group">
            {buttons}
          </ButtonGroup>
        </DialogContent>
        <DialogActions>
          <Button type="submit" onClick={() => handleSubmitShape()}>
            Add
          </Button>
        </DialogActions>
      </Modal>
    </div>
  );
};
