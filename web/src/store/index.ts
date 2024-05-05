import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      errorState: {
        message: '',
        retry: false
      }
    };
  },
  mutations: {
    updateErrorState(state, newState) {
      state.errorState.message = newState.message;
      state.errorState.retry = newState.retry;
    }
  }
});

export default store;
