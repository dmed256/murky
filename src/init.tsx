import { extend } from './Markdown/prism';
import { addPlugin } from './Markdown/tokenizer';
import * as plugins from './Markdown/plugins';
import { initBlog } from './blog';

const init = () => {
  initPrism();
  initPlugins();
  initBlog();
};

const initPrism = () => {
  // Init OKL and Bibtex languages
  extend('okl', 'cpp', {
    annotation: {
      pattern: /@[a-zA-Z][a-zA-Z0-9_]*/,
      greedy: true,
    },
  });
  extend('bibtex', 'latex');
};

const initPlugins = () => {
  Object
    .keys(plugins)
    .forEach((plugin) => {
      addPlugin(plugins[plugin]);
    });
};

export default init;
