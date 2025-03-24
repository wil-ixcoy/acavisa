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
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
