import { $ } from 'execa';

const cleanup = async (): Promise<void> => {
  await $`cd ../`;
  await $`rm -rf test`;
};

const run = async (): Promise<void> => {
  try {
    // Создаем новую директорию "test" и инициализируем npm проект
    await $`mkdir test`;
    await $`cd test`;
    await $`npm init -y`;
    // await cleanup();
  } catch (e) {
    console.error(e);
  }
};

run().catch((e) => {
  console.error(e);
});
