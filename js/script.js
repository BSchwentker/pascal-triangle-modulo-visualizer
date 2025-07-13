// script.js
// Logic for rendering Pascal's Triangle modulo pattern with responsive zoom and layout
// Author: Björn Schwentker

let fontSize = 6;
const MIN_FONT = 1;
const MAX_FONT = 20;

// Determine display mode based on URL parameter ?v=rest
const urlParams = new URLSearchParams(window.location.search);
const mode = urlParams.get("v") === "rest" ? "rest" : "standard";

// Switch visibility of output elements depending on mode
window.addEventListener("DOMContentLoaded", () => {
  const textOutput = document.getElementById("output");
  const htmlOutput = document.getElementById("html-output");

  if (mode === "rest") {
    textOutput.classList.add("hidden");
    htmlOutput.classList.remove("hidden");
    htmlOutput.classList.add("visible");
  } else {
    htmlOutput.classList.add("hidden");
    textOutput.classList.remove("hidden");
    textOutput.classList.add("visible");
  }
});

/**
 * Generates Pascal's triangle modulo a given divisor.
 * Outputs the pattern using "·" and "V" to a text area.
 */
function generatePattern() {
  const rows = Math.min(Math.max(parseInt(document.getElementById("rows").value), 1), 5000);
  const divisor = parseInt(document.getElementById("mod").value) || 2;
  let output = "\n\n";
  let currentRow = [1];

  for (let i = 0; i < rows; i++) {
    const symbols = currentRow.map(v => (v % divisor === 0 ? "V" : "·"));
    const padding = " ".repeat(rows - i);
    output += " " + padding + symbols.join(" ") + "\n";

    // Compute next row modulo the divisor
    let nextRow = [1];
    for (let j = 1; j < currentRow.length; j++) {
      nextRow[j] = (currentRow[j - 1] + currentRow[j]) % divisor;
    }
    nextRow.push(1);
    currentRow = nextRow;
  }

  const textarea = document.getElementById("output");
  const measurer = document.getElementById("measurer");

  textarea.value = output;
  textarea.style.fontSize = fontSize + "pt";
  measurer.style.fontSize = fontSize + "pt";
  measurer.textContent = output;

  updatePatternSizeOnly();
}

/**
 * Generates Pascal's triangle modulo a given divisor.
 * Outputs the pattern using "V", digits 1–9, or "·" into a styled HTML div.
 */
function generateHtmlPattern() {
  const colorMap = getDistinctColors(9); // for remainders 1–9
  const rows = Math.min(Math.max(parseInt(document.getElementById("rows").value), 1), 5000);
  const divisor = parseInt(document.getElementById("mod").value) || 2;
  let output = "\n\n";
  let currentRow = [1];

  for (let i = 0; i < rows; i++) {
    const symbols = currentRow.map(v => {
      const mod = v % divisor;
      if (mod === 0) return "V";
      if (mod >= 1 && mod <= 9) {
        const color = colorMap[mod - 1];
        return `<span style="color: ${color}">${mod}</span>`;
      }
      return "·";
    });

    const padding = " ".repeat(rows - i);
    output += " " + padding + symbols.join(" ") + "\n";

    // Compute next row modulo the divisor
    let nextRow = [1];
    for (let j = 1; j < currentRow.length; j++) {
      nextRow[j] = (currentRow[j - 1] + currentRow[j]) % divisor;
    }
    nextRow.push(1);
    currentRow = nextRow;
  }

  const htmlOutput = document.getElementById("html-output");
  htmlOutput.innerHTML = output;
  htmlOutput.style.fontSize = fontSize + "pt";

  const measurer = document.getElementById("measurer");
  measurer.style.fontSize = fontSize + "pt";
  measurer.textContent = output;

  updatePatternSizeOnly();
}



/**
 * Updates the text area dimensions based on the content size
 * but limits size to a percentage of the viewport.
 */
function updatePatternSizeOnly() {
  const textarea = document.getElementById("output");
  const measurer = document.getElementById("measurer");

  const height = Math.min(measurer.scrollHeight + 30, window.innerHeight * 0.85);
  const width = Math.min(measurer.scrollWidth + 20, window.innerWidth * 0.9);

  textarea.style.height = `${height}px`;
  textarea.style.width = `${width}px`;
}

/**
 * Scrolls the text area horizontally to center its content.
 */
function centerHorizontally() {
  if (mode === "rest") {
    const outputArea = document.getElementById("html-output");
    outputArea.scrollLeft = (outputArea.scrollWidth - outputArea.clientWidth) / 2;
  } else {
    const textarea = document.getElementById("output");
    textarea.scrollLeft = (textarea.scrollWidth - textarea.clientWidth) / 2;
  }

}

/**
 * Regenerates the triangle pattern and re-centers it horizontally.
 */
/**
 * Regenerates the triangle pattern and re-centers it horizontally.
 */
function updatePatternAndCenter() {
  if (mode === "rest") {
    generateHtmlPattern();
  } else {
    generatePattern();
  }
  setTimeout(centerHorizontally, 0);
}

/**
 * Generates N visually distinct colors using HSL color space.
 * @param {number} n - Number of colors to generate
 * @returns {string[]} Array of CSS color strings
 */
function getDistinctColors(n) {
  const colors = [];
  for (let i = 0; i < n; i++) {
    const hue = Math.round((360 / n) * i); // evenly spaced hues
    const color = `hsl(${hue}, 80%, 50%)`; // high saturation + medium lightness
    colors.push(color);
  }
  return colors;
}

/**
 * Changes the font size (zoom in/out) within bounds.
 * @param {number} direction + to zoom in, - to zoom out
 */
function changeZoom(direction) {
  const newSize = fontSize + direction;
  if (newSize >= MIN_FONT && newSize <= MAX_FONT) {
    fontSize = newSize;
    updatePatternAndCenter();
  }
}

/**
 * Displays the overlay with additional information.
 */
function openInfo() {
  document.getElementById("overlay").style.display = "flex";
}

/**
 * Hides the info overlay.
 * @param {Event} event - Used to prevent propagation if needed
 */
function closeInfo(event) {
  document.getElementById("overlay").style.display = "none";
}

const rowsInput = document.getElementById("rows");

rowsInput.addEventListener("input", function () {
  let value = parseInt(this.value, 10);

  if (isNaN(value) || value < 1) value = 1;
  if (value > 5000) value = 5000;

  this.value = value;
});
rowsInput.addEventListener("change", updatePatternAndCenter);

// Event bindings
window.addEventListener('resize', updatePatternSizeOnly);
window.addEventListener('load', updatePatternAndCenter);
