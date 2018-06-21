/* tslint:disable */
interface ITmplOptions {
  title: string;
  styles: string;
  content: string;
  initialStore: any;
  cssHash: string;
  scripts: string;
}

function tmpl(options: ITmplOptions) {
  const { title, styles, content, initialStore, cssHash, scripts } = options;
  return `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>${title}</title>
        ${styles}
        <script>
          window.initialState = ${JSON.stringify(initialStore)};
        </script>
        </head>
        <body>
        <div id="app">${content}</div>
        <script src="https://cdn.bootcss.com/react/16.2.0/umd/react.development.js"></script>
        <script src="https://cdn.bootcss.com/react-dom/16.2.0/umd/react-dom.development.js"></script>
        ${scripts}
        ${cssHash}
      </body>
    </html>`;
}

export default tmpl;