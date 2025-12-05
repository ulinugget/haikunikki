import { useState, useEffect, useRef, useCallback } from 'react';
import { toPng } from 'html-to-image';
import { useJapanImage } from './hooks/useJapanImage';

function App() {
  const [text, setText] = useState('');
  const [monthString, setMonthString] = useState('');
  const [dayString, setDayString] = useState('');
  
  const exportRef = useRef<HTMLDivElement>(null);
  const japanImage = useJapanImage();

  useEffect(() => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    setDayString(`${day}日`);
    setMonthString(`${month}月`);
  }, []);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleReset = () => {
    setText('');
  };

  const handleDownload = useCallback(async () => {
    if (exportRef.current === null) return;

    try {
      const dataUrl = await toPng(exportRef.current, {
        cacheBust: true,
        pixelRatio: 3, 
      });

      const link = document.createElement('a');
      link.download = 'haikuniki-story.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error:', err);
    }
  }, [exportRef]);

  return (
    <div className="min-h-screen bg-charcoal flex flex-col items-center" style={{overflow: 'hidden',
    position: 'relative',
    top: '-50px',
    left: '-30px',}
    
    }>
      
      {/* --- INICIO DEL CONTENEDOR A EXPORTAR --- */}
      <div 
        ref={exportRef}
        style={{
          // 1. Color de fondo del marco
          backgroundColor: '#1a1a1a', 
          
          // 2. CENTRADO PERFECTO:
          display: 'flex',            // Activa Flexbox
          justifyContent: 'center',   // Centra horizontalmente
          alignItems: 'center',       // Centra verticalmente
          
          // 3. PADDING UNIFORME:
          // Usamos el mismo valor para los 4 lados. 
          // 40px o 50px suele verse bien balanceado.
          padding: '40px',           

          // 4. Asegura que el padding no rompa el cálculo del tamaño
          boxSizing: 'border-box',

          // Opcional: Si sientes que en la pantalla del móvil se ve muy ancho,
          // puedes limitarlo visualmente (no afecta la descarga, solo la vista previa)
          maxWidth: '100%',
        }}
      >
        {/* La Estampilla (sin cambios aquí) */}
        <div
          className="stamp-container"
          style={{ 
            position: 'relative', 
            overflow: 'hidden',
            // Sombra suave para dar profundidad sobre el fondo negro
            boxShadow: '0 8px 30px rgba(0,0,0,0.3)' 
          }} 
        >
          <div className="date-overlay" style={{ zIndex: 10, position: 'relative' }}>
              <p>{dayString}</p>
              <p>{monthString}</p>
          </div>
          
          <div 
            className="image-container"
            style={{
              backgroundImage: japanImage ? `url(${japanImage})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          
          <textarea
            className="text-input"
            value={text}
            onChange={handleTextChange}
            placeholder="ここに書いて。。。"
            maxLength={500}
            style={{ 
              position: 'relative', 
              zIndex: 5, 
              background: 'transparent',
              resize: 'none' 
            }} 
          />
        </div>
      </div>
      {/* --- FIN DEL CONTENEDOR A EXPORTAR --- */}

      <div className="button-bar mt-8 flex gap-4">
        <button className="neumorphic-button" onClick={handleDownload}>
          Descargar
        </button>
        <button className="neumorphic-button" onClick={handleReset}>
          Reiniciar
        </button>
      </div>
    </div>
  );
}

export default App;