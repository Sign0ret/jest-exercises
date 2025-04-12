// __mocks__/handlers.ts
import { rest } from "msw";

export const handlers = [
  rest.post("/api/login", (req, res, ctx) => {
    return res(ctx.json({ success: true }));
  }),
];