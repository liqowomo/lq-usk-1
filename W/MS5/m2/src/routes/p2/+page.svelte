<script>
  // ------seo and meta-----------------
  import BaseMeta from "$lib/co/BaseMeta.svelte"
  // -----------------------------

  $effect(() => {
    console.log("Rune is active")
    if (userName) {
      document.title = `Hello, ${userName}!`
    } else {
      document.title = "Welcome to SvelteKit - Page 2"
    }
    console.log(`I am sending ${userName} to server`)
  })

  let userName = $state("")
</script>

<BaseMeta title="p2" description="Page two work" />

<div class="page-wrapper">
  <h1>Welcome to SvelteKit - Page 2</h1>
  <hr />

  <h2>Your {userName}</h2>

  <!-- Binding the input to userName State - This does instant changes  -->
  <input type="text" bind:value={userName} />
  <p>You Entered: {userName}</p>
</div>

<style>
  h1 {
    color: white;
    font-size: 2rem;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }
  input,
  textarea,
  select {
    background: #1a1a1a;
    color: #e5e5e5;
    border: 1px solid #333;
    padding: 12px 16px;
    border-radius: 8px;
    font-family: inherit;
    outline: none;
    transition:
      border-color 0.2s,
      box-shadow 0.2s;
  }

  input:focus,
  textarea:focus,
  select:focus {
    border-color: #5b9efc;
    box-shadow:
      0 0 0 3px rgba(91, 158, 252, 0.25),
      0 0 12px rgba(91, 158, 252, 0.2);
  }
</style>
