const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const CustomError = require("../exceptions/customError");
const uniqueSlug = require("../utils/uniqueSlug");
const deletePostImage = require("../utils/deletePostImage");

const store = async (req, res, next) => {
  let { title, content, published, categoryId, tags } = req.body;

  if (published === "true") published = true;
  if (published === "false") published = false;

  const user = req.user;

  const slug = await uniqueSlug(title);

  const data = {
    title,
    slug,
    content,
    image: `${req.file.filename}`,
    published,
    category: {
      connect: { id: +categoryId },
    },
    tags: {
      connect: tags.map((t) => ({ id: +t })),
    },
    user: {
      connect: { id: user.id },
    },
  };

  try {
    const post = await prisma.post.create({ data });

    res.status(200).json({
      message: "Post created successfully",
      post,
    });
  } catch (e) {
    deletePostImage(req.file.filename);
    return next(new CustomError(e.message, 500));
  }
};

const show = async (req, res, next) => {
  const { slug } = req.params;

  try {
    const post = await prisma.post.findUnique({
      where: { slug: slug },
      include: {
        category: { select: { name: true } },
        tags: { select: { name: true } },
        user: { select: { name: true } },
      },
    });

    res.status(200).json({
      message: "Post found",
      post,
    });
  } catch (e) {
    return next(new CustomError(e.message, 500));
  }
};

const index = async (req, res, next) => {
  const { published, filterString, page = 1, limit = 50 } = req.query;
  const where = {};

  if (published === "true") {
    where.published = true;
  } else if (published === "false") {
    where.published = false;
  }
  if (filterString) {
    where.OR = [
      {
        title: {
          contains: filterString,
        },
      },
      {
        content: {
          contains: filterString,
        },
      },
    ];
  }

  const offset = (page - 1) * limit;
  const totalItems = await prisma.post.count({ where });
  const totalPages = Math.ceil(totalItems / limit);

  if (page > totalPages) {
    return next(new CustomError("La pagina richiesta non esiste.", 400));
  }

  try {
    const posts = await prisma.post.findMany({
      where,
      include: {
        category: { select: { name: true } },
        tags: { select: { name: true } },
        user: { select: { name: true, image: true } },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: parseInt(limit),
      skip: parseInt(offset),
    });
    res.status(200).json({
      message: `${posts.length} Posts found`,
      page: page,
      totalItems: `${posts.length}`,
      totalPages,
      posts,
    });
  } catch (e) {
    return next(new CustomError(e.message, 500));
  }
};

const update = async (req, res, next) => {
  const { slug } = req.params;
  let { title, content, published, categoryId, tags } = req.body;

  if (published === "true") published = true;
  if (published === "false") published = false;

  const user = req.user;

  const newSlug = await uniqueSlug(title);

  const post = await prisma.post.findUnique({
    where: { slug: slug },
  });
  deletePostImage(post.image);

  const data = {
    title,
    slug: newSlug,
    content,
    image: `http://localhost:3000/img/posts/${req.file.filename}`,
    published,
    category: {
      connect: { id: +categoryId },
    },
    tags: {
      connect: tags.map((t) => ({ id: +t })),
    },
    user: {
      connect: { id: user.id },
    },
  };

  try {
    const post = await prisma.post.update({
      where: { slug: slug },
      data,
    });

    res.status(200).json({
      message: "Post updated successfully",
      post,
    });
  } catch (e) {
    return next(new CustomError(e.message, 500));
  }
};

const destroy = async (req, res, next) => {
  const { slug } = req.params;

  try {
    const post = await prisma.post.findUnique({
      where: { slug: slug },
    });
    await prisma.post.delete({
      where: { slug: slug },
    });
    console.log(post.image);

    deletePostImage(post.image);

    res.status(200).json({
      message: "Post deleted successfully",
    });
  } catch (e) {
    return next(new CustomError(e.message, 500));
  }
};

const indexByTag = async (req, res, next) => {
  const { tag } = req.params;

  try {
    const posts = await prisma.post.findMany({
      where: {
        tags: {
          some: {
            name: tag,
          },
        },
      },
      include: {
        category: { select: { name: true } },
        tags: { select: { name: true } },
        user: { select: { name: true } },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json({
      message: `${posts.length} Posts found`,
      posts,
    });
  } catch (err) {
    return next(new CustomError(err.message, 500));
  }
};

module.exports = {
  store,
  show,
  index,
  update,
  destroy,
  indexByTag,
};
