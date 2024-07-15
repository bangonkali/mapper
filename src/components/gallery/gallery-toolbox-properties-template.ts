import { GalleryToolboxPropertiesTypes } from "./gallery-toolbox-properties-types";

export type GalleryToolboxPropertiesTemplate = {
  key: string;
  label: string;
  description: string;
  inputType: GalleryToolboxPropertiesTypes;
  readonly: boolean;
  selectionOptions?: () => { label: string; value: string }[] | undefined;
};
