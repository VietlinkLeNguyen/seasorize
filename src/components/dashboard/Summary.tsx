import DetectedIcon from '@/assets/icons/detected.svg';
import MonitoredUrlsIcon from '@/assets/icons/monitor_url.svg';
import TotalAnalyzeIcon from '@/assets/icons/total_analyze.svg';
import { Card, CardContent, CardHeader } from '../ui/card';

export default function Summary() {
  const data = [
    {
      amount: 144,
      title: '監視中のURL',
      icon: <MonitoredUrlsIcon />
    },
    {
      amount: 72,
      title: '変更検知',
      icon: <DetectedIcon />
    },
    {
      amount: 62,
      title: '総分析回数',
      icon: <TotalAnalyzeIcon />
    }
  ]; // Example data array

  return (
    <div className="grid grid-cols-3 gap-6">
      {data.map((item, index) => (
        <Card
          key={index}
          className="gap-4 py-4 border-0 shadow-xs
"
        >
          <CardHeader className="flex flex-row items-center space-y-0 gap-2 text-secondary">
            <span>{item.icon}</span>
            <span>{item.title}</span>
          </CardHeader>
          <CardContent>
            <div className="text-[28px] font-semibold w-full">
              {item.amount}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
