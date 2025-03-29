import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ categoryId: string }> }
) {
  const supabase = await createClient();
  const params = await context.params;
  const { categoryId } = params;

  try {
    const { data: products, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", categoryId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!products || products.length === 0) {
      return NextResponse.json(
        { error: "No se encontraron productos para esta categoría" },
        { status: 404 }
      );
    }

    return NextResponse.json({ products }, { status: 200 });
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Error desconocido";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
