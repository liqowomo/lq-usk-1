<h2 align="center"><code> yt </code></h2>
<h3 align="center"><i> ytpanty </i></h3>

1. [What](#what)
2. [Shii](#shii)
3. [ImpCmd](#impcmd)
   1. [Make SV](#make-sv)
4. [Important Note About Wrangle](#important-note-about-wrangle)
5. [Project List](#project-list)
   1. [Default Insall Command](#default-insall-command)

# What

1. YT schtuff

# Shii

|            Shii            |         What         |
| :------------------------: | :------------------: |
| [`pjinit.sh`](./pjinit.sh) | Cmds to init project |

# ImpCmd

## Make SV

```sh
# As per official docs -
bun create cloudflare@latest
```

# Important Note About Wrangle

1. First get the api token
2. Then instead of storing it you can

```sh
# Smell her farts
export CLOUDFLARE_API_TOKEN="fatpussy"

# then
bunx wrangler whoami
```

3 . This is safer way of setting up the shii

# Project List

## Default Insall Command

```sh
# Cloudflare official Install command
bun create cloudflare@latest y1 --framework=svelte --platform=workers
```

1. Note this folder is for testing out interesting sveltekit and d1 projects That was the reason to start this panty
2. It seems both `drizzle` and `better-auth` have trouble when trying to install with the above command
3. The better approach is to get the worker first deployed, and the do the subsequent next steps
