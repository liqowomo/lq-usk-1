<script>
  let numberOne = 69
</script>

<!-- All Components in here -->
<div class="page-wrapper">
  <h1>Welcome to SvelteKit</h1>
  <p>This page has its own dark background, other pages won't</p>
</div>

<style>
  .page-wrapper {
    background: #091413;
    min-height: 100vh;
    /* display: flex; */
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: #6aece1;
  }

  /* This CSS only applies to THIS page */
  h1 {
    color: white;
    font-size: 5rem;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }
</style>
