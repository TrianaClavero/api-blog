/*import { bodyPostSchema } from "../schemas/postSchemas.js";

export const validatePost = async (request, response, next) => {
  const { error } = bodyPostSchema.validate(request.body, {
    abortEarly: false,
  });
  if (error) {
    return response.status(400).json({ message: error.message });
  }
  next();
};

export const validateIdPost = async (request, response, next) => {
  const { error } = bodyPostSchema.validate(request.params, {
    abortEarly: false,
  });

  if (!id) {
    return response.status(400).json({ message: "Id is required" });
  }
  next();
};
*/
export const schemaValidator = (schema) => async (request, response, next) => {
  const { error } = schema.validate(
    {
      body: request.body,
      params: request.params,
      query: request.query,
    },
    {
      abortEarly: false,
      allowUnknown: true,
    }
  );
  error ? next(error) : next();
};
