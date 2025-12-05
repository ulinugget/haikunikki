import { useEffect, useState } from 'react';

// Definimos la interfaz básica para el tipado de la respuesta de Pexels
interface PexelsPhoto {
  id: number;
  src: {
    original: string;
    large: string;
    large2x: string;
    portrait: string;
  };
  photographer: string;
}

interface PexelsResponse {
  photos: PexelsPhoto[];
}

export const JapanBackground = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchJapanImage = async () => {
      // Truco para aleatoriedad:
      // Pexels tiene muchas páginas de resultados. Generamos un número de página random (1-10)
      // para no recibir siempre las mismas primeras fotos.
      const randomPage = Math.floor(Math.random() * 10) + 1;
      
      const apiKey = import.meta.env.VITE_PEXELS_API_KEY;
      
      if (!apiKey) {
        console.error("Falta la API Key en el archivo .env");
        return;
      }

      try {
        const response = await fetch(
          `https://api.pexels.com/v1/search?query=japan&per_page=15&page=${randomPage}`,
          {
            headers: {
              Authorization: apiKey,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Error al conectar con Pexels');
        }

        const data: PexelsResponse = await response.json();

        // Si hay fotos, elegimos una al azar de las 15 que pedimos
        if (data.photos && data.photos.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.photos.length);
          const selectedPhoto = data.photos[randomIndex];
          setImageUrl(selectedPhoto.src.large2x); // 'large2x' suele tener buena calidad para fondos
        }
      } catch (error) {
        console.error("Error obteniendo la imagen:", error);
      }
    };

    fetchJapanImage();
  }, []);

  return (
    <div
      style={{
        // Estilos para que cubra el fondo o el tamaño que desees
        width: '100%',
        height: '100vh', 
        backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textShadow: '0 2px 4px rgba(0,0,0,0.7)',
        backgroundColor: '#333' // Color de fondo mientras carga
      }}
    >
      {!imageUrl ? (
        <p>Cargando vista de Japón...</p>
      ) : (
        <h1>Japón</h1>
      )}
    </div>
  );
};