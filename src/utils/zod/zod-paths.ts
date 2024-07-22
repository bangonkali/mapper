import { get } from 'radash';
import Zod from 'zod';

export type ZodPathType = {
  path: string;
  type: string;
};

export const getPropertyPaths = (schema: Zod.ZodType): ZodPathType[] => {
  const pathTypes: ZodPathType[] = [];
  _getPropertyPaths(schema, pathTypes);
  return pathTypes;
};

export const _getPropertyPaths = (
  schema: Zod.ZodType,
  pathTypes: ZodPathType[] = [],
  currentPath: string = ''
): string[] => {
  if (schema instanceof Zod.ZodEffects) {
    return _getPropertyPaths(
      schema._def?.schema ?? schema,
      pathTypes,
      currentPath
    );
  }

  if (schema instanceof Zod.ZodNullable || schema instanceof Zod.ZodOptional) {
    return _getPropertyPaths(schema.unwrap(), pathTypes, currentPath);
  }

  if (schema instanceof Zod.ZodArray) {
    return _getPropertyPaths(schema.element, pathTypes, currentPath + '[0]');
  }

  if (schema instanceof Zod.ZodObject) {
    const entries = Object.entries<Zod.ZodType>(schema.shape);

    const outputMap = entries.flatMap(([key, value]) => {
      const newPath = currentPath ? `${currentPath}.${key}` : key;
      const nested = _getPropertyPaths(value, pathTypes, newPath);

      const type = get(value, '_def.typeName') as unknown as string;
      pathTypes.push({ path: newPath, type });

      return nested.length ? nested : [newPath];
    });

    return outputMap;
  }

  if (schema instanceof Zod.ZodDiscriminatedUnion) {
    const options = schema.options;
    return options.flatMap((option: Zod.ZodType) =>
      _getPropertyPaths(option, pathTypes, currentPath)
    );
  }

  if (schema instanceof Zod.ZodUnion) {
    const options = schema._def.options;
    return options.flatMap((option: Zod.ZodType) =>
      _getPropertyPaths(option, pathTypes, currentPath)
    );
  }

  return currentPath ? [currentPath] : [];
};
