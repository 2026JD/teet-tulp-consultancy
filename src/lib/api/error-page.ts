export function renderErrorPage() {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><title>Error</title></head>
<body style="font-family:sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0">
  <div style="text-align:center">
    <h1>Something went wrong</h1>
    <p>Please try refreshing the page.</p>
    <a href="/">Go home</a>
  </div>
</body>
</html>`;
}
