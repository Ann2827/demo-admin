import { CacheStrict } from 'request-store-manager';

const CacheManager = new CacheStrict<'locale'>({ locale: { place: 'localStorage' } }, { prefix: 'admin' });

export default CacheManager;
