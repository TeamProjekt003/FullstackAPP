const {ClientTalent,Client, Talent} = require('../orm')


module.exports={
    getClientTalents: async (req, res) => {
        try {
            const clientTalents = await Talent.findAll({
                order: [["createdAt", "DESC"]],
                include: [
                    {
                        model: Client,
                        as: 'clients',
                        through: {
                            attributes: [], 
                        },
                        attributes: ["id", "name", "email", "adress", "imageUrl", "phoneNumber"], 
                    }
                ]

            });

            res.status(200).json(clientTalents);
        } catch (err) {
            console.error('Error fetching clientTalents:', err);
            res.status(500).json({ error: 'Error fetching clientTalents' });
        }
    },

    addClientTalent: async (req, res) => {
        try {
          const talent = await ClientTalent.create(req.body);
          res.status(201).json(talent);
        } catch (error) {
          res.status(409).send(error);
        }
      },
    
}