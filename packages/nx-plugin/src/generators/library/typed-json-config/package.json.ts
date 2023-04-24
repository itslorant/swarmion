import { joinPathFragments } from '@nrwl/devkit';

import { NormalizedSchema, PackageJson } from '../../types';

export const packageJson = (options: NormalizedSchema): PackageJson => ({
  name: `@${options.workspaceName}/${options.importPath}`,
  private: true,
  version: '1.0.0',
  license: 'UNLICENSED',
  sideEffects: false,
  files: ['dist'],
  type: 'module',
  main: 'dist/index.cjs',
  module: 'dist/index.js',
  types: 'dist/types/index.d.ts',
  scripts: {
    clean: 'rimraf dist *.tsbuildinfo',
    'format-check': `prettier --check . ${joinPathFragments(
      options.offsetFromRoot,
      '.prettierignore',
    )}`,
    'format-fix': `prettier --write . ${joinPathFragments(
      options.offsetFromRoot,
      '.prettierignore',
    )}`,
    'lint-fix': 'pnpm linter-base-config --fix',
    'lint-fix-all': 'pnpm lint-fix .',
    'linter-base-config': 'eslint --ext=js,ts',
    package:
      'pnpm clean && pnpm package-transpile && pnpm package-types && pnpm package-types-aliases',
    'package-transpile': 'tsup',
    'package-types': 'tsc -p tsconfig.build.json',
    'package-types-aliases': 'tsc-alias -p tsconfig.build.json',
    test: 'nx run format-check && nx run test-linter && nx run test-type && nx run test-unit && nx run test-circular',
    'test-circular': 'pnpm depcruise --config -- src',
    'test-linter': 'pnpm linter-base-config .',
    'test-type': 'tsc --noEmit --emitDeclarationOnly false',
    'test-unit': 'vitest run --coverage --passWithNoTests',
    watch: "pnpm clean dist && concurrently 'pnpm:package-* --watch'",
  },
  devDependencies: {
    '@types/node': 'latest',
    '@vitest/coverage-c8': 'latest',
    concurrently: 'latest',
    'dependency-cruiser': 'latest',
    eslint: 'latest',
    'json-schema-to-ts': 'latest',
    prettier: 'latest',
    rimraf: 'latest',
    'ts-node': 'latest',
    'tsc-alias': 'latest',
    tsup: 'latest',
    typescript: 'latest',
    'vite-tsconfig-paths': 'latest',
    vitest: 'latest',
  },
});
