<!-- BaseMeta.svelte -->
<script lang="ts">
  import { page } from "$app/state"

  let {
    title = "MS5-M2",
    description = "MS5-M2 PantySmell",
    ogImageURL = "https://res.cloudinary.com/dzma12njh/image/upload/6.webp",
    ogImageWidth = 1200,
    ogImageHeight = 630,
    ogImageAlt = title,
    twitterCardType = "summary_large_image",
  } = $props()

  const TWITTER_SITE = "@PantySmeller"
  const TWITTER_CREATOR = "@PantySmeller"
  const SITE_NAME = "MS5-M2"

  const fullTitle = $derived(`${title} | ${SITE_NAME}`)
</script>

<svelte:head>
  <title>{fullTitle}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={page.url.href} />

  <!-- OG -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={page.url.href} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:site_name" content={SITE_NAME} />
  <meta property="og:image" content={ogImageURL} />
  <meta property="og:image:width" content={String(ogImageWidth)} />
  <meta property="og:image:height" content={String(ogImageHeight)} />
  <meta property="og:image:alt" content={ogImageAlt} />

  <!-- Twitter -->
  <meta name="twitter:card" content={twitterCardType} />
  <meta name="twitter:site" content={TWITTER_SITE} />
  <meta name="twitter:creator" content={TWITTER_CREATOR} />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={ogImageURL} />
</svelte:head>
