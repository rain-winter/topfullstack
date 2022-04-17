const env = import.meta.env || 'prod'

const envConfig = {
  dev: {
    baseApi: '',
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
  mock: true,
  ...envConfig[env]
}