
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
    id: 7,
    user: 'Vikram Singh',
    handle: 'Field Officer',
    avatarId: 'avatar-5',
    timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    content: 'The new batch of Avicennia marina saplings have arrived for the Mahanadi Delta project! Excited to get these in the ground.',
  },
  {
    id: 6,
    user: 'Coastal Guardians',
    handle: 'NGO Manager',
    avatarId: 'avatar-7',
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    content: 'Just finished a community workshop on sustainable fishing practices near the Pichavaram mangroves. The engagement was fantastic!',
  },
  {
    id: 5,
    user: 'GreenFuture Foundation',
    handle: 'NGO Manager',
    avatarId: 'avatar-1',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    content: 'Our latest drone footage shows incredible growth in the Pichavaram sector. The canopy is denser than ever! #ReforestationSuccess',
  },
  {
    id: 4,
    user: 'Priya Patel',
    handle: 'Field Officer',
    avatarId: 'avatar-6',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    content: 'A beautiful sunrise over the newly planted saplings. Moments like these make the hard work worth it. #Hope #Mangroves',
  },
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
