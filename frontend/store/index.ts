import { IRegistrationState } from "./register";
import { IAuthState } from "./auth";
import { IMatchState } from "./match";
import { ISupportState } from "./support";

export interface IState {
    register: IRegistrationState,
    auth: IAuthState,
    match: IMatchState,
    support: ISupportState,
}

// don't add something here
export const state = () => ({});
