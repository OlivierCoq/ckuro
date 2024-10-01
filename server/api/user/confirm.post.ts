import postmark from "postmark";
const client = new postmark.ServerClient(process.env.POSTMARK_SERVER_TOKEN);
const api_url = process.env.STRAPI_URL;

export default defineEventHandler(async (event) => {
  // import postmark:

  const post_data = await readBody(event);
  console.log('coming from register frontend', post_data);

  /*
    - create btoa token 
    - create a new user in strapi
    - send a welcome email to the user
        - email link = 
  */
  

  
});