import JSON5 from 'json5';
import mdit from 'markdown-it';


export interface ContainerInfo {
  __plugin: string,
  __depth: number,
  __inline: boolean,
  props: any,
}

const makeSourceError = (message: string, src: string, pos: number) => {
  let linePos = 0;
  let errorLine = -1;
  const lines = src.split('\n').map((line, lineNumber) => {
    const thisLinePos = linePos;
    linePos += line.length + 1;
    // Find the error line
    if ((errorLine < 0) && (pos <= linePos)) {
      errorLine = lineNumber;
    }
    // Return line information
    return {
      line,
      lineNumber,
      linePos: thisLinePos,
    };
  });

  const errorLines = [];
  for (let i = -2; i <= 2; ++i) {
    const lineNumber = errorLine + i;
    if ((lineNumber < 0) || (lineNumber >= lines.length)) {
      continue;
    }
    errorLines.push(lineNumber);
  }
  const prefixLength = Math.max(...errorLines.map((p) => `${p + 1}`.length));

  let errorMessage = message;
  const separator = '  |  ';
  for (let i = 0; i < errorLines.length; ++i) {
    const { line, lineNumber, linePos } = lines[errorLines[i]];
    // Get the line number prefix
    let prefix = `${lineNumber + 1}`;
    if (prefix.length < prefixLength) {
      prefix += ' '.repeat(prefixLength - prefix.length);
    }
    errorMessage += `\n${prefix}${separator}${line}`;
    // Print a marker if this matches the error line
    if (lineNumber === errorLine) {
      errorMessage += '\n';
      errorMessage += ' '.repeat(prefix.length);
      errorMessage += separator;
      errorMessage += ' '.repeat(pos - linePos);
      errorMessage += '^';
    }
  }
  if (process.env.NODE_ENV !== 'production') {
    // Convert the react-error-overlay error message monospace ;)
    setTimeout(() => {
      const errorOverlayIframe = document.getElementsByTagName('iframe')[0] as any;
      const divs = errorOverlayIframe.contentWindow.document.getElementsByTagName('div') as any || [];
      Array.from(divs).forEach((d: any) => {
        if (d.style.fontFamily === 'sans-serif') {
          d.style.fontSize = '12px';
          d.style.fontFamily = 'monospace';
        }
      })
    }, 1000);
  }
  return Error(errorMessage);
};

const nextNewlinePos = (s: string, pos: number) => {
  for (let i = pos; i < s.length; ++i) {
    if (s[i] === '\n') {
      return i;
    }
  }
  return s.length;
}

const linesBetween = (s: string, start: number, end: number): number => {
  const safeEnd = Math.min(s.length, end);

  let count = 0;
  for (let i = start; i < safeEnd; ++i) {
    if (s[i] === '\n') {
        ++count;
    }
  }
  return count;
}

const getBraceStack = (s: string, pos: number, initStack: number): any => {
  // TODO: Keep stacks for ['"{]
  let i = pos;
  let stack = initStack;
  while ((i < s.length) && (stack > 0)) {
    switch (s[i]) {
    case '{': ++stack; break;
    case '}': --stack; break;
    }
      ++i;
  }
  return [i, stack];
}

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
      let stack = 1;
      [, stack] = getBraceStack(content.substring(1), 0, stack);

      if (stack > 0) {
        [pos, stack] = getBraceStack(src, lineEndPos, stack);
        content += src.substring(lineEndPos, pos);
      }
      if (stack > 0) {
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
    try {
      info = {
        __plugin: plugin,
        __depth: depth,
        __inline: inline,
        props: JSON5.parse(content),
      };
    } catch (error) {
      console.error(content);
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
