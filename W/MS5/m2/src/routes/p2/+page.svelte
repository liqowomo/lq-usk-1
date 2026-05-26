<script>
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

<svelte:head>
  <title>Contact | MS5-M2</title>
  <meta name="description" content="Get in touch with MS5-M2 team" />
</svelte:head>

<div class="page-wrapper">
  <h1>Welcome to SvelteKit - Page 2</h1>
  <p>Testing number variable : {numberOne}</p>

  <p>Testing number variable : {number}</p>

  <button {onclick}>Lickme</button>
  <!-- <button {onclick2}>Lickme</button> -->

  <p>{userInformation}</p>
</div>

<style>
  .page-wrapper {
    background: #0c0914;
    min-height: 100vh;
    align-items: center;
    flex-direction: column;
    color: #6aece1;
    padding: 5rem;
  }

  h1 {
    color: white;
    font-size: 2rem;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }
</style>
