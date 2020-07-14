const apiKey = process.env.REACT_APP_YELP_API_KEY;

const Yelp = {

    search(term , location , sortBy) {
        const urlToFetch = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`;
        return fetch(
            urlToFetch, 
            { 
                headers: { Authorization: `Bearer ${apiKey}` }
            }
        ).then((response) => {
            return response.json();
        }).then((jsonResponse) => {
            if (jsonResponse.businesses) {
                return jsonResponse.businesses.map((business) => {
                    // console.log(business);
                    return {
                        id: business.id ,
                        imageSrc: business.image_url ,
                        name: business.name , 
                        adress: business.location.address1 , 
                        city: business.location.city , 
                        state: business.location.state , 
                        zipCode: business.location.zip_code , 
                        category: business.categories[0].title ,
                        rating: business.rating , 
                        reviewCount: business.review_count
                    };
                });
            }
        });
    }

};

export default Yelp;