import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Download, Maximize2 } from 'lucide-react';
import { useState } from 'react';
import { ImageModal } from './image-modal';
interface ImageItemProps {
  title: string;
  url: string;
}
export interface ImageModalState {
  isOpen: boolean;
  image: string;
  title: string;
  downloadFilename: string;
}
const initImageModel = {
  isOpen: false,
  image: '',
  title: '',
  downloadFilename: ''
};
export default function ImageItem(image: ImageItemProps) {
  const [imageModal, setImageModal] = useState<ImageModalState>(initImageModel);

  const openImageModal = (
    image: string | null,
    title: string,
    downloadFilename: string
  ) => {
    if (!image) return;
    setImageModal({
      isOpen: true,
      image,
      title,
      downloadFilename
    });
  };

  const downloadImage = (image: string | null, filename: string) => {
    if (!image) return;
    const link = document.createElement('a');
    link.href = image;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const closeImageModal = () => {
    setImageModal(initImageModel);
  };
  return (
    <div>
      <Dialog>
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold text-[16px] leading-[22px]">
            {image.title}
          </h4>
          <div className="flex gap-3">
            <>
              <Button
                onClick={() => downloadImage(image.url, 'baseline-image.png')}
                size="sm"
                className="bg-[#858D9D1A] text-[#303943] w-8"
              >
                <Download />
              </Button>
              <DialogTrigger>
                <Button
                  onClick={() =>
                    openImageModal(
                      image.url,
                      't.step3.baseline',
                      'baseline-image.png'
                    )
                  }
                  size="sm"
                  className="bg-[#858D9D1A] text-[#303943] w-8"
                >
                  <Maximize2 />
                </Button>
              </DialogTrigger>
            </>
          </div>
        </div>
        <DialogTrigger
          className="border rounded-lg p-2 cursor-pointer hover:border-gray-400 transition-colors w-full"
          onClick={() =>
            openImageModal(image.url, 't.step3.baseline', 'baseline-image.png')
          }
        >
          <img
            src={image.url || '/placeholder.svg'}
            alt="Baseline"
            className="w-full h-auto rounded"
          />
        </DialogTrigger>

        <ImageModal
          isOpen={imageModal.isOpen}
          imageUrl={imageModal.image}
          title={image.title}
        />
      </Dialog>
    </div>
  );
}
