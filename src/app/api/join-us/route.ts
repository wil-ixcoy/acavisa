import { NextResponse } from 'next/server';
import { sanityClient } from '../../../lib/sanity';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const profession = formData.get("profession") as string;
    const desiredPosition = formData.get("desiredPosition") as string;
    const message = formData.get("message") as string;
    const cvFile = formData.get("cv") as File | null;
    const country = formData.get("country") as string;

    if (!fullName || !email || !profession || !desiredPosition || !message || !country) {
      return NextResponse.json({ error: 'Todos los campos son obligatorios' }, { status: 400 });
    }

    let cvUrl = null;
    if (cvFile) {
      const fileName = `${Date.now()}-${cvFile.name}`;
      const fileAsset = await sanityClient.assets.upload('file', cvFile, {
        filename: fileName,
      });

      if (!fileAsset.url) {
        return NextResponse.json({ error: 'Error al subir el archivo CV' }, { status: 500 });
      }

      cvUrl = fileAsset.url;
    }

    const newApplicant = await sanityClient.create({
      _type: 'jobApplicant',
      fullName,
      email,
      profession,
      desiredPosition,
      message,
      cvUrl, 
      country: {
        _type: 'reference',
        _ref: country, 
      },
      created_at: new Date().toISOString(),
    });

    return NextResponse.json({ message: 'Solicitud enviada con éxito', data: newApplicant }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Error al procesar la solicitud' }, { status: 500 });
  }
}