import { ItensChecklistsType } from "./ItensChecklistsType";
import { UsuarioType } from "./UsuariosType";

export type ChecklistsType = {
  ckcodigo?: string;
  cktitulo: string;
  ckusuario: string;
  ckfinalizado?: boolean;
  createdAt?: string;
  updatedAt?: string;
  usuario?: UsuarioType;
  itensChecklists?: ItensChecklistsType[];
};
