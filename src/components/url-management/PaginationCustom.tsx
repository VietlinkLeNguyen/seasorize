import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';

interface PaginationProps {
  page: number;
  totalPage: number;
}
export default function PaginationCustom({ page, totalPage }: PaginationProps) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationPrevious>Previous</PaginationPrevious>
        <PaginationItem>1</PaginationItem>
        <PaginationEllipsis />
        <PaginationItem>10</PaginationItem>
        <PaginationNext>Next</PaginationNext>
      </PaginationContent>
    </Pagination>
  );
}
