const createBoard = async (req, res) => {
  try {
    const { userId, name, description } = req.body;
    ///Create the board
    const board = await BoardModel.create({ name, description, user: userId });
  } catch (error) {}
};
