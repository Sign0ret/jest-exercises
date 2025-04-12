import { rest } from "msw";

export const handlers = [
  rest.post(
    "https://auth-provider.example.com/api/login",
    async (req, res, ctx) => {
      const { username, password } = await req.json();

      if (!username) {
        return res(
          ctx.delay(150), 
          ctx.status(400),
          ctx.json({ message: "Username required" })
        );
      }

      if (!password) {
        return res(
          ctx.delay(150),
          ctx.status(400),
          ctx.json({ message: "Password required" })
        );
      }

      // Respuesta exitosa: se retorna el username.
      return res(ctx.delay(150), ctx.json({ username }));
    }
  )
];
