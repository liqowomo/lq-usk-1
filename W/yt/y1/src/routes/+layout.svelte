<script lang="ts">
  import "./layout.css"

  const FAVICON_URL =
    "https://res.cloudinary.com/dzma12njh/image/upload/q_auto/f_auto/3.webp"
  const OG_IMAGE_URL =
    "https://res.cloudinary.com/dzma12njh/image/upload/q_auto/f_auto/3.webp"
  const SITE_URL = "https://tinyurl.com/bde2rpr5"
  const SITE_TITLE = "Panty Smelling"
  const SITE_DESCRIPTION = "Panty Piss drinking and fart sucking"

  let { children } = $props()
</script>

<svelte:head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <link rel="icon" type="image/webp" href={FAVICON_URL} />

  <meta property="og:type" content="website" />
  <meta property="og:url" content={SITE_URL} />
  <meta property="og:title" content={SITE_TITLE} />
  <meta property="og:description" content={SITE_DESCRIPTION} />
  <meta property="og:image" content={OG_IMAGE_URL} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta
    property="og:image:alt"
    content="Panty Piss drinking and fart sucking"
  />
  <meta property="og:site_name" content={SITE_TITLE} />
  <meta property="og:locale" content="en_US" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content={SITE_URL} />
  <meta name="twitter:title" content={SITE_TITLE} />
  <meta name="twitter:description" content={SITE_DESCRIPTION} />
  <meta name="twitter:image" content={OG_IMAGE_URL} />
  <meta
    name="twitter:image:alt"
    content="Panty Piss drinking and fart sucking"
  />
  <meta name="twitter:site" content="@SmellBoy" />
  <meta name="twitter:creator" content="@SmellBoy" />

  <title>{SITE_TITLE}</title>
  <meta name="description" content={SITE_DESCRIPTION} />
  <link rel="canonical" href={SITE_URL} />
</svelte:head>

{@render children()}
