import { useEffect, useRef, useState } from 'react';

interface RowHighlight {
  id: number;
  left: number;
  top: number;
  height: number;
  width: number; // changed from string | number
  opacity: number;
}

type UseRowAnimationReturn = {
  rowHighlights: RowHighlight[];
  rowRefs: React.MutableRefObject<{ [key: number]: HTMLElement | null }>;
  tableRef: React.RefObject<HTMLDivElement>;
};

const useRowAnimation = (
  processing: boolean,
  onComplete: () => void,
  totalRows: number
): UseRowAnimationReturn => {
  const rowRefs = useRef<{ [key: number]: HTMLElement | null }>({});
  const tableRef = useRef<HTMLDivElement>(null);
  const [rowHighlights, setRowHighlights] = useState<RowHighlight[]>([]);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!processing || hasAnimated.current || !tableRef.current) return;

    hasAnimated.current = true;

    const animationDuration = 450;
    const startDelay = 50;

    const animateRow = (rowIndex: number) => {
      if (rowIndex >= totalRows) return;
      const row = rowRefs.current[rowIndex];
      if (!row) return;

      const rowRect = row.getBoundingClientRect();
      const tableRect = tableRef.current.getBoundingClientRect();

      // Calculate total width of all child cells
      const totalCellWidth = Array.from(row.children).reduce((sum, cell) => {
        const cellRect = (cell as HTMLElement).getBoundingClientRect();
        return sum + cellRect.width;
      }, 0);

      setRowHighlights((prev) => [
        ...prev,
        {
          id: rowIndex,
          left: rowRect.left - tableRect.left,
          top: rowRect.top - tableRect.top,
          height: rowRect.height,
          width: 0,
          opacity: 1,
        },
      ]);

      setTimeout(() => {
        setRowHighlights((prev) => {
          const updated = [...prev];
          const targetIndex = updated.findIndex((h) => h.id === rowIndex);
          if (targetIndex > -1) {
            updated[targetIndex].width = totalCellWidth;
          }
          return updated;
        });
      }, startDelay);

      const nextRowTimeout = setTimeout(() => {
        if (rowIndex === totalRows - 1) {
          setTimeout(() => {
            onComplete();
          }, animationDuration);
          return;
        }
        animateRow(rowIndex + 1);
      }, animationDuration + startDelay);

      return () => clearTimeout(nextRowTimeout);
    };

    animateRow(0);
  }, [processing, onComplete, totalRows]);

  return { rowHighlights, rowRefs, tableRef };
};

export default useRowAnimation;
