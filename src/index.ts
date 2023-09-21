import { $ } from 'execa';

const run = async (): Promise<void> => {
  try {
    // Создаем новую директорию "test" и инициализируем npm проект
    await $`mkdir test && cd test && npm init -y`;
  } catch (e: any) {
    console.error(e);
  }
};

run().catch((e) => {
  console.error(e);
});
