export interface ButtonFormProps {
  loading: boolean;
}

export interface SelectCheckAllTableProps {
  numSelected: number;
  rowCount: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selected: string[];
  handleOpenModal: () => void;
}
