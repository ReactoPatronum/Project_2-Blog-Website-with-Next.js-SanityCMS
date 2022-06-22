import { client } from "/lib/sanityClient";

export default async function handler(req, res) {

    const{_id,name,email,comment}=JSON.parse(req.body)
    try{
        await client.create({
            _type:"comment",
            post:{
                _type:"reference",
                _ref:_id
            },
            name,
            email,
            comment
        })
    }catch(err){
        console.log(err)
    }
    res.status(200).json({ name: 'John Doe' })
  }
  