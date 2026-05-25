<script>
  import favicon from "$lib/assets/favicon.svg"
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
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
  </section>
</main>
