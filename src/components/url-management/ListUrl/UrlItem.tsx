import { Badge } from '@/components/ui/badge';
import { Card } from '../../ui/card';

import { Button } from '@/components/ui/button';
import { IURLManagement } from '@/services/url/url.interface';
import { EditIcon, PlayIcon, Trash2 } from 'lucide-react';
export default function UrlItem({ item }: { item: IURLManagement }) {
  const customFormatDateTime = (value: Date): string => {
    const date = value.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    return date;
  };
  return (
    <Card className="rounded-lg border border-[#F0F1F3] py-4 px-5 card-shadow">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <div className="flex gap-[10px]">
            <h4 className="font-bold text-base">{item.site_name}</h4>
            {item.status == 'active' ? (
              <Badge className="bg-primary px-3 py-1 rounded-full text-xs font-semibold border-0">
                モニタリング
              </Badge>
            ) : (
              <Badge className="bg-[#797979] px-3 py-1 rounded-full text-xs font-semibold border-0">
                停止
              </Badge>
            )}
          </div>
          <div className="flex gap-4">
            <Button className="bg-primary/5 text-primary font-semibold h-8 py-[6px]">
              <span>手動実行</span>
              <PlayIcon className="size-5" />
            </Button>
            <Button className="bg-primary/5 text-primary font-semibold h-8 py-[6px]">
              <span>編集</span>
              <EditIcon className="size-5" />
            </Button>
            <Button className="bg-destructive/5 text-destructive font-semibold h-8 p-[6px]">
              <Trash2 className="size-5" />
            </Button>
          </div>
        </div>
        <hr className="border-[#F0F1F3]" />
        <div className="flex justify-between flex-3 gap-4">
          <span>https://example.com/</span>
          <div className="text-center">間隔: {1}時間</div>
          <div className="text-center">ビューポート {'1920x1080'}</div>
          <div>
            最終チェック:{' '}
            {/* Format to YYYY/MM/DD HH:mm: get first 16 characters, replace T by ' ' */}
            {new Date().toISOString().slice(0, 16).replace('T', ' ')}
          </div>
        </div>
      </div>
    </Card>
  );
}
