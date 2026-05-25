<script lang="ts">
  import "./layout.css"

  const FAVICON_URL =
    "https://res.cloudinary.com/dzma12njh/image/upload/q_auto/f_auto/4.webp"

  const OG_IMAGE_URL =
    "https://res.cloudinary.com/dzma12njh/image/upload/q_auto/f_auto/4.webp"
  const SITE_URL = "https://tinyurl.com/x4xefxrs"
  const SITE_TITLE = "PantyTease"
  const SITE_DESCRIPTION = "PantyTease"
  const BRAND_COLOR = "#4f46e5" // Indigo-600; replace with your brand color

  let { children } = $props()
</script>

<svelte:head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content={BRAND_COLOR} />
  <meta name="robots" content="index, follow" />

  <link rel="icon" type="image/webp" href={FAVICON_URL} />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

  <meta property="og:type" content="website" />
  <meta property="og:url" content={SITE_URL} />
  <meta property="og:title" content={SITE_TITLE} />
  <meta property="og:description" content={SITE_DESCRIPTION} />
  <meta property="og:image" content={OG_IMAGE_URL} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content={SITE_TITLE} />
  <meta property="og:site_name" content={SITE_TITLE} />
  <meta property="og:locale" content="en_US" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content={SITE_URL} />
  <meta name="twitter:title" content={SITE_TITLE} />
  <meta name="twitter:description" content={SITE_DESCRIPTION} />
  <meta name="twitter:image" content={OG_IMAGE_URL} />
  <meta name="twitter:image:alt" content={SITE_TITLE} />
  <meta name="twitter:site" content="@PantyTease" />
  <meta name="twitter:creator" content="@PantyTease" />

  <title>{SITE_TITLE}</title>
  <meta name="description" content={SITE_DESCRIPTION} />
  <link rel="canonical" href={SITE_URL} />
</svelte:head>

{@render children()}
