import SampleRepository from './repositories/SampleRepository';

export interface Repositories {
  samples: SampleRepository;
}

/**
 * 呼び出し側で指定したドメインを操作するリポジトリを返却する。
 *
 * @returns 指定したドメインを操作するリポジトリ
 */
function getRepository(): Repositories {
  const samples = new SampleRepository();
  const repositories: Repositories = {
    samples
  };
  return repositories;
}

export default getRepository;
