import { IRegistrationState } from "./register";
import { IAuthState } from "./auth";
import { IMatchState } from "./match";

export interface IState {
    register: IRegistrationState,
    auth: IAuthState,
    match: IMatchState,
}

// don't add something here
export const state = () => ({});
