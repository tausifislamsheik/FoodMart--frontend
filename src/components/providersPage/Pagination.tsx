"use client";

import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex justify-center items-center space-x-2 mt-6">
      <Button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="cursor-pointer bg-orange-500 hover:bg-orange-600"
      >
        {"<<"}
      </Button>
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="cursor-pointer bg-orange-500 hover:bg-orange-600"
      >
        {"<"}
      </Button>
      <span className="px-3 py-1 rounded bg-gray-100">
        {currentPage} / {totalPages}
      </span>
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="cursor-pointer bg-orange-500 hover:bg-orange-600"
      >
        {">"}
      </Button>
      <Button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="cursor-pointer bg-orange-500 hover:bg-orange-600"
      >
        {">>"}
      </Button>
    </div>
  );
}