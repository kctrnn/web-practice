import { PathSlug } from 'models';

export const getPathName = (pathSlug: PathSlug) => {
  switch (pathSlug) {
    case 'front-end-developer':
      return 'Front-end Developer';
    case 'full-stack-developer':
      return 'Full-stack Developer';
    case 'responsive-web-developer':
      return 'Responsive Web Developer';
  }
};

export const getPathIntro = (pathSlug: PathSlug) => {
  switch (pathSlug) {
    case 'front-end-developer':
      return 'Become Front-end Developer by building 8 real-life projects, you can use any Front-end frameworks';
    case 'full-stack-developer':
      return 'Become a Full-stack developer by building 8 advanced full-stack web applications';
    case 'responsive-web-developer':
      return 'Learn and Practice Responsive Web Development by building 8 Websites with given designs';
  }
};

export const getPathDesc = (pathSlug: PathSlug) => {
  switch (pathSlug) {
    case 'front-end-developer':
      return '- Practice **React, Vue, or other front-end libraries**\n- Become **Front-end developer**\n- Building websites with **real-life practices**';
    case 'full-stack-developer':
      return '- Practice **Front-end libraries and build complete applications**\n- Become **Full-stack developer**\n- Building websites with **real-life practices**';
    case 'responsive-web-developer':
      return '- Start with **Coding**\n- Practice **HTML, CSS, and basic JavaScript**\n- Building websites with **real-life practices**';
  }
};

export const getPathRule = (pathSlug: PathSlug) => {
  switch (pathSlug) {
    case 'front-end-developer':
      return '##### Rules:\n\n- 💁🏻‍♂️ **Use a Front-end Framework** and choose any Frameworks or Libraries\n- 💁🏻‍♂️ **Fulfill** all the user stories\n- 💁🏻‍♂️ **Follow the design**, you can add animations, new pages, empty state,...\n- 🙅🏻 **Do not copy** existing solutions';
    case 'full-stack-developer':
      return '##### Rules:\n\n- 💁🏻‍♂️ **Use a Front-end Framework** and choose any Frameworks or Libraries\n- 💁🏻‍♂️ **Build your own API**\n- 💁🏻‍♂️ **Fulfill** all the user stories\n- 💁🏻‍♂️ **Follow the design**, you can add animations, new pages, empty state,...\n- 🙅🏻 **Do not copy** existing solutions';
    case 'responsive-web-developer':
      return '##### Rules:\n\n- 💁🏻‍♂️ **Recommend** to use only HTML, CSS, and JavaScript\n- 💁🏻‍♂️ **Fulfill** all the user stories\n- 💁🏻‍♂️ **Follow the design**, you can add animations, change images,...\n- 🙅🏻 **Do not copy** existing solutions';
  }
};
