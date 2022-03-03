import { nanoid } from "nanoid";
import books from "./books.js";

// CREATE / POST BOOK HANDLER
const postBookHandler = (request, h) => {
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = new Date().toISOString();
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  const finished = pageCount === readPage ? true : false;

  //   ==> ERROR TIDAK MELAMPIRKAN PROPERTI NAME
  if (!name) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
    response.code(400);

    return response;
  }

  //   ==> ERROR PROPERTI READ_PAGE > DARI PAGE_COUNT
  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);

    return response;
  }

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  //   Tambahkan data ke array books
  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  //   ==> BUKU BERHASIL DITAMBAHKAN
  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    });
    response.code(201);

    return response;
  }

  //   ==> GENERIC ERROR
  const response = h.response({
    status: "error",
    message: "Buku gagal ditambahkan",
  });
  response.code(500);

  return response;
};

// GET ALL DATA
const getAllBooks = (request, h) => {
  const response = h.response({
    status: "success",
    data: {
      books: books.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  });
  response.code(200);

  return response;
};

// GET BOOK BY ID
const getBookById = (request, h) => {
  const { bookId } = request.params;

  // ==> FILTER BOOK BY ID
  const book = books.find((book) => book.id === bookId);

  if (book !== undefined) {
    const response = h.response({
      status: "success",
      data: {
        book,
      },
    });
    response.code(200);

    return response;
  }

  // ==> ERROR HANDLER
  const response = h.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });
  response.code(404);

  return response;
};

// PUT / UPDATE BOOK BY ID
const updateBookById = (request, h) => {
  const { bookId } = request.params;
  const updatedAt = new Date().toISOString();
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const finished = pageCount === readPage ? true : false;

  // ==> FIND EXISTING DATA BY INDEX
  const index = books.findIndex((book) => book.id === bookId);

  // ==> ERROR HANDLER
  if (name === undefined) {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Mohon isi nama buku",
    });
    response.code(400);

    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);

    return response;
  }

  // Pengkondisian untuk menimpa data jika data ada (!= -1)
  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      finished,
      updatedAt,
    };

    const response = h.response({
      status: "success",
      message: "Buku berhasil diperbarui",
    });
    response.code(200);

    return response;
  }

  // ==> ERROR HANDLER
  const response = h.response({
    status: "fail",
    message: "Gagal memperbarui buku. Id tidak ditemukan",
  });
  response.code(404);

  return response;
};

// DELETE BOOK BY ID
const deleteBookById = (request, h) => {
  const { bookId } = request.params;

  // ==> FIND EXISTING DATA BY INDEX
  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    books.splice(index, 1);

    const response = h.response({
      status: "success",
      message: "Buku berhasil dihapus",
    });
    response.code(200);

    return response;
  }

  // ==> ERROR HANDLER
  const response = h.response({
    status: "fail",
    message: "Buku gagal dihapus. Id tidak ditemukan",
  });
  response.code(404);

  return response;
};

export {
  postBookHandler,
  getAllBooks,
  getBookById,
  updateBookById,
  deleteBookById,
};
