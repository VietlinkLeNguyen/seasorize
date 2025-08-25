import {
  Pagination,
  PaginationContent,
  PaginationEllipsis
} from '@/components/ui/pagination';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';

interface PaginationProps {
  currentPage: number;
  totalPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}
export default function PaginationCustom({
  currentPage,
  totalPage,
  setPage
}: PaginationProps) {
  const sibling = 1;
  return (
    <Pagination>
      <PaginationContent className="gap-1">
        <Button
          size="icon"
          className="mr-1 bg-primary/5 text-primary"
          disabled={currentPage == 1}
          onClick={() => setPage(currentPage - 1)}
        >
          <ChevronLeft className="size-5" />
        </Button>
        {currentPage > sibling + 2 ? (
          <>
            <Button variant="ghost" onClick={() => setPage(1)}>
              1
            </Button>
            <PaginationEllipsis className="size-6" />
            {currentPage < totalPage - sibling - 1 && (
              <>
                {Array.from({ length: sibling }, (_, i) => {
                  return (
                    <Button
                      variant="ghost"
                      key={i}
                      onClick={() => setPage(currentPage - sibling + i)}
                    >
                      {currentPage - sibling + i}
                    </Button>
                  );
                })}
                <Button>{currentPage}</Button>
                {Array.from({ length: sibling }, (_, i) => {
                  return (
                    <Button
                      variant="ghost"
                      key={i}
                      onClick={() => setPage(currentPage + i + 1)}
                    >
                      {currentPage + i + 1}
                    </Button>
                  );
                })}
              </>
            )}
          </>
        ) : (
          <>
            {Array.from({ length: sibling * 2 + 1 }, (_, i) => {
              return currentPage == i + 1 ? (
                <Button key={i}>{i + 1}</Button>
              ) : (
                <Button variant="ghost" key={i} onClick={() => setPage(i + 1)}>
                  {i + 1}
                </Button>
              );
            })}
          </>
        )}
        {currentPage >= totalPage - sibling - 1 ? (
          <>
            {Array.from({ length: sibling * 2 + 1 }, (_, i) => {
              return currentPage == totalPage - sibling * 2 + i ? (
                <Button key={i}>{totalPage - sibling * 2 + i}</Button>
              ) : (
                <Button
                  variant="ghost"
                  key={i}
                  onClick={() => setPage(totalPage - sibling * 2 + i)}
                >
                  {totalPage - sibling * 2 + i}
                </Button>
              );
            })}
          </>
        ) : (
          <>
            <PaginationEllipsis className="size-6" />
            <Button variant="ghost" onClick={() => setPage(totalPage)}>
              {totalPage}
            </Button>
          </>
        )}
        <Button
          size="icon"
          className=" ml-1 bg-primary/5 text-primary"
          disabled={currentPage >= totalPage}
          onClick={() => setPage(currentPage + 1)}
        >
          <ChevronRight className="size-5" />
        </Button>
      </PaginationContent>
    </Pagination>
  );
}
