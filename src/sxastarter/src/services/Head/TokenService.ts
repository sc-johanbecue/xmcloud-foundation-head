import { LayoutServicePageState } from '@sitecore-jss/sitecore-jss-nextjs';

export interface TokenHandlingResponse {
  replacedText: string;
  isTextReplaced: boolean;
  additionalMessage: string;
}

export const Tokens = ['{{now}}'];

export function TokenHandling(
  input: string,
  pageMode: LayoutServicePageState | undefined
): TokenHandlingResponse {
  const tokenHandlingResponse: TokenHandlingResponse = {
    isTextReplaced: false,
    replacedText: '',
    additionalMessage: '',
  };

  const isOpenBreakestThere = input.indexOf('{{');
  const isClosedBracketsThere = input.indexOf('}}');
  if (!isOpenBreakestThere || !isClosedBracketsThere) {
    return tokenHandlingResponse;
  }

  const matches = input.match('{{(.*?)}}');
  const match = matches == null ? '' : matches[0];
  const matchFound = match ? Tokens.includes(match) : false;
  // Lets assume we only have one token per field

  if (pageMode == LayoutServicePageState.Edit) {
    if (matchFound) {
      tokenHandlingResponse.additionalMessage = '';
      tokenHandlingResponse.isTextReplaced = true;
    } else {
      tokenHandlingResponse.additionalMessage =
        'Invalid Token recognized - Valid tokens are ' +
        Tokens.map((index) => {
          return index + ' ';
        });
      tokenHandlingResponse.isTextReplaced = true;
    }
  } else if (pageMode == LayoutServicePageState.Preview) {
    let newText = input;
    if (matchFound) {
      newText = newText.replace(
        match,
        '<p style="color:green;display:inline;font-weight: bold">' + match + '</p>'
      );
    } else {
      newText = newText.replace(
        match,
        '<p style="color:red;display:inline;font-weight: bold">' + match + '</p>'
      );
    }

    newText = newText
      .replace('<p>', "<p style='display:inline'>")
      .replace('<p d', "<p style='display:inline' d");
    tokenHandlingResponse.replacedText = newText;
    tokenHandlingResponse.isTextReplaced = true;
  } else {
    if (matchFound) {
      // We can do that one nicer afterwards
      if (match == '{{now}}') {
        const newText = input.replace(match, new Date().toLocaleTimeString());
        tokenHandlingResponse.replacedText = newText;
        tokenHandlingResponse.isTextReplaced = true;
      }
    }
  }

  return tokenHandlingResponse;
}
