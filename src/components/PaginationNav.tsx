import React from 'react';
import ChevronRight from './ui/icons/ChevronRightIcon';
import ChevronLeft from './ui/icons/ChevronLeftIcon';
import { Button } from './ui/Button';

type PaginationNavProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const PaginationNav: React.FC<PaginationNavProps> = ({ totalPages, currentPage, onPageChange }) => {
  const generatePageNumbers = (): (number | string)[] => {
    let pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 5) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 4) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pages = generatePageNumbers();

  return (
    <div className="flex items-center justify-center space-x-4 py-5">
      <Button variant='pagination' size='sm' onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} > <ChevronLeft /> </Button>
      {pages.map((page, index) =>
        page === '...' ? (
          <span key={index} className=" h-12 w-12 rounded-md bg-black text-white transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2">
            {page}
          </span>
        ) : (
          <Button variant='pagination' size='sm' key={index} onClick={() => onPageChange(typeof page === 'number' ? page : currentPage)}> {page} </Button>
        )
      )}
      <Button variant='pagination' size='sm' onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} > <ChevronRight /> </Button>
    </div>
  );
};

export default PaginationNav;