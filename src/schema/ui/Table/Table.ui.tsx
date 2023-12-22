import { ReactElement } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';

export type TableProps = {
  className?: string;
  table?: {
    hideHeader?: boolean;
    ariaLabel?: string;
  };
};

export const AbstractTable = (props?: TableProps): ReactElement => {
  return (
    <Table
      hideHeader={props?.table?.hideHeader}
      aria-label={props?.table?.ariaLabel ?? 'Standard dataset table'}
      color={'primary'}
    >
      <TableHeader>
        <TableColumn>NAME</TableColumn>
        <TableColumn>ROLE</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="1">
          <TableCell>Tony Reichert</TableCell>
          <TableCell>CEO</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
