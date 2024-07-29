import httpStatus from "../helpers/httpStatus.js";
import { verifyToken, generateToken } from "../utils/tokenManagement.js";
import { encrypt, verified } from "../utils/bcrypt.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const usersController = () => {
  const register = async (request, response, next) => {
    const { username, email, password } = request.body;

    if (!username || !email || !password) {
      return response
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "All fields are required" });
    }

    try {
      const hashedPassword = await encrypt(password);
      const createdUser = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      });

      const responseFormat = {
        data: createdUser,
        message: "User created successfully",
      };

      return response.status(httpStatus.CREATED).json(responseFormat);
    } catch (error) {
      if (error.code === "P2002") {
        return response
          .status(httpStatus.CONFLICT)
          .json({ message: "User already exists" });
      }
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  const login = async (request, response, next) => {
    const { email, password } = request.body;

    if (!email || !password) {
      return response
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "Email and password are required" });
    }

    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        return response.status(httpStatus.NOT_FOUND).json({
          message: "Invalid credentials",
        });
      }

      const isPasswordValid = await verified(password, user.password);

      if (!isPasswordValid) {
        return response.status(httpStatus.UNAUTHORIZED).json({
          message: "Invalid credentials",
        });
      }

      const token = generateToken({ data: { email, role: user.role } });
      const refreshToken = generateToken({
        data: { email, role: user.role },
        isRefresh: true,
        expiresIn: "7d",
      });

      return response.status(httpStatus.OK).json({
        message: "Login successful",
        token,
        refreshToken
      });
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  const refreshToken = async (request, response, next) => {
    const { refreshToken } = request.body;

    try {
      const { role, email } = verifyToken(refreshToken, true);
      const token = generateToken({
        data: { email, role, message: "Ok" },
      });

      return response.status(httpStatus.OK).json({
        success: true,
        token,
      });
    } catch (error) {
      next(error);
    }
  };

  const profile = async (request, response, next) => {
    const { id } = request.params;
    const userId = Number(id);

    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        return response
          .status(httpStatus.NOT_FOUND)
          .json({ message: "User not found" });
      }

      return response.status(httpStatus.OK).json({
        data: user,
      });
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  const getUsers = async (request, response, next) => {
    const { query } = request;
    try {
      const users = await prisma.user.findMany({
        where: {
          username: {
            contains: query?.username ?? "",
          },
        },
      });

      response.status(200).json(users);
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  const getUserById = async (request, response, next) => {
    const { id } = request.params;
    const userId = Number(id);
    try {
      const user = await prisma.user.findUnique({ where: { id: userId } });
      const responseFormat = {
        data: user,
        message: "User found successfully",
      };
      return response.status(200).json(responseFormat);
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  const updateById = async (request, response, next) => {
    const { id } = request.params;
    const userId = Number(id);
    const newUserData = request.body;
    try {
      const user = await prisma.user.update({
        where: { id: userId },
        data: newUserData,
      });
      const responseFormat = {
        data: user,
        message: "User updated successfully",
      };
      return response.status(200).json(responseFormat);
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  const deleteById = async (request, response, next) => {
    const { id } = request.params;
    const userId = Number(id);
    try {
      const user = await prisma.user.delete({ where: { id: userId } });
      const responseFormat = {
        data: user,
        message: "User deleted successfully",
      };
      return response.status(200).json(responseFormat);
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  return {
    register,
    login,
    profile,
    refreshToken,
    getUsers,
    getUserById,
    updateById,
    deleteById,
  };
};
