import React from 'react';

const SelectionTable = ({ tableHead, tableCells, classType }) => {
  // console.log('tableHead:', tableHead, 'tableCells:', tableCells);
  const renderTableRows = () => {
    return tableCells.map((cell, idx) => (
      <tr key={idx} className={`table-row${idx}`}>
        <td className={'tb-rowcell-1'}>{cell[0]}</td>
        <td className={'tb-rowcell-2'}>{cell[1]}</td>
        <td className={'tb-rowcell-3'}>{cell[2]}</td>
      </tr>
    ));
  };

  return (
    <table>
      <thead>
        {tableHead && tableHead.length ? (
          <tr>
            <th scope='col'>{tableHead[0]}</th>
            <th scope='col'>{tableHead[1]}</th>
            <th scope='col'>{tableHead[2]}</th>
          </tr>
        ) : null}
      </thead>
      <tbody>
        {tableCells && tableCells.length ? renderTableRows() : null}
      </tbody>
    </table>
  );
};

export default SelectionTable;
