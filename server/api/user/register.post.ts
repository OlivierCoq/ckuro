import postmark from "postmark";
import { Text } from "vue";
const client = new postmark.ServerClient(process.env.POSTMARK_SERVER_TOKEN);
const api_url = process.env.STRAPI_URL;

export default defineEventHandler(async (event) => {
  // import postmark:

  const post_data = await readBody(event);
  // console.log('coming from register frontend', post_data);

  /*
    - create btoa token 
    - create a new user in strapi
    - send a welcome email to the user
        - email link = 
  */

  // create btoa token
  const token = Buffer.from(post_data.email).toString('base64');
  let front_end_response

  // create a new user in strapi
  await $fetch(`${api_url}/api/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: post_data.username,
        email: post_data.email,
        password: post_data.password,
        confirmed: false,
        role: {
          id: 1,
          name: "Authenticated",
          description: "Default role given to authenticated user.",
          type: "authenticated",
          connect: [
            {
              id: 1,
            },
          ],
        },
        ck_token: token,
    }),
  }).then((res) => {

     const body = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to the nSight Family</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #000000; margin: 0; padding: 0; height: 100vh;">
          <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #000000; margin: 0; padding: 0; height: inherit;">
              <tr>
                  <td align="center" style="padding: 20px;">
                      <table role="presentation" style="width: 600px; border-collapse: collapse; border-radius: 10px;">
                          <tr>
                              <td align="center" style="padding: 0px;  border-radius: 10px; overflow: hidden;">
                                  <img src="https://res.cloudinary.com/dgmz3uymj/image/upload/v1727827377/email_hero_img_c4ff32f645.jpg" alt="C.Kuro Logo" style="width: 100%; height: auto;">
                              </td>
                          </tr>
                          <tr style="margin: -4px 26px 30px 26px;
                              display: block;
                              padding: 30px;
                              background: #ffffff;
                              border-bottom-left-radius: 15px;
                              border-bottom-right-radius: 15px;"
                            >
                              <td>
                                  <h1 style="margin: 0 0 20px; font-size: 24px; color: #333333;">Hey, ${post_data.username}! Just makin' sure you're not a robot.</h1>
                                  <p style="margin: 0; font-size: 16px; color: #333333;">Click the button below to get the party started!</p>
                                  <a href="https://ckuro.cc/confirm-email?email=${post_data.email}&token=${token}&destination=${post_data.route}" style="display: inline-block; padding: 10px 20px; margin: 0 0 20px; background-color: #ff6f61; color: #ffffff; text-decoration: none; border-radius: 5px;">Confirm Email</a>
                                  <p style="margin: 0; font-size: 16px; color: #333333;">See you on the other side.</p>
                              </td>
                          </tr>
                          <tr>
                              <td align="center" style="padding: 20px; background-color: #000000; color: #ffffff;">
                                  <p style="margin: 0; font-size: 14px;">&copy; ${new Date().getFullYear()} cKuro. All rights reserved.</p>
                              </td>
                          </tr>
                      </table>
                  </td>
              </tr>
          </table> 
      </body>
      </html>`

    // send a welcome email to the user
    const msg =  {
      From: "info@ckuro.cc",
      To: post_data.email,
      Subject: "Welcome to the CKuro Family",
      HtmlBody: body,
      TextBody: "Welcome to the CKuro Family",
      MessageStream: "outbound"
    }

    try {
      client.sendEmail(msg).then((response)=> {
        console.log("Email sent successfully:", response);
        front_end_response = {
          statusCode: 200,
          data: `Email sent successfully: ${JSON.stringify(response)}. Please check your spam folder if you don't see it in your inbox.`,
          // data: `Email sent successfully`,
        };
      })
    } catch (error) {
      console.error("Failed to send email:", error);
      front_end_response = {
        statusCode: 500,
        data: `Failed to send email: ${error.message}`,
      };
    }

    front_end_response = {
      statusCode: 200,
      data: `You're almost there! Please check your email to confirm your account.`,
    }

  }).catch((err) => {
      console.log(err);
      front_end_response = {
        statusCode: 500,
        data: `Failed to create user: ${err.message}`,
      };
    });
  
  return new Response(JSON.stringify(front_end_response), {
    headers: {
      "content-type": "application/json",
    },
  });
  

});