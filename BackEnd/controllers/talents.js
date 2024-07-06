const { Talent, Freelance } = require('../orm')


module.exports = {
  getAllTalents: async (req, res) => {
    try {
      const talents = await Talent.findAll({
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: Freelance, as: "freelancer", attributes: ["name", "email", "adress", "imageUrl", "phoneNumber"],
          }
        ]
      });
      res.status(200).json(talents);
    } catch (error) {
      console.log(error);
      res.status(500).send("Failed to load resource");
    }
  },

  addTalent: async (req, res) => {
    try {
      const talent = await Talent.create(req.body);
      res.status(201).json(talent);
    } catch (error) {
      res.status(409).send(error);
    }
  },

  addTalent1: async (req, res, imageUrl) => {
    try {
      // Create new talent with image URL
      const newTalent = await Talent.create({
        title: req.body.title,
        description: req.body.description,
        imageUrl: imageUrl, // Save the Cloudinary image URL
        address: req.body.address,
        category: req.body.category,
        price: req.body.price,
        rating: req.body.rating,
        delivery: req.body.delivery,
        freelancer_id: req.body.freelancer_id
      });
      
      

      // Respond with created talent
      res.status(201).json(newTalent);
    } catch (error) {
      // Handle errors
      console.error('Error adding talent:', error);
      res.status(500).json({ error: error.message });
    }
  },

  getOneTalent: async (req, res) => {
    try {
      const talent = await Talent.findByPk(req.params.id)
        ;
      res.status(200).json(talent);
    } catch (error) {
      res.status(500).send("Failed to load resource");
    }
  },


  deleteTalent: async (req, res) => {
    const { id } = req.params;

    try {
      // Find the talent by its primary key (id) and delete it
      const deletedTalent = await Talent.findByPk(id);

      if (!deletedTalent) {
        return res.status(404).send("Talent not found");
      }

      await deletedTalent.destroy();

      res.status(200).json({ message: "Talent deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send("Failed to delete talent");
    }
  },

  updateTalent: async (req, res) => {
    try {

      const talent = await Talent.findByPk(req.params.id);

      if (talent) {

        talent.title = req.body.title;
        talent.description = req.body.description;
        talent.imageUrl = req.body.imageUrl;
        talent.price = req.body.price;
        talent.category = req.body.category;
        talent.rating = req.body.rating;
        talent.freelancer_id = req.body.freelancer_id

        await talent.save();

        res.status(200).json(talent);
      } else {

        res.status(404).send("Talent not found");
      }
    } catch (error) {

      console.error("Failed to update talent:", error);
      res.status(500).send("Failed to update talent");
    }
  },

  findByTitle: async (req, res) => {
    const title = req.params.title
    try {
      const talent = await Talent.findOne({
        where: {
          title: title,
        }
      });
      res.status(200).json(talent);
    } catch (error) {
      res.status(500).send("Failed to load resource");
    }
  },

  findByCategory: async (req, res) => {
    const category = req.params.category
    try {
      const talent = await Talent.findOne({
        where: {
          category: category,
        }
      });
      res.status(200).json(talent);
    } catch (error) {
      res.status(500).send("Failed to load resource");
    }
  },



}