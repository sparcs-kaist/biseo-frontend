import Client from './sparcsssov2-node'

const client = new Client(process.env.SSO_CLIENT_ID, process.env.SSO_SECRET)

export default client
