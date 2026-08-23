import sharp from "sharp";
const base = "C:/Users/user/Desktop/APP-RAMON/02. Reino UP/01. Identidade Visual/";
for (const n of ["logo.png", "Mascote-Transparente.png"]) {
  const img = sharp(base + n);
  const { width, height } = await img.metadata();
  const buf = await img.raw().toBuffer();
  const px = (x, y) => { const i = (y * width + x) * 3; return [buf[i], buf[i + 1], buf[i + 2]]; };
  const cantos = [px(0,0), px(width-1,0), px(0,height-1), px(width-1,height-1), px(Math.floor(width/2),0)];
  console.log(`${n} (${width}x${height}) cantos: ${cantos.map(c=>c.join(",")).join(" | ")}`);
}
