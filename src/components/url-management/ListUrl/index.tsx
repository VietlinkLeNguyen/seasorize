import { useHistory } from '@/services/history/history.swr';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import UrlItem from './UrlItem';

export function ListUrl() {
  const { histories } = useHistory();
  return (
    <div>
      <div className="flex justify-between mt-3 mb-4">
        <h2 className="text-xl font-semibold">Å‹ß‚Ì•ÏXŒŸo</h2>
        <Link to="/history">
          <div className="flex gap-1 underline text-[#0077B2] font-semibold">
            <span>‚·‚×‚Ä•\¦</span>
            <span>
              <ArrowRight width={20} height={20} />
            </span>
          </div>
        </Link>
      </div>
      <div className="flex flex-col gap-3">
        {histories.map((item, index) => (
          <UrlItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
}
