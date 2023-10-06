// #!/usr/bin/env zx

import { $, cd } from "zx";
import { emptyDir, ensureDir } from "https://deno.land/std@0.203.0/fs/mod.ts";

async function getJson(filePath: string) {
  try {
    return JSON.parse(await Deno.readTextFile(filePath));
  } catch (e) {
    console.log(filePath + ": " + e.message);
  }
}

const getPackageName = async () => {
  const packageJson = await getJson("./package.json");
  return `${packageJson.name}-${packageJson.version}.tgz`;
};

const run = async (): Promise<void> => {
  try {
    const timestamp = `${Date.now()}`;
    const packName = await getPackageName();
    const tmpDir = `./.checkup-pack/.temp`;
    const workDir = `${tmpDir}/${timestamp}`;

    // Clean up
    await emptyDir(tmpDir);
    await ensureDir(workDir);

    // Pack
    await $`npm pack`;
    await $`mv ./${packName} ${workDir}`;
    cd(workDir);

    // NPM
    await $`npm init -y`;
    await $`npm install ${packName}`;
  } catch (e) {
    console.error(e);
  }
};

run().catch((e) => {
  console.error(e);
});
