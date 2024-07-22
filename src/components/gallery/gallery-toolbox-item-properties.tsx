import { usePutGalleryItem } from '../../data/react-query/mutations/use-put-gallery-item';
import {
  GalleryItem,
  GalleryItemSchema,
} from '../../entities/gallery-item/gallery-item-schema';
import { GalleryToolboxPropertiesGrid } from './gallery-toolbox-properties-grid';

export type GalleryToolboxItemPropertiesProps = {
  width: number;
  height: number;
  focusedImage: GalleryItem | undefined;
};

export const GalleryToolboxItemProperties: React.FC<
  GalleryToolboxItemPropertiesProps
> = ({ height, width, focusedImage }) => {
  const mutateGalleryItem = usePutGalleryItem();

  if (!focusedImage) {
    return undefined;
  }

  return (
    <GalleryToolboxPropertiesGrid
      key={focusedImage.galleryItemId}
      height={height}
      width={width}
      obj={focusedImage}
      exclude={['annotations']}
      templates={[
        {
          key: 'galleryItemId',
          label: 'Id',
          description: 'The unique identifier for the gallery item.',
          inputType: 'text',
          readonly: true,
        },
      ]}
      schema={GalleryItemSchema}
      title={'Image'}
      onChange={(e) => {
        mutateGalleryItem.mutate({ data: e.value });
      }}
    />
  );
};
