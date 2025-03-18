/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Header from '@/components/ladingpage/header';
import NavBar from '@/components/ladingpage/navBar';
import Footer from '@/components/ladingpage/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useRef, useState } from 'react';

export default function JoinUs() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [profession, setProfession] = useState('');
  const [desiredPosition, setDesiredPosition] = useState('');
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('profession', profession);
    formData.append('desiredPosition', desiredPosition);
    formData.append('message', message);
    if (selectedFile) {
      console.log(selectedFile)
      formData.append('cv', selectedFile);
    }

    try {
      const response = await fetch('/api/join-us', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSuccessMessage('Solicitud enviada con éxito.');
        setFullName('');
        setEmail('');
        setProfession('');
        setDesiredPosition('');
        setMessage('');
        setSelectedFile(null);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Error al enviar la solicitud. Inténtalo de nuevo.');
      }
    } catch (err: any) {
      setErrorMessage('Ocurrió un error inesperado.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <header>
        <Header />
        <NavBar />
      </header>

      <main className="max-w-4xl mx-auto py-10 px-6">
        <div className="grid grid-cols-1 gap-6 md:mt-6 items-start">
          <section className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl md:text-2xl font-bold text-center bg-primary text-white p-3 mb-6 md:w-1/4 md:h-1/4">
              Reclutamiento
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Input
                    className="rounded-none text-sm md:text-base"
                    type="text"
                    id="name"
                    placeholder="Tu nombre"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Input
                    className="rounded-none text-sm md:text-base"
                    type="email"
                    id="email"
                    placeholder="Tu E-Mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Input
                    className="rounded-none text-sm md:text-base"
                    type="text"
                    id="profession"
                    placeholder="Profesión"
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Input
                    className="rounded-none text-sm md:text-base"
                    type="text"
                    id="position"
                    placeholder="Cargo a aplicar"
                    value={desiredPosition}
                    onChange={(e) => setDesiredPosition(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="mt-4">
              <input
                type="file"
                id="cv"
                className="w-full border rounded-none py-2 px-4 cursor-pointer bg-white hover:bg-gray-50"
                onChange={handleFileChange}
                ref={fileInputRef}
              />
             
            </div>

              <div className="mt-4">
                <Textarea
                  id="message"
                  rows={6}
                  placeholder="Mensaje"
                  className="rounded-none text-sm md:text-base"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                className={`bg-primary md:w-1/4 rounded-none mt-6 hover:bg-secondary text-sm md:text-base ${
                  isLoading ? 'opacity-70 cursor-wait' : ''
                }`}
                disabled={isLoading}
              >
                {isLoading ? 'Enviando...' : 'Enviar'}
              </Button>
            </form>

            {successMessage && <div className="mt-4 text-green-500">{successMessage}</div>}
            {errorMessage && <div className="mt-4 text-red-500">{errorMessage}</div>}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}