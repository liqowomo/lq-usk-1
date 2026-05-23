<script lang="ts">
  import "./layout.css"

  const FAVICON_URL =
    "https://res.cloudinary.com/dzma12njh/image/upload/q_auto/f_auto/3.webp"
  const OG_IMAGE_URL =
    "https://res.cloudinary.com/dzma12njh/image/upload/q_auto/f_auto/3.webp"
  const SITE_URL = "https://mistresscat" // or import from env
  const SITE_TITLE = "PantySmell"
  const SITE_DESCRIPTION = "BBW Panty Smelling"

  let { children } = $props()
</script>

<svelte:head>
  <!-- Favicon -->
  <link rel="icon" type="image/webp" href={FAVICON_URL} />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={SITE_URL} />
  <meta property="og:title" content={SITE_TITLE} />
  <meta property="og:description" content={SITE_DESCRIPTION} />
  <meta property="og:image" content={OG_IMAGE_URL} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Your site OG image description" />
  <meta property="og:site_name" content={SITE_TITLE} />
  <meta property="og:locale" content="en_US" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content={SITE_URL} />
  <meta name="twitter:title" content={SITE_TITLE} />
  <meta name="twitter:description" content={SITE_DESCRIPTION} />
  <meta name="twitter:image" content={OG_IMAGE_URL} />
  <meta name="twitter:image:alt" content="SnifingandLicking" />
  <meta name="twitter:site" content="@SmellBoy" />
  <!-- optional -->
  <meta name="twitter:creator" content="@SmellBoy" />
  <!-- optional -->

  <!-- Standard SEO (recommended) -->
  <title>{SITE_TITLE}</title>
  <meta name="description" content={SITE_DESCRIPTION} />
  <link rel="canonical" href={SITE_URL} />
</svelte:head>

{@render children()}
