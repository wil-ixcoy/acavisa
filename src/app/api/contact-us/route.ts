/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  const { fullName, email, message } = await request.json();
  const supabase = await createClient();

  console.log(fullName);
  console.log(email);
  console.log(message);
  try {
    const { error } = await supabase
      .from("contact_requests")
      .insert([{ full_name: fullName, email, message }]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: any) {
    console.log(err)
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
