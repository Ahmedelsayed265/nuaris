import axios from "axios";

export default axios.create({
  baseURL: "http://nuaris-app.me-south-1.elasticbeanstalk.com",
});
