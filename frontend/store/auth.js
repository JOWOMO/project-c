import Auth from '@aws-amplify/auth'

Auth.configure({
  identityPoolId: process.env.identityPoolId,
  region: process.env.region,
  userPoolId: process.env.userPoolId,
  userPoolWebClientId: process.env.userPoolWebClientId,

  storage: localStorage,
});

export const state = () => ({
  isAuthenticated: false,
  user: null,
})

export const mutations = {
  set(state, user) {
    console.info('setting user state to', user);

    state.isAuthenticated = !!user
    state.user = user
  }
}

export const getters = {
  login(state) {
    return state.isAuthenticated;
  }
}

export const actions = {
  async session({ commit }) {
    return await Auth.currentSession()
  },

  async load({ commit, rootState }) {
    if (rootState.auth.user) {
      return;
    }

    try {
      const user = await Auth.currentAuthenticatedUser();
      commit('set', user);

      return user;
    } catch (e) {
      commit('set', null)
    }
  },

  // we preserve the login information to be able to
  // continue the registration without additional details
  async register({ commit }, { email, password, firstName, lastName }) {
    const user = await Auth.signUp({
      username: email,
      password,

      attributes: {
        email,
        given_name: firstName,
        family_name: lastName,
      },
    });

    console.log('auth', 'register', user);
    commit('set', user.user);
    return user.user;
  },

  async token() {
    const currentSession = await Auth.currentSession();
    return currentSession.getAccessToken().getJwtToken();
  },

  async confirm({ commit, rootState }, { email, code }) {
    console.log("code:", code);

    try {
      await Auth.confirmSignUp(email, code);
    } catch (e) {
      if (e.code !== 'NotAuthorizedException' || e.message != 'User cannot be confirmed. Current status is CONFIRMED') {
        console.error(e);
        throw e;
      }
    }
  },

  async startResetPassword({ commit }, { email }) {
    console.log("reset:", email);
    return await Auth.forgotPassword(email);
  },

  async resetPassword({ commit }, { email, code, password }) {
    await Auth.forgotPasswordSubmit(email, code, password);
  },

  async resendcode({ commit }, { email }) {
    await Auth.resendSignUp(email);
  },

  async login({ commit }, { email, password }) {
    // there is a mismatch in naming
    const user = await Auth.signIn(
      email,
      password,
    );

    // safety check
    await Auth.currentSession();

    commit('set', user);
    return user;
  },

  async logout({ commit }) {
    await Auth.signOut();
    commit('set', null);
  },
}
