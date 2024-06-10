const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const CustomError = require("../exceptions/customError");
const AuthError = require("../exceptions/authError");

const postOwnership = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const post = await prisma.post.findUnique({
      where: { slug: req.params.slug },
      include: {
        user: { select: { name: true } },
      },
    });

    if (!post) {
      return next(new CustomError(`Post not found`, 404));
    }

    if (post.userId !== userId) {
      return next(
        new AuthError(`You are not authorized to perform this action`, 401)
      );
    }

    next();
  } catch (error) {
    return next(new CustomError(error.message, 500));
  }
};

module.exports = postOwnership;
