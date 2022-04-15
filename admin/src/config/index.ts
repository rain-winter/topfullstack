/**
 * 环境配置封装
 */
const env = 'dev' || 'prod'
const envConfig = {
  dev: {
    baseApi: 'http://localhost:3000',
    mockApi:
      'https://www.fastmock.site/mock/40686df6be86cb9ab3c58f6782762add/api',
  },
  test: {
    baseApi: '//test.futurefe.com/api',
    mockApi: 'https://www.fastmock.site/mock/',
  },
  prod: {
    baseApi: '//futurefe.com/api',
    mockApi: 'https://www.fastmock.site/mock/',
  },
}
export default {
  env: env,
  mock: false,
  ...envConfig[env],
}
