import { v4 as uuidv4 } from "uuid";
import { Annotation } from "../../entities/annotation/annotation-schema";
import { db } from "../../data/db/db";
import { galleryReadyStore } from "../../data/store/gallery-items-store";
import { GalleryItem } from "../../entities/gallery-item/gallery-item-schema";
import { AnnotationTag } from "../../entities/annotation/annotation-tag-schema";
import {
  annotationTagClassification,
  AnnotationTagKeys,
} from "./mock-classification-types";
import { getRandomNumber, getRandomColor } from "../random/random-utils";

export const generateMockData = async () => {
  galleryReadyStore.setState(() => false);
  const items: GalleryItem[] = [];

  let startTime = new Date().getTime();

  if ((await db.galleryItems.count()) > 0) {
    galleryReadyStore.setState(() => true);
    return;
  }

  const numImages = getRandomNumber(250, 300);
  const dbAnnotations: Annotation[] = [];

  const dbAnnotationTags: AnnotationTag[] = [];

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
        visible: Math.random() < 0.5,
        createdAt: startTime--,
        updatedAt: startTime--,
      };
      dbAnnotations.push(annotation);

      const types: AnnotationTagKeys[] = [
        "Classification",
        "Radiation",
        "Priority",
        "Status",
      ];
      types.forEach((key) => {
        const tag =
          annotationTagClassification[key][
            getRandomNumber(0, annotationTagClassification[key].length - 1)
          ];
        const annotationTag: AnnotationTag = {
          annotationTagId: uuidv4(),
          annotationId: annotationId,
          galleryItemId: galleryItemId,
          value: tag,
          type: key,
          createdAt: startTime--,
          updatedAt: startTime--,
        };
        dbAnnotationTags.push(annotationTag);
      });

      // for (let k = 0; k < 3; k++) {
      //   const annotationTag: AnnotationTag = {
      //     annotationTagId: uuidv4(),
      //     annotationId: annotationId,
      //     galleryItemId: galleryItemId,
      //   };
      //   dbAnnotationTags.push(annotationTag);
      // }
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
      createdAt: startTime--,
      updatedAt: startTime--,
    };

    items.push(item);
  }

  db.annotations.bulkAdd(dbAnnotations).then(() => {
    console.log("Added annotations to db");
  });

  db.galleryItems.bulkAdd(items).then(() => {
    console.log("Added gallery items to db");
  });

  db.annotationTags.bulkAdd(dbAnnotationTags).then(() => {
    console.log("Added annotation tags to db");
  });
};
