import { type SchemaTypeDefinition } from "sanity";

import { productType } from "./productType";
import { productCategoryType } from "./productCategoryType";
import { countryType } from "./countryType";
import { postCategoryType } from "./postCategoryType";
import { postType } from "./postsType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    productType,
    productCategoryType,
    countryType,
    postCategoryType,
    postType,
  ],
};
