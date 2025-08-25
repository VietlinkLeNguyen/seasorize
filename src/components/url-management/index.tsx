import { IURLManagement } from '@/services/url/url.interface';
import { PlusIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import CustomBreadcrumb from '../CustomBreadcrumb';
import { Button } from '../ui/button';
import { listUrls as data } from './data';
import UrlItem from './ListUrl/UrlItem';
import PaginationCustom from './PaginationCustom';

export default function URLManagement() {
  const [listUrls, setListUrl] = useState<IURLManagement[]>([]);
  const [page, setPage] = useState(1);
  const pagination = {
    pageSize: 10,
    totalPage: 20
  };
  useEffect(() => {
    setListUrl(data);
  }, []);
  return (
    <div className="py-2">
      <div className="flex justify-between mb-3">
        <div>
          <h1 className="text-xl font-semibold">URL管理</h1>
          <CustomBreadcrumb />
        </div>
        <Button className="bg-primary" size="lg">
          <PlusIcon width={20} height={20} /> 新しいURLを追加
        </Button>
      </div>
      <div className="flex flex-col gap-3">
        {listUrls.map((item, index) => (
          <UrlItem key={index} item={item} />
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
