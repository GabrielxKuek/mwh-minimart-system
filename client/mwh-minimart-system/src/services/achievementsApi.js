const API_BASE_URL = "http://localhost:8080/api";

export const getAchievements = async () => {
  try {
    // Make a GET request to your server's API endpoint for achievements.
    const response = await fetch(`${API_BASE_URL}/achievements`);

    // Check if the response was successful (status code 200-299).
    if (!response.ok) {
      // If not successful, throw an error with a message. You can customize
      // the error message based on the response status code if needed.
      throw new Error(`Failed to fetch achievements: ${response.status}`);
    }

    // Parse the response body as JSON.
    const achievements = await response.json();

    // Return the fetched achievements data.
    return achievements;
  } catch (error) {
    // Log the error to the console for debugging purposes.
    console.error("Error fetching achievements:", error);

    // You can either:
    // 1. Return an empty array or some default value to indicate failure:
    // return [];
    // 2. Or, re-throw the error to be handled by the caller:
    throw error;
  }
};
