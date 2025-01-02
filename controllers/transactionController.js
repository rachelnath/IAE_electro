import Transaction from "../models/transaction.js";
import TransactionDetail from "../models/transaction_details.js";

export const ShowTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findAll();
    let response = [];
    if (transaction) {
      response = await Promise.all(
        transaction.map(async (element) => {
          const transactionDetails = await TransactionDetail.findAll({
            where: { transaction_id: element.transaction_id },
          });
          return {
            transaction: element,
            details: transactionDetails,
          };
        })
      );
    }
    res.status(200).json({
      response,
    });
  } catch (error) {
    res.json({ msg: Error });
  }
};

export const UpdateStatusTransaction = async (req, res) => {
  const { id, status } = req.body;
  try {
    const request = {
      status: status,
    };
    const isExist = await Transaction.findOne({
      where: { order_id: id },
    });
    if (isExist) {
      await Transaction.update(request, {
        where: { order_id: id },
      });
      res.status(200).json({ msg: "Data berhasil diupdate" });
    } else {
      res.json({ msg: "data tidak tersedia" });
    }
  } catch (error) {
    res.json({ msg: Error });
  }
};
