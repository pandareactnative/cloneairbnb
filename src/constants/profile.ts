export const guest = {name: 'Alex', role: 'Guest'};

export type MenuItem = {
  id: string;
  label: string;
  icon: string;
  description: string;
};

export const menuGroups: MenuItem[][] = [
  [
    {
      id: 'settings',
      label: 'Account settings',
      icon: 'cog-outline',
      description:
        'Personal details, login and security, payments and notifications would be managed here. This demo keeps no account data.',
    },
    {
      id: 'help',
      label: 'Get help',
      icon: 'help-circle-outline',
      description:
        'Find answers in the Help Centre or contact support about a reservation. Support is not connected in this demo.',
    },
    {
      id: 'profile',
      label: 'View profile',
      icon: 'account-outline',
      description:
        'Your public profile shows your name, verified details and reviews from hosts.',
    },
    {
      id: 'privacy',
      label: 'Privacy',
      icon: 'hand-back-right-outline',
      description:
        'Manage connected services, data sharing and download your information.',
    },
  ],
  [
    {
      id: 'refer-host',
      label: 'Refer a host',
      icon: 'account-group-outline',
      description:
        'Invite someone to host and earn a reward when they welcome their first guest.',
    },
    {
      id: 'co-host',
      label: 'Find a co-host',
      icon: 'account-tie-outline',
      description:
        'Partner with a local co-host who can help with check-ins, cleaning and guest messages.',
    },
    {
      id: 'refer-experience',
      label: 'Refer an experience',
      icon: 'account-multiple-plus-outline',
      description:
        'Know someone who runs a great tour or class? Refer them to host an experience.',
    },
    {
      id: 'legal',
      label: 'Legal',
      icon: 'book-open-outline',
      description: 'Terms of service, privacy policy and open-source licences.',
    },
  ],
];

export const profileCards = {
  trips: {
    title: 'Past trips',
    description:
      'Trips you complete will appear here so you can rebook or leave a review.',
  },
  connections: {
    title: 'Connections',
    description:
      'Connect with people you have travelled with to plan your next trip together.',
  },
  host: {
    title: 'Become a host',
    description:
      'It’s easy to start hosting and earn extra income. Hosting is not available in this demo.',
  },
  notifications: {
    title: 'Notifications',
    description:
      'You’re all caught up. New messages, trip updates and offers will show up here.',
  },
};
