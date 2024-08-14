export const getHome=async(req, res, next) => {
    console.log('Home')
    res.render('home.ejs');
}