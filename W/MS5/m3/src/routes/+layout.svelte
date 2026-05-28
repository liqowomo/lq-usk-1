<script lang="ts">
  import "./app.css"

  const SITE_URL = "https://lqusk1-w-ms5-m3.liqowomo.workers.dev"
  const SITE_TITLE = "MS5-M3"
  const SITE_DESCRIPTION = "MS5-M3 Work"
  const BRAND_COLOR = "#FF2DD1"
  const TWITTER_HANDLE = "@PantySmeller"

  const FAVICON_URL = "https://res.cloudinary.com/dzma12njh/image/upload/7.webp"
  const OG_IMAGE_URL =
    "https://res.cloudinary.com/dzma12njh/image/upload/7.webp"

  let { children } = $props()
</script>

<svelte:head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <!-- Basic -->
  <title>{SITE_TITLE}</title>
  <meta name="description" content={SITE_DESCRIPTION} />
  <meta name="theme-color" content={BRAND_COLOR} />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href={SITE_URL} />

  <!-- Favicon -->
  <link rel="icon" type="image/webp" href={FAVICON_URL} />
  <link rel="apple-touch-icon" href={FAVICON_URL} />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={SITE_URL} />
  <meta property="og:title" content={SITE_TITLE} />
  <meta property="og:description" content={SITE_DESCRIPTION} />
  <meta property="og:image" content={OG_IMAGE_URL} />
  <meta property="og:image:alt" content={SITE_TITLE} />
  <meta property="og:site_name" content={SITE_TITLE} />
  <meta property="og:locale" content="en_US" />

  <!-- Twitter / X Cards -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content={SITE_URL} />
  <meta name="twitter:title" content={SITE_TITLE} />
  <meta name="twitter:description" content={SITE_DESCRIPTION} />
  <meta name="twitter:image" content={OG_IMAGE_URL} />
  <meta name="twitter:image:alt" content={SITE_TITLE} />
  <meta name="twitter:site" content={TWITTER_HANDLE} />
  <meta name="twitter:creator" content={TWITTER_HANDLE} />
</svelte:head>

{@render children()}
