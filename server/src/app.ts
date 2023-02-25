import express, { Express } from 'express';
import * as dotenv from 'dotenv'
import 'express-async-errors'
import { connectDB } from './db/connection';
import { notFound } from './errors/not-found';
import { errorHandlerMiddleWare } from './errors/error-handler';
import { getOrderData } from './db/getOrder';
import order from './routes/order'

dotenv.config()

const app: Express = express();


app.use(express.json());
app.use('/api/v1/orders', order)
app.use(notFound)
app.use(errorHandlerMiddleWare)

connectDB(process.env.MONGO_URI!).then(() => {
  app.listen(4000, () => {
    console.log(` running at http://localhost:4000`);
  });
  // getOrderData('https://mobile.yangkeduo.com/pincard_ask.html?__rp_name=brand_amazing_price_group&_pdd_tc=ffffff&_pdd_sbs=1&group_order_id=2136365460254090392&refer_share_channel=group_qrcode&refer_share_uin=Q3TFJCOWZHDZZOXFDJXBG2BC7Q_GEXDA&refer_share_id=638c35f6-a6f4-415c-9ea1-ced9fe5e8738&page_id=116470_1676774016830_f4pei3yi1f&is_back=1')
}).catch(err => {
  console.log(err)
})

