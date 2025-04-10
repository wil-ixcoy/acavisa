import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Acavisa Studio")
    .items([
      S.documentTypeListItem("productCategory").title(
        "Categorías de los productos"
      ),
      S.documentTypeListItem("subcategory").title(
        "Sub categorías de los productos"
      ),
      S.documentTypeListItem("product").title("Productos"),
      S.documentTypeListItem("country").title("Paises de operación"),
      S.documentTypeListItem("postCategory").title("Categorías de Posts"),
      S.documentTypeListItem("post").title("Posts"),
      S.documentTypeListItem("contactRequest").title("Mensajes de Contacto"),
      S.documentTypeListItem("jobApplicant").title("Solicitantes de Empleo"),
      S.documentTypeListItem("contactInfo").title(
        "Información empresarial por país"
      ),
      S.documentTypeListItem("headerAd").title("Anuncios"),
      S.documentTypeListItem("promotion").title("Promociones"),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          ![
            "post",
            "category",
            "subcategory",
            "author",
            "product",
            "productCategory",
            "country",
            "postCategory",
            "contactRequest",
            "jobApplicant",
            "contactInfo",
            "headerAd",
            "promotion",
          ].includes(item.getId()!)
      ),
    ]);
