<script>
  let { children } = $props()
</script>

<div class="blog-layout">
  {@render children()}
</div>

<style>
  .blog-layout {
    min-height: 100vh;
    background-color: #050518;
    margin: -20px;
    padding: 20px;

    /* CRITICAL FIX: Set text color to white */
    color: white;
  }

  /* Make all text white by default */
  .blog-layout * {
    color: white;
  }

  .blog-layout article {
    max-width: 800px;
    margin: 0 auto;
  }

  .blog-layout h1 {
    font-size: 3rem;
    border-bottom: 2px solid #86efac;
    /* h1 will inherit white from above */
  }

  /* Optional: Make links a different color */
  .blog-layout a {
    color: #86efac;
  }
</style>
