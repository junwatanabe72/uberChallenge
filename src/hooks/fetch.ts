import { fetchUrl } from "../utils/constant";

export const fetchData = async () => {
  let array = [] as FoodTrunkPropety[]; // 細切れの値をここに結合していく。
  const decoder = new TextDecoder();
  const response: Response = await fetch(fetchUrl);
  const reader = response?.body?.getReader();
  if (!reader) {
    return;
  }
  const readChunk = async ({
    done,
    value,
  }: {
    done: boolean;
    value: BufferSource | undefined;
  }) => {
    if (done) {
      return;
    }
    array = [...JSON.parse(decoder.decode(value) || "null"), ...array];
    await reader.read().then(({ done, value }) => {
      readChunk({ done, value });
    });
  };
  await reader.read().then(({ done, value }) => {
    readChunk({ done, value });
  });
  return array;
};
