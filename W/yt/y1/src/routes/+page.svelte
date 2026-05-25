<script lang="ts">
  import { enhance } from "$app/forms"
  import type { PageProps } from "./$types"

  let { data }: PageProps = $props()

  // Form state
  let name = $state("")
  let message = $state("")
  let fetish = $state("")
  let characterCount = $derived(message.length)
</script>

<div
  class="min-h-screen bg-gradient-to-b from-purple-950 via-slate-900 to-black flex items-center justify-center"
>
  <div class="flex flex-col items-center justify-center space-y-8 p-8">
    <!-- Synth elements -->
    <div class="text-center space-y-4">
      <h1
        class="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent
                 animate-pulse drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]"
      >
        YT1 - SvelteKit + CF Workers + D1
      </h1>

      <p class="text-cyan-300/80 text-lg tracking-wider font-mono">
        Guestbook - Leave Your Mark in the Grid
      </p>
    </div>

    <!-- Neon divider -->
    <div
      class="w-128 h-[3px] bg-gradient-to-r from-transparent via-purple-500 to-transparent
                shadow-[0_0_10px_rgba(168,85,247,0.8)]"
    ></div>

    <!-- MESSAGES SECTION -->
    <div class="w-full max-w-2xl">
      <div class="space-y-4 max-h-96 overflow-y-auto px-4">
        {#each data.messages as message}
          <div
            class="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-xl p-4
                       shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]
                       transition-all duration-300"
          >
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-cyan-300 font-mono text-lg font-bold">
                >_ {message.name}
                <span class="text-purple-400 text-sm"
                  >({message.country || "Unknown"})</span
                >
              </h3>
              <span class="text-white/40 text-xs font-mono">
                {message.createdAt
                  ? new Date(message.createdAt).toLocaleDateString()
                  : "Just now"}
              </span>
            </div>
            <p class="text-white/80 text-sm mb-2">{message.message}</p>
            <div class="flex items-center gap-2">
              <span class="text-xs text-pink-400/70 font-mono"
                >[FETISH: {message.fetish}]</span
              >
            </div>
          </div>
        {:else}
          <div
            class="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-xl p-8 text-center"
          >
            <p class="text-cyan-300/60 font-mono">No Messages Yet</p>
            <p class="text-white/40 text-sm mt-2">
              Be the first to leave a trace...
            </p>
          </div>
        {/each}
      </div>
    </div>

    <!-- FORM SECTION -->
    <div
      class="w-full max-w-md p-6 rounded-xl bg-black/40 backdrop-blur-sm border border-purple-500/30
                shadow-[0_0_30px_rgba(168,85,247,0.3)]"
    >
      <div class="flex items-center space-x-3 mb-6">
        <div class="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
        <span class="text-cyan-300 font-mono text-sm"
          >>_ SIGN THE GUESTBOOK</span
        >
      </div>

      <form method="POST" use:enhance>
        <div class="space-y-4">
          <div>
            <label class="text-purple-300 font-mono text-sm block mb-2"
              >IDENTIFICATION</label
            >
            <input
              type="text"
              name="name"
              bind:value={name}
              required
              class="w-full bg-black/50 border border-purple-500/30 rounded-lg px-4 py-2
                       text-white font-mono text-sm focus:outline-none focus:border-cyan-400
                       focus:shadow-[0_0_10px_rgba(0,255,255,0.5)] transition-all"
              placeholder="Enter your name..."
            />
          </div>

          <div>
            <label class="text-purple-300 font-mono text-sm block mb-2"
              >FETISH CODE</label
            >
            <input
              type="text"
              name="fetish"
              bind:value={fetish}
              required
              class="w-full bg-black/50 border border-purple-500/30 rounded-lg px-4 py-2
                       text-white font-mono text-sm focus:outline-none focus:border-pink-400
                       focus:shadow-[0_0_10px_rgba(236,72,153,0.5)] transition-all"
              placeholder="Your deepest desire..."
            />
          </div>

          <div>
            <label class="text-purple-300 font-mono text-sm block mb-2"
              >MESSAGE TRANSMISSION</label
            >
            <textarea
              name="message"
              bind:value={message}
              required
              maxlength="500"
              rows="3"
              class="w-full bg-black/50 border border-purple-500/30 rounded-lg px-4 py-2
                       text-white font-mono text-sm focus:outline-none focus:border-cyan-400
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
            class="w-full mt-4 px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600
                       text-white font-mono text-sm tracking-wider uppercase
                       shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:shadow-[0_0_30px_rgba(236,72,153,0.6)]
                       hover:scale-105 transition-all duration-300"
          >
            TRANSMIT MESSAGE
          </button>
        </div>
      </form>
    </div>

    <!-- Grid overlay effect -->
    <div class="fixed inset-0 pointer-events-none opacity-10">
      <div
        class="w-full h-full"
        style="background-image: linear-gradient(0deg, transparent 24%, rgba(0,255,255,0.3) 25%, rgba(0,255,255,0.3) 26%, transparent 27%, transparent 74%, rgba(0,255,255,0.3) 75%, rgba(0,255,255,0.3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0,255,255,0.3) 25%, rgba(0,255,255,0.3) 26%, transparent 27%, transparent 74%, rgba(0,255,255,0.3) 75%, rgba(0,255,255,0.3) 76%, transparent 77%, transparent); background-size: 50px 50px;"
      ></div>
    </div>

    <!-- Vignette effect -->
    <div
      class="fixed inset-0 pointer-events-none bg-gradient-to-t from-black/50 to-transparent"
    ></div>
  </div>
</div>
