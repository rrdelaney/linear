#!/usr/bin/env node --use-system-ca --disable-warning=DEP0040

import { execute } from "@oclif/core";

await execute({ dir: import.meta.url });
