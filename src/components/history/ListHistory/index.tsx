import PaginationCustom from '@/components/url-management/PaginationCustom';
import { History } from '@/services/history/history.interface';
import { useHistory } from '@/services/history/history.swr';
import { useState } from 'react';
import HistoryItem from './HistoryItem';

interface ListHistoryProps {
  listUrls: History[];
  selectHistory: (id: number) => void;
}
export function ListHistory({ listUrls, selectHistory }: ListHistoryProps) {
  const { histories } = useHistory();
  const [page, setPage] = useState<number>(1);
  const pagination = {
    pageSize: 10,
    totalPage: 20
  };
  return (
    <div>
      <div className="flex flex-col gap-3">
        {listUrls.map((item, index) => (
          <HistoryItem key={index} item={item} selectUrl={selectHistory} />
        ))}
      </div>
      <div className="mt-3">
        <PaginationCustom
          currentPage={page}
          totalPage={pagination.totalPage}
          setPage={setPage}
        />
      </div>
    </div>
  );
}
