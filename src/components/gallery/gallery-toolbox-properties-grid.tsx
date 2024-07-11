import { GalleryToolboxPropertiesContainer } from "./gallery-toolbox-properties-container";
import { GalleryToolboxPropertiesTemplate } from "./gallery-toolbox-properties-template";
import { getPropertyPaths } from "../../utils/zod/zod-paths";
import { flattenToDictionary, NestedObject } from "../../utils/flatten";
import { ZodSchema } from "zod";
import { get, set } from "radash";

export type GalleryToolboxPropertiesGridChangedEventPayload<
  T extends NestedObject,
> = {
  key: string;
  value: T;
};

export type GalleryToolboxPropertiesGridChangedEvent<T extends NestedObject> = (
  e: GalleryToolboxPropertiesGridChangedEventPayload<T>
) => void;

export type GalleryToolboxPropertiesGridProps<T extends NestedObject> = {
  onChange?: GalleryToolboxPropertiesGridChangedEvent<T> | undefined;
  templates: GalleryToolboxPropertiesTemplate[];
  obj: T;
  exclude?: string[] | undefined;
  schema: ZodSchema;
  height: number;
  width: number;
  title: string;
};

export const GalleryToolboxPropertiesGrid = <T extends NestedObject>({
  width,
  height,
  obj,
  exclude,
  templates,
  schema,
  title,
  onChange,
}: GalleryToolboxPropertiesGridProps<T>) => {
  const nodes = getPropertyPaths(schema);
  const data = flattenToDictionary(obj, exclude ?? []);
  return (
    <GalleryToolboxPropertiesContainer
      height={height}
      width={width}
      data={data}
      nodes={nodes}
      templates={templates}
      title={title}
      onChange={(value) => {
        if (onChange) {
          const type = nodes.find((path) => path.path === value.new.key);
          if (type?.type === "ZodNumber") {
            const newValue = Number(value.new.value);
            const newObj = set(obj, value.new.key, newValue);
            if (schema.safeParse(newObj).success) {
              onChange({ key: value.new.key, value: newObj });
              console.log(`${value.new.key}: ${get(newObj, value.new.key)}`);
            }
          } else if (type?.type === "ZodBoolean") {
            const newValue = value.new.value === "true";
            const newObj = set(obj, value.new.key, newValue);
            if (schema.safeParse(newObj).success) {
              onChange({ key: value.new.key, value: newObj });
              console.log(`${value.new.key}: ${get(newObj, value.new.key)}`);
            }
          } else if (type?.type === "ZodString") {
            const newValue = value.new.value;
            const newObj = set(obj, value.new.key, newValue);
            if (schema.safeParse(newObj).success) {
              onChange({ key: value.new.key, value: newObj });
              console.log(`${value.new.key}: ${get(newObj, value.new.key)}`);
            }
          }
        }
      }}
    />
  );
};
