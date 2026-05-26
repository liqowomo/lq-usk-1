<script>
  function onclick() {
    console.log("Booty Smell")
  }

  function onclick2() {
    number++
  }

  let numberOne = 69
  let number = $state(0)
</script>

<!-- All Components in here -->
<div class="page-wrapper">
  <h1>Welcome to SvelteKit</h1>
  <p>Testing number variable : {numberOne}</p>
  <p>Testing number variable : {number}</p>

  <button {onclick}> Lickme </button>
  
  <button {onclick2}> Lickme </button>
</div>

<style>
  .page-wrapper {
    background: #091413;
    min-height: 100vh;
    /* display: flex; */
    align-items: center;
    /* justify-content: space-between; */
    flex-direction: column;
    color: #6aece1;
    padding: 5rem;
  }

  /* This CSS only applies to THIS page */
  h1 {
    color: white;
    font-size: 2rem;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }
</style>
