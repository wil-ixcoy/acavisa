/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  const formData = await request.formData();
  const fullName = formData.get("fullName") as string;
  const email = formData.get("email") as string;
  const profession = formData.get("profession") as string;
  const desiredPosition = formData.get("desiredPosition") as string;
  const message = formData.get("message") as string;
  const cvFile = formData.get("cv") as File | null;

  const supabase = await createClient();

  console.log("Inicio de la solicitud POST a /api/join-us");
  console.log("Datos del formulario recibidos:", {
    fullName,
    email,
    profession,
    desiredPosition,
    message,
    cvFile: cvFile ? cvFile.name : null,
  });

  try {
    let cvUrl = null;
    if (cvFile) {
      const fileExt = cvFile.name.split(".").pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `cvs/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("cv-bucket")
        .upload(filePath, cvFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        return NextResponse.json(
          { error: uploadError.message },
          { status: 500 }
        );
      }

      cvUrl = supabase.storage.from("cv-bucket").getPublicUrl(filePath)
        .data.publicUrl;
    }

    const { error: insertError } = await supabase
      .from("job_applicants")
      .insert([
        {
          full_name: fullName,
          email,
          profession,
          desired_position: desiredPosition,
          message,
          cv_url: cvUrl,
        },
      ]);

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
