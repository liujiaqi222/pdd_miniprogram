require("dotenv-flow").config();

console.log(process.env.URL_PREFIX, "dev");

module.exports = {
  env: {
    NODE_ENV: '"development"',
    URL_PREFIX: `"${process.env.URL_PREFIX}"`,
  },
  defineConstants: {},
  mini: {},
  h5: {},
};

