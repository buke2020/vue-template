const dev = {
  SERVICE_URL: 'https://test.123.com/',
  TENANT: 'test',
  APP_ID: 'web'
}
const uat = {
  SERVICE_URL: 'https://uat.123.com/',
  TENANT: 'uat',
  APP_ID: 'web'
}

const production = {
  SERVICE_URL: '',
  TENANT: '',
  APP_ID: ''
}

let config = dev

if (process.env.NODE_ENV === 'uat') {
  config = uat
}

if (process.env.NODE_ENV === 'production') {
  config = production
}

export default config
