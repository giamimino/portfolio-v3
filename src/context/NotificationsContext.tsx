"use client";
import Message from "@/components/ui/message";
import { Notification, NotificationContext } from "@/types/contexts";
import { Children } from "@/types/global";
import { AnimatePresence } from "framer-motion";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export const NotificationsContext = createContext<NotificationContext | null>(
  null
);

export const NotificationsContextProvider = ({ children }: Children) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const currentNotif = notifications[0] ?? null; // current notification

  const values = useMemo(
    () => ({
      notifications,
      clearNotifications: () => {
        setNotifications([]);
      },
      addNotification: ({ text, id }: Notification) => {
        setNotifications((prev) => [...prev, { id, text }]);
      },
      filterNotifications: ({ id }: { id: string }) => {
        setNotifications((prev) => prev.filter((p) => p.id !== id));
      },
    }),
    [notifications]
  );

  useEffect(() => {
    if (!currentNotif) return;

    const timer = setTimeout(
      () => setNotifications(prev => prev.slice(1)),
      2500
    );

    return () => clearTimeout(timer);
  }, [currentNotif]);

  return (
    <NotificationsContext.Provider value={values}>
      <AnimatePresence>
        {currentNotif && (
          <Message
            text={currentNotif.text}
            onClose={() => values.filterNotifications({ id: currentNotif.id })}
          />
        )}
      </AnimatePresence>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotificationsContext = () => {
  const ctx = useContext(NotificationsContext);
  if (!ctx) throw new Error("this context used out of provider.");
  return ctx;
};
