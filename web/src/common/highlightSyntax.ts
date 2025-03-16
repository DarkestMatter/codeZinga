export const highlightSyntax = (text: string) => {
  // Step 1: Extract and replace string literals with placeholders
  const stringMatches: string[] = [];
  text = text.replace(/(['"`])(?:\\.|(?!\1).)*?\1/g, (match) => {
    stringMatches.push(match); // Store original string
    return `___STRING_PLACEHOLDER_${stringMatches.length - 1}___`;
  });

  // Step 2: Escape HTML (safe for rest of the code)
  text = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Step 3: Highlight keywords
  text = text
    .replace(/\b(let)\b/g, '<span class="keyword-blue">$1</span>')
    .replace(/\b(const)\b/g, '<span class="keyword-green">$1</span>')
    .replace(/\b(console)\b/g, '<span class="keyword-grey">$1</span>')
    .replace(
      /\b(function|return|await|async|if|else)\b/g,
      '<span class="keyword-purple">$1</span>'
    )
    .replace(/(=>)/g, '<span class="keyword-yellow">$1</span>')
    .replace(/\b(-?\d+(\.\d+)?)\b/g, '<span class="keyword-pink">$1</span>')
    .replace(/(\/\/.*)/g, '<span class="comment-fade">$1</span>');

  // Step 4: Replace string placeholders with original strings inside span (escaped internally)
  stringMatches.forEach((str, i) => {
    // Escape string content only (not the quotes)
    const quote = str[0];
    const inner = str
      .slice(1, -1)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    const highlighted = `<span class="string-lightRed">${quote}${inner}${quote}</span>`;
    text = text.replace(`___STRING_PLACEHOLDER_${i}___`, highlighted);
  });

  return text;
};
