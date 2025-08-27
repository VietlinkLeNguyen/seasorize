import type React from 'react';

import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

interface ScrubberModalProps {
  isOpen: boolean;
  baselineImage: string;
  currentImage: string;
}

export function ScrubberModal({
  isOpen,
  baselineImage,
  currentImage
}: ScrubberModalProps) {
  const [scrubberDisplayPercentage, setScrubberDisplayPercentage] =
    useState(50); // Percentage relative to image content
  const [scrubberVisualPosition, setScrubberVisualPosition] = useState(50); // Percentage relative to container for visual handle
  const [zoom, setZoom] = useState(1);
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 }); // Offset from center in pixels
  const [isDraggingScrubber, setIsDraggingScrubber] = useState(false);
  const [isDraggingImage, setIsDraggingImage] = useState(false);
  const [dragStart, setDragStart] = useState({
    x: 0,
    y: 0,
    scrollX: 0,
    scrollY: 0
  });
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [clipPath, setClipPath] = useState('none');

  const containerRef = useRef<HTMLDivElement>(null);
  const baselineImgRef = useRef<HTMLImageElement>(null);
  const currentImgRef = useRef<HTMLImageElement>(null);

  // Update container size on resize
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerSize({ width: rect.width, height: rect.height });
      }
    };

    if (isOpen) {
      // Small delay to ensure modal is fully rendered
      setTimeout(updateSize, 100);
      window.addEventListener('resize', updateSize);
      return () => window.removeEventListener('resize', updateSize);
    }
  }, [isOpen]);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setZoom(1);
      setScrollPosition({ x: 0, y: 0 });
      setScrubberDisplayPercentage(50);
      setScrubberVisualPosition(50);
      setIsDraggingScrubber(false);
      setIsDraggingImage(false);
      setClipPath(`inset(0 ${100 - 50}% 0 0)`); // Reset clipPath to default 50%
    }
  }, [isOpen]);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev * 1.2, 5));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev / 1.2, 0.3));
  };

  const handleReset = () => {
    setZoom(1);
    setScrollPosition({ x: 0, y: 0 });
    setScrubberDisplayPercentage(50);
    setScrubberVisualPosition(50);
    setClipPath(`inset(0 ${100 - 50}% 0 0)`); // Reset clipPath on reset
  };

  // Helper function to calculate scrubber percentages and positions
  const calculateScrubberMetrics = useCallback(
    (clientX: number) => {
      if (!containerRef.current || !baselineImgRef.current) {
        return {
          newScrubberImagePercentage: 50,
          visualScrubberLeftPercentage: 50
        };
      }

      const rect = containerRef.current.getBoundingClientRect();
      const scrubberPixelInContainer = clientX - rect.left; // Pixel position of scrubber relative to container's left edge

      // Get the actual rendered width of the image at 1x zoom (after object-fit: contain)
      const imageRenderedWidthAt1x = baselineImgRef.current.offsetWidth;

      // Calculate the effective width of the image after zoom
      const imageScaledWidth = imageRenderedWidthAt1x * zoom;

      // Calculate the left offset of the scaled image relative to the container's left edge
      // The image is centered in the container, so we account for that plus the pan (scrollPosition.x)
      const imageLeftOffset =
        (containerSize.width - imageScaledWidth) / 2 + scrollPosition.x;

      // Calculate the pixel position of the scrubber line *on the scaled image*
      const scrubberPixelOnScaledImage =
        scrubberPixelInContainer - imageLeftOffset;

      // Calculate the percentage of the scaled image that is to the left of the scrubber
      let newScrubberImagePercentage =
        (scrubberPixelOnScaledImage / imageScaledWidth) * 100;

      // Clamp the percentage between 0 and 100
      newScrubberImagePercentage = Math.max(
        0,
        Math.min(100, newScrubberImagePercentage)
      );

      // The visual position of the scrubber handle is always tied to the mouse position
      const visualScrubberLeftPercentage =
        (scrubberPixelInContainer / containerSize.width) * 100;

      return { newScrubberImagePercentage, visualScrubberLeftPercentage };
    },
    [zoom, scrollPosition, containerSize]
  );

  // Handle scrubber dragging
  const handleScrubberMouseDown = useCallback(
    (e: React.MouseEvent) => {
      // e.preventDefault();
      e.stopPropagation(); // Prevent image dragging from starting
      setIsDraggingScrubber(true);

      const updateScrubber = (clientX: number) => {
        const { newScrubberImagePercentage, visualScrubberLeftPercentage } =
          calculateScrubberMetrics(clientX);

        setScrubberDisplayPercentage(newScrubberImagePercentage);
        setClipPath(`inset(0 ${100 - newScrubberImagePercentage}% 0 0)`);
        if (
          newScrubberImagePercentage <= 0 ||
          newScrubberImagePercentage >= 100
        )
          return;
        setScrubberVisualPosition(visualScrubberLeftPercentage);
      };
      updateScrubber(e.clientX);

      const handleMouseMove = (e: MouseEvent) => {
        updateScrubber(e.clientX);
      };

      const handleMouseUp = () => {
        setIsDraggingScrubber(false);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [calculateScrubberMetrics]
  );

  // Handle clicking on slider track
  const handleSliderTrackClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        const { newScrubberImagePercentage, visualScrubberLeftPercentage } =
          calculateScrubberMetrics(e.clientX);
        setScrubberDisplayPercentage(newScrubberImagePercentage);
        setClipPath(`inset(0 ${100 - newScrubberImagePercentage}% 0 0)`);
        setScrubberVisualPosition(visualScrubberLeftPercentage);
      }
    },
    [calculateScrubberMetrics]
  );

  // Handle image scrolling/panning
  const handleImageMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (isDraggingScrubber) return; // Prevent image dragging if scrubber is active

      e.preventDefault();
      setIsDraggingImage(true);
      setDragStart({
        x: e.clientX,
        y: e.clientY,
        scrollX: scrollPosition.x,
        scrollY: scrollPosition.y
      });
    },
    [isDraggingScrubber, scrollPosition]
  );

  const handleImageMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDraggingImage || isDraggingScrubber) return;

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

      setScrollPosition({
        x: Math.max(-maxScrollX, Math.min(maxScrollX, newX)),
        y: Math.max(-maxScrollY, Math.min(maxScrollY, newY))
      });
    },
    [isDraggingImage, isDraggingScrubber, dragStart, zoom, containerSize]
  );

  const handleImageMouseUp = useCallback(() => {
    setIsDraggingImage(false);
  }, []);

  // Handle wheel zoom and scroll
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      // e.preventDefault();

      if (e.ctrlKey || e.metaKey) {
        // Zoom with Ctrl/Cmd + wheel
        if (e.deltaY < 0) {
          setZoom((prev) => Math.min(prev * 1.2, 5));
        } else {
          setZoom((prev) => Math.max(prev / 1.2, 0.3));
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

        const newX = scrollPosition.x - scrollAmountX;
        const newY = scrollPosition.y - scrollAmountY;

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

        setScrollPosition((prev) => ({
          x: Math.max(-maxScrollX, Math.min(maxScrollX, newX)),
          y: Math.max(-maxScrollY, Math.min(maxScrollY, newY))
        }));
      }
    },
    [zoom, containerSize, scrollPosition]
  );

  const cursorStyle = isDraggingImage ? 'grabbing' : 'grab';

  const imageStyle = {
    transform: `translate(${scrollPosition.x}px, ${scrollPosition.y}px) scale(${zoom})`,
    // width: 'auto',
    height: '100%',
    objectFit: 'cover' as const
    // maxWidth: '100%',
    // maxHeight: '100%'
  };

  return (
    <DialogContent className="md:max-w-[960px] w-[960px]">
      <div>
        <DialogHeader>
          <DialogTitle>画像比較スライダ</DialogTitle>
        </DialogHeader>
        <hr className="my-5" />
        <div className="flex justify-between ">
          <div className="flex gap-[10px] items-center">
            <span className="text-md font-semibold">ベースライン: </span>
            <span className="outline rounded-md py-2 px-3">
              {Math.round(scrubberDisplayPercentage)}%
            </span>
          </div>
          <div className="flex gap-[10px] items-center">
            <span className="text-md font-semibold">現在: </span>
            <span className="outline rounded-md py-2 px-3">
              {Math.round(100 - scrubberDisplayPercentage)}%
            </span>
          </div>
        </div>
        <div className="flex-1 flex flex-col overflow-hidden mt-2">
          {/* Image Comparison Container */}
          <div
            className="flex-1 bg-gray-100 relative"
            ref={containerRef}
            onWheel={handleWheel}
            onMouseDown={handleImageMouseDown}
            onMouseMove={handleImageMouseMove}
            onMouseUp={handleImageMouseUp}
            onMouseLeave={handleImageMouseUp}
          >
            <div className="">
              <img
                ref={baselineImgRef}
                src={baselineImage}
                alt="Baseline"
                className="select-none pointer-events-none object-left"
                style={imageStyle}
                draggable={false}
              />
            </div>
            <div
              className="absolute top-0 right-0 h-full"
              style={{ width: `${100 - scrubberVisualPosition}%` }}
            >
              <img
                ref={currentImgRef}
                src={currentImage}
                alt="Current"
                className="absolute object-right top-0 right-0 select-none pointer-events-none"
                style={imageStyle}
                draggable={false}
              />
            </div>
            <div
              className="absolute top-0 bottom-0 w-[3px] bg-[#0077B2] shadow-xl z-20 "
              style={{ left: `${scrubberVisualPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 ">
                <Button
                  onMouseDown={handleScrubberMouseDown}
                  variant="outline"
                  className="p-3 w-20 h-12 cursor-grab "
                >
                  <ChevronLeft className="size-6" />
                  <ChevronRight className="size-6" />
                </Button>
              </div>
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
