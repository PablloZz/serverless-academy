const NEWLINES_MATCH = /\r\n|\n|\r/;
const NEWLINE = "\n";
const RE_INI_KEY_VAL = /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/;
const RE_NEWLINES = /\\n/g;

function parseBuffer(dataToParse) {
  const parsedData = {};

  dataToParse.split(NEWLINES_MATCH).forEach(line => {
    const keyValueInfo = line.match(RE_INI_KEY_VAL);

    if (keyValueInfo !== null) {
      const key = keyValueInfo[1];

      let value = keyValueInfo[2] || "";
      const lastCharacterPosition = value.length - 1;
      const isDoubleQuoted =
        value[0] === '"' && value[lastCharacterPosition] === '"';
      const isSingleQuoted =
        value[0] === "'" && value[lastCharacterPosition] === "'";

      if (isSingleQuoted || isDoubleQuoted) {
        value = value.substring(1, lastCharacterPosition);

        if (isDoubleQuoted) {
          value = value.replace(RE_NEWLINES, NEWLINE);
        }
      } else {
        value = value.trim();
      }
      parsedData[key] = value;
    }
  });

  return parsedData;
}

export { parseBuffer };
