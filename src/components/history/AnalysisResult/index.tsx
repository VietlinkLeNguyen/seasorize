import { Card, CardContent, CardHeader } from '@/components/ui/card';
import ImageItem from './ImageItem';
import ScrubberItem from './ScrubberItem';

export default function AnalysisResult() {
  return (
    <Card>
      <CardHeader className="gap-1">
        <div className="text-xl">
          {new Date().toLocaleString('ja-JP', {
            dateStyle: 'long',
            timeStyle: 'short'
          })}
        </div>
        <div className="text-[16px] font-normal">
          {new Date().toLocaleString('ja-JP', {
            dateStyle: 'long',
            timeStyle: 'short'
          })}
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <ImageItem
            title="ベースライン"
            url="/image.png"
            filename="baseline-image.png"
          />
          <ImageItem
            title="現在"
            url="/current.png"
            filename="current-image.png"
          />
          <ScrubberItem
            title="差異"
            url="/image.png"
            currentImage="/current.png"
            baseImage="/image.png"
          />
        </div>
      </CardContent>
    </Card>
  );
}
