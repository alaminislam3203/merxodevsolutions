/**
 * Utility functions for parsing and sanitizing .env files
 */

/**
 * Generate a sanitized .env.example content from raw .env text.
 * Preserves comments, empty lines, and variable names while stripping secret values.
 * 
 * @param {string} envContent - Raw .env file content
 * @param {object} options - Optional config
 * @returns {string} Sanitized .env.example content
 */
export function generateEnvExample(envContent, options = {}) {
  if (!envContent || typeof envContent !== "string") return "";

  const lines = envContent.split(/\r?\n/);
  const sanitizedLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Preserve comments and blank lines exactly
    if (!trimmed || trimmed.startsWith("#")) {
      sanitizedLines.push(line);
      continue;
    }

    // Match KEY=VALUE or export KEY=VALUE
    const match = line.match(/^(\s*(?:export\s+)?)([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*(.*)$/);
    if (!match) {
      // In case of non-standard line (e.g. invalid syntax or multiline continuation), preserve as is or comment out
      sanitizedLines.push(line);
      continue;
    }

    const prefix = match[1];
    const key = match[2];
    const rest = match[3];

    // Check if there is an inline comment (e.g., VALUE # comment)
    let inlineComment = "";
    // If rest starts with quote, handle properly
    if (rest.startsWith('"')) {
      const closingIdx = rest.indexOf('"', 1);
      if (closingIdx !== -1) {
        const afterQuote = rest.slice(closingIdx + 1);
        const commentIdx = afterQuote.indexOf("#");
        if (commentIdx !== -1) {
          inlineComment = " " + afterQuote.slice(commentIdx).trim();
        }
      }
    } else if (rest.startsWith("'")) {
      const closingIdx = rest.indexOf("'", 1);
      if (closingIdx !== -1) {
        const afterQuote = rest.slice(closingIdx + 1);
        const commentIdx = afterQuote.indexOf("#");
        if (commentIdx !== -1) {
          inlineComment = " " + afterQuote.slice(commentIdx).trim();
        }
      }
    } else {
      const commentIdx = rest.indexOf("#");
      if (commentIdx !== -1) {
        inlineComment = " " + rest.slice(commentIdx).trim();
      }
    }

    // Smart placeholder generation based on key name
    const upperKey = key.toUpperCase();
    let placeholder = '""';

    if (upperKey === "NODE_ENV") {
      placeholder = '"development"';
    } else if (upperKey === "PORT") {
      placeholder = '"3000"';
    } else if (upperKey.includes("DATABASE_URL") || upperKey.includes("POSTGRES_URL")) {
      placeholder = '"postgresql://username:password@localhost:5432/dbname"';
    } else if (upperKey.includes("MONGO") || upperKey.includes("MONGODB_URI")) {
      placeholder = '"mongodb://localhost:27017/dbname"';
    } else if (upperKey.includes("URL") || upperKey.includes("DOMAIN") || upperKey.includes("HOST")) {
      placeholder = '"http://localhost:3000"';
    } else if (upperKey.includes("EMAIL") || upperKey.includes("SMTP_USER")) {
      placeholder = '"your-email@example.com"';
    }

    sanitizedLines.push(`${prefix}${key}=${placeholder}${inlineComment}`);
  }

  return sanitizedLines.join("\n");
}

/**
 * Mask secret values with bullet dots for safe UI preview
 */
export function maskEnvSecrets(envContent) {
  if (!envContent || typeof envContent !== "string") return "";

  const lines = envContent.split(/\r?\n/);
  const maskedLines = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      maskedLines.push(line);
      continue;
    }

    const match = line.match(/^(\s*(?:export\s+)?[a-zA-Z_][a-zA-Z0-9_]*\s*=\s*)(.*)$/);
    if (!match) {
      maskedLines.push(line);
      continue;
    }

    const prefix = match[1];
    const val = match[2].trim();

    if (!val || val === '""' || val === "''") {
      maskedLines.push(`${prefix}""`);
    } else {
      maskedLines.push(`${prefix}••••••••••••••••`);
    }
  }

  return maskedLines.join("\n");
}

/**
 * Extract summary statistics of .env file
 */
export function parseEnvStats(envContent) {
  if (!envContent || typeof envContent !== "string") {
    return { keyCount: 0, keys: [], commentCount: 0, lineCount: 0 };
  }

  const lines = envContent.split(/\r?\n/);
  const keys = [];
  let commentCount = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("#")) {
      commentCount++;
      continue;
    }
    const match = line.match(/^\s*(?:export\s+)?([a-zA-Z_][a-zA-Z0-9_]*)\s*=/);
    if (match) {
      keys.push(match[1]);
    }
  }

  return {
    keyCount: keys.length,
    keys,
    commentCount,
    lineCount: lines.length,
  };
}
