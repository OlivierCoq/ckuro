<template>
  <div class="h-[100vh] w-full relative">
    <canvas id="c" class="w-full h-full absolute z-0"></canvas>
    <div class="w-full h-full absolute z-10 bg-black opacity-[0.5]"></div>
    <slot />
  </div>
</template>
<script setup>
// config/setup
const config = useRuntimeConfig();
import qs from "qs";

// import onMounted:
import { onMounted, reactive } from "vue";

const state = reactive({
  nav_links: [],
});

fetch(
  `${config.public.NUXT_STRAPI_URL}/api/site-nav?${qs.stringify(
    {
      populate: ["links", "links.imagery"],
    },
    { arrayFormat: "comma" },
  )}`,
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  },
).then(async (data) => {
  const res = await data.json();
  // console.log("fuuuuuuuuck", res.data);
  state.nav_links = res.data.links;
});

onMounted(() => {
  // geting canvas by Boujjou Achraf. Thank you, Boujjou Achraf! https://codepen.io/wefiy/pen/WPpEwo
  var c = document.getElementById("c");
  var ctx = c.getContext("2d");

  //making the canvas full screen
  c.height = window.innerHeight;
  c.width = window.innerWidth;

  //chinese characters - taken from the unicode charset
  var matrix =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
  //converting the string into an array of single characters
  matrix = matrix.split("");

  var font_size = 10;
  var columns = c.width / font_size; //number of columns for the rain
  //an array of drops - one per column
  var drops = [];
  //x below is the x coordinate
  //1 = y co-ordinate of the drop(same for every drop initially)
  for (var x = 0; x < columns; x++) drops[x] = 1;

  //drawing the characters
  function draw() {
    //Black BG for the canvas
    //translucent BG to show trail
    ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.fillStyle = "#f4427d"; // text color
    ctx.font = font_size + "px arial";
    //looping over drops
    for (var i = 0; i < drops.length; i++) {
      //a random chinese character to print
      var text = matrix[Math.floor(Math.random() * matrix.length)];
      //x = i*font_size, y = value of drops[i]*font_size
      ctx.fillText(text, i * font_size, drops[i] * font_size);

      //sending the drop back to the top randomly after it has crossed the screen
      //adding a randomness to the reset to make the drops scattered on the Y axis
      if (drops[i] * font_size > c.height && Math.random() > 0.975)
        drops[i] = 0;

      //incrementing Y coordinate
      drops[i]++;
    }
  }

  setInterval(draw, 35);
});
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

body {
  background: black;
}
canvas {
  display: block;
}
.ctr-main {
  border: 1px solid #8d8484;
  min-width: 655px;
  max-width: 655px;
  // screens below 655px:
  @media (max-width: 655px) {
    min-width: 100%;
    max-width: 100%;
  }
}
.main-ctr {
  max-width: 1000px;
}
</style>
