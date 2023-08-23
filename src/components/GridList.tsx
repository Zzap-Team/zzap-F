import { ReactNode } from 'react';
import { styled } from 'styled-components';

interface GridListProps {
  row?: number;
  column?: number;
  maxColumn?: number;
  items: Array<ReactNode>;
}

export default function GridList({ row, column, maxColumn, items, ...props }: GridListProps) {
  return (
    <GridContainer row={row} maxColumn={maxColumn} column={column} {...props}>
      {items}
    </GridContainer>
  );
}

const GridContainer = styled.div`
  /* container size */
  width: fit-content;

  /* grid options */
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(${({ column }) => column}, 1fr);
  grid-template-rows: repeat(${({ row }) => row}, 1fr);
`;

const GridItem = styled.li`
  /*  */
`;
