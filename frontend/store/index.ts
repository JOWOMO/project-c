import { IRegistrationState } from "./register";
import { IAuthState } from "./auth";

export interface IState {
    register: IRegistrationState,
    auth: IAuthState,
}

// don't add something here
export const state = () => ({});