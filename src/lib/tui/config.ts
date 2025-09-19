import type { TuiConfig } from './types';
import OverviewRecentlyPlayed from './details/OverviewRecentlyPlayed.svelte';
import PlaylistDetails from './details/PlaylistDetails.svelte';

export const tuiConfig: TuiConfig = {
  tabs: [
    {
      id: 'overview',
      label: 'Overview',
      items: [
        {
          id: 'recently-played',
          label: 'Recently Played',
          detail: OverviewRecentlyPlayed,
          meta: {
            description: 'Your recent listening activity',
            tracks: [
              { artist: 'Tycho', title: 'Awake' },
              { artist: 'Nils Frahm', title: 'Says' },
              { artist: 'Boards of Canada', title: 'Dayvan Cowboy' }
            ]
          }
        }
      ]
    },
    {
      id: 'playlists',
      label: 'Playlists',
      items: [
        {
          id: 'deep-focus',
          label: 'Deep Focus',
          detail: PlaylistDetails,
          meta: { description: 'Ambient electronica to focus', tracks: 64, followers: 12034 }
        },
        { id: 'coding-mode', label: 'Coding Mode', detail: PlaylistDetails, meta: { tracks: 48, followers: 8421 } },
        { id: 'jazz-vibes', label: 'Jazz Vibes', detail: PlaylistDetails, meta: { tracks: 57, followers: 4310 } }
      ]
    },
    {
      id: 'following',
      label: 'Following',
      items: [
        { id: 'alice', label: '@alice' },
        { id: 'bob', label: '@bob' },
        { id: 'carol', label: '@carol' }
      ]
    },
    {
      id: 'settings',
      label: 'Settings',
      items: [
        { id: 'profile', label: 'Profile' },
        { id: 'appearance', label: 'Appearance' },
        { id: 'shortcuts', label: 'Shortcuts' },
        { id: 'about', label: 'About' }
      ]
    }
  ]
};

export type { TuiConfig };

