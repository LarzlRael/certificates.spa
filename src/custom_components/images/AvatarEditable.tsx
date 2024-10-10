import { useState, useRef } from "react";
import { CameraIcon } from "lucide-react";
import { Button } from "@/components/ui/button"; // Asegúrate de que este componente esté bien implementado
import { Card } from "@/components/ui/card";
import { putAuthAction } from "@/provider/action/ActionAuthorization";
import { sendFileFormData } from "@/pages/dashboard/utils/processDataCourse";
import { isValidStatus } from "@/utils/validation/validation";
import { toast } from "sonner";

interface AvatarEditableProps {
  profileImage: string | null;
  reload?: () => void;
}

export const AvatarEditable = ({
  profileImage,
  reload,
}: AvatarEditableProps) => {
  const [imageSrc, setImageSrc] = useState<string | null>(profileImage);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Simula un clic en el input file
    }
  };

  const handleUploadToServer = async () => {
    setIsLoading(true);
    const uploadFile = await putAuthAction(
      "users/update-profile-image",
      sendFileFormData("profileImage", fileInputRef.current?.files?.[0])
    );
    setIsLoading(false);
    if (!isValidStatus(uploadFile.status)) {
      toast.error("Hubo un error al subir la imagen");
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
    if (reload) reload();
    toast.success("Imagen actualizada correctamente");
  };

  const handleCancelUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = null; // Resetea el valor del input file
    }
    setImageSrc(profileImage);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageSrc(imageUrl); // Actualiza la imagen con la URL de la imagen cargada
    }
  };

  return (
    <div className='flex flex-col items-center justify-center space-y-4'>
      <div className='relative inline-block'>
        <img
          className='inline-block w-[128px] h-[128px] rounded-lg'
          src={imageSrc}
          alt='Avatar'
        />
        <span
          onClick={handleUploadImage}
          className='cursor-pointer absolute bottom-0 right-0 block p-2 rounded-full bg-white transform translate-y-1/2 translate-x-1/2'
        >
          <CameraIcon className='h-7 w-7 text-primary' />
        </span>

        {/* Input de archivo oculto */}
        <input
          ref={fileInputRef}
          type='file'
          accept='image/*'
          className='hidden'
          onChange={handleImageChange}
        />
      </div>
      <div className='my-3'></div>

      {fileInputRef.current?.files?.length > 0 && (
        <Card className='p-3'>
          <div className='flex space-x-5'>
            <Button
              variant='ghost'
              disabled={isLoading}
              onClick={handleCancelUpload} // Lógica para cancelar o resetear la imagen
            >
              Cancelar
            </Button>
            <Button disabled={isLoading} onClick={handleUploadToServer}>
              {isLoading ? "Subiendo..." : "Subir foto"}
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};
