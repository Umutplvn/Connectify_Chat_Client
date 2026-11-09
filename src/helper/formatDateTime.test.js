import formatDateTime from "./formatDateTime";

describe("formatDateTime", () => {
  it("returns 'Today' for current date timestamps", () => {
    const nowIso = new Date().toISOString();
    expect(formatDateTime(nowIso)).toBe("Today");
  });

  it("returns 'Yesterday' for timestamps from 24 hours ago", () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    expect(formatDateTime(yesterday.toISOString())).toBe("Yesterday");
  });

  it("returns formatted MM/DD/YY string for older dates", () => {
    const oldDate = new Date(2024, 0, 15, 12, 0, 0);
    expect(formatDateTime(oldDate.toISOString())).toBe("01/15/24");
  });
});
