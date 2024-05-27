import { useEffect, useState } from "react"

const useFetchImage = (link) => {
    const [url, setUrl] = useState('')

    useEffect(() => {
		fetch(link)
			.then(response => response.blob())
			.then((image) => {
				setUrl(URL.createObjectURL(image));
			});
	}, []);

    return {url}
}
export default useFetchImage;