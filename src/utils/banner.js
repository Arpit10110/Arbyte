import chalk from "chalk";
import figlet from "figlet";

const GRADIENT = ["#22d3ee", "#38bdf8", "#818cf8", "#a78bfa", "#c084fc"];

const colorAt = (index, total) => {
  const t = total <= 1 ? 0 : index / (total - 1);
  const scaled = t * (GRADIENT.length - 1);
  const lower = Math.floor(scaled);
  const upper = Math.min(lower + 1, GRADIENT.length - 1);
  const mix = scaled - lower;

  const hexToRgb = (hex) => [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];

  const [r1, g1, b1] = hexToRgb(GRADIENT[lower]);
  const [r2, g2, b2] = hexToRgb(GRADIENT[upper]);
  const r = Math.round(r1 + (r2 - r1) * mix);
  const g = Math.round(g1 + (g2 - g1) * mix);
  const b = Math.round(b1 + (b2 - b1) * mix);

  return chalk.rgb(r, g, b);
};

const centerLine = (line, width) => {
  const pad = Math.max(0, width - line.length);
  const left = Math.floor(pad / 2);
  return `${" ".repeat(left)}${line}${" ".repeat(pad - left)}`;
};

const stylePreHeader = (text) => {
  const pink = chalk.hex("#f472b6");
  const cyan = chalk.hex("#22d3ee");
  const violet = chalk.hex("#a78bfa");

  return text
    .split("")
    .map((char, index) => {
      if ("✦◈▸◂~/·".includes(char)) return cyan(char);
      if (char === " ") return char;
      const colors = [pink, violet, cyan, pink];
      return colors[index % colors.length](char);
    })
    .join("");
};

export const drawBanner = ({
  title = "Arbyte",
  preHeader = "✦  ~/ dev Arpit  ✦",
  subtitle = "Modern CLI toolkit",
  version = "1.0.0",
  font = "ANSI Shadow",
} = {}) => {
  const rawArt = figlet.textSync(title, { font });
  const artLines = rawArt.split("\n").filter((line) => line.trim());
  const artWidth = Math.max(...artLines.map((line) => line.length));

  const footer = `v${version}  ·  ${subtitle}`;
  const boxWidth = Math.max(artWidth, footer.length, preHeader.length) + 4;

  const border = chalk.hex("#64748b");
  const muted = chalk.hex("#94a3b8");
  const accent = chalk.hex("#22d3ee");

  const top = `${accent("╭")}${border("─".repeat(boxWidth - 2))}${accent("╮")}`;
  const bottom = `${accent("╰")}${border("─".repeat(boxWidth - 2))}${accent("╯")}`;

  const preHeaderLine = stylePreHeader(centerLine(preHeader, boxWidth - 4));

  const coloredArt = artLines.map((line, index) => {
    const centered = centerLine(line, boxWidth - 4);
    return colorAt(index, artLines.length)(centered);
  });

  const divider = `${border("├")}${border("─".repeat(boxWidth - 2))}${border("┤")}`;
  const footerLine = `${muted(centerLine(footer, boxWidth - 4))}`;

  const body = [
    `${border("│")}  ${preHeaderLine}  ${border("│")}`,
    `${border("│")}${" ".repeat(boxWidth - 2)}${border("│")}`,
    ...coloredArt.map(
      (line) => `${border("│")}  ${line}  ${border("│")}`,
    ),
    divider,
    `${border("│")}  ${footerLine}  ${border("│")}`,
  ];

  console.log("");
  console.log(top);
  body.forEach((line) => console.log(line));
  console.log(bottom);
  console.log("");
};
