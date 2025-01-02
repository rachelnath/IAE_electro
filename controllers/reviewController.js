import Account from "../models/account.js";
import Review from "../models/review.js";

export const ShowReview = async (req, res) => {
  try {
    const response = await Review.findAll({
      include: [{ model: Account, attributes: ["username"] }],
    });
    res.status(200).json(response);
  } catch (error) {
    res.json({ msg: Error });
  }
};

export const ShowReviewById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Review.findOne({
      where: { review_id: id },
      include: [{ model: Account, attributes: ["username 34"] }],
    });
    res.status(200).json(response);
  } catch (error) {
    res.json({ msg: Error });
  }
};

// Customer Side
export const AddReview = async (req, res) => {
  const { reviewText, reviewSkor, productId, accountId } = req.body;
  try {
    const isCustomer = await Account.findOne({
      where: { account_id: accountId },
    }).then((element) => element.type == "customer");

    if (isCustomer) {
      const request = {
        review_text: reviewText,
        review_skor: reviewSkor,
        product_id: productId,
        account_id: accountId,
      };
      await Review.create(request);
      res.status(200).json({ msg: "Data berhasil dikirim" });
    } else {
      res.json({
        msg: "Hanya akun customer yang diperbolehkan melakukan action ini",
      });
    }
  } catch (error) {
    res.json({ msg: Error });
  }
};

export const UpdateReview = async (req, res) => {
  const { id } = req.params;
  const { reviewText, reviewSkor, productId } = req.body;
  try {
    const request = {
      review_text: reviewText,
      review_skor: reviewSkor,
      product_id: productId,
    };
    const isExist = await Review.findOne({ where: { review_id: id } });
    if (isExist) {
      await Review.update(request, {
        where: { review_id: id },
      });
      res.status(200).json({ msg: "Data berhasil diupdate" });
    } else {
      res.json({ msg: "data tidak tersedia" });
    }
  } catch (error) {
    res.json({ msg: Error });
  }
};

export const ResponseReview = async (req, res) => {
  const { reviewResponse } = req.body;
  const { id } = req.params;
  try {
    const isExist = await Review.findOne({ where: { review_id: id } });
    if (isExist) {
      await Review.update(
        { review_response: reviewResponse },
        {
          where: { review_id: id },
        }
      );
      res.status(200).json({ msg: "Response berhasil dikirim" });
    } else {
      res.json({ msg: "data tidak tersedia" });
    }
  } catch (error) {
    res.json({ msg: Error });
  }
};

export const DeleteReview = async (req, res) => {
  const { id } = req.params;
  try {
    const isExist = await Review.findOne({ where: { review_id: id } });
    if (isExist) {
      await Review.destroy({
        where: { review_id: id },
      });
      res.status(200).json({ msg: "Data berhasil dikirim" });
    } else {
      res.json({ msg: "data tidak tersedia" });
    }
  } catch (error) {
    res.json({ msg: Error });
  }
};

// Saler Side
export const reviewResponse = async (req, res) => {
  const { reviewResponse } = req.body;
  const { id } = req.params;

  try {
    await Review.update(
      { review_respose: reviewResponse },
      { where: { review_id: id } }
    );
  } catch (error) {
    console.log(error);
  }
};
