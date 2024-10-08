const requireAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
requireAll(req)

const reqAnt = require.context('./ant', false, /\.svg$/)
requireAll(reqAnt)