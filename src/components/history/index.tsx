import { listCurrentHistory as data } from '@/data/data';
import { History } from '@/services/history/history.interface';
import { useEffect, useState } from 'react';
import CustomBreadcrumb from '../CustomBreadcrumb';
import { Tabs, TabsContent } from '../ui/tabs';
import { ListHistory } from './ListHistory';
import { ListHistoryDetail } from './ListHistoryDetail';

export default function HistoryPage() {
  const [listUrls, setListUrl] = useState<History[]>([]);
  const [selectedUrl, setSelectedUrl] = useState<number | null>(null);
  const [tab, setTab] = useState<'list' | 'detail'>('list');

  useEffect(() => {
    setListUrl(data);
  }, []);

  const selectHistory = (id: number) => {
    setTab('detail');
    setSelectedUrl(id);
  };

  return (
    <div className="py-2">
      <div className="flex justify-between mb-3">
        <div>
          <h1 className="text-xl font-semibold">URL管理</h1>
          <CustomBreadcrumb />
        </div>
      </div>
      <Tabs value={tab}>
        <TabsContent value="list">
          <ListHistory listUrls={listUrls} selectHistory={selectHistory} />
        </TabsContent>
        <TabsContent value="detail">
          <ListHistoryDetail id={selectedUrl} selectHistory={selectHistory} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
