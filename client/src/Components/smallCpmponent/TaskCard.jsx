import { motion } from "framer-motion";

const TaskCard = ({ name, department, address, tasks, comment, date }) => {
  console.log("====================================");
  console.log({ name, department, address, tasks, comment, date }, "task");
  console.log("====================================");
  return (
    <motion.div
      className="bg-white shadow-lg rounded-2xl p-4 sm:p-6 w-full max-w-md mx-auto my-4 border border-gray-100"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{name}</h2>

      <div className="text-sm text-gray-600 mb-2">
        <span className="font-medium">Відділ:</span> {department}
      </div>

      <div className="text-sm text-gray-600 mb-2">
        <span className="font-medium">Адреса:</span> {address}
      </div>

      {date && (
        <div className="text-sm text-gray-600 mb-2">
          <span className="font-medium">Час:</span>{" "}
          {typeof time === "string"
            ? date
            : new Date(date).toLocaleString("uk-UA", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
        </div>
      )}

      <div className="text-sm text-gray-600 mb-2">
        <span className="font-medium">Задачі:</span>{" "}
        {Array.isArray(tasks)
          ? tasks.map((task, i) => (
              <li key={i} className="list-disc ml-4">
                {task}
              </li>
            ))
          : tasks}
      </div>

      {comment && (
        <div className="text-sm text-gray-700 mt-3">
          <span className="font-medium">Коментар:</span> {comment}
        </div>
      )}
    </motion.div>
  );
};

export default TaskCard;
