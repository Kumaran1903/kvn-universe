import SingleTemplate from "@/components/SingleTemplate/SingleTemplate";
import { getTemplates } from "@/lib/templates_data";
export default async function FreeTemplates() {
  const templates = await getTemplates();
  return (
    <div className="flex flex-wrap w-6/7 container mx-auto items-center justify-center sm:justify-start start mb-40">
      {templates.map((template) => {
        return <SingleTemplate template={template} key={template.id} />;
      })}
    </div>
  );
}
