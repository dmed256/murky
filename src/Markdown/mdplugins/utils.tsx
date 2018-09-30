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

export {
  makeSourceError,
  nextNewlinePos,
  linesBetween,
}
