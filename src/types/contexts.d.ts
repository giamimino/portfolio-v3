export interface Notification {
  id: string;
  text: string;
}

export interface NotificationContext {
  notifications: Notification[];
  clearNotifications: () => void;
  addNotification: ({ text: string, id: string }) => void;
  filterNotifications: ({ id: string }) => void;
}
