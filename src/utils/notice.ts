import { MessagePlugin, NotifyPlugin } from 'tdesign-vue-next';
import type { MessageInstance, NotificationInstance } from 'tdesign-vue-next';
/**
 * 封装的message组件
 * @param message 提示信息
 * @param type 提示类型
 * @param duration 显示时常
 * @returns promise
 */
export const showMessage = (message: string, type = '', duration = 3000): Promise<MessageInstance> => {
  const map = {
    info: 'info',
    success: 'success',
    warning: 'warning',
    error: 'error',
    question: 'question',
    loading: 'loading',
  };
  const level = map[type] || 'info';
  return MessagePlugin[level](message, duration);
};

/**
 * 封装的notification组件
 * @param option notification配置
 * @param type 类型
 * @returns promise
 * TODO:待完善option定义
 */
export const showNotice = (option = {}, type = ''): Promise<NotificationInstance> => {
  const map = {
    info: 'info',
    success: 'success',
    warning: 'warning',
    error: 'error',
  };
  const level = map[type] || 'info';
  return NotifyPlugin[level](option);
};
