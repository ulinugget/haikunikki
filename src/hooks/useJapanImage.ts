// src/hooks/useJapanImage.ts
import { useEffect, useState } from 'react';

export const useJapanImage = () => {
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    const fetchImage = async () => {
      const apiKey = import.meta.env.VITE_PEXELS_API_KEY;
      // Randomizar página para que no siempre salgan las mismas
      const randomPage = Math.floor(Math.random() * 20) + 1;
      
      try {
        const res = await fetch(`https://api.pexels.com/v1/search?query=japan&orientation=portrait&per_page=1&page=${randomPage}`, {
            headers: { Authorization: apiKey }
        });
        const data = await res.json();
        if (data.photos && data.photos.length > 0) {
             // Usamos 'large' o 'portrait' para que pese menos al descargar
             setImageUrl(data.photos[0].src.large2x);
        }
      } catch (e) {
        console.error("Error cargando imagen de Pexels:", e);
      }
    };
    fetchImage();
  }, []);

  return imageUrl;
};