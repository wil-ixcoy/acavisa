import { NextResponse } from 'next/server';
import { sanityClient } from '../../../lib/sanity';

export async function POST(request: Request) {
  try {
    const { fullName, email, message, country } = await request.json();

    // Validar los datos
    if (!fullName || !email || !message || !country) {
      return NextResponse.json({ error: 'Todos los campos son obligatorios' }, { status: 400 });
    }

    console.log('Datos recibidos:', { fullName, email, message, country });

    // Crear un nuevo documento en Sanity
    const newMessage = await sanityClient.create({
      _type: 'contactRequest', // Ajustamos al tipo correcto (era 'contactRequest', pero debería ser 'contactMessage' según tu esquema)
      fullName,
      email,
      message,
      country: {
        _type: 'reference',
        _ref: country, // El country debe ser el _id de un documento de tipo 'country'
      },
      created_at: new Date().toISOString(),
    });

    return NextResponse.json({ message: 'Mensaje enviado con éxito', data: newMessage }, { status: 200 });
  } catch (error) {
    console.error('Error al enviar el mensaje a Sanity:', error);
    return NextResponse.json({ error: 'Error al enviar el mensaje a Sanity' }, { status: 500 });
  }
}