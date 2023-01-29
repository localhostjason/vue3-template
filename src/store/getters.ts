const getters = {
  sidebar: (state: any) => state.app.sidebar,
  device: (state: any) => state.app.device,

  username: (state: any) => state.user.username,
  token: (state: any) => state.user.token,
  role: (state: any) => state.user.role,

  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters
};

export default getters
