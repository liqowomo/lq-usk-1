<script lang="ts">
  import { enhance } from "$app/forms"
  import type { PageProps } from "./$types"

  let { data, form }: PageProps = $props()

  // Form state
  let name = $state("")
  let message = $state("")
  let fetish = $state("")
  let characterCount = $derived(message.length)

  // Error state for rate limiting
  let rateLimitError = $state(false)
  let errorMessage = $state("")

  // Watch for form submission results
  $effect(() => {
    if (form && !form.success) {
      rateLimitError = true
      errorMessage =
        form.error || "Rate limit exceeded. Please wait 60 seconds."

      // Auto-hide error after 5 seconds
      setTimeout(() => {
        rateLimitError = false
        errorMessage = ""
      }, 5000)
    } else if (form && form.success) {
      // Reset form on success
      name = ""
      message = ""
      fetish = ""
      rateLimitError = false
      errorMessage = ""
    }
  })
</script>

<div
  class="min-h-screen bg-gradient-to-b from-purple-950 via-slate-900 to-black flex items-center justify-center p-4 sm:p-6 md:p-8"
>
  <div
    class="flex flex-col items-center justify-center space-y-6 sm:space-y-8 w-full max-w-7xl mx-auto"
  >
    <!-- Synth elements -->
    <div class="text-center space-y-2 sm:space-y-4 px-4">
      <h1
        class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent
                 animate-pulse drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]"
      >
        YT1 - SvelteKit + CF Workers + D1
      </h1>

      <p
        class="text-cyan-300/80 text-sm sm:text-base md:text-lg tracking-wider font-mono"
      >
        Guestbook - Leave Your Mark in the Grid
      </p>
    </div>

    <!-- Neon divider -->
    <div
      class="w-full max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] h-[2px] sm:h-[3px] bg-gradient-to-r from-transparent via-purple-500 to-transparent
                shadow-[0_0_10px_rgba(168,85,247,0.8)]"
    ></div>

    <!-- RATE LIMIT ERROR TOAST -->
    {#if rateLimitError}
      <div
        class="fixed top-2 sm:top-4 left-1/2 transform -translate-x-1/2 z-50 animate-in w-[95%] sm:w-auto max-w-[90vw] sm:max-w-lg"
      >
        <div
          class="bg-black/90 backdrop-blur-md border-2 border-red-500 rounded-xl p-3 sm:p-4 shadow-[0_0_30px_rgba(255,0,0,0.5)]"
        >
          <div class="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <img
              src="https://res.cloudinary.com/dzma12njh/image/upload/q_auto/f_auto/4.webp"
              alt="Rate Limited"
              class="w-32 h-24 sm:w-40 sm:h-32 md:w-50 md:h-40 object-cover rounded-md shadow-[0_0_20px_rgba(255,0,0,0.5)]"
            />
            <div class="text-center sm:text-left">
              <p class="text-red-400 font-mono font-bold text-base sm:text-lg">
                ⚠️ RATE LIMIT EXCEEDED
              </p>
              <p class="text-white/80 text-xs sm:text-sm">{errorMessage}</p>
            </div>
          </div>
        </div>
      </div>
    {/if}

    <!-- FORM SECTION -->
    <div
      class="w-full max-w-[95%] sm:max-w-md md:max-w-lg p-4 sm:p-6 rounded-xl bg-black/40 backdrop-blur-sm border border-purple-500/30
                shadow-[0_0_30px_rgba(168,85,247,0.3)]"
    >
      <div class="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
        <div
          class="w-2 h-2 sm:w-3 sm:h-3 bg-cyan-400 rounded-full animate-pulse"
        ></div>
        <span class="text-cyan-300 font-mono text-xs sm:text-sm"
          >>_ SIGN THE GUESTBOOK</span
        >
      </div>

      <form method="POST" use:enhance>
        <div class="space-y-3 sm:space-y-4">
          <div>
            <label
              class="text-purple-300 font-mono text-xs sm:text-sm block mb-1 sm:mb-2"
              >IDENTIFICATION</label
            >
            <input
              type="text"
              name="name"
              bind:value={name}
              required
              class="w-full bg-black/50 border border-purple-500/30 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2
                       text-white font-mono text-xs sm:text-sm focus:outline-none focus:border-cyan-400
                       focus:shadow-[0_0_10px_rgba(0,255,255,0.5)] transition-all"
              placeholder="Enter your name..."
            />
          </div>

          <div>
            <label
              class="text-purple-300 font-mono text-xs sm:text-sm block mb-1 sm:mb-2"
              >FETISH CODE</label
            >
            <input
              type="text"
              name="fetish"
              bind:value={fetish}
              required
              class="w-full bg-black/50 border border-purple-500/30 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2
                       text-white font-mono text-xs sm:text-sm focus:outline-none focus:border-pink-400
                       focus:shadow-[0_0_10px_rgba(236,72,153,0.5)] transition-all"
              placeholder="Your deepest desire..."
            />
          </div>

          <div>
            <label
              class="text-purple-300 font-mono text-xs sm:text-sm block mb-1 sm:mb-2"
              >MESSAGE TRANSMISSION</label
            >
            <textarea
              name="message"
              bind:value={message}
              required
              maxlength="500"
              rows="3"
              class="w-full bg-black/50 border border-purple-500/30 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2
                       text-white font-mono text-xs sm:text-sm focus:outline-none focus:border-cyan-400
                       focus:shadow-[0_0_10px_rgba(0,255,255,0.5)] transition-all resize-none"
              placeholder="Broadcast your message to the grid..."
            ></textarea>
            <div class="text-right text-xs font-mono mt-1">
              <span
                class={characterCount > 450 ? "text-pink-400" : "text-white/40"}
              >
                {characterCount} / 500
              </span>
            </div>
          </div>

          <button
            type="submit"
            class="w-full mt-3 sm:mt-4 px-6 sm:px-8 py-2 sm:py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600
                       text-white font-mono text-xs sm:text-sm tracking-wider uppercase
                       shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:shadow-[0_0_30px_rgba(236,72,153,0.6)]
                       hover:scale-105 transition-all duration-300"
          >
            TRANSMIT MESSAGE
          </button>
        </div>
      </form>
    </div>

    <!-- MESSAGES SECTION -->
    <div
      class="w-full max-w-[95%] sm:max-w-2xl md:max-w-3xl lg:max-w-4xl px-2 sm:px-4"
    >
      <div
        class="space-y-3 sm:space-y-4 max-h-80 sm:max-h-96 overflow-y-auto px-2 sm:px-4"
      >
        {#each data.messages as message}
          <div
            class="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-lg sm:rounded-xl p-3 sm:p-4
                       shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]
                       transition-all duration-300"
          >
            <div
              class="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-1 sm:gap-0"
            >
              <h3
                class="text-cyan-300 font-mono text-sm sm:text-base md:text-lg font-bold break-words"
              >
                >_ {message.name}
                <span class="text-purple-400 text-xs sm:text-sm"
                  >({message.country || "Unknown"})</span
                >
              </h3>
              <span class="text-white/40 text-xs font-mono">
                {message.createdAt
                  ? new Date(message.createdAt).toLocaleDateString()
                  : "Just now"}
              </span>
            </div>
            <p class="text-white/80 text-xs sm:text-sm mb-2 break-words">
              {message.message}
            </p>
            <div class="flex items-center gap-2">
              <span class="text-xs text-pink-400/70 font-mono break-words"
                >[FETISH: {message.fetish}]</span
              >
            </div>
          </div>
        {:else}
          <div
            class="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-lg sm:rounded-xl p-6 sm:p-8 text-center"
          >
            <p class="text-cyan-300/60 font-mono text-sm sm:text-base">
              No Messages Yet
            </p>
            <p class="text-white/40 text-xs sm:text-sm mt-2">
              Be the first to leave a trace...
            </p>
          </div>
        {/each}
      </div>
    </div>

    <!-- Grid overlay effect -->
    <div class="fixed inset-0 pointer-events-none opacity-10">
      <div
        class="w-full h-full"
        style="background-image: linear-gradient(0deg, transparent 24%, rgba(0,255,255,0.3) 25%, rgba(0,255,255,0.3) 26%, transparent 27%, transparent 74%, rgba(0,255,255,0.3) 75%, rgba(0,255,255,0.3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0,255,255,0.3) 25%, rgba(0,255,255,0.3) 26%, transparent 27%, transparent 74%, rgba(0,255,255,0.3) 75%, rgba(0,255,255,0.3) 76%, transparent 77%, transparent); background-size: 30px 30px;"
      ></div>
    </div>

    <!-- Vignette effect -->
    <div
      class="fixed inset-0 pointer-events-none bg-gradient-to-t from-black/50 to-transparent"
    ></div>
  </div>
</div>

<style>
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(-1rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-in {
    animation: fade-in 0.3s ease-out;
  }

  /* Custom scrollbar for messages section */
  .overflow-y-auto::-webkit-scrollbar {
    width: 6px;
  }

  .overflow-y-auto::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }

  .overflow-y-auto::-webkit-scrollbar-thumb {
    background: rgba(168, 85, 247, 0.5);
    border-radius: 10px;
  }

  .overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: rgba(168, 85, 247, 0.8);
  }
</style>
