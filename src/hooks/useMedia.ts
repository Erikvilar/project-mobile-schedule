import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useState } from 'react';

const useMedia = () => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | undefined>("");
  const openGallery = async (userId: string) => {
    try {
      setLoading(true);

      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
      });

      if (result.didCancel) {
        console.log('🖼️ Galeria cancelada');
        return null;
      }

      if (result.errorCode) {
        console.error('❌ Erro na galeria:', result.errorMessage);
        return null;
      }

      if (result.assets && result.assets.length > 0) {
        const photoUri = result.assets[0].uri;


        console.log('📸 Foto capturada:', photoUri);

       setImage(photoUri);
      }

      return null;
    } catch (error) {
      console.error('❌ Erro ao abrir galeria:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const openCamera = async (userId: string) => {
    try {
      setLoading(true);

      const result = await launchCamera({
        mediaType: 'photo',
        cameraType: 'front',
        saveToPhotos: false,
        quality: 0.8,
      });

      if (result.didCancel) {
        console.log('📸 Camera cancelada');
        return null;
      }

      if (result.errorCode) {
        console.error('❌ Erro na câmera:', result.errorMessage);
        return null;
      }

      if (result.assets && result.assets.length > 0) {
        const photoUri = result.assets[0].uri;

        console.log('📸 Foto capturada:', photoUri);

        setImage(photoUri);
      }

      return null;
    } catch (error) {
      console.error('❌ Erro ao tirar foto:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
    return {
      openCamera,
      openGallery,
      image,
      setImage
    }
}
export default useMedia;