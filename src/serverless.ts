import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import serverlessExpress from "@vendia/serverless-express";
import { Callback, Context, Handler } from "aws-lambda";
import express from "express";
import { join } from "path";
import { NestExpressApplication } from "@nestjs/platform-express";

let server: Handler;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await app.init();
  // app.use(express.static('build'));;
  app.useStaticAssets(join(__dirname, 'build'))

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};