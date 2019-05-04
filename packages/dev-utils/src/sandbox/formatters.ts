import path from "path";
import { isRelative, isAliased } from "./matchers";

/**
 * A small util that will make a "pretty" module name from the provided
 * file path.
 */
export function getModuleName(filePath: string, scss: boolean = false) {
  if (/csstype|prop-types/.test(filePath)) {
    return "";
  } else if (scss && filePath.includes("@react-md")) {
    return filePath.replace(/^.*(@react-md\/[a-z-]+)\/.+$/, "$1");
  }

  return filePath
    .replace(/.*node_modules\//, "")
    .replace(/\/(types|dist\/).+$/, "")
    .replace(/.+documentation\//, "")
    .replace(/prismjs.+/, "prismjs")
    .replace(/.*@types\/([a-z-]+)(\/.+)?$/, "$1");
}

/**
 * This function is used to apply transformations to the source contents
 * to work within sandboxes. So this is normally used to simplify the examples
 * or remove code that's only needed for the documentation site.
 */
export function getFileSource(source: string) {
  return source.replace(
    /import useAppSizeContext.+;/g,
    'import { useAppSizeContext } from "@react-md/sizing";'
  );
}

/**
 * Returns a filtered list of modules that are considered relative imports
 * so that additional custom resolution can be done.
 */
export function getRelativeModules(modules: string[]) {
  return modules.filter(isRelative);
}

export function getAliasedImports(imports: string[], aliases: string[]) {
  return imports.filter(name => isAliased(name, aliases));
}

/**
 * Finds the relative or parent folder of the provided file path. This really only works
 * for files right now and will return incorrect results for folders (maybe)
 */
export function getRelativeFolder(filePath: string, start: number = 0) {
  return filePath.substring(start, filePath.lastIndexOf(path.sep));
}

export function getAliasedRelativeFolder(filePath: string, aliases: string[]) {
  const alias = aliases.find(a => filePath.includes(a));
  let start = 0;
  if (alias) {
    start = filePath.indexOf(alias);
  }

  return getRelativeFolder(filePath, start);
}
