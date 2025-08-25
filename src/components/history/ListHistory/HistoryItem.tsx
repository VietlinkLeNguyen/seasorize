import { Badge } from '@/components/ui/badge';
import { Card } from '../../ui/card';

import { Button } from '@/components/ui/button';
import { History } from '@/services/history/history.interface';
import { ArrowRight } from 'lucide-react';
interface HistoryItemProps {
  item: History;
  selectUrl: (id: number) => void;
}
export default function HistoryItem({ item, selectUrl }: HistoryItemProps) {
  return (
    <Card className="rounded-lg border border-[#F0F1F3] py-4 px-5 card-shadow">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h4 className="font-bold text-base">{item.site_name}</h4>
          <Button
            className="bg-[#0077B20D] hover:bg-[#0077B20D] hover:cursor-pointer text-primary w-8 h-8"
            size="icon"
            onClick={() => selectUrl(item.id)}
          >
            <ArrowRight />
          </Button>
        </div>
        <hr className="border-[#F0F1F3]" />
        <div className="flex justify-between flex-3 gap-4">
          <span>https://example.com/</span>
          <div className="text-center">
            {item.ai_result.analysis.length} 件の分析が完了しました
          </div>
          <div>
            {/* Format to YYYY/MM/DD HH:mm: get first 16 characters, replace T by ' ' */}
            最新: {new Date().toISOString().slice(0, 16).replace('T', ' ')}
          </div>
          {item.ai_result.overall_status == 'FAIL' ? (
            <Badge className="bg-[#FED7D7] text-foreground px-[10px] py-1 rounded-full text-xs font-semibold border-0">
              変更が検出されました
            </Badge>
          ) : (
            <Badge className="bg-[#0C8F00] text-white px-[10px] py-1 rounded-full text-xs font-semibold border-0">
              変更なし
            </Badge>
          )}
        </div>
      </div>
    </Card>
  );
}
