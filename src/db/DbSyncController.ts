import {
  HttpControllerInterface,
  HttpRequestInterface,
  HttpResponseInterface
} from "../http";

export class DbSyncController implements HttpControllerInterface {
  onRequest(
    req: HttpRequestInterface,
    res: HttpResponseInterface,
    next,
    done
  ) {}
}
