import Image from "next/image";
import Link from "next/link";

export default async function SingleTemplate({ template }) {
  console.log(template);
  return (
    <div
      className="mx-auto shadow-indigo-100 shadow-xl w-80 sm:w-64 md:w-80 lg:w-72 xl:w-90  hover:shadow-2xl hover:shadow-indigo-200 my-7 transition-shadow duration-300 rounded-b-xl group"
      style={{ paddingRight: "10px" }}
    >
      <div
        className="w-full container mx-auto h-64 lg:h-72 flex flex-col items-center overflow-hidden "
        style={{ paddingBottom: "20px" }}
      >
        <div className="relative w-full h-full group  ">
          <Image
            src={template?.image || "/temp.png"}
            fill
            alt=""
            className="transition-transform duration-500 ease-in-out group-hover:scale-110 "
          />
        </div>
        <div
          className="w-full flex justify-between items-start flex-col space-y-2"
          style={{ padding: " 10px 10px" }}
        >
          <span className="text-[1rem]">{template?.title}</span>
          <Link
            className=" bg-gradient-to-r from-indigo-600 to-purple-600 hover:to-purple-700 text-white rounded-lg hover:scale-95 transition-all transform duration-300 "
            href={template.link}
            style={{ padding: "8px 15px" }}
          >
            Download
          </Link>
        </div>
      </div>
    </div>
  );
}
