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
    const { data: categories, error } = await supabase
      .from("categories")
      .select("*")
      .eq("id", categoryId) 
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!categories) {
      return NextResponse.json(
        { error: "Categoría no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json({ categories }, { status: 200 });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Error desconocido";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}