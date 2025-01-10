import fs from "fs";
import readline from "readline";
import chalk from "chalk";

function followFileWithFilter(filePath, filterString) {
  const today = new Date().toISOString().split("T")[0].replace(/-/g, "/");
  let lastSize = 0;

  const processLine = (line) => {
    if (line.includes(filterString) && line.startsWith(today)) {
      const entryPart = "New Message:";

      const dateToBracketMatch = line.match(/^[^\]]*\]/);
      const dateToBracket = dateToBracketMatch
        ? dateToBracketMatch[0]
        : "Unknown";

      const fromIndex = line.indexOf("@From");
      const fromMessage =
        fromIndex !== -1 ? line.slice(fromIndex) : "No message";

      const styledLine = `${chalk.green(entryPart)} ${chalk.cyan(
        dateToBracket
      )} ${chalk.redBright(fromMessage)}`;
      console.log(styledLine);
    }
  };

  const readFile = (start, end) => {
    const stream = fs.createReadStream(filePath, { start, end });
    const rl = readline.createInterface({ input: stream });

    rl.on("line", (line) => {
      processLine(line);
    });

    rl.on("close", () => {
      lastSize = end;
    });
  };

  fs.stat(filePath, (err, stats) => {
    if (err) {
      console.error(chalk.red("Error reading file:"), err);
      return;
    }

    lastSize = stats.size;
    readFile(0, stats.size - 1);
  });

  fs.watchFile(filePath, { interval: 100 }, (curr, prev) => {
    if (curr.size > prev.size) {
      readFile(prev.size, curr.size - 1);
    }
  });

  console.log(chalk.yellow(`Started following file: ${filePath}`));
}

const filePath =
  "d:/SteamLibrary/steamapps/common/Path of Exile 2/logs/client.txt"; // Replace with your Path of Exile 2 file path
const filterString = "@From"; // String to filter the message - Use @From to filter whispers
followFileWithFilter(filePath, filterString);
