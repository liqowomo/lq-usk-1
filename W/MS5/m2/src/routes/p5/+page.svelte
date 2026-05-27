<!-- Head declarations -->
<script lang="ts">
  let data = $props()
  $inspect(data)

  let userName = $state("Smellpanty")
  let peopleWaiting = $state(["sasd121", "rfrt55"])

  $inspect(peopleWaiting)

  //   let userName = $state("Existing Value")
  $inspect(userName)

  let isEditMode = $state(false)
</script>

<!-- Coming from the UserInput.svelte -->

{#snippet userInput(exampleString: string)}
  <!-- Binding the input to userName State - This does instant changes  -->
  <input type="text" bind:value={userName} />
  <p>You Entered: {userName}</p>

  {#if isEditMode}
    <input type="text" bind:value={userName} />
  {:else}
    <p>{userName}</p>
  {/if}
{/snippet}

<hr />
<button class="button" onclick={() => (isEditMode = !isEditMode)}>
  {isEditMode ? "Save Changes" : "Edit Panty"}
</button>

<hr />
<button
  class="button"
  onclick={() => peopleWaiting.push(new Date().getTime().toString())}
>
  Im Waiting Too
</button>

{#each peopleWaiting as person}
  {@render userInput(person)}
  <p>Person Waiting with ID: {person}</p>
{/each}

<!-- ------------Style Zome----------- -->
<!-- ------------Style Zome----------- -->
<!-- ------------Style Zome----------- -->

<style>
  h1 {
    color: rgb(34, 98, 52);
    font-size: 2rem;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }
  /* From Uiverse.io by Navarog21 */
  button {
    width: 10em;
    position: relative;
    height: 3.5em;
    border: 3px ridge #149cea;
    outline: none;
    background-color: transparent;
    color: white;
    transition: 1s;
    border-radius: 0.3em;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
  }

  button::after {
    content: "";
    position: absolute;
    top: -10px;
    left: 3%;
    width: 95%;
    height: 40%;
    background-color: #212121;
    transition: 0.5s;
    transform-origin: center;
  }

  button::before {
    content: "";
    transform-origin: center;
    position: absolute;
    top: 80%;
    left: 3%;
    width: 95%;
    height: 40%;
    background-color: #212121;
    transition: 0.5s;
  }

  button:hover::before,
  button:hover::after {
    transform: scale(0);
  }

  button:hover {
    box-shadow: inset 0px 0px 25px #1479ea;
  }
</style>
