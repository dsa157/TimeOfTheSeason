//GET '/Community'
const getAllCommunity = (req, res, next) => {
    res.json({message: "GET all Community"});
};

//POST '/Community'
const newCommunity = (req, res, next) => {
    res.json({message: "POST new Community"});
};

//DELETE '/Community'
const deleteAllCommunity = (req, res, next) => {
    res.json({message: "DELETE all Community"});
};

//GET '/Community/:name'
const getOneCommunity = (req, res, next) => {
    res.json({message: "GET 1 Community"});
};

//POST '/Community/:name'
const newComment = (req, res, next) => {
    res.json({message: "POST 1 Community comment"});
};

//DELETE '/Community/:name'
const deleteOneCommunity = (req, res, next) => {
    res.json({message: "DELETE 1 Community"});
};

//export controller functions
module.exports = {
    getAllCommunity, 
    newCommunity,
    deleteAllCommunity,
    getOneCommunity,
    newComment,
    deleteOneCommunity
};
