import type { TuiConfig } from './types';
import IdentificationDetails from './details/IdentificationDetails.svelte';
import SocialsDetails from './details/SocialsDetails.svelte';
import ProjectDetails from './details/ProjectDetails.svelte';

export const tuiConfig: TuiConfig = {
  tabs: [
    {
      id: 'overview',
      label: 'overview',
      items: [
        {
          id: 'identification',
          label: 'identification',
          detail: IdentificationDetails,
          meta: {
            displayName: 'veygax',
            email: 'veyga@veygax.dev',
            sshKey: 'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIKNY+/G4U9emqPcGFsAnUZGKbWtWP0wjbyzkH6TqIYUA'
          }
        },
        {
          id: 'socials',
          label: 'socials',
          detail: SocialsDetails,
          meta: {
            socials: [
              { platform: 'github', handle: '@veygax' },
              { platform: 'x', handle: '@veygax' },
              { platform: 'mastodon', handle: '@veygax@infosec.exchange' },
              { platform: 'codeberg', handle: '@veygax' }
            ]
          }
        }
      ]
    },
    {
      id: 'projects',
      label: 'projects',
      items: [
        {
          id: 'project-website',
          label: 'personal website',
          detail: ProjectDetails,
          meta: {
            name: 'personal website',
            description: 'the current website you\'re on, inspired by tui',
            url: 'https://veygax.dev',
            stack: ['sveltekit', 'tailwind', 'typescript']
          }
        }
      ]
    }
  ]
};

export type { TuiConfig };

