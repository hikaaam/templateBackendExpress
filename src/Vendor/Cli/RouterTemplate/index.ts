export const generateRouter = (name: string) => {
    const routename = name.toLowerCase();
    return `//generated by cli
import { Router, Request, Response, NextFunction } from "express";
import controller from "../../Controllers/${name}Controller";
import { Validator } from '../../../Vendor';
const { joiID, validate } = Validator;
import paginator from "../Validator/Paginator";
import { Err } from "../../Response";
import { ${name}Fillable } from "../../Validator/${name}";
import search from "../Validator/Search";

const ${routename}Router: Router = Router();

${routename}Router.get(
  "/v1/${routename}",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let resp: Object = await controller.index();
      res.json(resp);
    } catch (error) {
      res.status(400).json(Err(error.message));
    }
  }
);

${routename}Router.get(
  "/v1/${routename}/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      validate(joiID, req.params);
      const { id } = req.params;
      let resp: Object = await controller.show(id);
      res.json(resp);
    } catch (error) {
      res.status(400).json(Err(error.message));
    }
  }
);

${routename}Router.get(
  "/v1/${routename}/page/:page",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      validate(paginator, req.params);
      const { page } = req.params;
      let resp: Object = await controller.paginate(Number(page));
      res.json(resp);
    } catch (error) {
      res.status(400).json(Err(error.message));
    }
  }
);

${routename}Router.post(
    "/v1/${routename}",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        validate(${name}Fillable, req.body);
        const { body } = req;
        let resp: Object = await controller.store(body);
        res.json(resp);
      } catch (error) {
        res.status(400).json(Err(error.message));
      }
    }
  );

  ${routename}Router.post(
    "/v1/${routename}/search",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        validate(search, req.body);
        const { body } = req;
        let resp: Object = await controller.search(body.search);
        res.json(resp);
      } catch (error) {
        res.status(400).json(Err(error.message));
      }
    }
  );  

  ${routename}Router.put(
  "/v1/${routename}/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      validate(joiID, req.params);
      const { id } = req.params;
      validate(${name}Fillable, req.body);
      const { body } = req;
      let resp: Object = await controller.update(id, body);
      res.json(resp);
    } catch (error) {
      res.status(400).json(Err(error.message));
    }
  }
);

${routename}Router.delete(
  "/v1/${routename}/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      validate(joiID, req.params);
      const { id } = req.params;
      validate(${name}Fillable, req.body);
      const { body } = req;
      let resp: Object = await controller.delete(id, body);
      res.json(resp);
    } catch (error) {
      res.status(400).json(Err(error.message));
    }
  }
);

module.exports = ${routename}Router;
`;
}
