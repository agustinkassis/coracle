<script lang="ts">
  import {onMount} from "svelte"
  import Anchor from "src/partials/Anchor.svelte"
  import {menuIsOpen} from "src/app/ui"
  import {newNotifications} from "src/app/listener"
  import {theme} from "src/app/ui"

  const toggleMenu = () => menuIsOpen.update(x => !x)
  const toggleTheme = () => theme.update(t => (t === "dark" ? "light" : "dark"))

  onMount(() => {
    document.querySelector("html").addEventListener("click", e => {
      if (!(e.target as any).matches(".fa-bars")) {
        menuIsOpen.set(false)
      }
    })
  })
</script>

<div
  class="fixed top-0 z-10 flex h-16 w-full items-center justify-between border-b
            border-gray-6 bg-gray-7 p-4 text-gray-3">
  <div class="fa fa-bars fa-2xl cursor-pointer lg:hidden" on:click={toggleMenu} />
  <div class="flex items-center gap-4">
    <Anchor external type="unstyled" href="https://coracle.social" class="flex items-center gap-2">
      <img alt="Coracle Logo" src="/images/logo.png" class="w-8" />
      <h1 class="staatliches text-3xl">LA CRYPTA</h1>
    </Anchor>
    <i class="fa fa-lightbulb cursor-pointer text-lg" on:click={toggleTheme} />
  </div>
  {#if $newNotifications}
    <div class="absolute top-4 left-12 h-2 w-2 rounded bg-accent lg:hidden" />
  {/if}
</div>
