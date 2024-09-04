import { VERISOUL_API_KEY, VERISOUL_ENV } from "@env";

/*
 * Make this API call from a secure server, not from the client device
 * It is not safe to expose your API key in the client, but it is included here
 * for demonstration purposes only.
 * 
 * For added details you can pass query parameters: account_detail=1&session_detail=1
 * https://docs.verisoul.ai/reference/create-session
 */
export async function authenticateSession(sessionId, accountId) {
  try {
    const response = await fetch(`https://api.${VERISOUL_ENV}.verisoul.ai/session/authenticate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': VERISOUL_API_KEY,
      },
      body: JSON.stringify({
        account: {
          id: accountId
        },
        session_id: sessionId
      }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error authenticating session:", error);
    throw error;
  }
}