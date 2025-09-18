'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useToast } from "@/hooks/use-toast";

interface Alert {
  id: number;
  message: string;
  timestamp: Date;
  location: string;
}

interface AlertContextType {
  alerts: Alert[];
  addAlert: (message: string, location: string) => void;
  clearAlerts: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function AlertProvider({ children }: { children: ReactNode }) {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const { toast } = useToast();

  const addAlert = (message: string, location: string) => {
    const newAlert: Alert = {
      id: Date.now(),
      message,
      timestamp: new Date(),
      location
    };
    setAlerts((prevAlerts) => [newAlert, ...prevAlerts]);
    toast({
      variant: 'destructive',
      title: "🚨 Emergency Alert Triggered 🚨",
      description: `${message} at ${location}`,
    });
  };

  const clearAlerts = () => {
    setAlerts([]);
  };

  return (
    <AlertContext.Provider value={{ alerts, addAlert, clearAlerts }}>
      {children}
    </AlertContext.Provider>
  );
}

export function useAlerts() {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlerts must be used within an AlertProvider');
  }
  return context;
}
