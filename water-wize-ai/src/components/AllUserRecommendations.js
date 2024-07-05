import { useContext, useEffect, useState } from "react";
// import useDictionary from "../resources/Dictionary/Dictionary";
import { AuthContext } from "../AuthContext";
import { getRecommendationsForUser, getLoggedInUserId } from "../apiRequests";
import Recommendation from "./recommendation/Recomendation"; 


//TODO: move to /reccomendations 

const AllUserRecommendations = ({ onRowClick }) => {
    //const dict = useDictionary(); //TODO: add to dictionary
    const { user } = useContext(AuthContext);
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const userId = await getLoggedInUserId();
                if (!userId) {
                    throw new Error('User ID not found');
                }

                const recsData = await getRecommendationsForUser(userId);
                //console.log(recsData);
                if (recsData) {
                    setRecommendations(recsData);
                } else {
                    throw new Error('Failed to fetch recommendations');
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchRecommendations();
    }, []);

    return (
        <div>
            <h4>All saved recommendations for {user.firstName}</h4>
            <Recommendation recommendationDataRows={recommendations} onRowClick={onRowClick} />
        </div>
    );
};

export default AllUserRecommendations;
