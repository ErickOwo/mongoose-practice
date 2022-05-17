import dbConnect from "@lib/dbConnect";
import Movie from "@models/Movie";

export default async function handler(req, res) {

  await dbConnect();

  // GET API MOVIE

  const { method, 
          query: { id } } = req;

  switch( method ){
    case "DELETE":
      try{
        const movie = await Movie.findByIdAndDelete(id);
        
        if(!movie) res.status(404).json({success: false, error: 'No se encontró la película'})

        return res.json({ success: true, movie });
      }
      catch(e){
        return res.status(400).json({ success: false});
      }
    case "PUT":
      try{
        const movie = await Movie.findByIdAndUpdate(
          id, 
          req.body, 
          {
            new: true,
            runValidators: true,
          });
          
        if(!movie) res.status(404).json({success: false, error: 'No se encontró la película'})
  
        return res.json({ success: true, movie });
      }
        catch(e){
          return res.status(400).json({ success: false, error: e });
        }
    case "GET":
      try{
        const movie = await Movie.findById(id).lean();
        
        if(!movie) res.status(404).json({success: false, error: 'No se encontró la película'})

        return res.json({ success: true, movie });
      }
      catch(e){
        return res.status(400).json({ success: false});
      }
    default: 
      return res.status(500).json({
        success: false, 
        error: "falla del servidor",
      });
  }

}
