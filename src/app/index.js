import express from 'express';
import { join } from 'path';
import interceptor from 'express-interceptor';
import C from 'cheerio';

const PORT = 5000
const UI_ROOT = join(__dirname, '../src/ui');

const app = express();
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));

const isInterceptable = (type) => (
  /text\/html/.test(type)
);
   
const ogleInjector = interceptor((req, res) => ({
  isInterceptable: () => isInterceptable(res.get('Content-Type')),
  intercept: (body, send) => {
    const doc = C.load(body);
    
    doc('[src*=jsdelivr]')
      .before([
        '<ogle></ogle>',
        '<script type="riot/tag" src="ogle.tag"></script>'
      ].join('\n'))

    doc('body')
      .append('<script>riot.mount("ogle")</script>')

    send(doc.html());
  }  
}));

app.use(ogleInjector);

app.get('/', (req, res) => {
  res.type('html');
  res.render('index');
})
app.use('/', express.static(UI_ROOT));

app.listen(PORT);
console.log('listening on', PORT)