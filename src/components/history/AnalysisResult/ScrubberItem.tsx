import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Download, Maximize2 } from 'lucide-react';
import { useState } from 'react';
import { ScrubberModal } from './scrubber-modal';
interface ImageItemProps {
  title: string;
  baseImage: string;
  currentImage: string;
  url: string;
}

export default function ScrubberItem(image: ImageItemProps) {
  const [imageModal, setImageModal] = useState<boolean>(true);

  const downloadImage = () => {
    if (!image) return;
    const link = document.createElement('a');
    link.href = image.url;
    link.download = 'difference-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <Dialog onOpenChange={() => setImageModal(!imageModal)}>
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold text-[16px] leading-[22px]">
            {image.title}
          </h4>
          <div className="flex gap-3">
            <>
              <Button
                onClick={() => downloadImage()}
                size="sm"
                className="bg-[#858D9D1A] text-[#303943] w-8"
              >
                <Download />
              </Button>
              <DialogTrigger asChild>
                <Button
                  onClick={() => setImageModal(true)}
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
          asChild
          className="border rounded-lg p-2 cursor-pointer hover:border-gray-400 transition-colors w-full"
        >
          <img
            src={image.url || '/placeholder.svg'}
            alt={image.title}
            className="w-full h-auto rounded"
          />
        </DialogTrigger>
        <ScrubberModal
          isOpen={imageModal}
          baselineImage={image.baseImage}
          currentImage={image.currentImage}
        />
      </Dialog>
    </div>
  );
}
