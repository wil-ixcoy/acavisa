import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request, { params }: { params: { categoryId: string } }) {
  const supabase = await createClient();
  const { categoryId } = params;

  try {
    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', categoryId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ products }, { status: 200 });
  } catch (err) {
    // Aseguramos que 'err' sea de tipo Error, lo cual es más seguro
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    // Si no es un error estándar, lanzamos un error genérico
    return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
  }
}
