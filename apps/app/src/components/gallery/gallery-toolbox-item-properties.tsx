import { usePutCanvas } from '../../data/react-query/mutations/use-put-canvas';
import { Canvas, CanvasSchema } from '../../entities/canvas/canvas-schema';
import { GalleryToolboxPropertiesGrid } from './gallery-toolbox-properties-grid';

export type GalleryToolboxItemPropertiesProps = {
  width: number;
  height: number;
  focusedImage: Canvas | undefined;
};

export const GalleryToolboxItemProperties: React.FC<
  GalleryToolboxItemPropertiesProps
> = ({ height, width, focusedImage }) => {
  const mutateCanvas = usePutCanvas();

  if (!focusedImage) {
    return undefined;
  }

  return (
    <GalleryToolboxPropertiesGrid
      key={focusedImage.canvasId}
      height={height}
      width={width}
      obj={focusedImage}
      exclude={['annotations']}
      templates={[
        {
          key: 'canvasId',
          label: 'Id',
          description: 'The unique identifier for the gallery item.',
          inputType: 'text',
          readonly: true,
        },
      ]}
      schema={CanvasSchema}
      title={'Image'}
      onChange={(e) => {
        mutateCanvas.mutate({ data: e.value });
      }}
    />
  );
};
