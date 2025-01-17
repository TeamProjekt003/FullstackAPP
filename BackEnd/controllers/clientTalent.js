const {ClientTalent,Client, Talent,Freelance} = require('../orm')


module.exports={
    getFreelancersTalents: async (req, res) => {
        try {
            const clientTalents = await Freelance.findAll({
                order: [["createdAt", "DESC"]],
                include: [
                    {
                        model: Talent,
                        as: 'talents',
                        attributes: ["id", "title", "description", "category", 
                            "imageUrl","rating","delivery","price","freelancer_id"], 
                    }
                ]

            });

            res.status(200).json(clientTalents)
           
        } catch (err) {
            console.error('Error fetching clientTalents:', err);
            res.status(500).json({ error: 'Error fetching clientTalents' });
        }
    },

    getOneFreelancersTalents: async (req, res) => {
        try {
            const clientTalents = await Freelance.findByPk(req.params.id,{
                include: [
                    {
                        model: Talent,
                        as: 'talents',
                        attributes: ["id", "title", "description", "category", 
                            "imageUrl","rating","delivery","price","freelancer_id"], 
                    }
                ]

            })
            res.status(200).json(clientTalents)
           
        } catch (err) {
            console.error('Error fetching clientTalents:', err);
            res.status(500).json({ error: 'Error fetching clientTalents' })
        }
    },

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

            res.status(200).json(clientTalents)
           
        } catch (err) {
            console.error('Error fetching clientTalents:', err);
            res.status(500).json({ error: 'Error fetching clientTalents' });
        }
    },
    getClient: async (req, res) => {
        try {
            const clientTalents = await ClientTalent.findAll({
                order: [["createdAt", "DESC"]],
                include: [
                    {
                        model: Client,
                        as: 'clients',
                        attributes: ["id", "name", "email", "adress", "imageUrl", "phoneNumber"],
                    },
                    {
                        model: Talent,
                        as: 'talents',
                        attributes: ["id", "title", "description", "category", "imageUrl"],
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