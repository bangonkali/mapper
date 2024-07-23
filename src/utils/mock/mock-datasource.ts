import { v4 as uuidv4 } from 'uuid';
import { Annotation } from '../../entities/annotation/annotation-schema';
import { db } from '../../data/db/db';
import { galleryReadyStore } from '../../data/store/gallery-items-store';
import { GalleryItem } from '../../entities/gallery-item/gallery-item-schema';
import { AnnotationTag } from '../../entities/annotation/annotation-tag-schema';
import {
  annotationTagClassification,
  AnnotationTagKeys,
} from './mock-classification-types';
import {
  getRandomNumber,
  getRandomColor,
  roundUp,
} from '../random/random-utils';

export const generateMockData = async () => {
  galleryReadyStore.setState(() => false);
  const items: GalleryItem[] = [];

  let startTime = new Date().getTime();

  if ((await db.galleryItems.count()) > 0) {
    galleryReadyStore.setState(() => true);
    return;
  }

  const numImages = 512;
  const dbAnnotations: Annotation[] = [];

  const dbAnnotationTags: AnnotationTag[] = [];

  // generate GalleryItem based on the number of images and assign random values
  for (let i = 0; i < numImages; i++) {
    const galleryItemId = uuidv4();

    const width = roundUp(getRandomNumber(900, 5000), 100);
    const height = roundUp(getRandomNumber(900, 5000), 100);

    // Use only for performance testing!
    // const annotationWidth = 100;
    // const annotationHeight = 100;

    const annotationWidth = width / 10;
    const annotationHeight = height / 10;

    const numberOfItems =
      ((width / annotationWidth) * height) / annotationHeight;

    let annotationNumber = 0;

    console.log(`Setting up ${numberOfItems} annotations for image ${i}`);

    for (let j = 0; j < width / annotationWidth; j++) {
      for (let k = 0; k < height / annotationHeight; k++) {
        // console.log('Adding annotation', i, j, k);
        const annotationId = uuidv4();
        const annotation: Annotation = {
          annotationId: annotationId,
          galleryItemId: galleryItemId,
          title: `Image ${i} Annotation ${annotationNumber++}`,
          description: `Description for image ${i} annotation ${annotationNumber}`,
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
          type: 'rectangle',
          frame: 0,
          rotation: 0,
          x: j * annotationWidth,
          y: k * annotationHeight,
          width: annotationWidth,
          height: annotationHeight,
          visible: Math.random() < 0.5,
          createdAt: startTime--,
          updatedAt: startTime--,
        };
        dbAnnotations.push(annotation);

        const types: AnnotationTagKeys[] = [
          'Classification',
          'Radiation',
          'Priority',
          'Status',
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
      }
    }

    const item: GalleryItem = {
      galleryItemId: galleryItemId,
      title: `Image ${i}`,
      description: `Description for image ${i}`,
      type: 'image',
      width: width,
      height: height,
      src: `https://images.placeholders.dev/?width=${width}&height=${height}&bgColor=%23f7f6f6&textColor=%236d6e71`,
      selected: i % 5 === 0, // select every 5th image
      ratio: width / height,
      caption: `Image ${i}`,
      zoomFactor: 1,
      createdAt: startTime--,
      updatedAt: startTime--,
    };

    items.push(item);
  }

  console.log(`Adding ${dbAnnotations.length} dbAnnotations to db`);
  await db.annotations.bulkAdd(dbAnnotations);
  console.log('Added annotations to db');

  console.log(`Adding ${items.length} gallery items to db`);
  await db.galleryItems.bulkAdd(items);
  console.log('Added gallery items to db');

  console.log(`Adding ${dbAnnotationTags.length} annotation tags to db`);
  await db.annotationTags.bulkAdd(dbAnnotationTags);
  console.log('Added annotation tags to db');
};
