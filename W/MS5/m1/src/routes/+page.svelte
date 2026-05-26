<script>
  import Card from "$lib/comp/Card.svelte"
  // Rune
  let number = $state(0)

  let userInformation = $derived(
    number === 0 ? "Zero Pussy" : `You've fucked ${number} pussies`,
  )

  function onclick() {
    number++
  }
  let numberOne = 1
</script>

<svelte:head>
  <meta name="theme-color" content="#0f172a" />
</svelte:head>

<main
  class="relative min-h-screen text-rose-300 font-sans antialiased overflow-hidden"
>
  <!-- GIF Background - full visibility -->
  <div class="fixed inset-0 -z-20">
    <img
      src="https://res.cloudinary.com/dzma12njh/image/upload/v1779733748/hFhygTRHt4jvGQo52q_tl9bfd.webp"
      alt=""
      class="w-full h-full object-cover"
    />
  </div>

  <!-- Dark overlay - solid black transparent box -->
  <div class="fixed inset-0 -z-10 bg-black/90"></div>

  <!-- Content -->
  <section
    class="relative flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-4"
  >
    <h1
      class="text-3xl sm:text-4xl md:text-5xl font-bold text-rose-300 tracking-tight drop-shadow-2xl"
    >
      MS5-M1 Work SVK
    </h1>

    <p
      class="text-lg sm:text-xl text-rose-200/90 max-w-2xl leading-relaxed drop-shadow-lg"
    >
      Visit
      <a
        href="https://svelte.dev/docs/kit"
        class="font-semibold text-rose-400 hover:text-rose-300 underline decoration-rose-500/50 hover:decoration-rose-400 transition-colors"
      >
        svelte.dev/docs/kit
      </a>
      to read the documentation
    </p>

    <button
      class="px-6 py-3 rounded-lg font-semibold transition-all duration-300 cursor-pointer border-2 border-rose-400 text-rose-300 bg-transparent hover:bg-rose-400/10 hover:shadow-lg hover:shadow-rose-500/20 hover:border-rose-300"
      onclick={() => alert("Suck And Fuck")}>Click Me</button
    >
    <button {onclick}>Click Me</button>

    <p>Displaying Variable {numberOne}</p>
    <p>Displaying Variable {number}</p>

    <Card title="Fast Performance">
      <p>{userInformation}</p>
    </Card>

    <Card title="Fast Performance">
      Built on Svelte's compiler, SvelteKit delivers blazing fast page loads.
    </Card>
  </section>
</main>
