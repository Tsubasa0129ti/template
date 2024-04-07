import { Repositories } from '@/apis/repositoryFactory';

// TODO: 必要かどうかを確認する。
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $repository: Repositories;
  }
}
