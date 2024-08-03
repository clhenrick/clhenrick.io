const { light, dark } = require("a11y-syntax-highlighting/dist/json/a11y.json");

// background colors
const lightBackgroundColor = getCssColorVars(light.background);
const darkBackgroundColor = getCssColorVars(dark.background);

// foreground colors
const lightForegroundColors = getCssColorVars(light.foreground);
const darkForegroundColors = getCssColorVars(dark.foreground);

function getCssColorVars(colorsObject) {
  return Object.entries(colorsObject).reduce((acc, [key, value]) => {
    acc = [...acc, `--color-syntax-${key}: ${value.code.hex};`];
    return acc;
  }, []).join("\n");
}

module.exports = `${lightBackgroundColor}\n${darkBackgroundColor}\n${lightForegroundColors}\n${darkForegroundColors}`;
