import { NextResponse } from 'next/server';
import { sanityClient } from '../../../lib/sanity';

export async function POST(request: Request) {
  try {
    const { fullName, email, message, country } = await request.json();

    if (!fullName || !email || !message || !country) {
      return NextResponse.json({ error: 'Todos los campos son obligatorios' }, { status: 400 });
    }


    const newMessage = await sanityClient.create({
      _type: 'contactRequest',
      fullName,
      email,
      message,
      country: {
        _type: 'reference',
        _ref: country, 
      },
      created_at: new Date().toISOString(),
    });

    return NextResponse.json({ message: 'Mensaje enviado con éxito', data: newMessage }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Error al enviar el mensaje a Sanity' }, { status: 500 });
  }
}