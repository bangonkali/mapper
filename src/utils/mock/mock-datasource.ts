import { v4 as uuidv4 } from "uuid";
import { Annotation } from "../../entities/annotation/annotation-schema";
import { db } from "../../data/db/db";
import { galleryReadyStore } from "../../data/store/gallery-items-store";
import { GalleryItem } from "../../entities/gallery-item/gallery-item-schema";

export const GetMockGallery = async () => {
  galleryReadyStore.setState(() => false);
  const items: GalleryItem[] = [];

  if ((await db.galleryItems.count()) > 0) {
    galleryReadyStore.setState(() => true);
    return;
  }

  const numImages = getRandomNumber(250, 300);
  const dbAnnotations: Annotation[] = [];

  // generate GalleryItem based on the number of images and assign random values
  for (let i = 0; i < numImages; i++) {
    const galleryItemId = uuidv4();

    const width = getRandomNumber(600, 1200);
    const height = getRandomNumber(600, 1200);

    const numAnnotations = getRandomNumber(6, 10);
    const annotationPadding = 100;
    const annotationWidth = Math.floor(width / (numAnnotations + 1));
    const annotationHeight = height - annotationPadding * 2;

    for (let j = 0; j < numAnnotations; j++) {
      const annotationId = uuidv4();
      const annotation: Annotation = {
        annotationId: annotationId,
        galleryItemId: galleryItemId,
        title: `Image ${i} Annotation ${j}`,
        description: `Description for image ${i} annotation ${j}`,
        fill: {
          alpha: 0.5,
          color: getRandomColor(),
        },
        outline: {
          brush: {
            alpha: 0.5,
            color: getRandomColor(),
          },
          thickness: 2,
        },
        type: "rectangle",
        frame: 0,
        rotation: 0,
        x: j * annotationWidth + 10,
        y: annotationPadding,
        width: annotationWidth - 10,
        height: annotationHeight,
      };
      dbAnnotations.push(annotation);
    }

    const item: GalleryItem = {
      galleryItemId: galleryItemId,
      title: `Image ${i}`,
      description: `Description for image ${i}`,
      type: "image",
      width: width,
      height: height,
      src: `https://images.placeholders.dev/?width=${width}&height=${height}&bgColor=%23f7f6f6&textColor=%236d6e71`,
      selected: i < 10 && i > 4,
      ratio: width / height,
      caption: `Image ${i}`,
      zoomFactor: 1,
    };

    items.push(item);
  }

  db.annotations.bulkAdd(dbAnnotations).then(() => {
    console.log("Added annotations to db");
  });

  db.galleryItems.bulkAdd(items).then(() => {
    console.log("Added gallery items to db");
  });
};

// returns a random number between min and max but the number is
// a whole number integer.
function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// returns a random color in the format of #ff0000
function getRandomColor(): string {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}
