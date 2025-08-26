import { Card, CardContent, CardHeader } from '@/components/ui/card';
import ImageItem from './ImageItem';

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
          <ImageItem title="ベースライン" url="/image.png" />
          <ImageItem title="現在" url="/image.png" />
          <ImageItem title="差異" url="/image.png" />
        </div>
      </CardContent>
    </Card>
  );
}
