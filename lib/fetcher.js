const fetcher = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed to fetch");
    }
    const data = await response.json();
    // console.log("Fetched data:", data);
    return data;
};

export default fetcher;
