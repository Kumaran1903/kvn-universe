import { Templates } from "./models";
import { connectToDB } from "./utils";

export const getTemplates = async () => {
  try {
    await connectToDB();
    const templates = await Templates.find();
    const refinedtemplates = templates.map((template) => ({
      id: template._id.toString(),
      title: template.title,
      image: template.image,
      link: template.link,
    }));
    return refinedtemplates;
  } catch (err) {
    console.log("Error Fetching templates", err);
  }
};
