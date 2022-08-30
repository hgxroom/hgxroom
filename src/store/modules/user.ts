import { defineStore } from 'pinia';
import { TOKEN_NAME } from '@/config/global';
import { store } from '@/store';
import { login, getInfo } from '@/api/auth';

const InitUserInfo = {
  roles: [],
  companyId: '',
  id: 0,
  roleId: null,
  username: 0,
};

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem(TOKEN_NAME), // 默认token不走权限
    userInfo: InitUserInfo,
  }),
  getters: {
    roles: (state) => {
      return state.userInfo?.roles;
    },
  },
  actions: {
    async login(userInfo: Record<string, unknown>) {
      const res = await login(userInfo);
      if (res) {
        this.token = res.data;
        localStorage.setItem(TOKEN_NAME, res.data);
      } else {
        throw res;
      }
    },
    async getUserInfo() {
      // const mockRemoteUserInfo = async (token: string) => {
      //   if (token === 'main_token') {
      //     return {
      //       name: 'td_main',
      //       roles: ['all'],
      //     };
      //   }
      //   return {
      //     name: 'td_dev',
      //     roles: ['UserIndex', 'DashboardBase', 'login'],
      //   };
      // };
      // const res = await mockRemoteUserInfo(this.token);
      // this.userInfo = res;
      const res = await getInfo();
      res.data.roles = [
        'Login',
        '404Page',
        'Process',
        'Workshop',
        'EquipmentType',
        'EquipmentInformation',
        'OrderList',
        'EmbryosStorage',
        'WorkSequence',
        'ProgressBoard',
        'ManageAccount',
      ];
      // res.data.roles = ['all'];
      this.userInfo = res.data;
    },
    async logout() {
      localStorage.removeItem(TOKEN_NAME);
      this.token = '';
      this.userInfo = InitUserInfo;
    },
    async removeToken() {
      this.token = '';
    },
  },
});

export function getUserStore() {
  return useUserStore(store);
}
