const env = import.meta.env || 'prod'

const envConfig = {
  dev: {
    baseApi: 'http://localhost:3009/',
    mockApi: ''
  },
  prod: {
    baseApi: '',
    mockApi: ''
  },
  test: {
    baseApi: '',
    mockApi: ''
  }
}

export default {
  env: env,
  mock: false,
  ...envConfig[env]
}