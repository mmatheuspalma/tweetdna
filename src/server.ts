import dotenv from "dotenv";

dotenv.config();

import axios from 'axios';
import restify from 'restify';
import { bodyParser } from "restify-plugins";

const authorizationBasicToken = Buffer.from(`${process.env.TYPINGDNA_PUBLIC_KEY}:${process.env.TYPINGDNA_SECRET_KEY}`).toString('base64');

const api = axios.create({
  baseURL: process.env.TYPINGDNA_URL,
  headers: {
    Authorization: `Basic ${authorizationBasicToken}`,
  },
});

const server = restify.createServer();

server.use(bodyParser());

server.post('/save/:user', async (req: restify.Request, res: restify.Response, next: restify.Next) => {
  const body = JSON.parse(req.body);
  
  const saveRequest = await api.post(`save/${req.params.user}`, {
    tp: body.tp,
  });

  console.log(saveRequest.data);

  res.send(saveRequest.data);
});

server.post('/verify/:user', async (req: restify.Request, res: restify.Response, next: restify.Next) => {
  const body = JSON.parse(req.body);
  
  const verifyRequest = await api.post(`verify/${req.params.user}`, {
    tp: body.tp,
  });

  // res.send(verifyRequest);
});

server.listen(8080, () => {
  console.log('%s listening at %s', server.name, server.url);
});

export default server;
