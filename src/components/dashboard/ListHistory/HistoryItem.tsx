import { Badge } from '@/components/ui/badge';
import { Card } from '../../ui/card';

import { Button } from '@/components/ui/button';
import { History } from '@/services/history/history.interface';
import { ArrowRight } from 'lucide-react';
export default function HistoryItem({ item }: { item: History }) {
  return (
    <Card className="rounded-lg border border-[#F0F1F3] py-4 px-5 card-shadow">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h4 className="font-bold text-base">
            {new Date().toLocaleString('ja-JP', {
              dateStyle: 'long',
              timeStyle: 'short'
            })}
          </h4>
          <Button
            className="bg-[#0077B20D] hover:bg-[#0077B20D] hover:cursor-pointer text-primary w-8 h-8"
            size="icon"
          >
            <ArrowRight />
          </Button>
        </div>
        <hr className="border-[#F0F1F3]" />
        <div className="flex justify-between">
          <span>https://example.com/</span>
          <Badge className="bg-[#FED7D7] text-foreground px-[10px] py-1 rounded-full text-xs font-semibold border-0">
            変更が検出されました
          </Badge>
        </div>
      </div>
    </Card>
  );
}
