import { GalleryComputedLayout } from '../../models/app/app-layout';
import { useCanvasesQuery } from '../../data/react-query/queries/use-canvases-query';
import { useAnnotationsQuery } from '../../data/react-query/queries/use-annotations-query';
import { GalleryEditToolbar } from './gallery-edit-toolbar';
import { GalleryEditCanvas } from './gallery-edit-canvas';
import { usePutAnnotation } from '../../data/react-query/mutations/use-put-annotation';
import { RectangleShape } from '../shapes/rectangle-shape';
import { getRandomColor } from '../../utils/random/random-utils';
import { Canvas } from '../../entities/canvas/canvas-schema';
import { useCallback } from 'react';
import { ulid } from 'ulidx';
import { colors } from '../../consts/colors';
import { Route } from '../../routes/canvas.$canvasId.lazy';
import { galleryStoreLayout } from '../../data/store/gallery-store';
import { produce } from 'immer';
import { onSplitterEnd } from '../../data/store/mutations/splitter/on-splitter-end';
import { GalleryEditDockBottom } from './gallery-edit-dock-bottom';
import { GalleryEditCarouselDock } from './dockable-containers/gallery-edit-carousel-dock';
import { galleryEditDockStore } from '../../data/store/gallery-edit-dock-store';
import { useStore } from '@tanstack/react-store';
import { GalleryEditAnnotationTagsGridDock } from './dockable-containers/gallery-edit-annotation-tags-grid-dock';
import { gallerySelectedAnnotationStore } from '../../data/store/canvases-store';

export type GalleryEditViewProps = {
  layout: GalleryComputedLayout;
};

