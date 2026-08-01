const router=require('express');
const Router=router();
router.post('/',(req,res)=>{
    res.send("Blog added");
});
module.exports=Router;