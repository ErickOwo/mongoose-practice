import dbConnect from "@lib/dbConnect";
import Movie from "@models/Movie";

export default async function handler(req, res) {

  await dbConnect();

  // POST API MOVIE

  const { method }= req;
  switch( method ){
    case "POST":
      try{
        const movie = new Movie(req.body);
        await movie.save();

        return res.json({ success: true, movie });
      }
      catch(e){
        return res.status(400).json({ success: false, error: e });
      }
    default: 
      return res.status(500).json({
        success: false, 
        error: "falla del servidor",
      });
  }

}
