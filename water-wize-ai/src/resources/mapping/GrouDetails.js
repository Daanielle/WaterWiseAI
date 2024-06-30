import lanasImage from "../images/lana.png";
import hadarsImage from "../images/hadar.png";
import shacharsImage from "../images/shachar.png";
import daniellesImage from "../images/danielle.png";
import useDictionary from "../Dictionary/Dictionary";

function GrouDetails () {
const dict = useDictionary();
const facebookUrl = "https://www.facebook.com/yourfacebookprofile"; // Change this to your Facebook profile URL

const TeamDetails={
  Danielle: {
    my_Name:dict.Danielle_Name,
    image_link:daniellesImage,
    about_me:dict.aboutMe,
    linkedinUrl:"https://www.linkedin.com/in/shachar-adam-836a94277",
    emailUrl:"mailto:adamsha@bgu.post.ac.il",
    facebookUrl:facebookUrl ,


  },
  Hadar: {
    my_Name:dict.Hadar_Name,
    image_link:hadarsImage,
    about_me:dict.aboutMe,
    linkedinUrl:"https://www.linkedin.com/in/shachar-adam-836a94277",
    emailUrl:"mailto:adamsha@bgu.post.ac.il",
    facebookUrl:facebookUrl, 
  },

  Lana: {
    my_Name:dict.Lana_Name,
    image_link:lanasImage,
    about_me:dict.aboutMe,
    linkedinUrl:"https://www.linkedin.com/in/shachar-adam-836a94277",
    emailUrl:"mailto:adamsha@bgu.post.ac.il",
    facebookUrl:facebookUrl, 
  },

  Shachar: {
    my_Name:dict.Shachar_Name,
    image_link:shacharsImage,
    about_me:dict.aboutMe,
    linkedinUrl:"https://www.linkedin.com/in/shachar-adam-836a94277",
    emailUrl:"mailto:adamsha@bgu.post.ac.il",
    facebookUrl:facebookUrl, 
},

};

    return TeamDetails;
};

export default GrouDetails;
