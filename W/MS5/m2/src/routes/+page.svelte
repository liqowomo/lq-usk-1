<script>
  // ------seo and meta-----------------
  import BaseMeta from "$lib/co/BaseMeta.svelte"
  // -----------------------------

  let numberOne = 0
  let number = $state(0)

  //   Drived syntax - Pased on existing state
  let userInformation = $derived.by(() => calculateUserInformation())

  function onclick2() {
    console.log("Booty Smell")
  }

  function onclick() {
    number++
  }

  //   Note this function is going into userInformation which has derived.by() function
  function calculateUserInformation() {
    if (number === 0) {
      return "Click button Pleae"
    }
    if (number === 1) {
      return `You clicked exactly one time`
    }
    return `You clicked ${number} times`
  }
</script>

<BaseMeta
  title="Home"
  description="Welcome to MS5-M2 - Your trusted platform"
/>

<div class="page-wrapper">
  <h1>Welcome to SvelteKit</h1>
  <p>Testing number variable : {numberOne}</p>

  <p>Testing number variable : {number}</p>

  <button {onclick}>Lickme</button>
  <!-- <button {onclick2}>Lickme</button> -->

  <p>{userInformation}</p>
</div>

<!-- Style ZOne -->
<!-- Style ZOne -->
<!-- Style ZOne -->
<!-- Style ZOne -->

<style>
  h1 {
    color: white;
    font-size: 2rem;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }
</style>
