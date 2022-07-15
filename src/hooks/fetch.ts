import { fetchUrl } from "../utils/constant";

export const fetchData = async () => {
  let array = [] as FoodTrunkPropety[]; // 細切れの値をここに結合していく。
  const decoder = new TextDecoder();
  const response: any = await fetch(fetchUrl);
  const reader = await response.body.getReader();
  // ReadableStream.read()はPromiseを返す。
  // Promiseは{ done, value }として解決される。
  // データを読み込んだとき：doneはfalse, valueは値。
  // データを読み込み終わったとき：doneはtrue, valueはundefined。
  const readChunk = async ({
    done,
    value,
  }: {
    done: boolean;
    value: any | undefined;
  }) => {
    if (done) {
      return;
    }
    array = [...JSON.parse(decoder.decode(value) || "null"), ...array];
    await reader.read().then(readChunk);
  };
  await reader.read().then(readChunk);
  return array;
};
