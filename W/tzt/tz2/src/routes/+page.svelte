<script>
  const welcome = "/welcome.webp"
  const welcomeFallback = "/welcome.png"
</script>

<h1>Welcome to SvelteKit</h1>
<p>
  Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the
  documentation
</p>

<svelte:head>
  <title>BootyFart</title>
  <meta name="description" content="Booty Lickers" />
</svelte:head>

<section>
  <h1>
    <span class="welcome">
      <picture>
        <source srcset={welcome} type="image/webp" />
        <img src={welcomeFallback} alt="Welcome" />
      </picture>
    </span>
  </h1>
</section>
