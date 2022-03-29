export default {
  development: {
    // 开发环境接口请求
    host: 'http://192.168.1.81:7600',
    socket: 'ws://192.168.1.81:7600',
    // 开发环境 cdn 路径
    cdn: '',
  },
  test: {
    // 测试环境接口地址
    host: 'http://39.104.13.107:7600',
    socket: 'ws://39.104.13.107:7600',
    // 测试环境 cdn 路径
    cdn: '',
  },
  release: {
    // 正式环境接口地址
    host: 'http://39.104.13.107:7600',
    socket: 'ws://39.104.13.107:7600',
    // 正式环境 cdn 路径
    cdn: '',
  },
};
