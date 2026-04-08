const major = Number.parseInt(process.versions.node.split(".")[0] ?? "", 10);
const allowedMajors = new Set([22, 25]);

if (!allowedMajors.has(major)) {
  console.error(
    [
      "",
      "Dayboard requires Node 22.x or 25.x.",
      `Current Node version: ${process.version}`,
      "",
      "Use one of these supported versions before running dev/build:",
      'export NVM_DIR="$HOME/.nvm"',
      '[ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && . "/opt/homebrew/opt/nvm/nvm.sh"',
      "nvm use 22",
      "or",
      "nvm use 25",
      "",
    ].join("\n"),
  );
  process.exit(1);
}
