const major = Number.parseInt(process.versions.node.split(".")[0] ?? "", 10);

if (major !== 25) {
  console.error(
    [
      "",
      `Dayboard requires Node 25.x for local development.`,
      `Current Node version: ${process.version}`,
      "",
      "Load Node 25 before running dev/build:",
      'export NVM_DIR="$HOME/.nvm"',
      '[ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && . "/opt/homebrew/opt/nvm/nvm.sh"',
      "nvm use 25",
      "",
    ].join("\n"),
  );
  process.exit(1);
}
