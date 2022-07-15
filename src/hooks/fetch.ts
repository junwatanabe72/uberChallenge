import { fetchUrl } from "../utils/constant";

export const fetchData = async (
  cal: React.Dispatch<React.SetStateAction<any[]>>
) => {
  let array = [] as any[]; // 細切れの値をここに結合していく。
  const decoder = new TextDecoder();
  await fetch(fetchUrl)
    .then((response: any) => response.body.getReader()) // ReadableStreamを取得する。
    .then((reader) => {
      // ReadableStream.read()はPromiseを返す。
      // Promiseは{ done, value }として解決される。
      // データを読み込んだとき：doneはfalse, valueは値。
      // データを読み込み終わったとき：doneはtrue, valueはundefined。
      function readChunk({
        done,
        value,
      }: {
        done: boolean;
        value: any | undefined;
      }) {
        if (done) {
          cal(array);
          return;
        }
        array = [...JSON.parse(decoder.decode(value)), ...array];
        reader.read().then(readChunk);
      }
      reader.read().then(readChunk);
      return;
    });
};
