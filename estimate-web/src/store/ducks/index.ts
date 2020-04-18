import { Session } from "./session";

export interface DefaultRootStore {
  session: Session | null;
}

export { default as session } from "./session";
