import { Badge } from '@/components/ui/badge';
import { Card } from '../../ui/card';

import { Button } from '@/components/ui/button';
import { History } from '@/services/history/history.interface';
import { ArrowUpRight } from 'lucide-react';
interface HistoryItemProps {
  item: History;
  selectUrl: (id: number) => void;
}
export default function DetailItem({ item, selectUrl }: HistoryItemProps) {
  return (
    <Card className="rounded-lg border border-[#F0F1F3] p-5 card-shadow">
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-3 items-center">
          <div className="flex items-center">
            {item.ai_result?.overall_status == 'FAIL' ? (
              <Badge
                className="px-3 rounded-full text-xs font-bold mr-[10px] h-[20px]"
                variant="destructive"
              >
                {item.ai_result?.analysis?.length}
              </Badge>
            ) : null}
            <h4>{item.site_name}</h4>
          </div>
          <div className="text-center">
            {/* Format to YYYY/MM/DD HH:mm: get first 16 characters, replace T by ' ' */}
            {new Date().toISOString().slice(0, 16).replace('T', ' ')}
          </div>
          <div className="flex flex-row-reverse gap-4">
            <Button
              className="bg-[#0077B20D] hover:bg-[#0077B20D] hover:cursor-pointer text-primary h-6"
              size="icon"
              onClick={() => selectUrl(item.id)}
            >
              <ArrowUpRight className="size-5" />
            </Button>
            {item.ai_result?.overall_status == 'FAIL' ? (
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
      </div>
    </Card>
  );
}
