/**
 * Local dev-port guard.
 *
 * `npm run dev` is intentionally non-destructive: when 5175 already hosts
 * Forge, it reports the running server instead of failing with EADDRINUSE.
 * Stop/restart refuse to terminate a listener from another project unless the
 * caller deliberately uses `dev:force-restart`.
 */
import { execFileSync, spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const port = 5175;
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = new Set(process.argv.slice(2));

function output(command, commandArgs) {
  try {
    return execFileSync(command, commandArgs, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  } catch {
    return "";
  }
}

function listeners() {
  // fuser is present on standard Linux dev environments and only reports the
  // PIDs attached to the requested TCP port.
  return [...new Set((output("fuser", ["-n", "tcp", String(port)]) || "").match(/\d+/g) || [])];
}

function commandFor(pid) {
  return output("ps", ["-p", pid, "-o", "args="]) || "<command unavailable>";
}

function parentPid(pid) {
  const value = output("ps", ["-p", pid, "-o", "ppid="]);
  return /^\d+$/.test(value) ? value : null;
}

function isForgeListener(pid, command) {
  if (command.includes(root) || (command.includes("next") && command.includes("Forge/frontend"))) return true;

  // Next's listener is a child named `next-server`, whose own command does
  // not contain the project directory. Check its short parent chain so a
  // Forge server is still recognised without trusting unrelated listeners.
  let currentPid = parentPid(pid);
  for (let depth = 0; currentPid && depth < 4; depth += 1) {
    const parentCommand = commandFor(currentPid);
    if (parentCommand.includes(root) || parentCommand.includes("Forge/frontend")) return true;
    currentPid = parentPid(currentPid);
  }

  return false;
}

function printListeners(pids, commands) {
  console.log(`Port ${port} is already in use:`);
  pids.forEach((pid) => console.log(`  PID ${pid}: ${commands.get(pid)}`));
}

function start() {
  console.log(`Starting EventForge frontend at http://localhost:${port}`);
  const child = spawn("next", ["dev", "-p", String(port)], { cwd: root, stdio: "inherit", shell: process.platform === "win32" });
  child.on("exit", (code) => process.exit(code ?? 0));
}

function stop(pids, commands, force) {
  const foreign = pids.filter((pid) => !isForgeListener(pid, commands.get(pid)));
  if (foreign.length && !force) {
    printListeners(pids, commands);
    console.error("Refusing to stop a listener outside Forge. Run `npm run dev:force-restart` only if you intend to replace it.");
    process.exitCode = 1;
    return false;
  }
  pids.forEach((pid) => process.kill(Number(pid), "SIGTERM"));
  console.log(`Stopped ${pids.length} listener${pids.length === 1 ? "" : "s"} on port ${port}.`);
  return true;
}

const pids = listeners();
const commands = new Map(pids.map((pid) => [pid, commandFor(pid)]));

if (!pids.length) {
  if (args.has("--stop")) console.log(`Nothing is listening on port ${port}.`);
  else start();
} else if (args.has("--stop")) {
  stop(pids, commands, args.has("--force"));
} else if (args.has("--restart")) {
  if (stop(pids, commands, args.has("--force"))) setTimeout(start, 250);
} else {
  printListeners(pids, commands);
  if (pids.every((pid) => isForgeListener(pid, commands.get(pid)))) {
    console.log(`EventForge is already running at http://localhost:${port}`);
    console.log("Use `npm run dev:restart` to stop and restart it.");
  } else {
    console.log("Use `npm run dev:force-restart` only if you intend to replace this listener.");
  }
}
