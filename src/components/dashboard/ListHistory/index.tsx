import { useHistory } from '@/services/history/history.swr';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import HistoryItem from './HistoryItem';

export function ListHistory() {
  const { histories } = useHistory();
  return (
    <div>
      <div className="flex justify-between mt-3 mb-4">
        <h2 className="text-xl font-semibold">最近の変更検出</h2>
        <Link to="/history">
          <div className="flex gap-1 underline text-[#0077B2] font-semibold">
            <span>すべて表示</span>
            <span>
              <ArrowRight width={20} height={20} />
            </span>
          </div>
        </Link>
      </div>
      <div className="flex flex-col gap-3">
        {histories.map((item, index) => (
          <HistoryItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
}
