// const { ReasonCancellation, CancellationForm} = require('../../models');
// const ReasonCancellationController = {
//     getAll: async (req,res)=>{
//         try {
//             const reason = await ReasonCancellation.findAll();
//             return res.status(200).json(reason);
//         } catch (error) {
//             console.log(error);
//             return res.status(500).json(error);
//         }
//     },
//     get: async (req, res)=>{
//         try {
//             const id = req.params?.id;
//             if(!id) {
//                 return res.status(400).json("id is required");
//             }
//             const reason = await ReasonCancellation.findByPk(id);
//             if(!reason) {
//                 return res.status(400).json("id not found");
//             }
//             return res.status(200).json(reason);
//         } catch (error) {
//             console.log(error);
//             return res.status(500).json(error);
//         }
//     },
//     create: async (req, res)=>{
//         try {
//             const {name,detail} = req.body;
//             if(!name ||!detail) {
//                 return res.status(400).json("Data is invalid");
//             }
//             const reason = await ReasonCancellation.create({
//                 name,
//                 detail
//             });
//             return res.status(200).json(reason);
//         } catch (error) {
//             console.log(error);
//             return res.status(500).json(error);
//         }
//     },
//     update: async (req, res)=>{
//         try {
//             const {name,detail} = req.body;
//             const id = req.params?.id;
//             const reason = await ReasonCancellation.findByPk(id);
//             if(!reason) {
//                 return res.status(400).json("id not found");
//             }
//             await reason.update({
//                 name,
//                 detail
//             })
//             await reason.reload();
//             return res.status(200).json(reason);
//         } catch (error) {
//             console.log(error);
//             return res.status(500).json(error);
//         }
//     },
//     delete: async (req, res)=>{
//         try {
//             const id = req.params?.id;
//             const reason = await ReasonCancellation.findByPk(id);
//             if(!reason) {
//                 return res.status(400).json("id not found");
//             }
//             const cancelform = await CancellationForm.findAll({
//                 reasonCancellationId: id
//             })
//             if(cancelform.length > 0){
//                 return res.status(400).json("reason has cancelform, cannot be deleted");
//             }
//             await reason.destroy({force: true});
//             return res.status(200).json("success");
//         } catch (error) {
//             console.log(error);
//             return res.status(500).json(error);
//         }
//     }
// }

// module.exports = ReasonCancellationController