import { type SchemaTypeDefinition } from 'sanity';

import { productType } from './productType';
import { productCategoryType } from './productCategoryType';
import { countryType } from './countryType';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [ productType, productCategoryType, countryType],
};