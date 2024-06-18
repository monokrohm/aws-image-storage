import ImageComponent from "./ImageComponent";

export default function SearchListImage({ keys }) {
    const imageKeys = keys.split(',');
    // console.log('ImageKeys:', imageKeys);

    return (
        <div className="flex flex-col space-x-2 px-3 py-3 lg:px-10">
            {imageKeys.map((key, index) => (
                <ImageComponent key={index} imageKey={key} />
            ))}
        </div>
    )
}