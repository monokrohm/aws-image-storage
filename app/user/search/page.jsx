import SearchComponents from "@/components/SearchComponents";
import SearchList from "@/components/SearchList";
import SearchListImage from "@/components/SearchListImage";

export default function SearchPage({ params, searchParams }) {
    // console.log('SearchPage terms:', searchParams.results);

    return (
        <div>
            <SearchComponents />
            {searchParams.tags ? <SearchList tags={searchParams.tags} /> : <SearchListImage keys={searchParams.results} />}
        </div>
    );
}
