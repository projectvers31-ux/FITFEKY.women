/**
 * Export the exit-intent popup email queue as a CSV download.
 *
 * The queue lives in the browser's localStorage, so this runs in the
 * browser, not in Node. To use:
 *
 *   1. Open your live FitFeky site in the browser.
 *   2. Open DevTools (F12) and switch to the Console tab.
 *   3. Paste this whole file and press Enter.
 *   4. A file `fitfeky-emails-YYYY-MM-DD.csv` downloads.
 *
 * The queue is NOT cleared after export — re-run as often as you like,
 * then upload the CSV to ConvertKit / Mailchimp.
 *
 * Set CLEAR_QUEUE to true below to empty the queue after exporting.
 */
(() => {
  const KEY_QUEUE = "fitfeky_exit_popup_queue";
  const CLEAR_QUEUE = false;

  let emails: string[] = [];
  try {
    emails = JSON.parse(window.localStorage.getItem(KEY_QUEUE) ?? "[]");
  } catch {
    emails = [];
  }

  if (!Array.isArray(emails)) emails = [];

  if (!emails.length) {
    console.info("[fitfeky] Queue is empty — no emails to export.");
    return;
  }

  const today = new Date().toISOString().slice(0, 10);
  const csv =
    "email\n" + [...new Set(emails.map((e) => e.trim().toLowerCase()))].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `fitfeky-emails-${today}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);

  if (CLEAR_QUEUE) {
    try {
      window.localStorage.removeItem(KEY_QUEUE);
    } catch {
      /* ignore */
    }
  }

  console.info(`[fitfeky] Exported ${emails.length} email(s) → fitfeky-emails-${today}.csv`);
})();
