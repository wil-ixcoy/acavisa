import { type SchemaTypeDefinition } from "sanity";

import { productType } from "./productType";
import { productCategoryType } from "./productCategoryType";
import { countryType } from "./countryType";
import { postCategoryType } from "./postCategoryType";
import { postType } from "./postsType";
import { contactRequestType } from "./contactRequestType";
import { jobApplicantType } from "./jobApplicantType";
import { contactInfoType } from "./contactInfoType";
import { headerAdType } from "./headerAdType";
import { promotionType } from "./promotionType";
import { subcategoryType } from "./subCategoryType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    productType,
    productCategoryType,
    countryType,
    postCategoryType,
    postType,
    contactRequestType,
    jobApplicantType,
    contactInfoType,
    headerAdType,
    promotionType,
    subcategoryType
  ],
};