export const GalleryEditView: React.FC<GalleryEditViewProps> = ({ layout }) => {
  const gallerySelectedAnnotation = useStore(gallerySelectedAnnotationStore);
  const galleryEditDock = useStore(galleryEditDockStore);
  const { canvasId } = Route.useParams();
  const canvasesQuery = useCanvasesQuery();
  const focusedImageId = canvasId;
  const mutateAnnotation = usePutAnnotation();
  const annotationQuery = useAnnotationsQuery({
    canvasId: focusedImageId!,
  });

  const toolbarHeight = 40;
  const canvasHeight =
    layout.docks.workspace.height - layout.docks.bottom.height - toolbarHeight;
  const items: Canvas[] = canvasesQuery.data ?? [];
  const focusedImage = items.find((item) => item.canvasId === focusedImageId);

  const handleSubmitShape = useCallback(() => {
    if (typeof annotationQuery.data?.length !== 'number') return;
    if (!focusedImageId) return;

    const annotationId = ulid();
    const hexColor = getRandomColor();
    const outlineHexColor = getRandomColor();
    let height = 50;
    let width = 50;
    let x = 50;
    let y = 50;
    let rotation = 0;
    let isWireframe = false;

    let lastElementIndex = annotationQuery.data?.length - 1;
    if (!gallerySelectedAnnotation && lastElementIndex >= 0) {
      const lastElement = annotationQuery.data![lastElementIndex];
      height = lastElement.height;
      width = lastElement.width;
      x = lastElement.x + 25;
      y = lastElement.y + 25;
      rotation = lastElement.rotation;
      isWireframe = lastElement.isWireframe;
    } else if (gallerySelectedAnnotation !== null) {
      const lastElement = annotationQuery.data.find(
        (aq) => aq.annotationId === gallerySelectedAnnotation
      )!;
      height = lastElement.height;
      width = lastElement.width;
      x = lastElement.x + 25;
      y = lastElement.y + 25;
      rotation = lastElement.rotation;
      isWireframe = lastElement.isWireframe;
    } else {
      lastElementIndex = 0;
    }

    mutateAnnotation.mutate({
      data: {
        canvasId: focusedImageId,
        annotationId: annotationId,
        height: height,
        width: width,
        title: `Annotation #${lastElementIndex + 1}`,
        description: `Description for Item ${focusedImageId} - ${lastElementIndex + 1}`,
        type: 'rectangle',
        frame: 0.0,
        rotation: rotation,
        x: x,
        y: y,
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
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
        visible: true,
        isWireframe: isWireframe,
      },
    });

    gallerySelectedAnnotationStore.setState(() => annotationId);
  }, [
    annotationQuery.data,
    focusedImageId,
    gallerySelectedAnnotation,
    mutateAnnotation,
  ]);

  if (!focusedImage) {
    return <p>No item</p>;
  }

  if (items.length === 0) {
    return <p>No items</p>;
  }

  return (
    <div
      style={{
        display: 'absolute',
        position: 'absolute',
        left: 0,
        right: 0,
        height: layout.docks.workspace.height,
        width: layout.docks.workspace.width,
      }}
    >
      <div
        style={{
          height: toolbarHeight - 1,
          width: layout.docks.workspace.width,
          left: 0,
          top: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <GalleryEditToolbar
          width={layout.docks.workspace.width}
          height={toolbarHeight - 1}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'start',
              height: 36,
              paddingLeft: 10,
              paddingRight: 10,
            }}
            onMouseOver={() => {}}
            onClick={() => handleSubmitShape()}
          >
            <RectangleShape
              width={16}
              height={16}
              fill={'white'}
              stroke={colors.headerForeground}
            />
            <p
              style={{
                marginLeft: 10,
              }}
            >
              Add Rectangle
            </p>
          </div>
        </GalleryEditToolbar>
      </div>
      <div
        style={{
          position: 'relative',
          height: canvasHeight,
          width: layout.docks.workspace.width,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <GalleryEditCanvas
          focusedImage={focusedImage}
          width={layout.docks.workspace.width}
          height={canvasHeight}
        />
      </div>
      {layout.docks.bottom.visible ? (
        <div
          style={{
            left: 0,
            top: 0,
            height: layout.docks.bottom.height,
            width: layout.docks.workspace.width,
            position: 'relative',
          }}
        >
          <GalleryEditDockBottom
            height={layout.docks.bottom.height}
            width={layout.docks.workspace.width}
            selectedKey={galleryEditDock.bottom.selectedKey}
            onSelectedKeyChanged={(key) => {
              galleryEditDockStore.setState((state) => {
                return produce(state, (draft) => {
                  draft.bottom.selectedKey = key;
                });
              });
            }}
            onMinimizeClick={() => {
              galleryStoreLayout.setState((state) => {
                return produce(state, (draft) => {
                  draft.gallery.layout.constraint.docks.bottom.visible = false;
                });
              });
            }}
          >
            <GalleryEditCarouselDock
              key={'galleryEditCarouselDock'}
              width={layout.docks.workspace.width}
              height={layout.docks.bottom.height}
              title="Carousel"
            />
            <GalleryEditAnnotationTagsGridDock
              key={'galleryEditAnnotationTagsGridDock'}
              width={layout.docks.workspace.width}
              height={layout.docks.bottom.height}
              title="Tags"
            />
            <GalleryEditCarouselDock
              key={'dock3'}
              width={layout.docks.workspace.width}
              height={layout.docks.bottom.height}
              title="Dock 3"
            />
          </GalleryEditDockBottom>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: layout.docks.workspace.width,
              height: 3,
              cursor: 'row-resize',
              backgroundColor: layout.docks.bottom.splitterVisible
                ? colors.splitter
                : 'transparent',
            }}
            onMouseLeave={() => {
              if (!layout.docks.bottom.splitterEnabled) {
                onSplitterEnd(galleryStoreLayout);
              }
            }}
            onMouseOver={() => {
              galleryStoreLayout.setState((state) => {
                return produce(state, (draft) => {
                  draft.gallery.layout.constraint.docks.bottom.splitterVisible =
                    true;
                });
              });
            }}
            onMouseDown={() => {
              galleryStoreLayout.setState((state) => {
                return produce(state, (draft) => {
                  draft.gallery.layout.constraint.docks.bottom.splitterEnabled =
                    true;
                });
              });
            }}
          ></div>
        </div>
      ) : undefined}
    </div>
  );
};
