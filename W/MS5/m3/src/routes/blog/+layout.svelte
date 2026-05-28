<script>
  let { children } = $props()
</script>

<div class="blog-layout">
  {@render children()}
</div>

<style>
  .blog-layout {
    min-height: 100vh;
    background-color: #050518; /* Blog-specific background */
    margin: -20px; /* Offset body padding from root layout, if needed */
    padding: 20px;
  }

  /* Any other blog-wide styles for your articles */
  .blog-layout article {
    max-width: 800px;
    margin: 0 auto;
  }

  .blog-layout h1 {
    font-size: 3rem;
    border-bottom: 2px solid #86efac;
  }
</style>
