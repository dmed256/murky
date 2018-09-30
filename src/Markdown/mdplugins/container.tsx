import JSON5 from 'json5';
import mdit from 'markdown-it';

import {
  makeSourceError,
  nextNewlinePos,
  linesBetween,
} from './utils';


export interface ContainerInfo {
  __plugin: string,
  __depth: number,
  __inline: boolean,
  props: any,
}

type OpeningChars = `{` | `'` | `"` | `'''`;

const CLOSING_PAIRS = {
  '{': `}`,
  "'": `'`,
  '"': `"`,
  "'''": `'''`,
}

type CharStack = OpeningChars[];

const updateCharStack = (s: string, pos: number, charStack: CharStack): number => {
  if (charStack.length === 0) {
    return pos;
  }

  let i = pos;
  let closingChar = CLOSING_PAIRS[charStack[charStack.length - 1]];
  while ((i < s.length) && (charStack.length > 0)) {
    const c = s[i];

    switch (c) {
    case closingChar:
      charStack.pop();
      closingChar = CLOSING_PAIRS[charStack[charStack.length - 1]];
      break;
    case '\\':
      i += 1;
      break;
    default:
      if (c in CLOSING_PAIRS) {
        charStack.push(c as OpeningChars);
        closingChar = CLOSING_PAIRS[c];
      }
    }

    i += 1;
  }

  return i;
}

// Add multiline strings using '''
const escapeMultilineStrings = (s: string) => {
  const parts = s.split("'''");
  let escapedContent = '';
  for (let i = 0; i < parts.length; ++i) {
    const part = parts[i];
    if (i % 2) {
      const p = part.replace(/\n/g, '\\\n');
      escapedContent += `'${p}'`;
    } else {
      escapedContent += part;
    }
  }
  return escapedContent;
};

const container = (md: mdit.MarkdownIt) => {
  function parser(state: any, startLine: any) {
    const startPos = state.bMarks[startLine] + state.tShift[startLine];
    const src = state.src;

    // Make sure we start with at least :::
    if ((src[startPos] !== ':') ||
      (src.substring(startPos, startPos + 3) !== ':::')) {
        return false;
    }

    // Extract the delimiter, can include more than 3 ':' to help with nesting
    let pos = startPos + 3;
    for (; pos < src.length; ++pos) {
      if (src[pos] !== ':') {
        break;
      }
    }
    const delimiter = src.substring(startPos, pos);
    const depth = delimiter.length;
    const contentStartPos = pos;

    // Get the line and trim it
    let lineEndPos = nextNewlinePos(src, pos);
    let lineSrc = src.substring(pos, lineEndPos).trim();

    // Close token
    if (lineSrc.length === 0) {
        ++state.line;
      state.push('murky_container_close', 'murky', -1);
      return true;
    }

    // Split the plugin out
    const words = lineSrc.split(/\s+/);
    const plugin = words[0];
    let content = words.slice(1).join(' ');

    let inline = content.endsWith(delimiter);
    // Remove the delmiter
    if (inline) {
      content = content.substring(0, content.length - delimiter.length);
    }

    // Shorthand notation
    if (!content.startsWith('{')) {
      // Skip the '\n' character
      pos = lineEndPos + 1;
      content = `{${content}}`;
    } else {
      const bracePos = src.indexOf('{', pos);

      // Skip the initial {
      const charStack = ['{' as '{'];
      updateCharStack(content.substring(1), 0, charStack);

      if (charStack.length > 0) {
        pos = updateCharStack(src, lineEndPos, charStack);
        content += src.substring(lineEndPos, pos);
      }
      if (charStack.length > 0) {
        throw makeSourceError("Unable to find a closing '}'",
          src, bracePos);
      }
      pos = state.skipSpaces(pos);
      // Check if there is a closing :::*
      if (!inline) {
        inline = src.substring(pos, pos + delimiter.length) === delimiter;
      }
      if (inline) {
        pos += delimiter.length;
      }
    }

    pos = nextNewlinePos(src, pos) + 1;

    let info;
    const propsStr = escapeMultilineStrings(content);
    try {
      info = {
        __plugin: plugin,
        __depth: depth,
        __inline: inline,
        props: JSON5.parse(propsStr),
      };
    } catch (error) {
      console.error(propsStr);
      throw makeSourceError('Unable to parse',
        src, contentStartPos);
    }

    state.line = startLine + linesBetween(src, startPos, pos);

    const token = state.push('murky_container_open', 'murky', 1);
    token.info  = info;

    if (inline) {
      state.push('murky_container_close', 'murky', -1);
    }

    return true;
  }

  md.block.ruler.before('fence', 'murky', parser);
}

export default container;
