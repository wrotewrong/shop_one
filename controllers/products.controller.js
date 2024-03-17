exports.add = async (req, res) => {
  res.json(req.body);
  console.log(req.file, req.body);
};
