
const ctx = window.game.getContext("2d");
ctx.font = "32px Courier New"
ctx.fillStyle = "#0F0"

function createImage({ width = 32, height = 32, r = 255, g = 255, b = 255, a = 255 }) {
  const imgData = ctx.createImageData(width, height);
  for (let i = 0; i < imgData.data.length; i += 4) {
    imgData.data[i + 0] = r;
    imgData.data[i + 1] = g;
    imgData.data[i + 2] = b;
    imgData.data[i + 3] = a;
  }
  return imgData
}

const sixtyFour = { width: 64, height: 64 }
const red = { r: 255, g: 0, b: 0 }
const exampleImage = createImage({ ...sixtyFour, ...red })

ctx.putImageData(exampleImage, 10, 10);
async function updateData() {
  const response = await fetch('/update');
  const data = await response.json();
  document.getElementById('output').textContent = data.message;
}