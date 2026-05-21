<h2 align="center"><code> tzt </code></h2>
<h3 align="center"><i> Testing Area </i></h3>

1. [What](#what)
2. [Shii](#shii)
3. [ImpCmd](#impcmd)
   1. [Make SV](#make-sv)
4. [Important Note About Wrangle](#important-note-about-wrangle)

# What

1. This folder will have various tests

# Shii

|      Shii      |                              What                              |
| :------------: | :------------------------------------------------------------: |
| [`tz1`](./tz1) | Make new Svelete project and try to deploy to CF with wrangler |

# ImpCmd

## Make SV

```sh
# As per official docs -https://svelte.dev/docs/kit/creating-a-project
bunx sv create my-app
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
