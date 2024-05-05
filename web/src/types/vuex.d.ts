// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ComponentCustomProperties } from 'vue';
import { Store } from 'vuex';

declare module '@vue/runtime-core' {
  interface State {
    errorState: {
      message: string;
      retry: boolean;
    };
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
