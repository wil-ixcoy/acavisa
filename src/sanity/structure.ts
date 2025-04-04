import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Acavisa Studio")
    .items([
      S.documentTypeListItem("product").title("Productos"),
      S.documentTypeListItem("productCategory").title(
        "Categorías de los productos"
      ),
      S.documentTypeListItem("country").title("Paises de operación"),
      S.documentTypeListItem("postCategory").title("Categorías de Posts"),
      S.documentTypeListItem("post").title("Posts"),
      S.documentTypeListItem("contactRequest").title("Mensajes de Contacto"),
      S.documentTypeListItem("jobApplicant").title("Solicitantes de Empleo"),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          ![
            "post",
            "category",
            "author",
            "product",
            "productCategory",
            "country",
            "postCategory",
            "contactRequest",
            "jobApplicant", 
          ].includes(item.getId()!)
      ),
    ]);