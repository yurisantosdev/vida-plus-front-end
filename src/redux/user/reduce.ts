import { UsuarioType } from "@/types/UsuariosType";
import ActionsUserType from "./actionTypes";

const initialState: UsuarioType = {
  usnome: "",
  usemail: "",
  token: "",
  uscodigo: "",
  usfoto: "",
};

const userReducer = (
  state: UsuarioType = initialState,
  action: any
): UsuarioType => {
  switch (action.type) {
    case ActionsUserType.LOGIN:
      return {
        ...state,
        token: action.token,
        uscodigo: action.uscodigo,
        usemail: action.usemail,
        usnome: action.usnome,
        usfoto: action.usfoto,
      };

    case ActionsUserType.LOGOUT:
      return initialState;

    default:
      return state;
  }
};

export default userReducer;
