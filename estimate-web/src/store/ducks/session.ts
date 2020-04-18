// types
export enum SessionActionType {
  CLEAR = "session/CLEAR",
  SET = "session/SET",
}

export interface User {
  id: string;
  name?: string;
  email: string;
  birthDay?: Date;
}

export interface Session {
  id: string;
  user: User;
}

export interface SessionAction {
  type?: SessionActionType | null;
  session?: Session;
}

const DEFAULT_STATE: null = null;

// reducer
const sessionReducer = (
  state = DEFAULT_STATE,
  action: SessionAction = {}
) => {
  switch (action.type) {
    case SessionActionType.SET:
      return action.session;
    case SessionActionType.CLEAR:
      return null;
  }
  return state;
};

export default sessionReducer;

// action creators
export const setSession = (session: Session) => ({
  session,
  type: SessionActionType.SET,
});

export const clearSession = () => ({
  type: SessionActionType.CLEAR,
});
