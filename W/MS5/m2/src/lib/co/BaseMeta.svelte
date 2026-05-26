<!-- asd 
BasMeta.svelte - Component for setting up default og image tags etc  
-->

<script lang="ts">
  import { MetaTags } from "svelte-meta-tags"

  // Props with defaults
  let {
    title = "MS5-M2",
    description = "MS5-M2 Work",
    ogImageURL = "https://res.cloudinary.com/dzma12njh/image/upload/q_auto/f_auto/6.webp",
    ogImageWidth = 1200,
    ogImageHeight = 630,
    twitterCardType = "summary_large_image",
    canonicalURL = "https://tinyurl.com/4eymn9ev",
  } = $props()

  // Constants
  const SITE_URL = "https://tinyurl.com/4eymn9ev"
  const TWITTER_SITE = "@PantySmeller"
  const TWITTER_CREATOR = "@PantySmeller"
  const SITE_NAME = "MS5-M2"
</script>

<MetaTags
  {title}
  titleTemplate="%s | MS5-M2"
  {description}
  canonical={canonicalURL}
  openGraph={{
    type: "website",
    url: SITE_URL,
    title: title,
    description: description,
    siteName: SITE_NAME,
    images: [
      {
        url: ogImageURL,
        width: ogImageWidth,
        height: ogImageHeight,
        alt: title,
      },
    ],
  }}
  twitter={{
    cardType: twitterCardType as
      | "summary"
      | "summary_large_image"
      | "app"
      | "player",
    site: TWITTER_SITE,
    creator: TWITTER_CREATOR,
  }}
/>
