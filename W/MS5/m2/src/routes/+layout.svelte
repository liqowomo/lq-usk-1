<script lang="ts">
  import { page } from "$app/state"
  import BaseMeta from "$lib/co/BaseMeta.svelte"
  import "./layout.css"

  const FAVICON_URL = "https://res.cloudinary.com/dzma12njh/image/upload/6.webp"
  const BRAND_COLOR = "#FF2DD1"

  let { children } = $props()
</script>

<svelte:head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content={BRAND_COLOR} />
  <meta name="robots" content="index, follow" />
  <link rel="icon" type="image/webp" href={FAVICON_URL} />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
</svelte:head>

<BaseMeta />

<div class="page-wrapper" data-route={page.url.pathname}>
  <nav class="main-nav">
    <a href="/">🪹Home</a>
    <a href="/p2"> 1️⃣ Page 2</a>
    <a href="/p3"> 2️⃣ Page 3</a>
    <a href="/p4"> 3️⃣ Page 4</a>
    <a href="/p5"> 5️⃣ Page 5</a>
  </nav>

  <main>
    {@render children()}
  </main>
</div>

<style>
  .page-wrapper {
    background: #091413;
    min-height: 100vh;
    align-items: center;
    flex-direction: column;
    color: #6aece1;
    padding: 5rem;
  }

  .page-wrapper[data-route="/p2"] {
    background: #09140b;
    color: #6aec70;
  }
  .page-wrapper[data-route="/p3"] {
    background: #0a0914;
    color: #6aecdf;
  }
  .page-wrapper[data-route="/p4"] {
    background: #140912;
    color: #bcec6a;
  }
  .page-wrapper[data-route="/p5"] {
    background: #141409;
    color: #8bba39;
  }

  .main-nav {
    background-color: #0d1164;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 30px;
  }

  .main-nav a {
    color: white;
    text-decoration: none;
    margin-right: 20px;
    padding: 8px 16px;
    border-radius: 4px;
    transition: background-color 0.2s;
  }

  .main-nav a:hover {
    background-color: #555;
  }
</style>
