
const test = {
    test: async (req,res)=>{
        const permissionsConst = await permissionsConstInstance.getInstance();
        console.log(permissionsConst)
        res.status(200).json(permissionsConst.pos)
    }
}

module.exports = test;