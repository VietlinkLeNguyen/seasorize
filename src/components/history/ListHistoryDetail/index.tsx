import PaginationCustom from '@/components/url-management/PaginationCustom';
import { listCurrentHistory as data } from '@/data/data';
import { History } from '@/services/history/history.interface';
import { useHistory } from '@/services/history/history.swr';
import { useEffect, useState } from 'react';
import DetailItem from './DetailItem';

interface ListHistoryProps {
  id: number | null;
  selectHistory: (id: number) => void;
}
export function ListHistoryDetail({ id, selectHistory }: ListHistoryProps) {
  const { histories } = useHistory();
  const [listUrls, setListUrls] = useState<History[]>(histories);
  const [page, setPage] = useState<number>(1);
  const pagination = {
    pageSize: 10,
    totalPage: 20
  };

  useEffect(() => {
    // mock data
    setListUrls(data);
  }, [histories]);

  return (
    <div>
      <div className="flex flex-col gap-3">
        {listUrls.length > 0 &&
          listUrls.map((item, index) => (
            <DetailItem key={index} item={item} selectUrl={selectHistory} />
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
