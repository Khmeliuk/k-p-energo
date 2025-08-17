export default function sortByDate(tasks, criteria) {
  const now = new Date();
  const fiveDaysAgo = new Date();
  fiveDaysAgo.setDate(now.getDate() - 5);

  return [...tasks]
    .filter((task) => {
      const date = new Date(task.createDate);

      if (criteria === "last_5_days") {
        return date >= fiveDaysAgo && date <= now;
      }
      return true;
    })
    .sort((a, b) => {
      const dateA = new Date(a.createDate);
      const dateB = new Date(b.createDate);

      if (criteria === "new") {
        return dateB - dateA; // новіші спочатку
      }
      if (criteria === "old") {
        return dateA - dateB; // старіші спочатку
      }
      return 0;
    });
}
