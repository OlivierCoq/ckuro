import postmark from "postmark";
const client = new postmark.ServerClient(process.env.POSTMARK_SERVER_TOKEN);
const api_url = process.env.STRAPI_URL;

// qs library:
import qs from 'qs';

export default defineEventHandler(async (event) => {
  // import postmark:

  const post_data = await readBody(event);
  console.log('coming from confirm frontend', post_data);

  /*
    - get the user from strapi using email
    - compare token to ck_token
    - update user to confirmed
    - send user data to front end
  */

  // get the user from strapi using email
  const user = await $fetch(`${api_url}/api/users?${qs.stringify({ 
    filters: {
      ck_token: {
        $eq: post_data.ck_token
      },
      email: {
        $eq: 'coq.olivier36+18@gmail.com'
      }
    }
  })}`);
  console.log('user', user);

  if(!user.length) {
    return {
      status: 404,
      body: {
        message: 'User not found'
      }
    }
  } else {
    // update user to confirmed
    const updated_user = await $fetch(`${api_url}/api/users/${user[0].id}`, {
      method: 'PUT',
      body: JSON.stringify({
        confirmed: true
      })
    });

    console.log('updated_user', updated_user);

    // send user data to front end
    return {
      status: 200,
      body: {
        user: updated_user,
        destination: post_data.destination
      }
    }
  }
  
});