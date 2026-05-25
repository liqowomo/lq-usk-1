<script>
  let { title = "", icon = true } = $props()
</script>

<div
  class="group relative bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 transition-all duration-300 hover:bg-white/10 hover:scale-105 hover:border-rose-400/30"
>
  <div
    class="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
    style="box-shadow: 0 0 20px rgba(225, 29, 72, 0.2);"
  ></div>

  <div class="relative">
    <div
      class="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-rose-800 flex items-center justify-center mb-4 shadow-lg"
    >
      <slot name="icon">
        <svg
          class="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          ></path>
        </svg>
      </slot>
    </div>

    {#if title}
      <h3 class="text-xl font-bold text-rose-300 mb-2">{title}</h3>
    {/if}

    <div class="text-rose-200/70 leading-relaxed">
      <slot />
    </div>
  </div>
</div>
