import fs from "fs/promises";
import OpenAI from "openai";
import dotenv from 'dotenv';

// Załaduj zmienne z pliku .env
dotenv.config();

// Initialize OpenAI with the API key
const openai = new OpenAI({
  apiKey: process.env.APP_OPENAI_API_KEY,
});

// Main function
async function processArticle()
{
  try
  {
    // Step 1: Read the article from the file
    const plainText = await fs.readFile("article.txt", "utf-8");

    // Step 2: Create the prompt to process the article
    const htmlPrompt = `
      Convert the following article into HTML code:
      1. Use appropriate semantic HTML tags to structure the content.
      2. Mark places for images using <img src="image_placeholder.jpg" alt="detailed description of the image">.
      3. Add captions under the images.
      4. Do not include CSS or JavaScript, only content between <body> and </body>.
      5. Do not add \`\`\`html \`\`\`.
      6. Here is the article:
      ---
      ${plainText}
    `;

    // Step 3: Send the request to OpenAI
    const htmlResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an expert in generating HTML code." },
        { role: "user", content: htmlPrompt },
      ],
    });

    // Step 4: Save the response to the article.html file
    const articleBody = htmlResponse.choices[0].message.content;
    await fs.writeFile("article.html", articleBody);

    const stylePrompt = `
      Create a CSS stylesheet for the following HTML content:
      1. Define the Flexbox layout.
      2. Add proper spacing (margin and padding).
      3. Choose a warm color palette.
      4. Make the layout responsive with media queries.
      5. Justify text and images.
      6. Do not add \`\`\`css \`\`\` or other comments. Plain css.
      7. Here is the articleBody
      ---
      ${articleBody}
    `;

    const styleResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an expert CSS designer" },
        { role: "user", content: stylePrompt },
      ],
    });

    const styles = styleResponse.choices[0].message.content.trim();
    await fs.writeFile("style.css", styles);

    // Step 5: Create HTML template
    const templateHTML = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="style.css">
        <title>Document</title>
      </head>
      <body>
      </body>
    </html>`;

    const fixedTemplateHTML = templateHTML
      .split('\n')
      .map(line => line.trimStart())
      .join('\n');

    // Krok 6: Save fixedTemplateHTML
    await fs.writeFile("szablon.html", fixedTemplateHTML);

    // Step 7: Read the content of the article.html
    const articleHTML = await fs.readFile("article.html", "utf-8");

    // Step 8: Load template
    const templateHTMLContent = await fs.readFile("szablon.html", "utf-8");

    // Step 9: Add article.html content to the template body
    const finalHTML = templateHTMLContent.replace(
      /<body>.*?<\/body>/s,
      `${articleHTML.split('\n').map(line => `  ${line}`).join('\n')}`
    );

    // Step 10: Save the final HTML file (podglad.html)
    await fs.writeFile("podglad.html", finalHTML);
  } catch (error)
  {
    console.error("An error occurred:", error);
  }
}

processArticle();