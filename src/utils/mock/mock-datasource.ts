import { Annotation } from '../../entities/annotation/annotation-schema';
import { db } from '../../data/db/db';
import { galleryReadyStore } from '../../data/store/canvases-store';
import { Canvas } from '../../entities/canvas/canvas-schema';
import { AnnotationTag } from '../../entities/annotation/annotation-tag-schema';
import { ulid } from 'ulidx';
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
  const annotationsPerCanvas = 1000;
  galleryReadyStore.setState(() => false);

  const canvases: Canvas[] = [];
  const annotations: Annotation[] = [];
  const annotationTags: AnnotationTag[] = [];

  const chairImage =
    'https://upload.wikimedia.org/wikipedia/commons/1/18/Chair%2C_top_view.png';

  let startTime = new Date().getTime();

  if ((await db.canvases.count()) > 0) {
    galleryReadyStore.setState(() => true);
    return;
  }

  const numCanvases = 32;

  // generate canvas based on the number of images and assign random values
  for (let i = 0; i < numCanvases; i++) {
    const canvasId = ulid();

    const width = roundUp(getRandomNumber(900, 5000), 100);
    const height = roundUp(getRandomNumber(900, 5000), 100);

    // Use only for performance testing!
    // const annotationWidth = 100;
    // const annotationHeight = 100;

    if (i > 0) {
      const canvasAnnotations: Annotation[] = [];
      const aps =
        annotationsPerCanvas - (annotationsPerCanvas / numCanvases) * i;
      const annotationsPerRow = Math.floor(Math.sqrt(aps));

      const annotationWidth = Math.ceil(width / annotationsPerRow);
      const annotationHeight = Math.ceil(height / annotationsPerRow);

      const rows = Math.ceil(width / annotationWidth);
      const cols = Math.ceil(height / annotationHeight);

      const numberOfItems = Math.ceil(rows * cols);

      let annotationNumber = 0;

      console.log(`Setting up ${numberOfItems} annotations for image ${i}`);

      for (let j = 0; j < rows; j++) {
        for (let k = 0; k < cols; k++) {
          const annotationId = ulid();
          const annotation: Annotation = {
            annotationId: annotationId,
            canvasId: canvasId,
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
            isWireframe: Math.random() < 0.5,
            imgSrc: Math.random() < 0.5 ? chairImage : undefined,
          };

          canvasAnnotations.push(annotation);

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
              annotationTagId: ulid(),
              annotationId: annotationId,
              canvasId: canvasId,
              value: tag,
              type: key,
              createdAt: startTime--,
              updatedAt: startTime--,
            };
            annotationTags.push(annotationTag);
          });
        }
      }

      // assign parent annotation to some of the annotations
      for (let j = 0; j < canvasAnnotations.length; j++) {
        // pick a random parent annotation from previously created annotations
        const parentAnnotationId =
          Math.random() < 0.8
            ? canvasAnnotations[
                getRandomNumber(0, canvasAnnotations.length - 1)
              ]
            : undefined;

        if (parentAnnotationId) {
          canvasAnnotations[j].parentAnnotationId =
            parentAnnotationId.annotationId;
        }

        annotations.push(canvasAnnotations[j]);
      }
    }

    const canvas: Canvas = {
      canvasId: canvasId,
      title: `Image ${i}`,
      description: `Description for image ${i}`,
      type: 'image',
      width: width,
      height: height,
      src: `https://images.placeholders.dev/?width=${width}&height=${height}&bgColor=%23f7f6f6&textColor=%236d6e71`,
      selected: i % 5 === 0, // select every 5th image
      ratio: width / height,
      caption: `Image ${i}`,
      createdAt: startTime--,
      updatedAt: startTime--,
    };

    canvases.push(canvas);
  }

  console.log(`Adding ${annotations.length} dbAnnotations to db`);
  await db.annotations.bulkAdd(annotations);
  console.log('Added annotations to db');

  console.log(`Adding ${canvases.length} gallery items to db`);
  await db.canvases.bulkAdd(canvases);
  console.log('Added gallery items to db');

  console.log(`Adding ${annotationTags.length} annotation tags to db`);
  await db.annotationTags.bulkAdd(annotationTags);
  console.log('Added annotation tags to db');
};
