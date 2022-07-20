import { fetchData } from "../hooks/fetch";

describe("fetchData", () => {
  test("fetche food Trunks", async () => {
    const items = await fetchData();
    expect(items).toHaveLength(488);
  });
});
