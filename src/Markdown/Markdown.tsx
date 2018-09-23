import React from 'react';
import marked from 'marked';

import Code from './Code';
/*
type Token =
    Tokens.Space
    | Tokens.Code
    | Tokens.Heading
    | Tokens.Table
    | Tokens.Hr
    | Tokens.BlockquoteStart
    | Tokens.BlockquoteEnd
    | Tokens.ListStart
    | Tokens.LooseItemStart
    | Tokens.ListItemStart
    | Tokens.ListItemEnd
    | Tokens.ListEnd
    | Tokens.Paragraph
    | Tokens.HTML
    | Tokens.Text;

namespace Tokens {
    interface Space {
        type: 'space';
    }

    interface Code {
        type: 'code';
        lang?: string;
        text: string;
    }

    interface Heading {
        type: 'heading';
        depth: number;
        text: string;
    }

    interface Table {
        type: 'table';
        header: string[];
        align: Array<'center' | 'left' | 'right' | null>;
        cells: string[][];
    }

    interface Hr {
        type: 'hr';
    }

    interface BlockquoteStart {
        type: 'blockquote_start';
    }

    interface BlockquoteEnd {
        type: 'blockquote_end';
    }

    interface ListStart {
        type: 'list_start';
        ordered: boolean;
    }

    interface LooseItemStart {
        type: 'loose_item_start';
    }

    interface ListItemStart {
        type: 'list_item_start';
    }

    interface ListItemEnd {
        type: 'list_item_end';
    }

    interface ListEnd {
        type: 'list_end';
    }

    interface Paragraph {
        type: 'paragraph';
        pre?: boolean;
        text: string;
    }

    interface HTML {
        type: 'html';
        pre: boolean;
        text: string;
    }

    interface Text {
        type: 'text';
        text: string;
    }
}
*/

interface Props {
  content: string,
}

const Markdown = ({ content }: Props) => (
  <React.Fragment> {
    marked.lexer(content).map((token, index) => {
      switch (token.type) {
        case 'code':
          return <Code key={index} lang={token.lang} text={token.text} />
        case 'heading':
        case 'table':
        case 'hr':
        case 'blockquote_start':
        case 'blockquote_end':
        case 'list_start':
        case 'loose_item_start':
        case 'list_item_start':
        case 'list_item_end':
        case 'list_end':
        case 'paragraph':
        case 'html':
        case 'text':
        default:
          return null;
      }
    })
  } </React.Fragment>
);

export default Markdown;
