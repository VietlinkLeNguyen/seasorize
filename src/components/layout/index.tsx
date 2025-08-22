import { AppSidebar } from '@/components/layout/sidebar';
import { Outlet } from 'react-router';

export const DefaultLayout = () => {
  return (
    <div className="min-h-screen">
      <div className="flex">
        <div>
          <AppSidebar />
        </div>
        <div className="w-full overflow-scroll px-2">
          <div className="w-3/4 mx-auto min-w-[744px] py-6">
            {/* Greeting */}
            <div className="text-center mb-3">
              <h1 className="text-[28px] mb-2 ">UIモニタリングツール</h1>
              <p className="font-semibold text-secondary text-sm">
                効率的な監視のためにウェブサイトの変更を自動的に検出し、分析します
              </p>
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
