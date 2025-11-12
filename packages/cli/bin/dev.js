#!/usr/bin/env -S node --use-system-ca --disable-warning=DEP0180 --loader ts-node/esm --disable-warning=ExperimentalWarning

import { execute } from "@oclif/core";

await execute({ development: true, dir: import.meta.url });
