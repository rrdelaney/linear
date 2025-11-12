# @linear/cli

CLI interface for Linear

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@linear/cli.svg)](https://npmjs.org/package/@linear/cli)
[![Downloads/week](https://img.shields.io/npm/dw/@linear/cli.svg)](https://npmjs.org/package/@linear/cli)

<!-- toc -->

- [@linear/cli](#linearcli)
- [Usage](#usage)
- [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->

```sh-session
$ npm install -g @linear/cli
$ linear COMMAND
running command...
$ linear (--version)
@linear/cli/0.0.0 darwin-arm64 node-v24.11.0
$ linear --help [COMMAND]
USAGE
  $ linear COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [`linear hello PERSON`](#linear-hello-person)
- [`linear hello world`](#linear-hello-world)
- [`linear help [COMMAND]`](#linear-help-command)
- [`linear version [FILE]`](#linear-version-file)

## `linear hello PERSON`

Say hello

```
USAGE
  $ linear hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ linear hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [src/commands/hello/index.ts](https://github.com/linear/linear-app/blob/v0.0.0/src/commands/hello/index.ts)_

## `linear hello world`

Say hello world

```
USAGE
  $ linear hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ linear hello world
  hello world! (./src/commands/hello/world.ts)
```

_See code: [src/commands/hello/world.ts](https://github.com/linear/linear-app/blob/v0.0.0/src/commands/hello/world.ts)_

## `linear help [COMMAND]`

Display help for linear.

```
USAGE
  $ linear help [COMMAND...] [-n]

ARGUMENTS
  [COMMAND...]  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for linear.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.35/src/commands/help.ts)_

## `linear version [FILE]`

describe the command here

```
USAGE
  $ linear version [FILE] [--api-key <value>] [-f] [-n <value>]

ARGUMENTS
  [FILE]  file to read

FLAGS
  -f, --force
  -n, --name=<value>  name to print

GLOBAL FLAGS
  --api-key=<value>  [env: LINEAR_API_KEY] Use the given API key for authentication.

DESCRIPTION
  describe the command here

EXAMPLES
  $ linear version
```

_See code: [src/commands/version.ts](https://github.com/linear/linear-app/blob/v0.0.0/src/commands/version.ts)_

<!-- commandsstop -->
