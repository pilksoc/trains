const fs = require("fs");
const path = require("path");
const mcDir = process.env.CC_ROOT_DIR;

if (!mcDir) {
  throw new Error("Please set the CC_ROOT_DIR environment variable");
}

const monorepo = path.resolve(__dirname, "..");

console.log(monorepo);

const copyFile = (filepath, destname) => {
  const sourceFile = path.resolve(monorepo, filepath);
  const destFile = path.resolve(mcDir, destname);
  console.log(sourceFile);
  console.log(destFile);
  fs.copyFileSync(sourceFile, destFile);
};

copyFile("station/dist/station.lua", "station");
copyFile("station/resources/scotrail.dfpwm", "scotrail.dfpwm");
