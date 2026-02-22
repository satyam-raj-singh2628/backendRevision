const http = require("http");
const fs = require("fs");
const url = require("url");

// Fake database - stores comments
let comments = [];

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Route 1: Homepage with comment form
  if (pathname === "/" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Comment Board - XSS Vulnerable</title>
        <style>
          body { font-family: Arial; max-width: 800px; margin: 50px auto; }
          .comment { border: 1px solid #ccc; padding: 10px; margin: 10px 0; }
          input, textarea { width: 100%; padding: 8px; margin: 5px 0; }
          button { padding: 10px 20px; background: #007bff; color: white; border: none; cursor: pointer; }
        </style>
      </head>
      <body>
        <h1> Public Comment Board</h1>
        <p style="color: red;"> This site is intentionally vulnerable for learning!</p>
        
        <h2>Post a Comment:</h2>
        <form action="/add-comment" method="GET">
          <input name="name" placeholder="Your name" required />
          <textarea name="comment" placeholder="Your comment" rows="4" required></textarea>
          <button type="submit">Post Comment</button>
        </form>

        <h2>All Comments:</h2>
        <div id="comments">
          ${comments
            .map(
              (c) => `
            <div class="comment">
              <strong>${c.name}</strong>
              <p>${c.comment}</p>
            </div>
          `,
            )
            .join("")}
        </div>

        <hr>
        <h3> Try These XSS Attacks:</h3>
        <p><strong>Attack 1 - Alert Box:</strong></p>
        <code>&lt;script&gt;alert('XSS!')&lt;/script&gt;</code>
        
        <p><strong>Attack 2 - Steal Cookies:</strong></p>
        <code>&lt;script&gt;alert('Your cookies: ' + document.cookie)&lt;/script&gt;</code>
        
        <p><strong>Attack 3 - Redirect:</strong></p>
        <code>&lt;script&gt;window.location='https://google.com'&lt;/script&gt;</code>
        
        <p><strong>Attack 4 - Change Page:</strong></p>
        <code>&lt;script&gt;document.body.innerHTML='HACKED!'&lt;/script&gt;</code>

        <p><strong>Attack 5 - Image XSS:</strong></p>
        <code>&lt;img src=x onerror="alert('XSS via image')"&gt;</code>
      </body>
      </html>
    `);
  }

  // Route 2: Post comment (VULNERABLE - no sanitization)
  else if (pathname === "/add-comment" && req.method === "GET") {
    const name = parsedUrl.query.name || "Anonymous";
    const comment = parsedUrl.query.comment || "";

    // VULNERABLE: Directly storing user input ❌
    comments.push({ name, comment });

    // Redirect back to homepage
    res.writeHead(302, { Location: "/" });
    res.end();
  }

  // Route 3: Clear all comments
  else if (pathname === "/clear" && req.method === "GET") {
    comments = [];
    res.writeHead(302, { Location: "/" });
    res.end();
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

server.listen(5000, () => {
  console.log("🚀 XSS Lab Server running on http://localhost:5000");
  console.log("⚠️  This server is INTENTIONALLY vulnerable for learning!");
});
