import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>United States Space Force — Guardian Leadership Journey</title>
        <meta name="description" content="From Junior Guardian to All-Around Leader — an immersive journey through Space Force leadership development." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><circle cx='16' cy='16' r='15' fill='%23040810'/><circle cx='16' cy='16' r='12' stroke='%2300d4ff' stroke-width='1' fill='none'/><circle cx='16' cy='16' r='7' stroke='%2300d4ff' stroke-width='0.8' fill='none'/><circle cx='16' cy='16' r='2.5' fill='%2300d4ff'/></svg>" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=SF+Pro+Display:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" />
        <link href="/static/style.css" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
})
