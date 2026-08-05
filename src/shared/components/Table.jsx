import React from 'react';

export const Table = ({
  headers = [],
  rows = [],
  onRowClick,
  className = '',
  emptyMessage = 'No records found',
}) => {
  return (
    <div className={`w-full overflow-x-auto rounded-xl border border-border/80 ${className}`}>
      <table className="w-full text-left border-collapse text-xs">
        <thead className="bg-secondary text-text-primary uppercase tracking-wider font-poppins font-semibold">
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="px-5 py-4 border-b border-border/85 font-bold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border/50 text-text-secondary bg-card/45">
          {rows.length === 0 ? (
            <tr>
              <td colSpan={headers.length} className="px-6 py-12 text-center text-muted font-medium">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row, rowIndex) => (
              <tr 
                key={rowIndex}
                onClick={() => onRowClick && onRowClick(row)}
                className={`hover:bg-primary/35 transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
              >
                {headers.map((_, colIndex) => (
                  <td key={colIndex} className="px-5 py-3.5 border-b border-border/20 font-medium">
                    {row[colIndex]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
