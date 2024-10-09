import { useInformationStore } from '@/store/useInformationStore';
import { X } from 'lucide-react';

export const ExtraInformation = () => {
  const { extraInformation } = useInformationStore();
  const { clearExtraInformation } = useInformationStore();
  const { content, title, isOpen, subtitle } = extraInformation;

  // Maneja el clic en el fondo para cerrar el sidebar
  const handleOverlayClick = (e) => {
    // Solo cierra el sidebar si se hace clic en el fondo oscuro
    if (e.target.classList.contains('overlay')) {
      clearExtraInformation();
    }
  };

  return (
    <div>
      {/* Fondo oscuro para cuando el sidebar esté abierto */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-10 overlay" // Añade la clase overlay
          onClick={handleOverlayClick} // Maneja el clic en el fondo
        />
      )}

      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-white shadow-lg transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4">
          {/* Cabecera del sidebar */}
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button onClick={clearExtraInformation}>
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Subtítulo y contenido */}
          <p className="text-sm text-gray-500">{subtitle}</p>
          <div className="mt-4">{content}</div>
        </div>
      </div>
    </div>
  );
};
