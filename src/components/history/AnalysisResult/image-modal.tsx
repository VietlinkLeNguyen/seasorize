import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { ZoomIn, ZoomOut } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface ImageModalProps {
  isOpen: boolean;
  imageUrl: string;
  title: string;
}

export function ImageModal({ isOpen, imageUrl, title }: ImageModalProps) {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 }); // Offset from center in pixels
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({
    x: 0,
    y: 0,
    scrollX: 0,
    scrollY: 0
  });
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const containerRef = useRef<HTMLDivElement>(null);

  // Update container size on resize
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerSize({ width: rect.width, height: rect.height });
      }
    };

    setTimeout(updateSize, 100); // Small delay for modal to render fully
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [isOpen]);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setZoom(1);
      setPosition({ x: 0, y: 0 });
      setIsDragging(false);
    }
  }, [isOpen]);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev * 1.2, 5));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev / 1.2, 0.3));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX,
      y: e.clientY,
      scrollX: position.x,
      scrollY: position.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;

      const newX = dragStart.scrollX + deltaX;
      const newY = dragStart.scrollY + deltaY;

      // Calculate max scroll offsets (half of the overflow)
      const effectiveImageWidth = containerSize.width * zoom;
      const effectiveImageHeight = containerSize.height * zoom;

      const maxScrollX = Math.max(
        0,
        (effectiveImageWidth - containerSize.width) / 2
      );
      const maxScrollY = Math.max(
        0,
        (effectiveImageHeight - containerSize.height) / 2
      );

      setPosition({
        x: Math.max(-maxScrollX, Math.min(maxScrollX, newX)),
        y: Math.max(-maxScrollY, Math.min(maxScrollY, newY))
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      // Zoom with Ctrl/Cmd + wheel
      if (e.deltaY < 0) {
        handleZoomIn();
      } else {
        handleZoomOut();
      }
    } else {
      // Scroll with wheel (up/down and left/right)
      let scrollAmountX = e.deltaX;
      let scrollAmountY = e.deltaY;

      // Adjust scroll amount based on deltaMode for consistent feel
      if (e.deltaMode === WheelEvent.DOM_DELTA_LINE) {
        scrollAmountX *= 20; // Common line height
        scrollAmountY *= 20;
      } else if (e.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
        scrollAmountX *= containerSize.width; // Scroll by page width
        scrollAmountY *= containerSize.height; // Scroll by page height
      }
      // For DOM_DELTA_PIXEL (often from touchpads), use raw delta values

      const newX = position.x - scrollAmountX;
      const newY = position.y - scrollAmountY;

      const effectiveImageWidth = containerSize.width * zoom;
      const effectiveImageHeight = containerSize.height * zoom;

      const maxScrollX = Math.max(
        0,
        (effectiveImageWidth - containerSize.width) / 2
      );
      const maxScrollY = Math.max(
        0,
        (effectiveImageHeight - containerSize.height) / 2
      );

      setPosition((prev) => ({
        x: Math.max(-maxScrollX, Math.min(maxScrollX, newX)),
        y: Math.max(-maxScrollY, Math.min(maxScrollY, newY))
      }));
    }
  };

  // Cursor will always be grab, but visual movement only happens if image is larger than container
  const cursorStyle = isDragging ? 'grabbing' : 'grab';

  return (
    <DialogContent className="md:max-w-[960px] w-[960px]">
      <div>
        <DialogHeader>
          <DialogTitle>画像比較スライダ</DialogTitle>
        </DialogHeader>
        <hr className="my-5" />
        <div className="grid gap-3">
          <div>{title}</div>
          <div
            ref={containerRef}
            className="flex-1 overflow-hidden bg-gray-100 relative flex items-center justify-center max-h-[613px]"
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <img
              src={imageUrl || '/placeholder.svg'}
              alt={title}
              className="w-full h-auto"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                cursor: cursorStyle
              }}
              draggable={false}
            />
            <div className="absolute top-4 right-4 bg-[#30394366] text-white px-3 py-2 rounded text-xs pointer-events-none">
              ドラッグしてスクロール
            </div>
          </div>
        </div>
        <div className="text-center mt-[10px] ">
          <div className="flex items-center justify-center gap-3">
            <Button
              size="icon"
              className="bg-[#858D9D1A] text-[#303943]"
              onClick={handleZoomOut}
            >
              <ZoomOut />
            </Button>
            <Button variant="outline">{Math.round(zoom * 100)}%</Button>
            <Button
              size="icon"
              className="bg-[#858D9D1A] text-[#303943]"
              onClick={handleZoomIn}
            >
              <ZoomIn />
            </Button>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}
