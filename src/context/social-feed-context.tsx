'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FeedItem {
  id: number;
  user: string;
  handle: string;
  avatarId: string;
  timestamp: Date;
  content: string;
}

interface NewFeedItem {
    user: string;
    handle: string;
    avatarId: string;
    content: string;
}

interface SocialFeedContextType {
  feedItems: FeedItem[];
  addFeedItem: (item: NewFeedItem) => void;
}

const initialFeedItems: FeedItem[] = [
  {
    id: 3,
    user: 'Eco Corp.',
    handle: 'Company',
    avatarId: 'avatar-3',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    content:
      'We are proud to announce our partnership with BlueVault to offset our carbon footprint through mangrove restoration. #sustainability',
  },
  {
    id: 2,
    user: 'Rajesh Kumar',
    handle: 'Field Officer',
    avatarId: 'avatar-2',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    content:
      'Spotted a rare species of kingfisher near Site B today. A good sign of improving biodiversity. #conservation #mangroves',
  },
  {
    id: 1,
    user: 'Alia Khan',
    handle: 'NGO Manager',
    avatarId: 'avatar-1',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    content:
      'Great progress this week team! We’ve planted over 500 new saplings in the northern corridor. Let’s keep up the momentum!',
  },
];


const SocialFeedContext = createContext<SocialFeedContextType | undefined>(undefined);

export function SocialFeedProvider({ children }: { children: ReactNode }) {
  const [feedItems, setFeedItems] = useState<FeedItem[]>(initialFeedItems);

  const addFeedItem = (item: NewFeedItem) => {
    const newItem: FeedItem = {
      ...item,
      id: Date.now(),
      timestamp: new Date(),
    };
    setFeedItems((prevItems) => [newItem, ...prevItems]);
  };

  return (
    <SocialFeedContext.Provider value={{ feedItems, addFeedItem }}>
      {children}
    </SocialFeedContext.Provider>
  );
}

export function useSocialFeed() {
  const context = useContext(SocialFeedContext);
  if (context === undefined) {
    throw new Error('useSocialFeed must be used within a SocialFeedProvider');
  }
  return context;
}
