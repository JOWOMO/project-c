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

  async load({ commit }) {
    try {
      const user = await Auth.currentAuthenticatedUser()
      commit('set', user)
      return user
    } catch (e) {
      commit('set', null)
    }
  },

  async register({ commit }, { email, password }) {
    const user = await Auth.signUp({
      username: email,
      password,
      attributes: { email },
    });

    console.log('auth', 'register', user);
    commit('set', user);
    return user;
  },

  async token() {
    const currentSession = await Auth.currentSession();
    return currentSession.getAccessToken().getJwtToken();
  },

  async confirm({ commit }, { email, code }) {
    console.log("code:", code);
    return await Auth.confirmSignUp(email, code);
  },

  async login({ commit, $Amplify }, { userdata }) {
    // there is a mismatch in naming
    const user = await Auth.signIn(userdata.email, userdata.pwd || userdata.password);

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
