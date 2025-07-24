import { ChecklistsType } from './ChecklistsType';

export type ItensChecklistsType = {
  iccodigo?: string;
  ictitulo: string;
  icdescricao: string;
  iccheck: boolean;
  icchecklist?: string;
  createdAt?: string;
  updatedAt?: string;
  checklist?: ChecklistsType;
};
