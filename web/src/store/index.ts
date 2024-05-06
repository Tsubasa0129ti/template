import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      errorState: {
        error: {},
        message: '',
        retry: false
      }
    };
  },
  mutations: {
    updateErrorState(state, newState) {
      state.errorState.error = newState.error;
      state.errorState.message = newState.message;
      state.errorState.retry = newState.retry;
    }
  }
});

export default store;
