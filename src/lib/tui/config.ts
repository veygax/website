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
            sshKey: 'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIKNY+/G4U9emqPcGFsAnUZGKbWtWP0wjbyzkH6TqIYUA',
            pgpKey: `-----BEGIN PGP PUBLIC KEY BLOCK-----

mDMEaNm0sxYJKwYBBAHaRw8BAQdAGaMzmQcqMTNjcDs0MrM/t3CZZP33sPg9Ac2B
63U/aXG0NHZleWdheCAoXHg3Nlx4NjVceDc5XHg2N1x4NjFceDc4KSA8dmV5Z2FA
dmV5Z2F4LmRldj6IkwQTFgoAOxYhBLnYhwoVy8fPiMLrgtZ8hMEfoTEQBQJo2bSz
AhsDBQsJCAcCAiICBhUKCQgLAgQWAgMBAh4HAheAAAoJENZ8hMEfoTEQ/PwBAKzU
kTTp9eY2yxBbeSelKMP66CoUbvwUU7Cg4TN7LoOgAQDKfrg2jMmns4Qw0h7lTquK
qIbZ7EDOsVVpAkvvm/XKA7g4BGjZtLMSCisGAQQBl1UBBQEBB0D+RXWepZgjcsSI
uSxrU8vke8HndqwVvHX8Cqp/Gl6aGwMBCAeIeAQYFgoAIBYhBLnYhwoVy8fPiMLr
gtZ8hMEfoTEQBQJo2bSzAhsMAAoJENZ8hMEfoTEQdRAA/ji3cwpjzKGsDKljfFKL
9gZ1a2CfPIQrOR8uyBlO0raqAP9qgsaK6UZshMgx9i1/blhHVypGOzFOPWcTQ8o7
bPGpCQ==
=TiVu
-----END PGP PUBLIC KEY BLOCK-----`
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
        },
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

