// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ComponentCustomProperties } from 'vue';

declare module '@vue/runtime-core' {
  interface State {
    errorState: {
      message: string;
      retry: boolean;
    };
  }
}
