import { CacheStrict } from 'request-store-manager';

const CacheManager = new CacheStrict<'locale' | 'tasksTab'>(
  { locale: { place: 'localStorage' }, tasksTab: { place: 'sessionStorage' } },
  { prefix: 'admin' },
);

export default CacheManager;
