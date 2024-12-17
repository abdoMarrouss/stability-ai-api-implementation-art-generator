import fs from "node:fs";
import axios from "axios";
import FormData from "form-data";

const prompts = [
  {
    "prompt": "A futuristic spaceship pilot in a high-tech cockpit, navigating through a dense asteroid field. The cockpit is filled with glowing holographic displays and controls, while the asteroids outside are illuminated by distant stars.",
    "imageName": "Spaceship-Pilot.png"
  },
  {
    "prompt": "A lone astronaut floating in the vastness of space, tethered to a small space station. The background features a breathtaking view of a colorful nebula, with distant stars twinkling in the infinite void.",
    "imageName": "Lone-Astronaut.png"
  },
  {
    "prompt": "A team of space marines in futuristic armor, landing on a hostile alien planet. The marines are armed and ready for combat, with an ominous, glowing alien structure visible in the distance. The planet’s surface is rugged and barren, with swirling dust storms.",
    "imageName": "Space-Marines.png"
  },
  {
    "prompt": "An intergalactic bounty hunter in a sleek, armored suit, standing atop a rocky outcrop on a distant moon. The bounty hunter holds a powerful blaster, and the background shows the vast expanse of space with a giant gas planet looming in the sky.",
    "imageName": "Bounty-Hunter.png"
  },
  {
    "prompt": "A mysterious alien being, with glowing eyes and ethereal wings, hovering in the center of a cosmic energy field. The background features swirling galaxies and a radiant energy source at the heart of the scene.",
    "imageName": "Alien-Being.png"
  },
  {
    "prompt": "A massive space battle taking place above a war-torn planet. Starfighters and battleships exchange laser fire, while explosions light up the dark void of space. Below, the planet’s surface is scarred with craters and burning cities.",
    "imageName": "Space-Battle.png"
  },
  {
    "prompt": "A space explorer in an advanced exosuit, standing at the edge of a deep space anomaly. The anomaly is a swirling vortex of dark matter, with lightning-like energy arcs spiraling around it. The explorer is scanning the anomaly with a futuristic device.",
    "imageName": "Anomaly-Explorer.png"
  },
  {
    "prompt": "A cosmic dragon soaring through the stars, its scales shimmering with the colors of distant galaxies. The dragon is surrounded by celestial bodies, and its wings leave a trail of stardust in the vastness of space.",
    "imageName": "Cosmic-Dragon.png"
  },
  {
    "prompt": "A space pirate captain standing on the deck of a massive starship, overlooking a planet in the midst of a solar storm. The captain is dressed in futuristic pirate attire, with a mechanical parrot on their shoulder and a laser cutlass at their side.",
    "imageName": "Space-Pirate-Captain.png"
  },
  {
    "prompt": "An ancient alien temple floating in space, surrounded by a ring of asteroids. The temple is adorned with glowing runes and mysterious symbols, with a large energy crystal hovering above it. The background features a star-filled sky and distant galaxies.",
    "imageName": "Alien-Temple.png"
  }
];


for (const { prompt, imageName } of prompts) {
  const formData = {
    prompt,
    style_preset: "neon-punk",
    aspect_ratio: "9:16",
    output_format: "png"
  };

  const response = await axios.postForm(
    `https://api.stability.ai/v2beta/stable-image/generate/core`,
    axios.toFormData(formData, new FormData()),
    {
      validateStatus: undefined,
      responseType: "arraybuffer",
      headers: {
        Authorization: `Bearer 'KEY HERE'`,
        Accept: "image/*"
      }
    }
  );

  if (response.status === 200) {
    fs.writeFileSync(`./space-neon-punk/${imageName}`, Buffer.from(response.data));
  } else {
    throw new Error(`${response.status}: ${response.data.toString()}`);
  }
}
