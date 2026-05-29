<script lang="ts">
  let { data } = $props()

  // Provide a default value if blogPost is undefined
  let { blogPost } = data

  console.log("blogPost:", blogPost)
</script>

<div class="fixed-bg-container">
  <div class="fixed-bg-image"></div>
  <div class="content">
    <article class="flex">
      <video autoplay loop muted style="width: 50%; height: auto;">
        <source
          src="https://res.cloudinary.com/dzma12njh/video/upload/v1779993303/8.mp4"
          type="video/mp4"
        />
      </video>
      <h1>Dynamic booty</h1>
      <p>Eat and sniff</p>

      <!-- This will now show the default text -->
      <p>{blogPost}</p>
    </article>
  </div>
</div>

<style>
  .fixed-bg-container {
    position: relative;
    min-height: 100vh;
  }

  .fixed-bg-image {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("https://res.cloudinary.com/dzma12njh/image/upload/9.webp");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.3;
    z-index: 1;
  }

  .content {
    position: relative;
    z-index: 2;
  }

  .flex {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 2rem;
  }

  h1 {
    color: white;
    font-size: 3rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  }

  p {
    color: white;
    font-size: 1.5rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  }

  /* Make the blogPost paragraph stand out */
  p:last-of-type {
    background-color: rgba(0, 0, 0, 0.7);
    padding: 10px 20px;
    border-radius: 8px;
    color: #ffcc00;
    font-weight: bold;
  }
</style>
