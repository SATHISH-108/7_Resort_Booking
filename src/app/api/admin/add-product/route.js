import DBConnection from "@/app/utils/configure/db";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import ProductModel from "@/app/utils/models/product";

export async function GET() {
  await DBConnection();
  const records = await ProductModel.find({});
  // return NextResponse.json({ message: "api testing" });
  return NextResponse.json({ data: records });
}
export async function POST(request) {
  // console.log("add-product request", request);
  await DBConnection();
  const data = await request.formData();
  //formData() it is in-built function or(module)
  // console.log("add-product: data", data);
  // FormData {  title: 'luxury room',   price: '30000',  offer: '10',
  //   description: '', amenitie: '',  image: File {
  //     size: 37934, type: 'image/jpeg', name: 'Life_Quote.jpg',
  //     lastModified: 1739974252063
  //   }
  // }

  const title = data.get("title");
  const price = data.get("price");
  const offer = data.get("offer");
  const amenitie = data.get("amenitie");
  const description = data.get("description");
  const image = data.get("image");
  //console.log("image", image); //File {size: 37934,type: 'image/jpeg',name: 'Life_Quote.jpg',lastModified: 1739982004947}
  const bufferData = await image.arrayBuffer();
  // console.log("bufferData", bufferData);
  const buffer = Buffer.from(bufferData);
  const imagePath = path.join(process.cwd(), "public", "uploads", image.name);
  // console.log("add-product-route-data", data);
  //FormData { title: 'luxury room',  price: '1800', offer: '10', description: 'jkdjkkjc,',amenitie: 'swimmingpool',
  //image: File {size: 37934, type: 'image/jpeg', name: 'Life_Quote.jpg', lastModified: 1739982555358}}

  try {
    await writeFile(imagePath, buffer);
    const newProduct = new ProductModel({
      title: title,
      price: price,
      offer: offer,
      amenitie: amenitie,
      description: description,
      image: `/uploads/${image.name}`,
    });
    // console.log("newProduct", newProduct);

    // newProduct { title: 'luxury room', description: 'jkdjkkjc,', price: 1800, offer: '10', image: '/uploads/Life_Quote.jpg',
    //   amenitie: ['Ac',  'Greyser',  'Tv',  'Wi-Fi', 'Elevator','Break-fast', 'swimmingpool'],
    //   _id: new ObjectId('67b606db1b2290e494fac842')
    // }

    await newProduct.save();
    return NextResponse.json(
      {
        response: "Successfully Uploaded",
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
